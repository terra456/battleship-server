import { checkShipOnField } from "../game_functions";
import { Coordinates, ShipOnClient } from "ws_server/types";

const fieldCells = [
  {x: 0, y: 0}, {x: 0, y: 1}, {x: 0, y: 2}, {x: 0, y: 3}, {x: 0, y: 4}, {x: 0, y: 5}, {x: 0, y: 6}, {x: 0, y: 7}, {x: 0, y: 8}, {x: 0, y: 9},
  {x: 1, y: 0}, {x: 1, y: 1}, {x: 1, y: 2}, {x: 1, y: 3}, {x: 1, y: 4}, {x: 1, y: 5}, {x: 1, y: 6}, {x: 1, y: 7}, {x: 1, y: 8}, {x: 1, y: 9},
  {x: 2, y: 0}, {x: 2, y: 1}, {x: 2, y: 2}, {x: 2, y: 3}, {x: 2, y: 4}, {x: 2, y: 5}, {x: 2, y: 6}, {x: 2, y: 7}, {x: 2, y: 8}, {x: 2, y: 9},
  {x: 3, y: 0}, {x: 3, y: 1}, {x: 3, y: 2}, {x: 3, y: 3}, {x: 3, y: 4}, {x: 3, y: 5}, {x: 3, y: 6}, {x: 3, y: 7}, {x: 3, y: 8}, {x: 3, y: 9},
  {x: 4, y: 0}, {x: 4, y: 1}, {x: 4, y: 2}, {x: 4, y: 3}, {x: 4, y: 4}, {x: 4, y: 5}, {x: 4, y: 6}, {x: 4, y: 7}, {x: 4, y: 8}, {x: 4, y: 9},
  {x: 5, y: 0}, {x: 5, y: 1}, {x: 5, y: 2}, {x: 5, y: 3}, {x: 5, y: 4}, {x: 5, y: 5}, {x: 5, y: 6}, {x: 5, y: 7}, {x: 5, y: 8}, {x: 5, y: 9},
  {x: 6, y: 0}, {x: 6, y: 1}, {x: 6, y: 2}, {x: 6, y: 3}, {x: 6, y: 4}, {x: 6, y: 5}, {x: 6, y: 6}, {x: 6, y: 7}, {x: 6, y: 8}, {x: 6, y: 9},
  {x: 7, y: 0}, {x: 7, y: 1}, {x: 7, y: 2}, {x: 7, y: 3}, {x: 7, y: 4}, {x: 7, y: 5}, {x: 7, y: 6}, {x: 7, y: 7}, {x: 7, y: 8}, {x: 7, y: 9},
  {x: 8, y: 0}, {x: 8, y: 1}, {x: 8, y: 2}, {x: 8, y: 3}, {x: 8, y: 4}, {x: 8, y: 5}, {x: 8, y: 6}, {x: 8, y: 7}, {x: 8, y: 8}, {x: 8, y: 9},
  {x: 9, y: 0}, {x: 9, y: 1}, {x: 9, y: 2}, {x: 9, y: 3}, {x: 9, y: 4}, {x: 9, y: 5}, {x: 9, y: 6}, {x: 9, y: 7}, {x: 9, y: 8}, {x: 9, y: 9},
]
const fieldCellsFalse: Array<Coordinates | false> = [
  {x: 0, y: 0}, {x: 0, y: 1}, {x: 0, y: 2}, {x: 0, y: 3}, {x: 0, y: 4}, {x: 0, y: 5}, {x: 0, y: 6}, {x: 0, y: 7}, {x: 0, y: 8}, {x: 0, y: 9},
  {x: 1, y: 0}, {x: 1, y: 1}, {x: 1, y: 2}, {x: 1, y: 3}, {x: 1, y: 4}, {x: 1, y: 5}, {x: 1, y: 6}, {x: 1, y: 7}, {x: 1, y: 8}, {x: 1, y: 9},
  {x: 2, y: 0}, {x: 2, y: 1}, {x: 2, y: 2}, {x: 2, y: 3}, {x: 2, y: 4}, {x: 2, y: 5}, {x: 2, y: 6}, {x: 2, y: 7}, {x: 2, y: 8}, {x: 2, y: 9},
  {x: 3, y: 0}, {x: 3, y: 1}, {x: 3, y: 2}, {x: 3, y: 3}, {x: 3, y: 4}, {x: 3, y: 5}, {x: 3, y: 6}, {x: 3, y: 7}, {x: 3, y: 8}, {x: 3, y: 9},
  {x: 4, y: 0}, {x: 4, y: 1}, {x: 4, y: 2}, {x: 4, y: 3}, {x: 4, y: 4}, {x: 4, y: 5}, {x: 4, y: 6}, {x: 4, y: 7}, {x: 4, y: 8}, {x: 4, y: 9},
  false, false, false, false, false, false, false, false, false, false,
  false, false, false, false, false, false, false, false, false, false,
  false, false, false, false, false, false, false, false, false, false,
  false, false, false, false, false, false, false, false, false, false,
  false, false, false, false, false, false, false, false, false, false,
]

// {position:{x:7,y:3},direction:true,type:"huge",length:4},
//   {position:{x:2,y:1},direction:true,type:"large",length:3},
//   {position:{x:5,y:3},direction:true,type:"large",length:3},
//   {position:{x:1,y:7},direction:true,type:"medium",length:2},
//   {position:{x:5,y:9},direction:false,type:"medium",length:2},
//   {position:{x:8,y:8},direction:false,type:"medium",length:2},
//   {position:{x:3,y:8},direction:false,type:"small",length:1},
//   {position:{x:6,y:0},direction:true,type:"small",length:1},
//   {position:{x:1,y:5},direction:true,type:"small",length:1},
//   {position:{x:4,y:0},direction:true,type:"small",length:1},

const ships: Array<{ship: ShipOnClient, expected: Boolean}> = [
  { ship: {position:{x:7,y:3},direction:true,type:"huge",length:4},
    expected: false
  },
  { ship: {position:{x:2,y:1},direction:true,type:"large",length:3},
    expected: true
  },
  { ship: {position:{x:5,y:3},direction:true,type:"large",length:3},
    expected: false
  },
  { ship: {position:{x:1,y:7},direction:true,type:"medium",length:2},
    expected: true
  },
  { ship: {position:{x:5,y:9},direction:false,type:"medium",length:2},
    expected: false
  },
  { ship: {position:{x:8,y:8},direction:false,type:"medium",length:2},
    expected: false
  },
  { ship: {position:{x:3,y:8},direction:false,type:"small",length:1},
    expected: true
  },
  { ship: {position:{x:6,y:0},direction:true,type:"small",length:1},
    expected: false
  },
  { ship: {position:{x:1,y:5},direction:true,type:"small",length:1},
    expected: true
  },
  { ship: {position:{x:4,y:0},direction:true,type:"small",length:1},
    expected: false
  },
]

// describe('Random ship', () => {
//   test('new ship 4, true', () => {
//     expect(checkShipOnField(ships[0], fieldCellsFalse)).toBe(false);
//   })
// })

describe.each(ships)('add new ship on field', ({ ship, expected }) => {
  test(`get ${ship.position.x}`, () => {
    expect(checkShipOnField(ship, fieldCellsFalse)).toBe(expected);
  });

  test(`get no false ${ship.position.x}`, () => {
    expect(checkShipOnField(ship, fieldCells)).toBe(true);
  });
});
