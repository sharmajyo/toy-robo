inquirer = require('inquirer');
const {parseUserInput} = require('./util');
Robot = require('./lib');

const question = {
  type: 'input',
  name: 'command',
  message: 'I am waiting for your command now...'
};

function startRobot() {
  console.log('Hi there, I am your toy robot. Please place me on the table first and start playing.');
  console.log('Use PLACE X,Y,F to place me on a 5 x 5 table. I can be EAST, WEST, NORTH and SOUTH facing.')
  console.log('Use MOVE to help me move.')
  console.log('Use LEFT or RIGHT to help me change directions.')
  console.log('Use REPORT if you want to know where I am.')
  console.log('**** All right, lets get going ****')
  ask();

}

function ask() {
  inquirer.prompt([question]).then(function (answers) {
    currentCommand = parseUserInput(answers.command);

    if(currentCommand) {
      Robot.activate(currentCommand);
    }

    ask();
  });
}

startRobot();
