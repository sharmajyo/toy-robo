assert = require('assert');
Robot = require('../../lib');

describe('lib/index', () => {

  beforeEach(() => {
    Robot.reset();
  })

  it('should have dimensions and activation features', () => {
    assert.notEqual(Robot.dimensions, null);
    assert.notEqual(Robot.activate, null);
  });

  describe('activate()', () => {

    it('should return if no action is passed to activate robot', () => {
      Robot.activate();
      assert.deepEqual(Robot.dimensions, {});
    });

    it('should return if action does not have a command', () => {
      Robot.activate({name: 'random'});
      assert.deepEqual(Robot.dimensions, {});
    });

    it('should do nothing if robot is not yet placed on board', () => {
      Robot.activate({command: 'MOVE'});
      assert.deepEqual(Robot.dimensions, {});
    });

    it('should place robot to board if a valid PLACE command is passed', () => {
      Robot.activate({command: 'PLACE', xAxis: 1, yAxis: 2, facing: 'NORTH'});
      assert.deepEqual(Robot.dimensions, {x: 1, y: 2, facing: 'NORTH'});
    });

    it('should move robot one step in faciong direction if a valid MOVE command is passed', () => {
      Robot.activate({command: 'PLACE', xAxis: 2, yAxis: 2, facing: 'NORTH'});
      Robot.activate({command: 'MOVE'});
      assert.deepEqual(Robot.dimensions, {x: 2, y: 3, facing: 'NORTH'});

      Robot.activate({command: 'LEFT'});
      Robot.activate({command: 'MOVE'});
      assert.deepEqual(Robot.dimensions, {x: 1, y: 3, facing: 'WEST'});

      Robot.activate({command: 'LEFT'});
      Robot.activate({command: 'MOVE'});
      assert.deepEqual(Robot.dimensions, {x: 1, y: 2, facing: 'SOUTH'});

      Robot.activate({command: 'LEFT'});
      Robot.activate({command: 'MOVE'});
      assert.deepEqual(Robot.dimensions, {x: 2, y: 2, facing: 'EAST'});
    });

    it('should change the direction of robot if a valid LEFT command is passed', () => {
      Robot.activate({command: 'PLACE', xAxis: 1, yAxis: 2, facing: 'NORTH'});
      Robot.activate({command: 'LEFT'});

      assert.deepEqual(Robot.dimensions, {x: 1, y: 2, facing: 'WEST'});
    });

    it('should change the direction of robot if a valid RIGHT command is passed', () => {
      Robot.activate({command: 'PLACE', xAxis: 1, yAxis: 2, facing: 'NORTH'});
      Robot.activate({command: 'RIGHT'});

      assert.deepEqual(Robot.dimensions, {x: 1, y: 2, facing: 'EAST'});
    });

    it('should print current position of robot if a valid REPORT command is passed', () => {
      Robot.activate({command: 'PLACE', xAxis: 1, yAxis: 2, facing: 'NORTH'});
      Robot.activate({command: 'REPORT'});

      assert.deepEqual(Robot.dimensions, {x: 1, y: 2, facing: 'NORTH'});
    });

    it('should rotate with circular motion in anti clockwise directions when multiple LEFT commands are given', () => {
      Robot.activate({command: 'PLACE', xAxis: 0, yAxis: 0, facing: 'NORTH'});
      Robot.activate({command: 'LEFT'});
      assert.deepEqual(Robot.dimensions, {x: 0, y: 0, facing: 'WEST'});

      Robot.activate({command: 'LEFT'});
      assert.deepEqual(Robot.dimensions, {x: 0, y: 0, facing: 'SOUTH'});

      Robot.activate({command: 'LEFT'});
      assert.deepEqual(Robot.dimensions, {x: 0, y: 0, facing: 'EAST'});

      Robot.activate({command: 'LEFT'});
      assert.deepEqual(Robot.dimensions, {x: 0, y: 0, facing: 'NORTH'});
    });

    it('should rotate with circular motion in clockwise directions when multiple RIGHT commands are given', () => {
      Robot.activate({command: 'PLACE', xAxis: 0, yAxis: 0, facing: 'NORTH'});
      Robot.activate({command: 'RIGHT'});
      assert.deepEqual(Robot.dimensions, {x: 0, y: 0, facing: 'EAST'});

      Robot.activate({command: 'RIGHT'});
      assert.deepEqual(Robot.dimensions, {x: 0, y: 0, facing: 'SOUTH'});

      Robot.activate({command: 'RIGHT'});
      assert.deepEqual(Robot.dimensions, {x: 0, y: 0, facing: 'WEST'});

      Robot.activate({command: 'RIGHT'});
      assert.deepEqual(Robot.dimensions, {x: 0, y: 0, facing: 'NORTH'});
    });

    describe('with MOVE, avoid falling on corners', () => {

      describe('bottom left position', () => {
        it('should do nothing on MOVE when placed at 0, 0 and WEST or SOUTH facing', () => {
          Robot.activate({command: 'PLACE', xAxis: 0, yAxis: 0, facing: 'WEST'});
          Robot.activate({command: 'MOVE'});
          assert.deepEqual(Robot.dimensions, {x: 0, y: 0, facing: 'WEST'});

          Robot.activate({command: 'PLACE', xAxis: 0, yAxis: 0, facing: 'SOUTH'});
          Robot.activate({command: 'MOVE'});
          assert.deepEqual(Robot.dimensions, {x: 0, y: 0, facing: 'SOUTH'});
        });
      });

      describe('bottom right position', () => {
        it('should do nothing on MOVE when placed at 5, 0 and EAST or SOUTH facing', () => {
          Robot.activate({command: 'PLACE', xAxis: 5, yAxis: 0, facing: 'EAST'});
          Robot.activate({command: 'MOVE'});
          assert.deepEqual(Robot.dimensions, {x: 5, y: 0, facing: 'EAST'});

          Robot.activate({command: 'PLACE', xAxis: 5, yAxis: 0, facing: 'SOUTH'});
          Robot.activate({command: 'MOVE'});
          assert.deepEqual(Robot.dimensions, {x: 5, y: 0, facing: 'SOUTH'});
        });
      });

      describe('top left position', () => {
        it('should do nothing on MOVE when placed at 0, 5 and WEST or NORTH facing', () => {
          Robot.activate({command: 'PLACE', xAxis: 0, yAxis: 5, facing: 'WEST'});
          Robot.activate({command: 'MOVE'});
          assert.deepEqual(Robot.dimensions, {x: 0, y: 5, facing: 'WEST'});

          Robot.activate({command: 'PLACE', xAxis: 0, yAxis: 5, facing: 'NORTH'});
          Robot.activate({command: 'MOVE'});
          assert.deepEqual(Robot.dimensions, {x: 0, y: 5, facing: 'NORTH'});
        });
      });

      describe('top right position', () => {
        it('should do nothing on MOVE when placed at 5, 5 and EAST or NORTH facing', () => {
          Robot.activate({command: 'PLACE', xAxis: 5, yAxis: 5, facing: 'EAST'});
          Robot.activate({command: 'MOVE'});
          assert.deepEqual(Robot.dimensions, {x: 5, y: 5, facing: 'EAST'});

          Robot.activate({command: 'PLACE', xAxis: 5, yAxis: 5, facing: 'NORTH'});
          Robot.activate({command: 'MOVE'});
          assert.deepEqual(Robot.dimensions, {x: 5, y: 5, facing: 'NORTH'});
        });
      });
    });
  })
});
