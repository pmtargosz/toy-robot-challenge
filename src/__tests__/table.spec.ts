import { Directions } from '../Engine';
import Table from '../Table';

describe('Table', () => {
  it('create instance.', () => {
    const table = new Table();
    expect(table instanceof Table).toBe(true);
  });

  it('create default table 5 x 5.', () => {
    const table = new Table();
    expect(table['x']).toBe(5);
    expect(table['y']).toBe(5);
  });

  it('create custom table 10 x 2.', () => {
    const table = new Table(10, 2);
    expect(table['x']).toBe(10);
    expect(table['y']).toBe(2);
  });

  it('get dimensions.', () => {
    const table = new Table(20, 10);
    expect(table.getDimensions()).toStrictEqual({ x: 20, y: 10 });
  });

  it('get table.', () => {
    const table = new Table(2, 2);
    expect(table.getTable()).toStrictEqual([
      ['', ''],
      ['', ''],
    ]);
  });

  it('clear table.', () => {
    const table = new Table(2, 2);
    table['table'][0][0] = '↑';
    table['clearTable']();
    expect(table.getTable()).toStrictEqual([
      ['', ''],
      ['', ''],
    ]);
  });

  it('set robot.', () => {
    const table = new Table(2, 2);
    table.setRobot(0, 0, 'north' as Directions);
    expect(table.getTable()).toStrictEqual([
      ['', ''],
      ['↑', ''],
    ]);
  });
});
