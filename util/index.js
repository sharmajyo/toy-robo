_ = require('lodash');
assert = require('assert');
var {
  ASSERT_ERROR_NO_COMMAND,
  COMMANDS,
  DIRECTIONS,
  ENUM_COMMANDS,
  ERROR_INVALID_COMMAND,
  ERROR_INCOMPLETE_PLACE,
  ERROR_INVALID_DIMENSION,
  TABLE_UNIT,
  X_AXIS,
  Y_AXIS,
} = require('../const');
var currentCommand = {};

exports.parseUserInput = function ({command}) {
  assert (command, ASSERT_ERROR_NO_COMMAND);

  currentCommand = {};
  args = _.words(command);
  command = _.toUpper(args[0]);

  isValidInput = checkCommand(command);

  if(isValidInput){
    currentCommand.command = command;

    if(command === ENUM_COMMANDS.PLACE) {
      isValidInput = checkPlacement(args.slice(1));
    }
  }

  return isValidInput ? currentCommand : null;
};

function checkCommand(command) {
  isValid = _.includes(COMMANDS, command);

  if(!isValid) {
    console.log(ERROR_INVALID_COMMAND);
  }

  return isValid;
}

function checkPlacement(dimensions) {
  if(_.isEmpty(dimensions) || dimensions.length != 3){
    console.log(ERROR_INCOMPLETE_PLACE);
    return false;
  }

  isValid = checkDimension(dimensions[0], X_AXIS) && checkDimension(dimensions[1], Y_AXIS) &&
  checkFacing(dimensions[2]);

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
    console.log(`for ${axis} axis, ERROR_INVALID_DIMENSION`);
  }

  return isValid;
}

function checkFacing(direction) {
  direction = _.toUpper(direction);
  isValid = direction && _.includes(DIRECTIONS, direction);

  if(!isValid) {
    console.log(ERROR_INVALID_FACING);
  }

  return isValid;
}
