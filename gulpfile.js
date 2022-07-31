'use strict';

const gulp = require('gulp');
const build = require('@microsoft/sp-build-web');
const gutil = require('gulp-util');
const fs = require('fs');

// read configuration of web part solution file
var pkgSolution = require('./config/package-solution.json');

var versionIndexes = pkgSolution.solution.version.split('.');

build.addSuppression(`Warning - [sass] The local CSS class 'ms-Grid' is not camelCase and will not be type-safe.`);
build.addSuppression(`Warning - lint - src/extensions/dynamicCommandset/DynamicCommandset.ts(32,22): error @microsoft/spfx/no-async-await: Usage of "async" has overhead when using in older browsers.`);

var getTasks = build.rig.getTasks;
build.rig.getTasks = function () {
  var result = getTasks.call(build.rig);

  result.set('serve', result.get('serve-deprecated'));

  return result;
};

build.initialize(gulp);

gulp.task('webpart-major', function (done) {
  gutil.log('Old Version:\t' + pkgSolution.solution.version);

  var majorIndex = versionIndexes[0];

  var newVersion = (Number(majorIndex) + 1).toString() + '.' + versionIndexes[1] + '.' + versionIndexes[2] + '.' + versionIndexes[3];

  pkgSolution.solution.version = newVersion;

  gutil.log('New Version:\t' + pkgSolution.solution.version);

  // write changed package-solution file
  fs.writeFile('./config/package-solution.json', JSON.stringify(pkgSolution), function (err, result) {
    if (err) {
      gutil.log('Error:\t' + err);
    }
  });

  done();
});

gulp.task('webpart-minor', function (done) {
  gutil.log('Old Version:\t' + pkgSolution.solution.version);

  var minorIndex = versionIndexes[1];

  var newVersion = versionIndexes[0] + '.' + (Number(minorIndex) + 1).toString() + '.' + versionIndexes[2] + '.' + versionIndexes[3];

  pkgSolution.solution.version = newVersion;

  gutil.log('New Version:\t' + pkgSolution.solution.version);

  // write changed package-solution file
  fs.writeFile('./config/package-solution.json', JSON.stringify(pkgSolution), function (err, result) {
    if (err) {
      gutil.log('Error:\t' + err);
    }
  });

  done();
});

gulp.task('webpart-build', function (done) {
  gutil.log('Old Version:\t' + pkgSolution.solution.version);

  var buildIndex = versionIndexes[2];

  var newVersion = versionIndexes[0] + '.' + versionIndexes[1] + '.' + (Number(buildIndex) + 1).toString() + '.' + versionIndexes[3];

  pkgSolution.solution.version = newVersion;

  gutil.log('New Version:\t' + pkgSolution.solution.version);

  // write changed package-solution file
  fs.writeFile('./config/package-solution.json', JSON.stringify(pkgSolution), function (err, result) {
    if (err) {
      gutil.log('Error:\t' + err);
    }
  });

  done();
});

gulp.task('webpart-revision', function (done) {
  gutil.log('Old Version:\t' + pkgSolution.solution.version);

  var revisionIndex = versionIndexes[3];

  var newVersion = versionIndexes[0] + '.' + versionIndexes[1] + '.' + versionIndexes[2] + '.' + (Number(revisionIndex) + 1).toString();

  pkgSolution.solution.version = newVersion;

  gutil.log('New Version:\t' + pkgSolution.solution.version);

  // write changed package-solution file
  fs.writeFile('./config/package-solution.json', JSON.stringify(pkgSolution), function (err, result) {
    if (err) {
      gutil.log('Error:\t' + err);
    }
  });

  done();
});

build.tslintCmd.enabled = false;
