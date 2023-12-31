import  WebSocket from 'ws';
import { Coordinates, ShipOnClient, UpdateRoomServer, UserData } from "./types";
import Game from './Game';
import { winGameEmitter } from './index';

interface UserInRoom {
  index: number;
  name: string;
  userWS?: WebSocket;
}

class Room {
  roomId: number;
  roomUsers: UserInRoom[];
  currentPlayer: number;
  game: Game;
  isWithBot: boolean;

  constructor(roomId: number, index: number = 0, {name, userWS}: UserData, withBot = false) {
    this.roomId = roomId;
    this.roomUsers = [{index, name, userWS}];
    this.game = new Game(roomId, 0, name);
    this.currentPlayer = 0;
    this.isWithBot = withBot;
    if (this.isWithBot) {
      this.addBotToRoom();
    }
  }

  addPlayerToRoom = (index: number, {name, userWS}: UserData) => {
    this.roomUsers.push({index, name, userWS});
    const data = this.game.addPlayer(index, name);
    this.roomUsers.forEach((el) => {
      el.userWS?.send(JSON.stringify({
        type: "update_room",
        data: JSON.stringify(data),
        id: 0,
      }));
    });
    this.roomUsers.forEach((el) => {
      el.userWS?.send(JSON.stringify({
        type: "create_game",
        data: JSON.stringify({
          idGame: this.game.roomId,
          idPlayer: el.index
        }),
        id: 0,
      }));
    });
  }

  deliteUsers = () => {
    this.roomUsers = [];
  }

  addBotToRoom = () => {
    this.roomUsers.push({index: 1, name: 'Game_Bot'});
    const data = this.game.addBot();
    this.roomUsers[0].userWS?.send(JSON.stringify({
      type: "create_game",
      data: JSON.stringify(data),
      id: 0,
    }));
  }

  startedInfo = (): UpdateRoomServer => {
    const data = {
      roomId: this.roomId,
      roomUsers: this.roomUsers.map((user) => ({name: user.name, index: user.index})),
    }
    return data;
  }

  addShips = (indexPlayer: number, ships: ShipOnClient[]) => {
    this.game.addShips(indexPlayer, ships);
    if (this.game.roomUsers.filter((user) => !!user.ships).length === 2) {
      this.roomUsers.forEach((user, i) => {
        if (user.userWS) {
          user.userWS.send(JSON.stringify({
           type: "start_game",
           data: JSON.stringify({
             ships: this.game.roomUsers[i].ships?.map((ship) => {
                return {
                  position: {
                      x: ship.position.x,
                      y: ship.position.y,
                  },
                  direction: ship.direction,
                  length: ship.length,
                  type: ship.type,
                }
            }),
             currentPlayerIndex: this.currentPlayer,
           }),
           id: 0,
         }));
        }
      })
    }
  }

  atack = (indexPlayer: number, coord: Coordinates | undefined = undefined) => {
    if (this.currentPlayer === indexPlayer) {
      const resData = coord ? this.game.atack(indexPlayer, coord) : this.game.randomAtack(indexPlayer);
      if (resData) {
        this.roomUsers.forEach((user) => {
          resData.forEach((data) => {
            user.userWS?.send(JSON.stringify({
              type: "attack",
              data: JSON.stringify(data),
              id: 0,
            }));
          })
        })
        if (resData[0].status === "killed") {
          if (this.game.isWinGame(indexPlayer)) {
            this.winGame(indexPlayer);
            return;
          }
        }
        this.turn();
      }
    }
  }

  turn = () => {
    this.currentPlayer = this.currentPlayer === 1 ? 0 : 1;
    const res = JSON.stringify({
      currentPlayer: this.currentPlayer,
    });
    this.roomUsers.forEach((user) => {
      user.userWS && user.userWS.send(JSON.stringify({
        type: "turn",
        data: res,
        id: 0,
      }));
    })
    if (this.isWithBot && this.currentPlayer === 1) {
      setTimeout(() => {
        this.atack(1);
      }, 800);
    }
  }

  winGame = (index: number) => {
    const res = {
      winPlayer: index,
    };
    this.roomUsers.forEach((user) => {
      user.userWS && user.userWS.send(JSON.stringify({
        type: "finish",
        data: JSON.stringify(res),
        id: 0,
      }));
    })
    winGameEmitter.emit('win', this.roomUsers[this.currentPlayer].name);
  }

}

export default Room;