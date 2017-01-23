// a file helper
var fse = require('fs-extra');
var fs = require('fs');
var chalk = require('chalk');
var pathTo = require('path');
module.exports = {
  /**
  * copy files to the destination path
  **/
  copy: function (src, dest, callback) {
    fse.copySync(src, dest);
    console.log('Create: ' + chalk.grey(src + ' -> ' + dest));
    if (typeof callback == 'function') {
      callback();
    }
  },
  copyMultiFile: function (arr, src, dest) {
    var self = this;
    arr.forEach(function (item) {
      self.copy(pathTo.join(src, item), pathTo.join(dest, item));
    });
  },
  fileReplace: function () {
    //
  },
  readDir: function(dirPath) {
    var files =  fse.readdirSync(dirPath);
    return files;
  },
  remove: function (path) {
    fse.remove(path);
  },
  exist: function (path) {
    return fs.existsSync(path);
  }
};
