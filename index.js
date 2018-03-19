/*!
 * pretty-time <https://github.com/jonschlinkert/pretty-time>
 *
 * Copyright (c) 2015, 2018, Jon Schlinkert.
 * Released under the MIT License.
 */

'use strict';

const nano = require('nanoseconds');
const isNumber = require('is-number');
const utils = require('./utils');

module.exports = (time, smallest, digits) => {
  if (!isNumber(time) && !Array.isArray(time)) {
    throw new TypeError('expected an array or number in nanoseconds');
  }
  if (Array.isArray(time) && time.length !== 2) {
    throw new TypeError('expected an array from process.hrtime()');
  }

  if (isNumber(smallest)) {
    digits = smallest;
    smallest = null;
  }

  let num = isNumber(time) ? time : nano(time);
  let res = '';
  let prev;

  for (const uom of Object.keys(utils.scale)) {
    const step = utils.scale[uom];
    let inc = num / step;

    if (smallest && utils.isSmallest(uom, smallest)) {
      inc = utils.round(inc, digits);
      if (prev && (inc === (prev / step))) --inc;
      res += inc + uom;
      return res.trim();
    }

    if (inc < 1) continue;
    if (!smallest) {
      inc = utils.round(inc, digits);
      res += inc + uom;
      return res;
    }

    prev = step;

    inc = Math.floor(inc);
    num -= (inc * step);
    res += inc + uom + ' ';
  }

  return res.trim();
};
