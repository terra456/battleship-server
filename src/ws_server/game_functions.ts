import { Ship } from "./Game";
import { Coordinates, ShipOnClient } from "./types";

export const randomInteger = (min: number, max: number) => {
  // случайное число от min до (max+1)
  let rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
}

export const getShipCells = (ship: ShipOnClient, shipFields: Coordinates[] | undefined = undefined): Array<Coordinates> => {
  const { direction, position, length } = ship;
  const shipCells: Array<Coordinates> = [];
  for (let i = position.x - 1; i <= position.x + (!direction ? length : 1); i++) {
    if (i >= 0 && i < 10) {
      for (let j = position.y - 1; j <= position.y + (direction ? length : 1); j++) {
        if (j >= 0 && j < 10) {
          if (shipFields !== undefined && shipFields.findIndex(({x, y}) => x === i && y === j) < 0) {
            shipCells.push({x: i, y: j});
          } else if (shipFields === undefined) {
            shipCells.push({x: i, y: j});
          }
        }
      }
    }
  }
  return shipCells;
}

export const randomShip = (size: number): ShipOnClient => {
  const direction = !randomInteger(0, 2);
  const type = size === 1 ? "small" 
        : size === 2 ? "medium"
        : size === 3 ? "large" : "huge";
  return {
    position: {
      x: randomInteger(0, 9 - (!direction ? size : 0)),
      y: randomInteger(0, 9 - (direction ? size : 0)),
    },
    direction,
    type,
    length: size
  }
}

export const checkShipOnField = (ship: ShipOnClient, cells: Array<Coordinates | false>): Boolean => {
  const shipCells: Array<Coordinates> = getShipCells(ship);
  return shipCells.every(({x, y}) => cells.findIndex((el) => el && el.x === x && el.y === y) >= 0);
}

export const newShip = (size: number, cells: Array<Coordinates | false>): ShipOnClient => {
  const ship = randomShip(size);
  if (checkShipOnField(ship, cells)) {
    return ship;
  } else {
    return newShip(size, cells);
  }
}

export const placeShipsOnField = (): ShipOnClient[] => {
  const fieldCells: Array<Coordinates | false> = [];
  const ships: Array<ShipOnClient> = [];

  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      fieldCells.push({x: i, y: j});
    }
  }

  for (let i = 4; i > 0; i--) {
    for (let j = 1; j <= 5 - i; j++) {
      let ship: ShipOnClient;
      if (i > 1) {
        ship = newShip(i, fieldCells);
      } else {
        const clearCells = fieldCells.slice().filter((el) => el !== false);
        const shipCoordinates = clearCells[randomInteger(0, clearCells.length - 1)] as Coordinates;
        ship = {
          position: shipCoordinates,
          direction: true,
          type: "small",
          length: 1
        }
      }
      const shipCells = getShipCells(ship);
      console.log(shipCells);
      shipCells.forEach(({x, y}) => {
        fieldCells.splice(x * 10 + y, 1, false);
      });
      console.log(fieldCells);
      ships.push(ship);
    }
  }
  return ships;
}

export const shoot = ({x, y}: Coordinates, ships: Ship[]) => {
  let result: string = "miss";
  ships.map((ship) => {
    if (ship.status !== "killed") {
      ship.fields?.map((field) => {
        if (!field.shot && field.x === x && field.y === y) {
          ship.status = "shot";
          field.shot = true;
          result = "shot";
        }
        return field;
      });
      if (ship.fields?.every((el) => el.shot)) {
        ship.status = "killed";
        result = "killed";
        const cells = getShipCells(ship);
      }
    }
    return ship;
  });
  return {
    ships,
    result
  }
}

export const isShootInArray = ({ x, y }: Coordinates, shootsArray: Coordinates[] | [] | undefined) => {
  if (shootsArray === undefined || shootsArray.length === 0) {
    return false;
  } else {
    return shootsArray.findIndex((el) => el.x === x && el.y ===y) >= 0;
  }
}

export const addShipsData = (ships: ShipOnClient[]): Ship[] => {
  return ships.map<Ship>((ship): Ship => {
    const fields: { x: number; y: number; shot: boolean; }[] | undefined = [];

    for (let i = 0; i < ship.length; i++) {
      const field = {
        x: ship.position.x + (!ship.direction ? i : 0),
        y: ship.position.y + (ship.direction ? i : 0),
        shot: false,
      }
      fields.push(field);
    }
    return {
      ...ship,
      status: "unbroken",
      fields
    };
  });
}
