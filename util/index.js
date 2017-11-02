_ = require('lodash');
const {
  ERROR_NO_COMMAND,
  COMMANDS,
  DIRECTIONS,
  ENUM_COMMANDS,
  ERROR_INVALID_COMMAND,
  ERROR_INCOMPLETE_PLACE,
  ERROR_INVALID_DIMENSION,
  ERROR_INVALID_FACING,
  TABLE_UNIT,
  X_AXIS,
  Y_AXIS,
} = require('../const');
var currentCommand = {};

// this method parses input and checks for validity
exports.parseUserInput = function (userInput) {
  if(!userInput) {
    console.log(ERROR_NO_COMMAND);
    return;
  }

  currentCommand = {};
  args = _.words(_.toUpper(userInput));
  command = args[0];
  isValidInput = checkCommand(command);

  if(isValidInput){
    currentCommand.command = command;

    if(command === ENUM_COMMANDS.PLACE) {
      isValidInput = checkPlacement(args.slice(1));
    }
  }

  return isValidInput ? currentCommand : null;
};

// checks if command is valid
function checkCommand(command) {
  isValid = _.includes(COMMANDS, command);

  if(!isValid) {
    console.log(ERROR_INVALID_COMMAND);
  }

  return isValid;
}

// checks if its a valid place command with all required args
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

// checks if dimensions are in valid range
function checkDimension(dimension, axis) {
 isValid = dimension && _.inRange(dimension, 0 , TABLE_UNIT + 1);

  if(!isValid) {
    console.log(`for ${axis} axis, ${ERROR_INVALID_DIMENSION}`);
  }

  return isValid;
}

// checks if user has provided a valid direction
function checkFacing(direction) {
  isValid = direction && _.includes(DIRECTIONS, direction);

  if(!isValid) {
    console.log(ERROR_INVALID_FACING);
  }

  return isValid;
}
