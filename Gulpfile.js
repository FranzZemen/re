const join = require('path').join;
const src = require('gulp').src;
const gulpBase = require('@franzzemen/gulp-base').init(require('./package.json'), 100, true);
const mocha = require('gulp-mocha');
require('@franzzemen/gulp-base').setMainBranch('main');

const npmu = require('@franzzemen/npmu').npmu;

exports.npmu = (cb) => npmu([
 /* {
    path: join(__dirname, '../gulp-base'), packageName: '@franzzemen/gulp-base',
  },*/ {
    path: join(__dirname, '../npmu'), packageName: '@franzzemen/npmu',
  }, {
    path: join(__dirname, '../app-utility'), packageName: '@franzzemen/app-utility',
  }, {
    path: join(__dirname, '../re-common'), packageName: '@franzzemen/re-common',
  }, {
    path: join(__dirname, '../re-data-type'), packageName: '@franzzemen/re-data-type',
  }, {
    path: join(__dirname, '../re-expression'), packageName: '@franzzemen/re-expression',
  }, {
    path: join(__dirname, '../re-condition'), packageName: '@franzzemen/re-condition',
  }, {
    path: join(__dirname, '../re-logical-condition'), packageName: '@franzzemen/re-logical-condition',
  }, {
    path: join(__dirname, '../re-rule'), packageName: '@franzzemen/re-rule',
  }, {
    path: join(__dirname, '../re-rule-set'), packageName: '@franzzemen/re-rule-set',
  },{
    path: join(__dirname, '../re-application'), packageName: '@franzzemen/re-application',
  },{
    path: join(__dirname, './'), packageName: '@franzzemen/re',
  }])
  .then(() => {
    console.log('cb...');
    cb();
  });

function test ()  {
  return src('./testing/**/*.test.js')
    .pipe(mocha());
}


exports.buildTest = gulpBase.buildTest;
exports.test = test;

exports.default = gulpBase.default;

exports.patch = gulpBase.patch;
exports.minor = gulpBase.minor;
exports.major = gulpBase.major;

exports.npmForceUpdateProject = gulpBase.npmForceUpdateProject;
exports.npmUpdateProject = gulpBase.npmUpdateProject;
