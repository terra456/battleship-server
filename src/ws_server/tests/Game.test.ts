import { ShipOnClient } from "ws_server/types";
import Game, { Ship } from "../Game";

const shipsSecond: ShipOnClient[] = [
  {position:{x:7,y:3},direction:true,type:"huge",length:4},
  {position:{x:2,y:1},direction:true,type:"large",length:3},
  {position:{x:5,y:3},direction:true,type:"large",length:3},
  {position:{x:1,y:7},direction:true,type:"medium",length:2},
  {position:{x:5,y:9},direction:false,type:"medium",length:2},
  {position:{x:8,y:8},direction:false,type:"medium",length:2},
  {position:{x:3,y:8},direction:false,type:"small",length:1},
  {position:{x:6,y:0},direction:true,type:"small",length:1},
  {position:{x:1,y:5},direction:true,type:"small",length:1},
  {position:{x:4,y:0},direction:true,type:"small",length:1},
];

const shipsFirst: ShipOnClient[] = [
  {position:{x:1,y:6},direction:true,type:"huge",length:4},
  {position:{x:3,y:4},direction:true,type:"large",length:3},
  {position:{x:9,y:7},direction:true,type:"large",length:3},
  {position:{x:3,y:8},direction:true,type:"medium",length:2},
  {position:{x:5,y:7},direction:true,type:"medium",length:2},
  {position:{x:7,y:7},direction:true,type:"medium",length:2},
  {position:{x:1,y:4},direction:true,type:"small",length:1},
  {position:{x:5,y:5},direction:true,type:"small",length:1},
  {position:{x:7,y:5},direction:true,type:"small",length:1},
  {position:{x:9,y:4},direction:true,type:"small",length:1},
];

