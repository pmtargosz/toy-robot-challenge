import { Directions, ValidDirections } from './Engine';

export interface RobotInterface {
  getPosition(): RobotPosition | undefined;
  setPosition(x: number, y: number, direction: Directions): void;
  isOnTable(): boolean;
  move(tableX: number, tableY: number): void;
  changeDirection(cmd: string): void;
}

interface RobotPosition {
  x: number;
  y: number;
  direction: Directions;
}

class Robot implements RobotInterface {
  private position?: RobotPosition;
  private isRobotOnTable: boolean;
  constructor() {
    this.isRobotOnTable = false;
  }
  public getPosition() {
    return this.position;
  }
  public setPosition(x: number, y: number, direction: Directions) {
    this.position = {
      x,
      y,
      direction,
    };
    console.log(
      `\n${
        this.isRobotOnTable
          ? '==> You changed robot position on the table!'
          : '==> Robot is on the table!'
      }\n`
    );
    this.isRobotOnTable = true;
  }
  public isOnTable() {
    return this.isRobotOnTable;
  }
  public move(tableX: number, tableY: number) {
    switch (this.position?.direction) {
      case ValidDirections.north:
        if (this.position.y + 1 > tableX - 1)
          return console.log("\n==> !!! ROBOT CAN'T MOVED. END OF TABLE !!!\n");
        this.position.y += 1;
        break;
      case ValidDirections.south:
        if (this.position.y - 1 < 0)
          return console.log("\n==> !!! ROBOT CAN'T MOVED. END OF TABLE !!!\n");
        this.position.y -= 1;
        break;
      case ValidDirections.east:
        if (this.position.x + 1 > tableY - 1)
          return console.log("\n==> !!! ROBOT CAN'T MOVED. END OF TABLE !!!\n");
        this.position.x += 1;
        break;
      case ValidDirections.west:
        if (this.position.x - 1 < 0)
          return console.log("\n==> !!! ROBOT CAN'T MOVED. END OF TABLE !!!\n");
        this.position.x -= 1;
        break;
    }
    console.log('\n==> Robot moved!\n');
  }
  private calculateDegree(rotateBy: number, currentDegree: number) {
    if (rotateBy < 0 && currentDegree === 0) {
      return rotateBy + 360;
    } else if (rotateBy > 0 && currentDegree === 270) {
      return (rotateBy + currentDegree) % 360;
    } else {
      return rotateBy + currentDegree;
    }
  }
  public changeDirection(cmd: string) {
    if (cmd === '' || this.position === undefined) return;

    const cmdDegree = {
      left: -90,
      right: 90,
    };

    const degreeDirection = {
      [ValidDirections.north]: 0,
      [ValidDirections.east]: 90,
      [ValidDirections.south]: 180,
      [ValidDirections.west]: 270,
    };

    const rotateBy = cmdDegree[cmd as keyof typeof cmdDegree];
    const currentDegree = degreeDirection[this.position.direction as keyof typeof degreeDirection];
    const newDegree = this.calculateDegree(rotateBy, currentDegree);

    const newDirection = Object.keys(degreeDirection).find(
      (key) => degreeDirection[key as keyof typeof degreeDirection] === newDegree
    );

    if (newDirection) {
      this.position.direction = newDirection as Directions;
      console.log('\n==> Robot changed direction!\n');
    }
  }
}

export default Robot;
