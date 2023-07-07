import { WebSocketServer } from 'ws';
import { AddToRoom, AttackServer, LoginData, RequestResponse } from './types';
import Actions from './Actions';

const PORT = 3000;

const wss = new WebSocketServer({ port: PORT });

const actions = new Actions(wss);

wss.on('connection', (ws) => {
  ws.on('error', console.error);

  ws.on('message', (msg: string) => {
    const data = JSON.parse(msg);
    console.log('received: %s', data);
    switch (data.type) {
      case 'reg':
        actions.registration(ws, data);
        break;

      case 'create_room':
        
        break;

      case 'add_player_to_room':
        
        break;

      case 'add_ships':
        
        break;

      case 'attack':
        
        break;
    
      case 'randomAttack':
        
        break;
    
      default:
        break;
    }
  });

  ws.send('something');
});

export default wss;