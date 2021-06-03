# The Toy Robot

The application is a simulation of a toy robot moving on a square table top, of dimensions X units x Y units. There are no other obstructions on the table surface. The robot is free to roam around the surface of the table, but must be prevented from falling to destruction. Any movement that would result in the robot falling from the table must be prevented, however further valid movement commands must still be allowed. 

The Toy Robot console application​ can read in commands of the following form:

* PLACE X,Y,F (X,Y - position, F - facing NORTH, SOUTH, EAST or WEST) e.g: PLACE 0,0,NORTH
* MOVE
* LEFT
* RIGHT
* REPORT
* q

## Quick Start

The application require Node at least in version 14.x. Below command will install all required packages, next will build project, than will install application as global package in node and it run.

```zsh
npm run start
```

If you already installed application just type below command to run application:

```zsh
robotChallenge
```

## Available NPM Commands

| Command | Comments |
| ---- | ---- |
| `npm run i` | Install all project dependencies with strict engine flag |
| `npm run build` | Remove build lib folder and create new one |
| `npm run remove` | Uninstall application from global node packages |
| `npm run global` | Install application as global node packages |
| `npm run clean` | Remove build lib folder |
| `npm run dev` | Run local web server. Useful for manually testing noscript fallbacks and general troubleshooting. |
| `npm run test` | Run [Jest](https://jestjs.io/docs/en/getting-started) tests. |

### Libraries

The following libraries and frameworks are included in this project:

| Library | Comments |
| ---- | ---- |
| [Babel](https://babeljs.io/) | Babel is a JavaScript compiler. Use next generation JavaScript, today. |
| [inquirer](https://github.com/SBoudrias/Inquirer.js#readme) | A collection of common interactive command line user interfaces. |
| [eslint](https://eslint.org/) | Find and fix problems in your JavaScript code |
| [jest](https://jestjs.io/) | Jest is a delightful JavaScript Testing Framework with a focus on simplicity. |
| [nodemon](https://nodemon.io/) | Nodemon is a utility depended on by over 1.5 million projects, that will monitor for any changes in your source and automatically restart your server. Perfect for development. |
| [prettier](https://prettier.io/) | What is Prettier? An opinionated code formatter; Supports many languages; Integrates with most editors. |
| [ts-node](https://typestrong.org/ts-node/) | ts-node is a TypeScript execution engine and REPL for Node.js. |
| [typescript](https://www.typescriptlang.org/) | JavaScript and More. TypeScript is an open-source language which builds on JavaScript, one of the world's most used tools, by adding static type definitions. |
