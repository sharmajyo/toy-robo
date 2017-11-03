const assert = require('assert');
const sinon = require('sinon');
const { ENV_TEST } = require('../const');

process.env.NODE_ENV = ENV_TEST;

const app = require('../index');

describe('index', () => {
  it('should start robot', () => {
    assert.notEqual(app.robot, null);
  });

  describe('getUserInput()', () => {
    const sandbox = sinon.sandbox.create();

    beforeEach(() => {
      sandbox.stub(app, 'askQuestion').callsFake(() => ({
        then: (cb) => {
          const userInput = 'PLACE 0,0,NORTH';
          cb({ command: userInput });
        },
      }));
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
