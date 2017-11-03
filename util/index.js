_ = require('lodash');
const {
  ERROR_NO_COMMAND,
  COMMANDS,
  DIRECTIONS,
  ENUM_COMMANDS,
  ERROR_COMMAND_WITH_ADDITIONAL_DATA,
  ERROR_INVALID_COMMAND,
  ERROR_INCOMPLETE_PLACE,
  ERROR_INVALID_DIMENSION,
  ERROR_INVALID_FACING,
  TABLE_UNIT,
  X_AXIS,
  Y_AXIS,
} = require('../const');
var userCommand = {};

// disable logging while running unit tests
exports.log = log = (msg) => {
  if(process.env.NODE_ENV != 'test'){
    console.log(msg);
  }
}

// this method parses input and checks for validity
exports.parseUserInput = function (userInput) {
  if(!userInput) {
    log(ERROR_NO_COMMAND);
    return;
  }

  userCommand = {};
  args = _.words(_.toUpper(userInput), /[^, ]+/g);
  command = args[0];
  isValidInput = checkCommand(command);

  if(isValidInput){
    userCommand.command = command;

    if(command === ENUM_COMMANDS.PLACE) {
      isValidInput = checkPlacement(args.slice(1));
    } else if(args.length > 1) {
      isValidInput = false;
      log(ERROR_COMMAND_WITH_ADDITIONAL_DATA);
    }
  }

  return isValidInput ? userCommand : null;
};

// checks if command is valid
function checkCommand(command) {
  isValid = _.includes(COMMANDS, command);

  if(!isValid) {
    log(ERROR_INVALID_COMMAND);
  }

  return isValid;
}

// checks if its a valid place command with all required args
function checkPlacement(dimensions) {
  if(_.isEmpty(dimensions) || dimensions.length != 3){
    log(ERROR_INCOMPLETE_PLACE);
    return false;
  }

  isValid = checkDimension(dimensions[0], X_AXIS) && checkDimension(dimensions[1], Y_AXIS) &&
  checkFacing(dimensions[2]);

  if (isValid) {
    userCommand.xAxis = +dimensions[0];
    userCommand.yAxis = +dimensions[1];
    userCommand.facing = dimensions[2];
  }

  return isValid;
}

// checks if dimension is provided, its a whole number and falls under valid range
function checkDimension(dimension, axis) {
 isValid = dimension  && dimension % 1 == 0 && _.inRange(dimension, 0 , TABLE_UNIT + 1);

  if(!isValid) {
    log(`for ${axis} axis, ${ERROR_INVALID_DIMENSION}`);
  }

  return isValid;
}

// checks if user has provided a valid direction
function checkFacing(direction) {
  isValid = direction && _.includes(DIRECTIONS, direction);

  if(!isValid) {
    log(ERROR_INVALID_FACING);
  }

  return isValid;
}
