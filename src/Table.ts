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
  constructor(private x: number = 6, private y: number = 6) {
    this.table = new Array(y).fill('').map(() => new Array(x).fill(''));
    console.table(this.table);
    console.log(`\n==> Created a new table surface of dimensions ${x} units x ${y} units!`);
  }
  private clearTable() {
    this.table = new Array(this.y).fill('').map(() => new Array(this.x).fill(''));
  }
  public getDimensions() {
    return { x: this.x, y: this.y };
  }
  public getTable() {
    return this.table;
  }
  public setRobot(x: number, y: number, direction: Directions) {
    this.clearTable();
    const mapXToTableIndex = y === 0 ? this.y - 1 : this.y - y - 1;
    const mapYToTableIndex = x;
    this.table[mapXToTableIndex][mapYToTableIndex] = TableDirection[direction];
    console.table(this.table);
  }
}

export default Table;
