import { CLIInterface } from './Cli';
import { RobotInterface } from './Robot';
import { TableInterface } from './table';
import { firstStringWord, transformString } from './utils';

interface EngineInterface {
  runTimeProcess(): void;
}

enum ValidCommands {
  q = 'q',
  place = 'place',
  move = 'move',
  left = 'left',
  right = 'right',
  report = 'report',
}

export enum ValidDirections {
  north = 'north',
  east = 'east',
  west = 'west',
  south = 'south',
}

export type Directions =
  | ValidDirections.north
  | ValidDirections.south
  | ValidDirections.east
  | ValidDirections.west;

class Engine implements EngineInterface {
  private table: TableInterface;
  private robot: RobotInterface;
  private cmd: CLIInterface;
  constructor(table: TableInterface, robot: RobotInterface, cmd: CLIInterface) {
    this.table = table;
    this.robot = robot;
    this.cmd = cmd;
    console.log('\n==> Application is ready and Robot is waiting for your commands!');
    console.log(`
You can type (command are not case sensitive):
  - quit: q
  - put the robot on the table in position X,Y and facing NORTH, SOUTH, EAST or WEST [PLACE {X}{Y},{FACING}] e.g: PLACE 0,0,NORTH
  - move the robot on the table [MOVE] e.g: MOVE
  - rotate the robot 90 degrees in the specified direction without changing the position of the robot [LEFT/RIGHT] e.g: RIGHT
  - display robot report [REPORT] e.g: REPORT
    `);
  }
  private validateCommand(userInput: string): boolean {
    // If input empty return invalid.
    if (userInput === '') return false;
    // Take first word of command.
    const userInputFirstWord = firstStringWord(userInput);
    // Check if command is valid.
    return ValidCommands[userInputFirstWord as keyof typeof ValidCommands] ? true : false;
  }
  private quitAction() {
    console.log(
      '\nI hope yoy enjoyed The Toy Robot Challenge!\nHave a great day and see you soon!\nBye!!!\n'
    );
    return process.exit(0);
  }
  private placeAction(userCommand: string) {
    // Regex checking valid PLACE command.
    const placeRegEx = new RegExp(
      `(\\d{1,})\\s*,\\s*(\\d{1,})\\s*,\\s*(${ValidDirections.north}|${ValidDirections.south}|${ValidDirections.east}|${ValidDirections.west})`,
      'gi'
    );

    const match = userCommand.match(placeRegEx);

    // IF not match display error.
    if (!match) {
      return console.log(
        "\n==> !!!! SORRY BUT ROBOT DOESN'T UNDERSTAND THIS COMMAND - INVALID PLACE COMMAND !!!!\n"
      );
    }

    // Take positions and direction from command.
    const [_, posX, posY, direction] = placeRegEx.exec(userCommand) as RegExpExecArray;

    // Get table dimensions.
    const { x, y } = this.table.getDimensions();

    // Check if positions from command are on table.
    if (Number(posX) > x - 1 || Number(posY) > y - 1) {
      return console.log(
        `\n==> !!!! SORRY BUT POSITION IS OFF THE TABLE. YOU DON\'T WANT TO DESTROYED ROBOT. PLEASE PUT ROBOT ON THE TABLE (table dimensions ${x} units x ${y} units) - INVALID PLACE COMMAND !!!!\n`
      );
    }

    // Set robot on the table or change robot position and direction on the table.
    return this.robot.setPosition(Number(posX), Number(posY), direction as Directions);
  }
  private moveAction() {
    const { x, y } = this.table.getDimensions();
    return this.robot.move(x, y);
  }
  private rotateAction(command: string) {
    return this.robot.changeDirection(command);
  }
  private reportAction() {
    const robotPosition = this.robot.getPosition();

    if (robotPosition) {
      console.log(
        `Output: ${robotPosition.x},${
          robotPosition.y
        },${robotPosition.direction.toLocaleUpperCase()}`
      );

      this.table.setRobot(robotPosition.x, robotPosition.y, robotPosition.direction);
    }
  }
  private commandInterpreter(userInput: string) {
    const userCommand = transformString(userInput);
    // Quit App.
    if (userCommand.includes(ValidCommands.q)) {
      return this.quitAction();
    }
    // Place robot on the table.
    if (userCommand.includes(ValidCommands.place)) {
      return this.placeAction(userCommand);
    }
    // Move robot.
    if (userCommand.includes(ValidCommands.move)) {
      return this.robot.isOnTable()
        ? this.moveAction()
        : console.log(
            `\n==> !!!! SORRY BUT YOU CANNOT MOVE ROBOT. YOU HAVE TO FIRST PUT ROBOT ON THE TABLE. PLEASE PUT ROBOT ON THE TABLE - INVALID MOVE COMMAND !!!!\n`
          );
    }
    // Rotate robot.
    if (userCommand.includes(ValidCommands.left) || userCommand.includes(ValidCommands.right)) {
      return this.robot.isOnTable()
        ? this.rotateAction(userCommand)
        : console.log(
            `\n==> !!!! SORRY BUT YOU CANNOT CHANGE ROBOT\'S DIRECTION. YOU HAVE TO FIRST PUT ROBOT ON THE TABLE. PLEASE PUT ROBOT ON THE TABLE - INVALID ${userCommand.toLocaleUpperCase()} ROTATION COMMAND !!!!\n`
          );
    }
    // Report robot.
    if (userCommand.includes(ValidCommands.report)) {
      return this.robot.isOnTable()
        ? this.reportAction()
        : console.log(
            `\n==> !!!! SORRY BUT YOU CANNOT GENERATE REPORT. YOU HAVE TO FIRST PUT ROBOT ON THE TABLE. PLEASE PUT ROBOT ON THE TABLE - INVALID REPORT COMMAND !!!!\n`
          );
    }
  }
  private async run() {
    const { userInput } = await this.cmd.ask();

    const isCommandValid = this.validateCommand(userInput);

    isCommandValid
      ? this.commandInterpreter(userInput)
      : console.log(
          "\n==> !!!! SORRY BUT ROBOT DOESN'T UNDERSTAND THIS COMMAND - INVALID COMMAND !!!!\n"
        );

    this.run();
  }
  public async runTimeProcess() {
    this.run();
  }
}

export default Engine;
