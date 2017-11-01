assert = require('assert');
robot = require('../main');

describe('toy robot', () => {

  it('should start robot', () => {
    assert.notEqual(robot, null);
  });

});
