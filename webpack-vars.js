const Path = require('path');

const PATHS = {
  MODULES: 'node_modules',
  THIRDPARTY: 'thirdparty',
  FILES_PATH: '../',
  ROOT: Path.resolve(),
  SRC: Path.resolve('client/src'),
  DIST: Path.resolve('client/dist'),
};

module.exports = PATHS;
