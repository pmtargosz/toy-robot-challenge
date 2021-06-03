import { transformString, firstStringWord } from '../utils';

describe('Utilities Functions', () => {
  describe('Function transformString()', () => {
    it('transform string.', () => {
      const exp = 'test';
      const result = transformString('TEST');
      expect(result).toBe(exp);
    });
  });

  describe('Function firstStringWord()', () => {
    it('transform string.', () => {
      const exp = 'test';
      const result = firstStringWord('test  tes test');
      expect(result).toBe(exp);
    });
  });
});
