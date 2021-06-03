#!/usr/bin/env node
import Cli from './Cli';
import Engine from './Engine';
import Robot from './Robot';
import Table from './Table';

async function getTableDimensions(): Promise<{ x: number; y: number }> {
  console.log('Please provide a table surface dimensions:');
  const askForDimensions = new Cli([
    {
      type: 'input',
      name: 'x',
      message: 'X (just hit enter for 5):',
      default: '5',
      validate: (input) => (input.toLowerCase() === 'q' ? process.exit(0) : true),
    },
    {
      type: 'input',
      name: 'y',
      message: 'Y (just hit enter for 5):',
      default: '5',
      validate: (input) => (input.toLowerCase() === 'q' ? process.exit(0) : true),
    },
  ]);

  async function dimensionsInputValidation(): Promise<{ x: number; y: number }> {
    const { x, y } = await askForDimensions.ask();
    if (!isNaN(x) && !isNaN(y) && Number(x) >= 0 && Number(y) >= 0) {
      return { x: Number(x), y: Number(y) };
    }

    console.log('\n==> Please enter a number! X and Y have to be a positive number!\n');
    return await dimensionsInputValidation();
  }

  return await dimensionsInputValidation();
}

(async function () {
  console.log(
    '\n///////////////////////////////////////////////////////\n//// Welcome to Toy Robot Code Challenge! ////////////\n//// Author: Pawel Targosz (pmtargosz@gmail.com) ////\n////////////////////////////////////////////////////\n'
  );

  // Ask for custom table dimensions.
  const { x, y } = await getTableDimensions();
  // Create table surface instance.
  const table = new Table(x, y);
  // Create robot toy instance.
  const robot = new Robot();
  // Create command instance.
  const cmd = new Cli([
    {
      type: 'input',
      name: 'userInput',
      message: 'Your command:',
    },
  ]);
  // Create new App
  const app = new Engine(table, robot, cmd);
  // Run app.
  await app.runTimeProcess();
})();
