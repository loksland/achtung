'use strict';

var grunt = require('grunt');

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

exports.achtung = {
  setUp: function(done) {
    // setup here if necessary
    done();
  },
  test_a: function(test) {
		
		var result = grunt.file.readJSON('test/log/script-a.log');
    
		test.expect(2);
		test.equal(result[0].comment, ' Make case insensitive', 'Unexpected comment');
		test.equal(result[1].lineNum, 10, 'Unexpected line num');
		test.done();
		
  },
  test_b: function(test) {
		
		var result = grunt.file.readJSON('test/log/script-b.log');
    
		console.log(result);
		
		test.expect(2);
		test.equal(result[0].comment, ' Consider older versions', 'Unexpected comment');
		test.equal(result[1].lineNum, 16, 'Unexpected line num');
		test.done();
		
  }
};
