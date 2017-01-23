var fs = require('../src/fs');
var expect = require('expect.js');

describe('fs methods test', function () {
  it('test copy', function() {
    fs.copy('./tests/index.test.js','./tests/dest/index.test.js');
    expect(fs.exist('./tests/dest/index.test.js')).to.be(true);
  });
  it('test copy multiply files', function () {
    fs.copyMultiFile(['a.text','b'],'./tests/source','./tests/dest');
    expect(fs.exist('./tests/dest/b/b.text')).to.be(true);
  });
  it('test directory structor', function() {
    fs.readDir('./tests/source');
    expect(Array.isArray(fs.readDir('./tests/source'))).to.be(true);
  });
});