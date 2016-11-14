module.exports = function (wallaby) {
  return {
    files: [
      'src/**/*.js',
      'test/fake-data/**/*.json'
    ],
    tests: [
      'test/**/*.js'
    ],
    testFramework: 'mocha',
    env: {
        type: 'node'
    }
  };
};