import  WebSocket from 'ws';
import { AttackClient, AttackServer, Coordinates, ShipOnClient, StartGameServer, UpdateRoomServer, UserData, UserInfo } from "./types";
import { randomInteger } from './utils';
import EventEmitter from 'node:events';
import { addShipsData, getShipCells, isShootInArray, placeShipsOnField, shoot } from './game_functions';
class MyEmitter extends EventEmitter {}

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
  // currentPlayer: number;
  // isWithBot: boolean;
  roomId: number;

  constructor(roomId: number, indexUser: number, name: string) {
    this.roomId = roomId;
    this.roomUsers = [{index: indexUser, name, shoots: []}];
    this.isGame = false;
    // this.currentPlayer = indexUser;
    // this.isWithBot = withBot;
    // if (withBot) {
    //   this.addBot();
    // }
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

  public addMissedFields = () => {

  }

  public atack = (data: AttackClient): Array<AttackServer> | undefined => {
    const { x, y, indexPlayer } = data;
      if (!isShootInArray({x, y}, this.roomUsers[indexPlayer].shoots)) {
        let result: "killed" | "shot" | "miss" = "miss";
        let cells: Coordinates[] | undefined;
        this.roomUsers[indexPlayer].shoots?.push({x, y});
        this.roomUsers.map((user) => {
          if (user.index !== indexPlayer) {
            user.ships?.map((ship) => {
              if (ship.status !== "killed") {
                ship.fields?.map((field) => {
                  if (!field.shot && field.x === x && field.y === y) {
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
              x: x,
              y: y,
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

  // turn = () => {
  //   this.currentPlayer = this.currentPlayer === 1 ? 0 : 1;
  //   if (this.isWithBot && this.currentPlayer === 1) {
  //     this.randomAtack(1);
  //   }
  //   return {
  //     currentPlayer: this.currentPlayer,
  //   };
  // }

  isWinGame = (indexPlayer: number): Boolean => {
    if (this.roomUsers[indexPlayer ? 0 : 1].ships?.every((ship) => ship.status === 'killed')) {
      return true;
    } else {
      return false;
    }
    //   this.winGame();
    // } else {
    //   this.turn();
    // }
  }

  // winGame = () => {
  //   return {
  //     winPlayer: this.currentPlayer,
  //   }
  // }

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
    return this.atack({...dotAtack, indexPlayer});
  }

}

export default Game;