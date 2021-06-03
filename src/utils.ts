export const transformString = (str: string): string =>
  typeof str !== 'string' ? str : str.trim().toLowerCase();

export const firstStringWord = (str: string): string =>
  typeof str !== 'string' ? str : transformString(str).replace(/ .*/, '');
