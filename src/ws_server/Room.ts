import  WebSocket from 'ws';
import { AttackClient, AttackServer, UpdateRoomServer, UserData } from "./types";
import EventEmitter from 'node:events';
class MyEmitter extends EventEmitter {}

interface User {
  index: number;
  name: string;
  ships?: Ship[];
  userWS: WebSocket,
}

interface Ship {
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

class Room {
  roomId: number;
  roomUsers: User[];
  isGame: boolean;
  startGameEmitter: MyEmitter;
  currentPlayer: number;

  constructor(id: number, index: number, {name, userWS}: UserData) {
    this.roomId = id;
    this.roomUsers = [{index, name, userWS}];
    this.isGame = false;
    this.startGameEmitter = new MyEmitter();
    this.currentPlayer = index;
  }

  addPlayerToRoom = (index: number, {name, userWS}: UserData): string => {
    this.roomUsers.push({index, name, userWS});
    this.isGame = true;
    return JSON.stringify({
        roomId: this.roomId,
        roomUsers: this.roomUsers.map(({name, index}) => ({name, index})),
    });
  }

  startedInfo = (): UpdateRoomServer => {
    const data = {
      roomId: this.roomId,
      roomUsers: this.roomUsers.map((user) => ({name: user.name, index: user.index})),
    }
    return data;
  }

  addShips = (indexPlayer: number, ships: Ship[]) => {
    ships.map((el) => {
      console.log(el);
      return JSON.stringify(el);
    });
    this.roomUsers.forEach((user) => {
      if (user.index === indexPlayer) {
        ships.map((ship) => {
          const fields: { x: number; y: number; shot: boolean; }[] | undefined = [];
          const size = 
            ship.type === "small" ? 1 
              : ship.type === "medium" ? 2 
              : ship.type === "large" ? 3 : 4;

          for (let i = 0; i < size; i++) {
            const field = {
              x: ship.position.x + (!ship.direction ? i : 0),
              y: ship.position.y + (ship.direction ? i : 0),
              shot: false,
            }
            fields.push(field);
          }
          ship.status = "unbroken";
          ship.fields = fields;
        });
        user.ships = ships;
      }
    });
    if (this.roomUsers.filter((user) => !!user.ships).length === 2) {
      this.roomUsers.forEach((user) => {
        user.userWS.send(JSON.stringify({
          type: "start_game",
          data: JSON.stringify({
            ships: ships,
            currentPlayerIndex: this.currentPlayer,
          }),
          id: 0,
        }));
      })
    }
  }

  atack = (data: AttackClient) => {
    const { x, y, indexPlayer } = data;
    if (this.currentPlayer === indexPlayer) {
      let result: "killed" | "shot" | "miss" = "miss";
      this.roomUsers.forEach((user) => {
        if (user.index !== indexPlayer) {
          user.ships?.map((ship) => {
            if (ship.status === "unbroken" || ship.status === "shot") {
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
              }
            }
            return ship;
          });
        }
      })
      const res = JSON.stringify({
        position:
          {
            x: x,
            y: y,
          },
        currentPlayer: indexPlayer,
        status: result,
      });
  
      this.roomUsers.forEach((user) => {
        user.userWS.send(JSON.stringify({
          type: "attack",
          data: res,
          id: 0,
        }));
      });
      this.turn();
    }
  }

  turn = () => {
    this.currentPlayer = this.currentPlayer === 1 ? 0 : 1;
    const res = JSON.stringify({
      currentPlayer: this.currentPlayer,
    });
    this.roomUsers.forEach((user) => {
      user.userWS.send(JSON.stringify({
        type: "turn",
        data: res,
        id: 0,
      }));
    })
  }

  winGame = () => {
    // if (result === "killed") {
    //   if (user.ships?.every((el) => el.status === "killed")) {
    //     this.winGame();
    //   }
    // }
  }

}

export default Room;