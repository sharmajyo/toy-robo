inquirer = require('inquirer');
const {parseUserInput, log} = require('./util');
exports.robot = require('./lib');

exports.startRobot = startRobot = function() {
  log('Hi there, I am your toy robot. Please place me on the table first and start playing.');
  log('Use PLACE X,Y,F to place me on a 5 x 5 table. I can be EAST, WEST, NORTH and SOUTH facing.')
  log('Use MOVE to help me move.')
  log('Use LEFT or RIGHT to help me change directions.')
  log('Use REPORT if you want to know where I am.')
  log('**** All right, lets get going ****')
  getUserInput();
}

exports.askQuestion = function () {
  const question = {
  type: 'input',
  name: 'command',
  message: 'I am waiting for your command now...'
  };
  return inquirer.prompt([question]);
}

exports.getUserInput = getUserInput = function(keepAsking = true) {
  exports.askQuestion()
  .then(function (answers) {
    userCommand = parseUserInput(answers.command);

    if(userCommand) {
      exports.robot.activate(userCommand);
    }

    // we need an option to stop app for the purpose of unit testing
    if(keepAsking) {
      getUserInput();
    }
  });
}

startRobot();
