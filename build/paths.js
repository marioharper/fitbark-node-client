const srcRoot = 'src/';
const testRoot = 'tests/';
const outputRoot = 'dist/';

module.exports = {
  src: `${srcRoot}**/*.js`,
  dist: outputRoot,
  unitTests: `${testRoot}unit/**/*.spec.js`,
};
