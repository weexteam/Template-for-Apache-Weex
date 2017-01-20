// a file helper
var fse = require('fs-extra');
var chalk = require('chalk');
var pathTo = require('path');
module.exports = {
  /**
  * copy files to the destination path
  **/
  copy: function (src, dest, replaceObj) {
    fse.copySync(src, dest);
    console.log('Create: ' + chalk.grey(src + ' -> ' + dest));
  },
  copyMultiFile: function (arr, src, dest) {
    var self = this;
    arr.forEach(function (item) {
      console.log(src);
      self.copy(pathTo.join(src, item), pathTo.join(dest, item));
    });
  },
  fileReplace: function () {
    //
  },
  remove: function (path) {
    fse.remove(path);
  }
};