const shipsSecond1: Ship[] = [
  {position:{x:7,y:3},direction:true,type:"huge",length:4,
    status: "unbroken", fields: [{x:7,y:3,shot:false}, {x:7,y:4,shot:false}, {x:7,y:5,shot:false}, {x:7,y:6,shot:false}]},
  {position:{x:2,y:1},direction:true,type:"large",length:3,
    status: "unbroken", fields: [{x:2,y:1,shot:false}, {x:2,y:2,shot:false}, {x:2,y:3,shot:false}]},
  {position:{x:5,y:3},direction:true,type:"large",length:3,
    status: "unbroken", fields: [{x:5,y:3,shot:false}, {x:5,y:4,shot:false}, {x:5,y:5,shot:false}]},
  {position:{x:1,y:7},direction:true,type:"medium",length:2,
    status: "unbroken", fields: [{x:1,y:7,shot:false}, {x:1,y:8,shot:false}]},
  {position:{x:5,y:9},direction:false,type:"medium",length:2,
    status: "unbroken", fields: [{x:5,y:9,shot:false}, {x:6,y:9,shot:false}]},
  {position:{x:8,y:8},direction:false,type:"medium",length:2,
    status: "unbroken", fields: [{x:8,y:8,shot:false}, {x:9,y:8,shot:false}]},
  {position:{x:3,y:8},direction:false,type:"small",length:1,
    status: "unbroken", fields: [{x:3,y:8,shot:false}]},
  {position:{x:6,y:0},direction:true,type:"small",length:1,
    status: "unbroken", fields: [{x:6,y:0,shot:false}]},
  {position:{x:1,y:5},direction:true,type:"small",length:1,
    status: "unbroken", fields: [{x:1,y:5,shot:false}]},
  {position:{x:4,y:0},direction:true,type:"small",length:1,
    status: "unbroken", fields: [{x:4,y:0,shot:false}]},
];
const shipsSecond2: Ship[] = [
  {position:{x:7,y:3},direction:true,type:"huge",length:4,
    status: "unbroken", fields: [{x:7,y:3,shot:false}, {x:7,y:4,shot:false}, {x:7,y:5,shot:false}, {x:7,y:6,shot:false}]},
  {position:{x:2,y:1},direction:true,type:"large",length:3,
    status: "unbroken", fields: [{x:2,y:1,shot:false}, {x:2,y:2,shot:false}, {x:2,y:3,shot:false}]},
  {position:{x:5,y:3},direction:true,type:"large",length:3,
    status: "unbroken", fields: [{x:5,y:3,shot:false}, {x:5,y:4,shot:false}, {x:5,y:5,shot:false}]},
  {position:{x:1,y:7},direction:true,type:"medium",length:2,
    status: "shot", fields: [{x:1,y:7,shot:false}, {x:1,y:8,shot:true}]},
  {position:{x:5,y:9},direction:false,type:"medium",length:2,
    status: "unbroken", fields: [{x:5,y:9,shot:false}, {x:6,y:9,shot:false}]},
  {position:{x:8,y:8},direction:false,type:"medium",length:2,
    status: "unbroken", fields: [{x:8,y:8,shot:false}, {x:9,y:8,shot:false}]},
  {position:{x:3,y:8},direction:false,type:"small",length:1,
    status: "unbroken", fields: [{x:3,y:8,shot:false}]},
  {position:{x:6,y:0},direction:true,type:"small",length:1,
    status: "unbroken", fields: [{x:6,y:0,shot:false}]},
  {position:{x:1,y:5},direction:true,type:"small",length:1,
    status: "unbroken", fields: [{x:1,y:5,shot:false}]},
  {position:{x:4,y:0},direction:true,type:"small",length:1,
    status: "unbroken", fields: [{x:4,y:0,shot:false}]},
];
const shipsSecond3: Ship[] = [
  {position:{x:7,y:3},direction:true,type:"huge",length:4,
    status: "unbroken", fields: [{x:7,y:3,shot:false}, {x:7,y:4,shot:false}, {x:7,y:5,shot:false}, {x:7,y:6,shot:false}]},
  {position:{x:2,y:1},direction:true,type:"large",length:3,
    status: "unbroken", fields: [{x:2,y:1,shot:false}, {x:2,y:2,shot:false}, {x:2,y:3,shot:false}]},
  {position:{x:5,y:3},direction:true,type:"large",length:3,
    status: "unbroken", fields: [{x:5,y:3,shot:false}, {x:5,y:4,shot:false}, {x:5,y:5,shot:false}]},
  {position:{x:1,y:7},direction:true,type:"medium",length:2,
    status: "killed", fields: [{x:1,y:7,shot:true}, {x:1,y:8,shot:true}]},
  {position:{x:5,y:9},direction:false,type:"medium",length:2,
    status: "unbroken", fields: [{x:5,y:9,shot:false}, {x:6,y:9,shot:false}]},
  {position:{x:8,y:8},direction:false,type:"medium",length:2,
    status: "unbroken", fields: [{x:8,y:8,shot:false}, {x:9,y:8,shot:false}]},
  {position:{x:3,y:8},direction:false,type:"small",length:1,
    status: "unbroken", fields: [{x:3,y:8,shot:false}]},
  {position:{x:6,y:0},direction:true,type:"small",length:1,
    status: "unbroken", fields: [{x:6,y:0,shot:false}]},
  {position:{x:1,y:5},direction:true,type:"small",length:1,
    status: "unbroken", fields: [{x:1,y:5,shot:false}]},
  {position:{x:4,y:0},direction:true,type:"small",length:1,
    status: "unbroken", fields: [{x:4,y:0,shot:false}]},
];

beforeAll(() => {
  const game = undefined;
});


