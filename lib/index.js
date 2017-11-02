_ = require('lodash');
assert = require('assert');
var {
  ASSERT_ERROR_WRONG_COMMAND,
  DIRECTIONS,
  ERROR_CAN_NOT_MOVE,
  ENUM_COMMANDS,
  ENUM_DIRECTIONS,
  ERROR_NOT_YET_PLACED,
  INFO_PLACED,
  TABLE_UNIT,
} = require('../const');

exports = module.exports = robot = new Robot();

function Robot() {

  this.dimentions = {};

  this.activate = followCommand;
}

function followCommand(currentCommand) {
    assert(currentCommand.command, ASSERT_ERROR_WRONG_COMMAND);

    var {command, xAxis, yAxis, facing} = currentCommand;

    if(_.isEmpty(this.dimentions) && command != ENUM_COMMANDS.PLACE) {
      console.log(ERROR_NOT_YET_PLACED);
    }

    switch (command) {
      case ENUM_COMMANDS.PLACE:
        this.dimentions = {x: xAxis, y: yAxis, facing: _.toUpper(facing)};
        console.log(INFO_PLACED);
        break;
      case ENUM_COMMANDS.MOVE:
        moveRobot();
        break;
      case ENUM_COMMANDS.LEFT:
        rotateRobot(false);
        break;
      case ENUM_COMMANDS.RIGHT:
        rotateRobot(true);
        break;
      case ENUM_COMMANDS.REPORT:
        var {x, y, facing} = this.dimentions;
        console.log(`reporting now at ----  ${x}, ${y}, ${facing}`);
        break;
      default:
        return;
    }
  }

function rotateRobot(clockwise) {
  index = DIRECTIONS.indexOf(robot.dimentions.facing);
  clockwise ? index ++ : index --;

  robot.dimentions.facing = _.nth(DIRECTIONS, index);
}

function moveRobot() {
  canMove = true;
  switch (robot.dimentions.facing) {
    case ENUM_DIRECTIONS.EAST:
      canMove = robot.dimentions.x < TABLE_UNIT;
      robot.dimentions.x += canMove ? 1 : 0;
      break;
    case ENUM_DIRECTIONS.WEST:
      canMove = robot.dimentions.x > 0;
      robot.dimentions.x -= canMove ? 1 : 0;
      break;
    case ENUM_DIRECTIONS.NORTH:
      canMove = robot.dimentions.y < TABLE_UNIT;
      robot.dimentions.y += canMove ? 1 : 0;
      break;
    case ENUM_DIRECTIONS.SOUTH:
      canMove = robot.dimentions.y > 0;
      robot.dimentions.y -= canMove ? 1 : 0;
      break;
    default:
      return;
  }
  if (!canMove) {
    console.log(ERROR_CAN_NOT_MOVE);
  }
}



