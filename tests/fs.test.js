var fs = require('../src/fs');
var expect = require('expect.js');
var fse = require('fs-extra');
describe('fs methods test', function () {
  it('test copy', function () {
    fs.copy('./tests/index.test.js', './tests/dest/index.test.js');
    expect(fs.exist('./tests/dest/index.test.js')).to.be(true);
  });
  it('test copy multiply files', function () {
    fs.copyMultiFile(['a.text','b'], './tests/source', './tests/dest');
    expect(fs.exist('./tests/dest/b/b.text')).to.be(true);
  });
  it('test directory structor', function () {
    fs.readDir('./tests/source');
    expect(Array.isArray(fs.readDir('./tests/source'))).to.be(true);
  });
  it('test file  replace ', function () {
    var replaceStr = 'TEST';
    fs.replaceFile('./tests/source/a.text', [{
      rule: /{{WEEX_APPNAME}}/,
      contents: replaceStr
    }]);
    var content = fse.readFileSync('./tests/source/a.text', {
      encoding: 'utf-8'
    });
    expect(content.search(replaceStr) >= 0).to.be(true);
  });
});
