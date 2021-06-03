import inquirer, { Question } from 'inquirer';

export interface CLIInterface {
  ask(): Promise<inquirer.Answers>;
}

class Cli implements CLIInterface {
  constructor(private questions: Question[] = []) {
    this.questions = questions;
  }
  public async ask() {
    return await inquirer.prompt(this.questions);
  }
}

export default Cli;
