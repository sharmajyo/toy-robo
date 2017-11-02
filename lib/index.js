_ = require('lodash');
assert = require('assert');
const {VALID_DIRECTIONS, TABLE_UNIT} = require('../util');

exports = module.exports = robot = new Robot();

function Robot() {

  this.dimentions = {};

  this.activate =  followCommand;
}

function followCommand(currentCommand) {
    assert(currentCommand.command, 'it should have valid command');

    const {command, xAxis, yAxis, facing} = currentCommand;

    if(_.isEmpty(this.dimentions) && command != 'PLACE') {
      console.log("I am disappointed, please place me on the table first.");
    }

    switch (command) {
      case 'PLACE':
        this.dimentions = {x: xAxis, y: yAxis, facing: _.toUpper(facing)};
        console.log("great you have placed me, I am free to move now");
        break;
      case 'MOVE':
        moveRobot();
        break;
      case 'LEFT':
        rotateRobot(false);
        break;
      case 'RIGHT':
        rotateRobot(true);
        break;
      case 'REPORT':
        console.log("****** reporting now at ******",this.dimentions.x, this.dimentions.y,this.dimentions.facing);
        break;
      default:
        return;
    }
  }

function rotateRobot(clockwise) {
  index = VALID_DIRECTIONS.indexOf(robot.dimentions.facing);
  clockwise ? index ++ : index --;

  robot.dimentions.facing = _.nth(VALID_DIRECTIONS, index);
}

function moveRobot() {
  canMove = true;
  switch (robot.dimentions.facing) {
    case 'EAST':
      canMove = robot.dimentions.x < TABLE_UNIT;
      robot.dimentions.x += canMove ? 1 : 0;
      break;
    case 'WEST':
      canMove = robot.dimentions.x > 0;
      robot.dimentions.x -= canMove ? 1 : 0;
      break;
    case 'NORTH':
      canMove = robot.dimentions.y < TABLE_UNIT;
      robot.dimentions.y += canMove ? 1 : 0;
      break;
    case 'SOUTH':
      canMove = robot.dimentions.y > 0;
      robot.dimentions.y -= canMove ? 1 : 0;
      break;
    default:
      return;
  }
  if (!canMove) {
    console.log("sorry if I move I will fall. Try something else.");
  }
}



