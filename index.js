/*!
 * pretty-time <https://github.com/jonschlinkert/pretty-time>
 *
 * Copyright (c) 2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

var isNumber = require('is-number');

var scale = {
  w: 6048e11,
  d: 864e11,
  h: 36e11,
  m: 6e10,
  s: 1e9,
  ms: 1e6,
  μs: 1e3,
  ns: 1,
};

function pretty(time, round) {
  var num = (time[0] * 1e9) + time[1];
  var res = '', uom;

  for (uom in scale) {
    var val = scale[uom];

    var inc = +num / val;
    if (inc >= 1) {
      if (isNumber(round)) {
        return inc.toFixed(round) + uom;
      }
      res += inc + uom + ' ';
      num -= (inc * val);
    }
  }
  return res;
}

/**
 * Expose `pretty`
 */

module.exports = pretty;
