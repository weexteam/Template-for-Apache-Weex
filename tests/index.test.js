var wt = require('../src/index');
var expect = require('expect.js');

describe('test file initializing', function () {
  wt.initializing({
    skipPrompt: true,
    skipInstall: true,
    output: './tests/dest'
  });
  this.timeout(3000);
  it('test template copy', function (done) {

    setTimeout(function () {
     // expect(fs.existsSync('./tests/dest/package.json')).to.equal(true);
      var pkg = require('./dest/package.json'); 
      console.log(pkg.name);
      expect(pkg.name).to.be('weex-template');
      done();
    }, 2500);      
  });
});

