var assert = require('assert');
var duck = require('../lib/rubberduck');
var events = require('events');

describe('Asynchronous function wrapping', function() {
  it('wraps asynchronous function but returns its value', function(done) {
    var emitter = new events.EventEmitter();

    var asyncFn = function(cb) {
      assert.ok(true, 'Fn called');
      cb('testing');
      return true;
    };

    var wrapped = duck.wrap.async(emitter, asyncFn);

    var callback = function(result) {
      assert.equal(result, 'testing');
    };

    emitter.on('before', function(args) {
      assert.equal(args[1], 42);
    });

    emitter.on('after', function(results, args) {
      assert.equal(args[1], 42);
      assert.equal(results[0], 'testing');
      done();
    });

    assert.ok(wrapped(callback, 42));
  });

  it('wraps async test with callback at the end', function(done) {
    var emitter = new events.EventEmitter();

    var asyncFn = function(arg, other, cb) {
      assert.ok(true, 'Fn called');
      cb('testing');
    };

    var wrapped = duck.wrap.async(emitter, asyncFn, -1);

    var callback = function(result) {
      assert.equal(result, 'testing');
    };

    emitter.on('before', function(args) {
      assert.equal(args[0], 42);
    });

    emitter.on('after', function(results, args) {
      assert.equal(args[0], 42);
      assert.equal(results[0], 'testing');
      done();
    });

    wrapped(42, 'test', callback);
  });
});
