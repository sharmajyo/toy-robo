assert = require('assert');
const {parseUserInput} = require('../../util');

describe('util/index', () => {

  describe('parseUserInput()', () => {

    it('should return nothing when no input is provided by user', () => {
      input = parseUserInput();
      assert.equal(input, undefined);
    });

    it('should return nothing when an invalid command is provided', () => {
      input = parseUserInput('random');
      assert.equal(input, undefined);

      input = parseUserInput('MOVE me');
      assert.equal(input, undefined);

      input = parseUserInput('LEFT 1');
      assert.equal(input, undefined);

      input = parseUserInput('getREPORT');
      assert.equal(input, undefined);
    });

    describe('wrong PLACE command', () => {

      it('should return nothing when an incomplete PLACE command is provided', () => {
        input = parseUserInput('PLACE');
        assert.equal(input, undefined);
        input = parseUserInput('PLACE 1, 1');
        assert.equal(input, undefined);
        input = parseUserInput('PLACE a, b, NORTH');
        assert.equal(input, undefined);
        input = parseUserInput('PLACE 1, 2, NORTH, something');
        assert.equal(input, undefined);
      });

      it('should return nothing when PLACE command has invalid x axis dimension', () => {
        input = parseUserInput('PLACE 20, 1, NORTH');
        assert.equal(input, undefined);

        input = parseUserInput('PLACE -2, 1, NORTH');
        assert.equal(input, undefined);

        input = parseUserInput('PLACE 2.5, 1, NORTH');
        assert.equal(input, undefined);
      });

      it('should return nothing when PLACE command has invalid y axis dimension', () => {
        input = parseUserInput('PLACE 1, 20, NORTH');
        assert.equal(input, undefined);

        input = parseUserInput('PLACE  1, -2, NORTH');
        assert.equal(input, undefined);

        input = parseUserInput('PLACE 1, 2.5, NORTH');
        assert.equal(input, undefined);
      });

      it('should return nothing when PLACE command has invalid facing value', () => {
        input = parseUserInput('PLACE 1, 2, anythiing');
        assert.equal(input, undefined);
      });
    });

    describe('correct command', () => {
      it('should handle command string as case insensitive', () => {
        input = parseUserInput('place 1, 2,  NOrTh');
        assert.deepEqual(input, {command: 'PLACE', xAxis: 1, yAxis: 2, facing: 'NORTH'});

        input = parseUserInput('move');
        assert.deepEqual(input, {command: 'MOVE'});
      });

      it('should parse and return a correct PLACE command', () => {
        input = parseUserInput('PLACE 1, 2, NORTH');
        assert.deepEqual(input, {command: 'PLACE', xAxis: 1, yAxis: 2, facing: 'NORTH'});
      });

      it('should parse and return a correct MOVE command', () => {
        input = parseUserInput('MOVE');
        assert.deepEqual(input, {command: 'MOVE'});
      });

      it('should parse and return a correct LEFT command', () => {
        input = parseUserInput('LEFT');
        assert.deepEqual(input, {command: 'LEFT'});
      });

      it('should parse and return a correct RIGHT command', () => {
        input = parseUserInput('RiGHT');
        assert.deepEqual(input, {command: 'RIGHT'});
      });

      it('should parse and return a correct REPORT command', () => {
        input = parseUserInput('REPORT');
        assert.deepEqual(input, {command: 'REPORT'});
      });
    });
  });
});
