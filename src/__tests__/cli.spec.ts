import { stdin } from 'mock-stdin';
import Cli from '../Cli';

// Test question
const testQuestion = [
  {
    type: 'input',
    name: 'cmdTest',
    message: 'TEST Cli - ask question?',
  },
];

// Key codes
const keys = {
  enter: '\x0D',
};

// Mock stdin so we can send messages to the CLI
let io = null;
beforeAll(() => (io = stdin()));
afterAll(() => io.restore());

describe('Cli', () => {
  it('create instance.', () => {
    const cmd = new Cli();
    expect(cmd instanceof Cli).toBe(true);
  });

  it('create question.', () => {
    const cmd = new Cli(testQuestion);

    expect(cmd['questions']).toStrictEqual(testQuestion);
  });

  it('ask question.', async () => {
    expect.assertions(1);
    const cmd = new Cli(testQuestion);

    const sendKeystrokes = async () => {
      io.send('Toy Robot');
      io.send(keys.enter);
    };

    setTimeout(() => sendKeystrokes().then(), 0);

    const { cmdTest } = await cmd.ask();
    expect(cmdTest).toEqual('Toy Robot');
  });
});
