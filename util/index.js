_ = require('lodash');
assert = require('assert');


var currentCommand = {};

exports.TABLE_UNIT = TABLE_UNIT = 5;
exports.VALID_DIRECTIONS = VALID_DIRECTIONS = ['NORTH', 'EAST', 'SOUTH', 'WEST']; // sorted to calculate rotation
VALID_COMMANDS = ['PLACE', 'MOVE' ,'LEFT', 'RIGHT', 'REPORT'];



exports.parseUserInput = function ({command}) {
  assert (command, 'parsing expectes a command');

  currentCommand = {};
  args = _.words(command);
  command = _.toUpper(args[0]);

  isValidInput = checkCommand(command);

  if(isValidInput){
    currentCommand.command = command;

    if(command === 'PLACE') {
      isValidInput = checkPlacement(args.slice(1));
    }
  }

  return isValidInput ? currentCommand : null;
}

function checkCommand(command) {
  isValid = _.includes(VALID_COMMANDS, command);

  if(!isValid) {
    console.log("sorry, I didn't uderstand that, please give me a valid command.");
  }

  return isValid;
}

function checkPlacement(dimensions) {
  if(_.isEmpty(dimensions)){
    console.log("sorry, PLACE needs dimension. Incomplete command.");
    return false;
  } else if(dimensions.length != 3) {
    console.log('incorrect arguments, PLACE needs 3 arguments for X, Y and facing', args,dimensions);
    return false;
  }

  isValid = checkDimension(dimensions[0], 'X') && checkDimension(dimensions[1], 'Y') && checkFacing(dimensions[2]);

  if (isValid) {
    currentCommand.xAxis = +dimensions[0];
    currentCommand.yAxis = +dimensions[1];
    currentCommand.facing = dimensions[2];
  }

  return isValid;
}

function checkDimension(dimension, axis) {
  isValid = dimension && _.inRange(dimension, 0 ,TABLE_UNIT);

  if(!isValid) {
    console.log('please provide a valid dimension for',axis,', it should be between 0 to ', TABLE_UNIT);
  }

  return isValid;
}

function checkFacing(direction) {
  direction = _.toUpper(direction);
  isValid = direction && _.includes(VALID_DIRECTIONS, direction);

  if(!isValid) {
    console.log('please provide a valid facing direction like EAST, WEST, NORTH or SOUTH');
  }

  return isValid;
}
