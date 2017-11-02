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

exports.ERROR_NOT_YET_PLACED = 'I am disappointed, please place me on the table first.';

exports.INFO_PLACED = 'great you have placed me, I am free to move now.';

exports.ERROR_CAN_NOT_MOVE = 'sorry if I move I will fall. Try something else.';

exports.ASSERT_ERROR_WRONG_COMMAND = 'it should have valid command.';

exports.ASSERT_ERROR_NO_COMMAND = 'parsing expectes a command.';

exports.ERROR_INVALID_COMMAND = "sorry, I didn't uderstand that, please give me a valid command.";

exports.ERROR_INCOMPLETE_PLACE = 'sorry, PLACE needs 3 arguments for X, Y and facing. Incomplete command.';

exports.ERROR_INVALID_FACING = 'please provide a valid facing direction like EAST, WEST, NORTH or SOUTH.';

exports.ERROR_INVALID_DIMENSION = `please provide a valid dimension, it should be between 0 to ${TABLE_UNIT}.`;

exports.X_AXIS = 'X';

exports.Y_AXIS = 'Y';
