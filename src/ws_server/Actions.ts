import  WebSocket from 'ws';
import { LoginServer, RequestResponse, UserData } from "./types";
import Room from './Room';

export interface Winner {
  name: string,
  wins: number,
}

class Actions {
  winners: Winner[];
  rooms: Array<Room>;
  wss: WebSocket.Server<typeof WebSocket>;
  users: UserData[];

  constructor(wss: WebSocket.Server<typeof WebSocket>) {
    this.wss = wss;
    this.winners = [];
    this.rooms = [];
    this.users = [];
  }

  addWinner = (userName: string) => {
    const index = this.winners.findIndex((winner) => winner.name === userName);
    if (index >= 0) {
      this.winners[index].wins += 1;
    } else {
      this.winners.push({
        name: userName,
        wins: 1,
      })
    }
    this.sendWinners();
  }

  registration = (ws: WebSocket, req: RequestResponse) => {
    const { name , password } = JSON.parse(req.data);
    const userId = this.users.length;
    let userData: UserData;
    let response: LoginServer = {
      name,
      index: userId,
    };
    if (this.users.every((user) => user.name !== name)) {
      userData = {
        id: userId,
        name,
        password,
        userWS: ws,
      }
      this.users.push(userData);
    } else {
      const user = this.users.find((user) => user.name === name);
      if (user && user.password === password) {
        user.userWS = ws;
        response.index = user.id;
      } else {
        response.error = true;
        response.errorText = `User with ${name} allready exist or password is incorrect`;
      }
    }
    const res: RequestResponse = {
      type: 'reg',
      data:
          JSON.stringify(response),
      id: 0,
    }
    ws.send(JSON.stringify(res));

    if (this.rooms.length > 0) {
      const resUpdate: RequestResponse = {
        type: 'update_room',
        data:
            JSON.stringify(this.rooms.slice().map((el) => el && !el.game.isGame && el.roomUsers.length === 1 && el.startedInfo()).filter((el) => el)),
        id: userId,
      }
      ws.send(JSON.stringify(resUpdate));
    }

    if (this.winners.length > 0) {
      const res: RequestResponse = {
        type: 'update_winners',
        data: JSON.stringify(this.winners),
        id: userId,
      }
      ws.send(JSON.stringify(res));
    }
  }
  
  createRoom = (ws: WebSocket, req: RequestResponse) => {
    const user = this.users.find((user) => user.userWS === ws) as UserData;
    const gameID = this.rooms.length;
    const index = this.rooms.findIndex((el) => !el.game.isGame && el.roomUsers.findIndex((user) => user.userWS === ws) >= 0)
    if (index < 0) {
      const room = new Room(gameID, 0, user);
      this.rooms.push(room);
      this.updateRoomSendForEach();
    }
  }

  addPlayerToRoom = (ws: WebSocket, req: RequestResponse) => {
    const { indexRoom } = JSON.parse(req.data);
    const user = this.users.find((user) => user.userWS === ws) as UserData;
    if (this.rooms[indexRoom].roomUsers.findIndex((user) => user.userWS === ws) < 0) {
      this.rooms.map((el) => {
        const index = el.roomUsers.findIndex((el) => el.userWS === ws);
        if (index >= 0) {
          el.deliteUsers();
        }
        return el;
      });
      this.rooms[indexRoom].addPlayerToRoom(1, user);
      const res: RequestResponse = {
        type: 'create_game',
        data:JSON.stringify({
            idGame: indexRoom,
            idPlayer: 1,
          }),
        id: req.id,
      }
      ws.send(JSON.stringify(res));
    }
    this.updateRoomSendForEach(ws);
  }


  updateRoomSendForEach = (ws: WebSocket | undefined = undefined) => {
    if (this.rooms.length > 0) {
      const resUpdate: RequestResponse = {
        type: 'update_room',
        data:
            JSON.stringify(this.rooms.slice().map((el) => {
              if (el && el.roomUsers.length === 1 && !el.game.isGame) {
                return el.startedInfo();
              }
            }).filter((el) => el)),
        id: 0,
      }
      this.wss.clients.forEach(function each(client) {
        if (client !== ws && client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify(resUpdate));
        }
      });
    }
  }

  addShips = (ws: WebSocket, req: RequestResponse) => {
    const {gameId, ships, indexPlayer} = JSON.parse(req.data);
    this.rooms[gameId].addShips(indexPlayer, ships);
  }

  attack = (req: RequestResponse) => {
    const {gameId, x, y, indexPlayer} = JSON.parse(req.data);
    this.rooms[gameId].atack(indexPlayer, {x, y});
  }

  randomAttack = (req: RequestResponse) => {
    const {gameId, indexPlayer} = JSON.parse(req.data);
    this.rooms[gameId].atack(indexPlayer);
  }

  singlePlay= (ws: WebSocket, req: RequestResponse) => {
    const user = this.users.find((user) => user.userWS === ws) as UserData;
    const gameID = this.rooms.length;
    this.rooms.map((el) => {
      const index = el.roomUsers.findIndex((el) => el.userWS === ws);
      if (index >= 0) {
        el.deliteUsers();
      }
      return el;
    });
    this.updateRoomSendForEach(ws);
    const room = new Room(gameID, 0, user, true);
    this.rooms.push(room);
    const res: RequestResponse = {
      type: 'create_game',
      data:
        JSON.stringify({
          idGame: gameID,
          idPlayer: 0,
        }),
      id: req.id,
    }
    ws.send(JSON.stringify(res));
  }
  
  sendWinners = () => {
    const res: RequestResponse = {
      type: "update_winners",
      data:JSON.stringify(this.winners),
      id: 0,
    }
    this.wss.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(res));
      }
    });
  }

  leaveGame = (ws: WebSocket) => {
    this.rooms.forEach((el) => {
      const index = el.roomUsers.findIndex((user) => user.userWS === ws);
      if (index >= 0) {
        if (el.game.isGame) {
          el.winGame(index === 0 ? 1 : 0);
        }
      }
    })
  }

}

export default Actions;