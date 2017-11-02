_ = require('lodash');
const {
  ERROR_NO_COMMAND,
  DIRECTIONS,
  ERROR_CAN_NOT_MOVE,
  ENUM_COMMANDS,
  ENUM_DIRECTIONS,
  ERROR_NOT_YET_PLACED,
  INFO_PLACED,
  MOVE_STEP,
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
    if (!currentCommand.command) {
      console.log(ERROR_NO_COMMAND);
      return;
    }
    const {command, xAxis, yAxis, facing} = currentCommand;

    if(_.isEmpty(this.dimentions) && command != ENUM_COMMANDS.PLACE) {
      console.log(ERROR_NOT_YET_PLACED);
      return;
    }

    switch (command) {
      case ENUM_COMMANDS.PLACE:
        this.dimentions = {x: xAxis, y: yAxis, facing: facing};
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
  //need to treverse DIRECTIONS array circularly
  clockwise ? index + 1 == DIRECTIONS.length ? index = 0 : index++ : index--;
  robot.dimentions.facing = _.nth(DIRECTIONS, index);
}

// moves robot in given direction by one unit if robot is not at the edge and can't move
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
  robot.dimentions.x += canMove ? MOVE_STEP : 0;

  return canMove;
}

function moveWest() {
  canMove = robot.dimentions.x > 0;
  robot.dimentions.x -= canMove ? MOVE_STEP : 0;

  return canMove;
}

function moveNorth() {
  canMove = robot.dimentions.y < TABLE_UNIT;
  robot.dimentions.y += canMove ? MOVE_STEP : 0;

  return canMove;
}

function moveSouth() {
  canMove = robot.dimentions.y > 0;
  robot.dimentions.y -= canMove ? MOVE_STEP : 0;

  return canMove;
}


