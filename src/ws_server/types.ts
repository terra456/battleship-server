export interface RequestResponse {
  type: string,
  data: string,
  id: number,
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

export interface AddShips {
  gameId: number,
  ships: Array<
          {
              position: {
                  x: number,
                  y: number,
              },
              direction: boolean,
              length: number,
              type: "small"|"medium"|"large"|"huge",
          }
      >,
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
  gameID: number,
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