'use strict';

require('mocha');
const nano = require('nanoseconds');
const assert = require('assert');
const utils = require('./utils');
const pretty = require('.');

describe('pretty', function() {
  it('should throw an error when invalid args are passed:', function() {
    assert.throws(() => pretty(), /expected an array or number in nanoseconds/);
  });

  it('should throw an error when invalid arrays are passed:', function() {
    assert.throws(() => pretty([0,1,2]), /expected an array from process\.hrtime\(\)/);
  });

  it('should support hrtime:', function() {
    const start = process.hrtime();
    const time = process.hrtime(start);
    assert(typeof pretty(time) === 'string');
  });

  it('should support nanoseconds:', function() {
    const start = process.hrtime();
    const time = process.hrtime(start);
    assert(typeof pretty(nano(time)) === 'string');
  });

  it('should support time increment as second arg:', function() {
    const time = [1200708, 795428088];
    assert.equal(pretty(time, 'w'), '2w');
    assert.equal(pretty(time, 'd'), '1w 6d');
    assert.equal(pretty(time, 'h'), '1w 6d 22h');
    assert.equal(pretty(time, 'm'), '1w 6d 21h 32m');
    assert.equal(pretty(time, 's'), '1w 6d 21h 31m 49s');
    assert.equal(pretty(time, 'ms'), '1w 6d 21h 31m 48s 795ms');
    assert.equal(pretty(time, 'μs'), '1w 6d 21h 31m 48s 795ms 428μs');
    assert.equal(pretty(time, 'ns'), '1w 6d 21h 31m 48s 795ms 428μs 88ns');
    assert.equal(pretty([0, 795428088], 'ms'), '795ms');
    assert.equal(pretty([0, 428088], 'ms'), '0ms');
    assert.equal(pretty([0, 428088], 'ns'), '428μs 88ns');
    assert.equal(pretty([0, 528088], 'ms'), '1ms');
    assert.equal(pretty([0, 428088], 'ms', 1), '0.4ms');
    assert.equal(pretty([0, 628088], 'ms', 1), '0.6ms');
    assert.equal(pretty([0, 428088], 'ms', 2), '0.43ms');
    assert.equal(pretty([0, 795946488], 'ms', 2), '795.95ms');
    assert.equal(pretty([0, 795946488], 'μs'), '795ms 946μs');
    assert.equal(pretty([0, 795428088], 'μs'), '795ms 428μs');

    assert.equal(pretty(nano(time), 'w'), '2w');
    assert.equal(pretty(nano(time), 'd'), '1w 6d');
    assert.equal(pretty(nano(time), 'h'), '1w 6d 22h');
    assert.equal(pretty(nano(time), 'm'), '1w 6d 21h 32m');
    assert.equal(pretty(nano(time), 's'), '1w 6d 21h 31m 49s');
    assert.equal(pretty(nano(time), 'ms'), '1w 6d 21h 31m 48s 795ms');
    assert.equal(pretty(nano(time), 'μs'), '1w 6d 21h 31m 48s 795ms 428μs');
    assert.equal(pretty(nano(time), 'ns'), '1w 6d 21h 31m 48s 795ms 428μs 88ns');
    assert.equal(pretty(nano([0, 795428088]), 'ms'), '795ms');
    assert.equal(pretty(nano([0, 428088]), 'ms'), '0ms');
    assert.equal(pretty(nano([0, 428088]), 'ns'), '428μs 88ns');
    assert.equal(pretty(nano([0, 528088]), 'ms'), '1ms');
    assert.equal(pretty(nano([0, 428088]), 'ms', 1), '0.4ms');
    assert.equal(pretty(nano([0, 628088]), 'ms', 1), '0.6ms');
    assert.equal(pretty(nano([0, 428088]), 'ms', 2), '0.43ms');
    assert.equal(pretty(nano([0, 795946488]), 'ms', 2), '795.95ms');
    assert.equal(pretty(nano([0, 795946488]), 'μs'), '795ms 946μs');
    assert.equal(pretty(nano([0, 795428088]), 'μs'), '795ms 428μs');
  });

  it('should round to the closest increment', function() {
    assert.equal(pretty([1200708, 795428088]), '2w');
    assert.equal(pretty([800708, 795428088]), '1w');
    assert.equal(pretty([400708, 795428088]), '5d');
    assert.equal(pretty([70708, 795428088]), '20h');
    assert.equal(pretty([12708, 795428088]), '4h');
    assert.equal(pretty([3708, 795428088]), '1h');
    assert.equal(pretty([208, 795428088]), '3m');
    assert.equal(pretty([20, 795428088]), '21s');
    assert.equal(pretty([0, 795428088]), '795ms');
    assert.equal(pretty([0, 428088]), '428μs');
    assert.equal(pretty([0, 88]), '88ns');
    assert.equal(pretty([0, 18]), '18ns');

    assert.equal(pretty(nano([1200708, 795428088])), '2w');
    assert.equal(pretty(nano([800708, 795428088])), '1w');
    assert.equal(pretty(nano([400708, 795428088])), '5d');
    assert.equal(pretty(nano([70708, 795428088])), '20h');
    assert.equal(pretty(nano([12708, 795428088])), '4h');
    assert.equal(pretty(nano([3708, 795428088])), '1h');
    assert.equal(pretty(nano([208, 795428088])), '3m');
    assert.equal(pretty(nano([20, 795428088])), '21s');
    assert.equal(pretty(nano([0, 795428088])), '795ms');
    assert.equal(pretty(nano([0, 428088])), '428μs');
    assert.equal(pretty(nano([0, 88])), '88ns');
    assert.equal(pretty(nano([0, 18])), '18ns');
  });

  it('should work when numbers are strings', function() {
    assert.equal(pretty(['1200708', '795428088']), '2w');
    assert.equal(pretty(['800708', '795428088']), '1w');
    assert.equal(pretty(['400708', '795428088']), '5d');
    assert.equal(pretty(['70708', '795428088']), '20h');
    assert.equal(pretty(['3708', '795428088']), '1h');
    assert.equal(pretty(['208', '795428088']), '3m');
    assert.equal(pretty(['20', '795428088']), '21s');
    assert.equal(pretty(['0', '795428088']), '795ms');
    assert.equal(pretty(['0', '000428088']), '428μs');
    assert.equal(pretty(['0', '000000088']), '88ns');
    assert.equal(pretty(['0', '000000018']), '18ns');
    assert.equal(pretty(['0', '000000001']), '1ns');

    assert.equal(pretty(''+nano(['1200708', '795428088'])), '2w');
    assert.equal(pretty(''+nano(['800708', '795428088'])), '1w');
    assert.equal(pretty(''+nano(['400708', '795428088'])), '5d');
    assert.equal(pretty(''+nano(['70708', '795428088'])), '20h');
    assert.equal(pretty(''+nano(['3708', '795428088'])), '1h');
    assert.equal(pretty(''+nano(['208', '795428088'])), '3m');
    assert.equal(pretty(''+nano(['20', '795428088'])), '21s');
    assert.equal(pretty(''+nano(['0', '795428088'])), '795ms');
    assert.equal(pretty(''+nano(['0', '000428088'])), '428μs');
    assert.equal(pretty(''+nano(['0', '000000088'])), '88ns');
    assert.equal(pretty(''+nano(['0', '000000018'])), '18ns');
    assert.equal(pretty(''+nano(['0', '000000001'])), '1ns');
  });

  it('should round the given number of digits', function() {
    assert.equal(pretty([1200708, 795428088], 2), '1.99w');
    assert.equal(pretty([800708, 795428088], 2), '1.32w');
    assert.equal(pretty([400708, 795428088], 2), '4.64d');
    assert.equal(pretty([70708, 795428088], 2), '19.64h');
    assert.equal(pretty([3708, 795428088], 2), '1.03h');
    assert.equal(pretty([208, 795428088], 2), '3.48m');
    assert.equal(pretty([20, 795428088], 2), '20.80s');
    assert.equal(pretty([0, 795428088], 2), '795.43ms');
    assert.equal(pretty([0, 428088], 2), '428.09μs');

    assert.equal(pretty(nano([1200708, 795428088]), 2), '1.99w');
    assert.equal(pretty(nano([800708, 795428088]), 2), '1.32w');
    assert.equal(pretty(nano([400708, 795428088]), 2), '4.64d');
    assert.equal(pretty(nano([70708, 795428088]), 2), '19.64h');
    assert.equal(pretty(nano([3708, 795428088]), 2), '1.03h');
    assert.equal(pretty(nano([208, 795428088]), 2), '3.48m');
    assert.equal(pretty(nano([20, 795428088]), 2), '20.80s');
    assert.equal(pretty(nano([0, 795428088]), 2), '795.43ms');
    assert.equal(pretty(nano([0, 428088]), 2), '428.09μs');
  });

  it('should support rounding as the third arg:', function() {
    const time = [1281708, 795428088];
    assert.equal(pretty(time, 'w'), '2w');
    assert.equal(pretty(time, 'w', 1), '2.1w');
    assert.equal(pretty(time, 'w', 2), '2.12w');
    assert.equal(pretty(time, 'd'), '2w 1d');
    assert.equal(pretty(time, 'd', 1), '2w 0.8d');
    assert.equal(pretty(time, 'd', 2), '2w 0.83d');
    assert.equal(pretty(time, 'h'), '2w 20h');
    assert.equal(pretty(time, 'h', 1), '2w 20.0h');
    assert.equal(pretty(time, 'h', 2), '2w 20.03h');
    assert.equal(pretty(time, 'm'), '2w 20h 2m');
    assert.equal(pretty(time, 's'), '2w 20h 1m 49s');
    assert.equal(pretty(time, 's', 1), '2w 20h 1m 48.8s');
    assert.equal(pretty(time, 's', 2), '2w 20h 1m 48.80s');
    assert.equal(pretty(time, 'ms'), '2w 20h 1m 48s 795ms');
    assert.equal(pretty(time, 'ms', 2), '2w 20h 1m 48s 795.43ms');
    assert.equal(pretty(time, 'μs'), '2w 20h 1m 48s 795ms 428μs');
    assert.equal(pretty(time, 'μs', 1), '2w 20h 1m 48s 795ms 428.1μs');
    assert.equal(pretty(time, 'μs', 2), '2w 20h 1m 48s 795ms 428.09μs');
    assert.equal(pretty(time, 'ns'), '2w 20h 1m 48s 795ms 428μs 88ns');
    assert.equal(pretty(time, 'ns', 2), '2w 20h 1m 48s 795ms 428μs 88.00ns');

    assert.equal(pretty(nano(time), 'w'), '2w');
    assert.equal(pretty(nano(time), 'w', 1), '2.1w');
    assert.equal(pretty(nano(time), 'w', 2), '2.12w');
    assert.equal(pretty(nano(time), 'd'), '2w 1d');
    assert.equal(pretty(nano(time), 'd', 1), '2w 0.8d');
    assert.equal(pretty(nano(time), 'd', 2), '2w 0.83d');
    assert.equal(pretty(nano(time), 'h'), '2w 20h');
    assert.equal(pretty(nano(time), 'h', 1), '2w 20.0h');
    assert.equal(pretty(nano(time), 'h', 2), '2w 20.03h');
    assert.equal(pretty(nano(time), 'm'), '2w 20h 2m');
    assert.equal(pretty(nano(time), 's'), '2w 20h 1m 49s');
    assert.equal(pretty(nano(time), 's', 1), '2w 20h 1m 48.8s');
    assert.equal(pretty(nano(time), 's', 2), '2w 20h 1m 48.80s');
    assert.equal(pretty(nano(time), 'ms'), '2w 20h 1m 48s 795ms');
    assert.equal(pretty(nano(time), 'ms', 2), '2w 20h 1m 48s 795.43ms');
    assert.equal(pretty(nano(time), 'μs'), '2w 20h 1m 48s 795ms 428μs');
    assert.equal(pretty(nano(time), 'μs', 1), '2w 20h 1m 48s 795ms 428.1μs');
    assert.equal(pretty(nano(time), 'μs', 2), '2w 20h 1m 48s 795ms 428.09μs');
    assert.equal(pretty(nano(time), 'ns'), '2w 20h 1m 48s 795ms 428μs 88ns');
    assert.equal(pretty(nano(time), 'ns', 2), '2w 20h 1m 48s 795ms 428μs 88.00ns');
  });
});

