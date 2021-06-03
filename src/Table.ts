import { Directions } from './Engine';

export interface TableInterface {
  getDimensions(): { x: number; y: number };
  getTable(): string[][];
  setRobot(x: number, y: number, direction: Directions): void;
}

export enum TableDirection {
  north = '↑',
  south = '↓',
  east = '→',
  west = '←',
}

class Table implements TableInterface {
  private table: string[][];
  constructor(private x: number = 5, private y: number = 5) {
    this.table = new Array(x).fill('').map(() => new Array(y).fill(''));
    console.log(`\n==> Created a new table surface of dimensions ${x} units x ${y} units!`);
  }
  private clearTable() {
    this.table = new Array(this.x).fill('').map(() => new Array(this.y).fill(''));
  }
  public getDimensions() {
    return { x: this.x, y: this.y };
  }
  public getTable() {
    return this.table;
  }
  public setRobot(x: number, y: number, direction: Directions) {
    this.clearTable();
    //[y][x]
    this.table[this.x - 1 - y][x] = TableDirection[direction];
    console.table(this.table);
  }
}

export default Table;
