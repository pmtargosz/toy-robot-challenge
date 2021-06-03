import Cli from '../Cli';
import Engine, { Directions } from '../Engine';
import Robot from '../Robot';
import Table from '../table';

describe('Engine', () => {
  it('create instance.', () => {
    const engine = new Engine(new Table(), new Robot(), new Cli());
    expect(engine instanceof Engine).toBe(true);
  });

  describe('validate commands', () => {
    const engine = new Engine(new Table(), new Robot(), new Cli());

    it('empty string.', () => {
      const result = engine['validateCommand']('');
      expect(result).toBe(false);
    });

    it('invalid command.', () => {
      const result = engine['validateCommand']('invalid command');
      expect(result).toBe(false);
    });

    it('valid command - Q.', () => {
      const result = engine['validateCommand']('q');
      expect(result).toBe(true);
    });

    it('valid command - PLACE.', () => {
      const result = engine['validateCommand']('place');
      expect(result).toBe(true);
    });

    it('valid command - MOVE.', () => {
      const result = engine['validateCommand']('move');
      expect(result).toBe(true);
    });

    it('valid command - LEFT.', () => {
      const result = engine['validateCommand']('LEFT');
      expect(result).toBe(true);
    });

    it('valid command - RIGHT.', () => {
      const result = engine['validateCommand']('RIGHT');
      expect(result).toBe(true);
    });

    it('valid command - REPORT.', () => {
      const result = engine['validateCommand']('REPORT');
      expect(result).toBe(true);
    });
  });

  describe('actions', () => {
    const table = new Table();
    const robot = new Robot();
    const cmd = new Cli();
    const engine = new Engine(table, robot, cmd);

    it('quit.', () => {
      const setProperty = (object, property, value) => {
        const originalProperty = Object.getOwnPropertyDescriptor(object, property);
        Object.defineProperty(object, property, { value });
        return originalProperty;
      };
      const mockExit = jest.fn();
      setProperty(process, 'exit', mockExit);
      engine['quitAction']();
      expect(mockExit).toHaveBeenCalledWith(0);
    });

    it('invalid place command.', () => {
      engine['placeAction']('place');
      expect(robot.isOnTable()).toBe(false);
    });

    it('invalid place command, position is off the table.', () => {
      engine['placeAction']('place 10, 10, north');
      expect(robot.isOnTable()).toBe(false);
    });

    it('valid place command.', () => {
      engine['placeAction']('place 0, 0, north');
      expect(robot.isOnTable()).toBe(true);
    });
  });
});
