module.exports = function () {
  return {
    files: [
      'src/**/*.js',
      'tests/unit/fake-data/**/*.json',
    ],
    tests: [
      'tests/unit/**/*.spec.js',
    ],
    testFramework: 'mocha',
    env: {
      type: 'node',
    },
  };
};