describe('Test play with 2 users', () => {
  const game = new Game(3, 0,'Test1');
  
  test('Should create game with parameters', () => {
    expect(game.roomId).toBe(3);
    expect(game.roomUsers).toHaveLength(1);
    expect(game.isGame).toBe(false);
  })

  test('add second player', () => {
    game.addPlayer(1, 'Test2');
    expect(game.roomUsers).toHaveLength(2);
    expect(game.isGame).toBe(true);
  })

  test('add ships to first player', () => {
    game.addShips(0, shipsFirst);
    expect(game.roomUsers[0].ships).toHaveLength(10);
    
  })

  test('add ships to second player', () => {
    expect(game.roomUsers[1].ships).toBeUndefined();
    game.addShips(1, shipsSecond);
    expect(game.roomUsers[1].ships).toStrictEqual(shipsSecond1);
  })

  test('Shoot first miss', () => {
    game.atack(0, { x:3, y:5 });
    expect(game.roomUsers[0].shoots).toStrictEqual([{ x:3, y:5}]);
    expect(game.roomUsers[1].shoots).toStrictEqual([]);
  })

  test('Shoot second miss', () => {
    game.atack(1, { x:0, y:0 });
    expect(game.roomUsers[0].shoots).toStrictEqual([{ x:3, y:5}]);
    expect(game.roomUsers[1].shoots).toStrictEqual([{ x:0, y:0}]);
  })

  test('Shoot 2 first miss', () => {
    game.atack(0, { x:4, y:6 });
    expect(game.roomUsers[0].shoots).toStrictEqual([{ x:3, y:5}, { x:4, y:6}]);
  })

  test('Shoot 2 second miss', () => {
    game.atack(1, { x:0, y:1 });
    console.log(game.roomUsers);
    expect(game.roomUsers[1].shoots).toStrictEqual([{ x:0, y:0}, { x:0, y:1}]);
  })

  test('Shoot 3 first shot', () => {
    game.atack(0, { x:1, y:8 });
    expect(game.roomUsers[0].shoots).toStrictEqual([{ x:3, y:5}, { x:4, y:6}, { x:1, y:8}]);
    expect(game.roomUsers[1].ships).toStrictEqual(shipsSecond2);
  })

  test('Shoot 3 second miss', () => {
    game.atack(1, { x:0, y:2 });
    console.log(game.roomUsers);
    expect(game.roomUsers[1].shoots).toStrictEqual([{ x:0, y:0}, { x:0, y:1}, { x:0, y:2}]);
  })

  test('Shoot 4 first miss', () => {
    game.atack(0, { x:1, y:9 });
    expect(game.roomUsers[0].shoots).toStrictEqual([{ x:3, y:5}, { x:4, y:6}, { x:1, y:8}, { x:1, y:9}]);
    expect(game.roomUsers[1].ships).toStrictEqual(shipsSecond2);
  })


  test('Shoot 4 second miss', () => {
    game.atack(1, { x:0, y:3 });
    console.log(game.roomUsers);
    expect(game.roomUsers[1].shoots).toStrictEqual([{ x:0, y:0}, { x:0, y:1}, { x:0, y:2}, { x:0, y:3}]);
  })

  test('Shoot 5 first miss', () => {
    game.atack(0, { x:0, y:8 });
    expect(game.roomUsers[0].shoots).toStrictEqual([{ x:3, y:5}, { x:4, y:6}, { x:1, y:8}, { x:1, y:9}, { x:0, y:8}]);
    expect(game.roomUsers[1].ships).toStrictEqual(shipsSecond2);
  })

  test('Shoot 5 second miss', () => {
    game.atack(1, { x:0, y:4 });
    console.log(game.roomUsers);
    expect(game.roomUsers[1].shoots).toStrictEqual([{ x:0, y:0}, { x:0, y:1}, { x:0, y:2}, { x:0, y:3}, { x:0, y:4}]);
  })

  test('Shoot 6 first kill', () => {
    game.atack(0, { x:1, y:7 });
    expect(game.roomUsers[0].shoots).toStrictEqual([{ x:3, y:5}, { x:4, y:6}, { x:1, y:8}, { x:1, y:9}, { x:0, y:8}, { x:1, y:7},
      { x: 0, y: 6 },
      { x: 0, y: 7 },
      { x: 0, y: 8 },
      { x: 0, y: 9 },
      { x: 1, y: 6 },
      { x: 1, y: 7 },
      { x: 1, y: 8 },
      { x: 1, y: 9 },
      { x: 2, y: 6 },
      { x: 2, y: 7 },
      { x: 2, y: 8 },
      { x: 2, y: 9 }]);
    expect(game.roomUsers[1].ships).toStrictEqual(shipsSecond3);
  })

  test('Shoot 6 second miss', () => {
    game.atack(1, { x:0, y:5 });
    console.log(game.roomUsers);
    expect(game.roomUsers[1].shoots).toStrictEqual([{ x:0, y:0}, { x:0, y:1}, { x:0, y:2}, { x:0, y:3}, { x:0, y:4}, { x:0, y:5}]);
  })


})