import { Directions } from '../Engine';
import Robot from '../Robot';

describe('Robot', () => {
  it('create instance.', () => {
    const robot = new Robot();
    expect(robot instanceof Robot).toBe(true);
  });

  it('position is undefined.', () => {
    const robot = new Robot();
    expect(robot['position']).toBe(undefined);
  });

  it('is not on the table.', () => {
    const robot = new Robot();
    expect(robot['isRobotOnTable']).toBe(false);
  });

  it('get position is undefined.', () => {
    const robot = new Robot();
    expect(robot.getPosition()).toBe(undefined);
  });

  it('set position on the table.', () => {
    const robot = new Robot();
    robot.setPosition(0, 0, 'north' as Directions);
    expect(robot.getPosition()).toStrictEqual({ x: 0, y: 0, direction: 'north' });
  });

  it('is on the table.', () => {
    const robot = new Robot();
    robot.setPosition(0, 0, 'north' as Directions);
    expect(robot.isOnTable()).toBe(true);
  });

  describe('Robot move', () => {
    const robot = new Robot();

    beforeAll(() => {
      robot.setPosition(0, 0, 'north' as Directions);
    });

    afterEach(() => robot.setPosition(0, 0, 'north' as Directions));

    it('up.', () => {
      robot.move(5, 5);
      expect(robot.getPosition()).toStrictEqual({ x: 0, y: 1, direction: 'north' });
    });

    it('up end of the table.', () => {
      robot.setPosition(0, 4, 'north' as Directions);
      robot.move(5, 5);
      expect(robot.getPosition()).toStrictEqual({ x: 0, y: 4, direction: 'north' });
    });

    it('right.', () => {
      robot.setPosition(0, 0, 'east' as Directions);
      robot.move(5, 5);
      expect(robot.getPosition()).toStrictEqual({ x: 1, y: 0, direction: 'east' });
    });

    it('right end of the table.', () => {
      robot.setPosition(4, 0, 'east' as Directions);
      robot.move(5, 5);
      expect(robot.getPosition()).toStrictEqual({ x: 4, y: 0, direction: 'east' });
    });

    it('down.', () => {
      robot.setPosition(1, 1, 'south' as Directions);
      robot.move(5, 5);
      expect(robot.getPosition()).toStrictEqual({ x: 1, y: 0, direction: 'south' });
    });

    it('down end of the table.', () => {
      robot.setPosition(0, 0, 'south' as Directions);
      robot.move(5, 5);
      expect(robot.getPosition()).toStrictEqual({ x: 0, y: 0, direction: 'south' });
    });

    it('left.', () => {
      robot.setPosition(3, 0, 'west' as Directions);
      robot.move(5, 5);
      expect(robot.getPosition()).toStrictEqual({ x: 2, y: 0, direction: 'west' });
    });

    it('left end of the table.', () => {
      robot.setPosition(0, 0, 'west' as Directions);
      robot.move(5, 5);
      expect(robot.getPosition()).toStrictEqual({ x: 0, y: 0, direction: 'west' });
    });
  });

  describe('Robot change direction', () => {
    const robot = new Robot();

    beforeAll(() => {
      robot.setPosition(0, 0, 'north' as Directions);
    });

    afterEach(() => robot.setPosition(0, 0, 'north' as Directions));

    it('calculate degree 90 from 0 degree.', () => {
      const degree = robot['calculateDegree'](90, 0);
      expect(degree).toBe(90);
    });

    it('calculate degree 90 from 90 degree.', () => {
      const degree = robot['calculateDegree'](90, 90);
      expect(degree).toBe(180);
    });

    it('calculate degree 90 from 180 degree.', () => {
      const degree = robot['calculateDegree'](90, 180);
      expect(degree).toBe(270);
    });

    it('calculate degree 90 from 270 degree.', () => {
      const degree = robot['calculateDegree'](90, 270);
      expect(degree).toBe(0);
    });

    it('calculate degree -90 from 0 degree.', () => {
      const degree = robot['calculateDegree'](-90, 0);
      expect(degree).toBe(270);
    });

    it('calculate degree -90 from 270 degree.', () => {
      const degree = robot['calculateDegree'](-90, 270);
      expect(degree).toBe(180);
    });

    it('calculate degree -90 from 180 degree.', () => {
      const degree = robot['calculateDegree'](-90, 180);
      expect(degree).toBe(90);
    });

    it('calculate degree -90 from 90 degree.', () => {
      const degree = robot['calculateDegree'](-90, 90);
      expect(degree).toBe(0);
    });

    it('if no command.', () => {
      robot.changeDirection('');
      expect(robot.getPosition().direction).toBe('north');
    });

    it('left from north', () => {
      robot.changeDirection('left');
      expect(robot.getPosition().direction).toBe('west');
    });

    it('right from north', () => {
      robot.changeDirection('right');
      expect(robot.getPosition().direction).toBe('east');
    });

    it('left from east', () => {
      robot.setPosition(0, 0, 'east' as Directions);
      robot.changeDirection('left');
      expect(robot.getPosition().direction).toBe('north');
    });

    it('right from east', () => {
      robot.setPosition(0, 0, 'east' as Directions);
      robot.changeDirection('right');
      expect(robot.getPosition().direction).toBe('south');
    });

    it('left from south', () => {
      robot.setPosition(0, 0, 'south' as Directions);
      robot.changeDirection('left');
      expect(robot.getPosition().direction).toBe('east');
    });

    it('right from south', () => {
      robot.setPosition(0, 0, 'south' as Directions);
      robot.changeDirection('right');
      expect(robot.getPosition().direction).toBe('west');
    });

    it('left from west', () => {
      robot.setPosition(0, 0, 'west' as Directions);
      robot.changeDirection('left');
      expect(robot.getPosition().direction).toBe('south');
    });

    it('right from west', () => {
      robot.setPosition(0, 0, 'west' as Directions);
      robot.changeDirection('right');
      expect(robot.getPosition().direction).toBe('north');
    });
  });
});
