const _ = require('lodash');
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
const { log } = require('../util');

const robot = new Robot();

function resetRobot() {
  this.dimensions = {};
}

function moveEast() {
  const canMove = robot.dimensions.x < TABLE_UNIT;
  robot.dimensions.x += canMove ? MOVE_STEP : 0;
  return canMove;
}

function moveWest() {
  const canMove = robot.dimensions.x > 0;
  robot.dimensions.x -= canMove ? MOVE_STEP : 0;
  return canMove;
}

function moveNorth() {
  const canMove = robot.dimensions.y < TABLE_UNIT;
  robot.dimensions.y += canMove ? MOVE_STEP : 0;
  return canMove;
}

function moveSouth() {
  const canMove = robot.dimensions.y > 0;
  robot.dimensions.y -= canMove ? MOVE_STEP : 0;
  return canMove;
}

// find the previous or next element from DIRECTIONS array based on clockwise is true or false.
function rotateRobot(clockwise) {
  let index = DIRECTIONS.indexOf(robot.dimensions.facing);
  // need to treverse DIRECTIONS array circularly
  index += clockwise ? 1 : -1;
  index = DIRECTIONS.length === index ? 0 : index;
  robot.dimensions.facing = _.nth(DIRECTIONS, index);
}

// moves robot in given direction by one unit if robot is not at the edge and can't move
function moveRobot() {
  let hasMoved = true;
  switch (robot.dimensions.facing) {
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
    log(ERROR_CAN_NOT_MOVE);
  }
}

// moves the robot based on command provided, it expects a command to be passed.
function followCommand(action) {
  if (!action || !action.command) {
    log(ERROR_NO_COMMAND);
    return;
  }

  const { command, xAxis, yAxis, facing } = action;

  if (_.isEmpty(this.dimensions) && command !== ENUM_COMMANDS.PLACE) {
    log(ERROR_NOT_YET_PLACED);
    return;
  }

  switch (command) {
    case ENUM_COMMANDS.PLACE:
      this.dimensions = { x: xAxis, y: yAxis, facing: facing };
      log(INFO_PLACED);
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
      log(`reporting now at ----  ${this.dimensions.x}, ${this.dimensions.y}, ${this.dimensions.facing}`);
      break;
    default:
      break;
  }
}


// Robot class
function Robot() {
  this.dimensions = {};
  this.activate = followCommand;
  this.reset = resetRobot;
}

module.exports = robot;
