import  WebSocket from 'ws';

export interface RequestResponse {
  type: string,
  data: string,
  id: number,
}

export interface UserData {
  id: number,
  name: string,
  password: string,
  userWS: WebSocket,
}

export interface UserInfo {
  id: number,
  name: string,
  password: string,
}

export interface LoginData {
  name: string,
  password: string,
}

export interface LoginServer {
  name: string,
  index: number,
  error?: boolean,
  errorText?: string,
}

export interface UpdateWinnersServer {
  name: string,
  wins: number,
}

export interface AddToRoom {
  indexRoom: number
}

export interface CreateGameServer {
  idGame: number,
  idPlayer: number,
}

export interface UpdateRoomServer {
  roomId: number,
  roomUsers: Array<
    {
      name: string,
      index: number,
    }
  >,
}

export interface ShipOnClient {
  position: Coordinates,
  direction: boolean,
  length: number,
  type: "small"|"medium"|"large"|"huge",
}

export interface Coordinates {
  x: number,
  y: number,
}

export interface AddShips {
  gameId: number,
  ships: Array<ShipOnClient>,
  indexPlayer: number,
}

export interface StartGameServer {
  ships:
      [
          {
              position: {
                  x: number,
                  y: number,
              },
              direction: boolean,
              length: number,
              type: "small"|"medium"|"large"|"huge",
          }
      ],
  currentPlayerIndex: number,
}

export interface AttackClient {
  gameId?: number,
  x: number,
  y: number,
  indexPlayer: number,
}

export interface AttackServer {
  position:
  {
      x: number,
      y: number,
  },
  currentPlayer: number,
  status: "miss"|"killed"|"shot",
}

export interface RandomAttack {
  gameID: number,
  indexPlayer: number,
}

export interface PlayersTurn {
  currentPlayer: number,
}

export interface FinishGame {
  winPlayer: number,
}