import  WebSocket, { WebSocketServer } from 'ws';
import { Server } from "ws";
import { LoginData, LoginServer, RequestResponse } from "./types";

class Actions {
  winners: never[];
  rooms: never[];
  wss: WebSocket.Server<typeof WebSocket>;

  constructor(wss: WebSocket.Server<typeof WebSocket>) {
    this.wss = wss;
    this.winners = [];
    this.rooms = [];
  }

  registration = (ws: WebSocket, req: RequestResponse) => {
    const { name , password } = JSON.parse(req.data);
    console.log(name);
    const res: RequestResponse = {
      type: 'reg',
      data:
          JSON.stringify({
              name,
              index: 0,
          }),
      id: req.id,
  }
    ws.send(JSON.stringify(res));
  }
  
  createRoom = () => {
    this.rooms.push()
  }

  addPlayerToRoom = () => {

  }

  addShips = () => {

  }

  Attack = () => {

  }
    
  randomAttack = () => {

  }
}

export default Actions;