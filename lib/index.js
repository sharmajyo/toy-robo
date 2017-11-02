_ = require('lodash');
assert = require('assert');
const {
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

// Robot class
function Robot() {

  this.dimentions = {};

  this.activate = followCommand;
}

//moves the robot based on command provided, it expects a command to be passed.
function followCommand(currentCommand) {
    assert(currentCommand.command, ASSERT_ERROR_WRONG_COMMAND);

    const {command, xAxis, yAxis, facing} = currentCommand;

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
        const {dimentions} = this;
        console.log(`reporting now at ----  ${dimentions.x}, ${dimentions.y}, ${dimentions.facing}`);
        break;
      default:
        return;
    }
  }

// find the previous or next element from DIRECTIONS array based on clockwise is true or false.
function rotateRobot(clockwise) {
  index = DIRECTIONS.indexOf(robot.dimentions.facing);
  clockwise ? index ++ : index --;

  robot.dimentions.facing = _.nth(DIRECTIONS, index);
}

// moves robot in given direction by one unit
function moveRobot() {
  hasMoved = true;
  switch (robot.dimentions.facing) {
    case ENUM_DIRECTIONS.EAST:
      hasMoved = moveEast();
      break;
    case ENUM_DIRECTIONS.WEST:
      hasMoved = moveWest();
      break;
    case ENUM_DIRECTIONS.NORTH:
      hasMoved = moveNorth();
      break;
    case ENUM_DIRECTIONS.SOUTH:
      hasMoved = moveSouth();
      break;
    default:
      return;
  }
  if (!hasMoved) {
    console.log(ERROR_CAN_NOT_MOVE);
  }
}

function moveEast() {
  canMove = robot.dimentions.x < TABLE_UNIT;
  robot.dimentions.x += canMove ? 1 : 0;

  return canMove;
}

function moveWest() {
  canMove = robot.dimentions.x > 0;
  robot.dimentions.x -= canMove ? 1 : 0;

  return canMove;
}

function moveNorth() {
  canMove = robot.dimentions.y < TABLE_UNIT;
  robot.dimentions.y += canMove ? 1 : 0;

  return canMove;
}

function moveSouth() {
  canMove = robot.dimentions.y > 0;
  robot.dimentions.y -= canMove ? 1 : 0;

  return canMove;
}


