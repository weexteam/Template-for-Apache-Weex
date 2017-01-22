var wt = require('../src/index');
var expect = require('expect.js');
var fs = require('fs');

describe('test file initializing', function () {
  wt.initializing({
    skipPrompt: true,
    skipInstall: true,
    output: './tests/dest'
  });
  this.timeout(3000);
  it('test template copy', function () {
    it('test package.json', function (done) {
      setTimeout(function () {
        expect(fs.existsSync('./tests/dest/package.json')).to.equal(true);
        done();
      }, 2000);
      
    });
  });
});

