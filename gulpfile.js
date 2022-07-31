'use strict';

const gulp = require('gulp');
const build = require('@microsoft/sp-build-web');
const gutil = require('gulp-util');
const fs = require('fs');


build.addSuppression(`Warning - [sass] The local CSS class 'ms-Grid' is not camelCase and will not be type-safe.`);
build.addSuppression(`Warning - lint - src/extensions/dynamicCommandset/DynamicCommandset.ts(32,22): error @microsoft/spfx/no-async-await: Usage of "async" has overhead when using in older browsers.`);

var getTasks = build.rig.getTasks;
build.rig.getTasks = function () {
  var result = getTasks.call(build.rig);

  result.set('serve', result.get('serve-deprecated'));

  return result;
};

build.initialize(gulp);

build.tslintCmd.enabled = false;
