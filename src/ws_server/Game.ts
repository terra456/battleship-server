import { AttackServer, Coordinates, ShipOnClient, UpdateRoomServer } from "./types";
import { randomInteger } from './game_functions';
import { addShipsData, getShipCells, isShootInArray, placeShipsOnField } from './game_functions';

interface User {
  index: number;
  name: string;
  ships?: Ship[];
  shoots?: Array<{
    x: number,
    y: number,
  }>
}

export interface Ship {
  position: {
    x: number,
    y: number,
  },
  direction: boolean,
  length: number,
  type: "small"|"medium"|"large"|"huge",
  status?: "unbroken"|"killed"|"shot",
  fields?: {
    x: number,
    y: number,
    shot: boolean;
  }[],
}

class Game {
  roomUsers: User[];
  isGame: boolean;
  roomId: number;

  constructor(roomId: number, indexUser: number, name: string) {
    this.roomId = roomId;
    this.roomUsers = [{index: indexUser, name, shoots: []}];
    this.isGame = false;
  }

  public addPlayer = (indexUser: number, name: string): UpdateRoomServer => {
    this.roomUsers.push({index: indexUser, name, shoots: []});
    this.isGame = true;
    return {
        roomId: this.roomId,
        roomUsers: [
          {
            name: this.roomUsers[0].name,
            index: this.roomUsers[0].index
          },
          {
            name: this.roomUsers[1].name,
            index: this.roomUsers[1].index
          }
        ],
    };
  }

  public addBot = () => {
    this.roomUsers.push({index: 1, name: 'Game_Bot', shoots: []});
    this.addShips(1, placeShipsOnField());
    this.isGame = true;
    return {
      roomId: this.roomId,
      roomUsers: [
        {
          name: this.roomUsers[0].name,
          index: this.roomUsers[0].index
        }
      ],
    };
  }

  public addShips = (indexPlayer: number, ships: ShipOnClient[]) => {
    this.roomUsers.forEach((user) => {
      if (user.index === indexPlayer) {
        user.ships = addShipsData(ships);
      }
    });
  }

  public atack = (indexPlayer: number, coord: Coordinates): Array<AttackServer> | undefined => {
    if (!isShootInArray(coord, this.roomUsers[indexPlayer].shoots)) {
        let result: "killed" | "shot" | "miss" = "miss";
        let cells: Coordinates[] | undefined;
        this.roomUsers[indexPlayer].shoots?.push(coord);
        this.roomUsers.map((user) => {
          if (user.index !== indexPlayer) {
            user.ships?.map((ship) => {
              if (ship.status !== "killed") {
                ship.fields?.map((field) => {
                  if (!field.shot && field.x === coord.x && field.y === coord.y) {
                    ship.status = "shot";
                    field.shot = true;
                    result = "shot";
                  }
                  return field;
                });
                if (ship.fields?.every((el) => el.shot)) {
                  ship.status = "killed";
                  result = "killed";
                  cells = getShipCells(ship, ship.fields);
                  this.roomUsers[indexPlayer].shoots?.push(...cells);
                }
              }
              return ship;
            });
          }
          return user;
        });
        const res: Array<AttackServer> = [{
          position:
            {
              x: coord.x,
              y: coord.y,
            },
          currentPlayer: indexPlayer,
          status: result,
        }];
        if (cells) {
          cells.forEach(({x, y}) => {
            res.push({
              position:
                {x, y},
              currentPlayer: indexPlayer,
              status: "miss",
            })
          })
        }
        return res;
      } else {
        return undefined;
      }
  }

  isWinGame = (indexPlayer: number): Boolean => {
    if (this.roomUsers[indexPlayer ? 0 : 1].ships?.every((ship) => ship.status === 'killed')) {
      return true;
    } else {
      return false;
    }
  }

  randomAtack = (indexPlayer: number) => {
    const getDot = (): {x: number, y: number} => {
      let dot = {
        x: randomInteger(0, 9),
        y: randomInteger(0, 9)
      }
      const shoots = this.roomUsers[indexPlayer].shoots;
      if (isShootInArray(dot, shoots)) {
          return getDot();
        } else {
          return dot;
        }
    }
    const dotAtack = getDot();
    console.log(dotAtack);
    return this.atack(indexPlayer, dotAtack);
  }

}

export default Game;