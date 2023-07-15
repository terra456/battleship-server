import { Coordinates, ShipOnClient } from 'ws_server/types';
import { getShipCells, addShipsData, randomShip, isShootInArray } from '../game_functions';
import { Ship } from 'ws_server/Game';

  const testCases: Array<{ship: ShipOnClient, expected: Coordinates[]}> = [
  { ship: { position: { x: 7, y: 3 }, direction: true, type: "huge", length: 4 },
    expected: [
      { "x": 6, "y": 2 },
      { "x": 6, "y": 3 },
      { "x": 6, "y": 4 },
      { "x": 6, "y": 5 },
      { "x": 6, "y": 6 },
      { "x": 6, "y": 7 },
      { "x": 7, "y": 2 },
      { "x": 7, "y": 3 },
      { "x": 7, "y": 4 },
      { "x": 7, "y": 5 },
      { "x": 7, "y": 6 },
      { "x": 7, "y": 7 },
      { "x": 8, "y": 2 },
      { "x": 8, "y": 3 },
      { "x": 8, "y": 4 },
      { "x": 8, "y": 5 },
      { "x": 8, "y": 6 },
      { "x": 8, "y": 7 },
    ]},
  { ship: { position: {x:5, y:9}, direction:false, type: "medium", length:2 },
    expected: [
      { "x": 4, "y": 8 },
      { "x": 4, "y": 9 },
      { "x": 5, "y": 8 },
      { "x": 5, "y": 9 },
      { "x": 6, "y": 8 },
      { "x": 6, "y": 9 },
      { "x": 7, "y": 8 },
      { "x": 7, "y": 9 },
    ]},
  { ship: {position: {x:8, y:8}, direction: false, type: "medium", length: 2 },
    expected: [
      { "x": 7, "y": 7 },
      { "x": 7, "y": 8 },
      { "x": 7, "y": 9 },
      { "x": 8, "y": 7 },
      { "x": 8, "y": 8 },
      { "x": 8, "y": 9 },
      { "x": 9, "y": 7 },
      { "x": 9, "y": 8 },
      { "x": 9, "y": 9 },
    ]},
  { ship: { position: { x: 6, y: 0}, direction: true, type: "small", length: 1},
    expected: [
      { "x": 5, "y": 0 },
      { "x": 5, "y": 1 },
      { "x": 6, "y": 0 },
      { "x": 6, "y": 1 },
      { "x": 7, "y": 0 },
      { "x": 7, "y": 1 },
    ]},
  ];
  
  const shipsToAdd: Array<{ship: ShipOnClient, expected: Ship[]}> = [
  { ship: { position: { x: 7, y: 3 }, direction: true, type: "huge", length: 4 },
    expected: [{
      position: { x: 7, y: 3 },
      direction: true, type: "huge",
      length: 4,
      status: "unbroken",
      fields: [{ x: 7, y: 3, shot: false },
        { x: 7, y: 4, shot: false },
        { x: 7, y: 5, shot: false },
        { x: 7, y: 6, shot: false }]
      }]
  },
  { ship: { position: {x:5, y:9}, direction:false, type: "medium", length:2 },
    expected: [{
      position: {x:5, y:9},
      direction:false,
      type: "medium",
      length:2,
      status: "unbroken",
      fields: [{ x: 5, y: 9, shot: false },
        { x: 6, y: 9, shot: false }]
    }]
  },
  { ship: { position: { x: 6, y: 0}, direction: true, type: "small", length: 1},
    expected: [{
      position: { x: 6, y: 0},
      direction: true,
      type: "small",
      length: 1,
      status: "unbroken",
      fields: [{ x: 6, y: 0, shot: false }]
    }]
  },
  ];

  const coordArray = [
    { x: 6, y: 2 },
    { x: 6, y: 3 },
    { x: 6, y: 4 },
    { x: 6, y: 5 },
    { x: 6, y: 6 },
    { x: 6, y: 7 },
    { x: 7, y: 2 },
    { x: 7, y: 3 },
    { x: 7, y: 4 },
    { x: 7, y: 5 },
    { x: 7, y: 6 },
    { x: 7, y: 7 },
    { x: 8, y: 2 },
    { x: 8, y: 3 },
    { x: 8, y: 4 },
    { x: 8, y: 5 },
    { x: 8, y: 6 },
    { x: 8, y: 7 },
  ]

describe.each(shipsToAdd)('add new ship on field', ({ ship, expected }) => {
  test(`get length ${ship.length}`, () => {
    expect(addShipsData([ship])).toStrictEqual(expected);
  });
});

describe.each(testCases)('get ship on field', ({ ship, expected }) => {
  test(`get direction ${ship.direction}`, () => {
    expect(getShipCells(ship)).toStrictEqual(expected);
  });
});

describe('Check shoots in array', () => {
  test('no shoot in array', () => {
    expect(isShootInArray({x: 1, y: 1}, coordArray)).toBe(false);
  });
  test('no shoot in array, same x', () => {
    expect(isShootInArray({x: 1, y: 1}, coordArray)).toBe(false);
  });
  test('no shoot in array, same y', () => {
    expect(isShootInArray({x: 1, y: 1}, coordArray)).toBe(false);
  });
  test('shoot is in in array', () => {
    expect(isShootInArray({x: 7, y: 6}, coordArray)).toBe(true);
  });
  test('shoot is in in array several times', () => {
    expect(isShootInArray({x: 7, y: 6}, [...coordArray, {x: 7, y: 6}])).toBe(true);
  });
  test('clear array', () => {
    expect(isShootInArray({x: 7, y: 6}, [])).toBe(false);
  });
  test('no array', () => {
    expect(isShootInArray({x: 7, y: 6}, undefined)).toBe(false);
  });
});

