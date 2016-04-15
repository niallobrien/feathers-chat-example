'use strict';

const globalHooks = require('../../../hooks');


exports.before = {
  all: [
    // call global hook
    globalHooks.myHook()
  ],
  find: [],
  get: [],
  create: [],
  update: [],
  patch: [],
  remove: []
};

exports.after = {
  all: [],
  find: [],
  get: [],
  create: [],
  update: [],
  patch: [],
  remove: []
};
