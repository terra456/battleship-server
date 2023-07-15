import { EventEmitter, WebSocketServer } from 'ws';
import { AddToRoom, AttackServer, LoginData, RequestResponse } from './types';
import Actions from './Actions';

const PORT = 3000;

const wss = new WebSocketServer({ port: PORT });

// class MyEmitter extends EventEmitter {}
export const winGameEmitter = new EventEmitter();

const actions = new Actions(wss);

wss.on('connection', function connection(ws) {
  ws.on('error', console.error);

  ws.on('message', (msg: string) => {
    const data = JSON.parse(msg);
    switch (data.type) {
      case 'reg':
        actions.registration(ws, data);
        break;

      case 'create_room':
        actions.createRoom(ws, data);
        break;

      case 'add_user_to_room':
        actions.addPlayerToRoom(ws, data);
        break;

      case 'add_ships':
        actions.addShips(ws, data);
        break;

      case 'attack':
        actions.attack(data);
        break;
    
      case 'randomAttack':
        actions.randomAttack(data);
        break;

      case 'single_play':
        actions.singlePlay(ws, data);
        break;
    
      default:
        break;
    }
  });

  ws.send('something');
});
winGameEmitter.on('win', (name) => {
  actions.addWinner(name);
})

export default wss;