describe('regex', function() {
  const re = utils.regex;
  it('should match nanoseconds:', function() {
    assert(re.ns.test('nanoseconds'));
    assert(re.ns.test('nanosecond'));
    assert(re.ns.test('nano'));
    assert(re.ns.test('ns'));
    assert(re.ns.test('n'));
  });

  it('should match microseconds:', function() {
    assert(re.μs.test('microseconds'));
    assert(re.μs.test('microsecond'));
    assert(re.μs.test('micro'));
    assert(re.μs.test('μs'));
  });

  it('should match milliseconds:', function() {
    assert(re.ms.test('milliseconds'));
    assert(re.ms.test('millisecond'));
    assert(re.ms.test('milli'));
    assert(re.ms.test('ms'));
    assert(!re.ms.test('mil'));
    assert(!re.ms.test('ml'));
  });

  it('should match seconds:', function() {
    assert(re.s.test('seconds'));
    assert(re.s.test('second'));
    assert(re.s.test('sec'));
    assert(re.s.test('s'));
    assert(!re.s.test('ns'));
    assert(!re.s.test('ss'));
    assert(!re.s.test('ms'));
  });

  it('should match hours:', function() {
    assert(re.h.test('hours'));
    assert(re.h.test('hour'));
    assert(re.h.test('hr'));
    assert(re.h.test('h'));
  });

  it('should match days:', function() {
    assert(re.d.test('days'));
    assert(re.d.test('day'));
    assert(re.d.test('d'));
  });

  it('should match weeks:', function() {
    assert(re.w.test('weeks'));
    assert(re.w.test('week'));
    assert(re.w.test('wk'));
    assert(re.w.test('w'));
  });
});
