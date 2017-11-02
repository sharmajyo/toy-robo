_ = require('lodash');

exports.TABLE_UNIT = TABLE_UNIT = 5;

// sorted for calculating rotation
exports.ENUM_DIRECTIONS = ENUM_DIRECTIONS = {
  NORTH: 'NORTH',
  EAST: 'EAST',
  SOUTH: 'SOUTH',
  WEST: 'WEST',
};

exports.DIRECTIONS = _.map(ENUM_DIRECTIONS); // ['NORTH', 'EAST', 'SOUTH', 'WEST']

exports.ENUM_COMMANDS = COMMANDS = {
  PLACE: 'PLACE',
  MOVE: 'MOVE',
  LEFT: 'LEFT',
  RIGHT: 'RIGHT',
  REPORT: 'REPORT',
};

exports.COMMANDS = _.map(COMMANDS); // ['PLACE', 'MOVE' ,'LEFT', 'RIGHT', 'REPORT']

exports.ERROR_NOT_YET_PLACED = 'Please place me on the table first. I can not respond to you commands otherwise.';

exports.INFO_PLACED = 'Great you have placed me, I am free to move now.';

exports.ERROR_CAN_NOT_MOVE = 'Sorry if I move I will fall. Try something else.';

exports.ERROR_NO_COMMAND = 'It expects a command.';

exports.ERROR_INVALID_COMMAND = "Sorry, I didn't uderstand that, please give me a valid command.";

exports.ERROR_INCOMPLETE_PLACE = 'Sorry, PLACE needs 3 arguments for X, Y and facing. Incomplete command.';

exports.ERROR_INVALID_FACING = 'Please provide a valid facing direction like EAST, WEST, NORTH or SOUTH.';

exports.ERROR_INVALID_DIMENSION = `Please provide a valid dimension, it should be between 0 to ${TABLE_UNIT}.`;

exports.X_AXIS = 'X';

exports.Y_AXIS = 'Y';

exports.MOVE_STEP = 1;
