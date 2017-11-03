process.env.NODE_ENV = 'test';

assert = require('assert');
sinon = require('sinon');
app = require('../index');

describe('index', () => {

  it('should start robot', () => {
    assert.notEqual(app.robot, null);
  });

  describe('getUserInput()', () => {

    const sandbox = sinon.sandbox.create();

    beforeEach(() => {
      sandbox.stub(app, 'askQuestion').callsFake(() => {
        return {
          then: (cb) => {
            cb({command: 'PLACE 0,0,NORTH'});
          }
        };
      });
    });

    after(() => {
      sandbox.restore();
    });

    it('should receive command from user and move robot accordingly', () => {
      app.getUserInput(false);
      assert.deepEqual(app.robot.dimensions, { x: 0, y: 0, facing: 'NORTH' });
    });
  });

});
