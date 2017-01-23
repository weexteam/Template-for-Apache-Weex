// a helper to extend templates
var chalk = require('chalk');
var pathTo = require('path');
var inquirer = require('inquirer');
var exec = require('child-process-promise').exec;
var util = require('./util');
var fs = require('./fs');
// default params
var defaultOptions = {
  appname: pathTo.basename(process.cwd()),
  skipPrompt: false,
  skipInstall: false,
  template: 'vue-template',
  source: __dirname,
  output: pathTo.resolve(process.cwd())
};
var FILEMAP = 'filemap.json';
var questions = [
  {
    type: 'input',
    name: 'appname',
    message: 'Generate a weex example (' + defaultOptions.appname + ')?',
    default: defaultOptions.appname,
    required: true
  },
  {
    type: 'list',
    name: 'template',
    message: 'which template would you like to use?',
    choices: ['vue-template', 'weexpack-template']
  }
];
module.exports = {
  initializing: function (opts) {
    this.options = util.extend(opts, defaultOptions);
    if (this.options.skipPrompt) {
      return this.writing();
    }
    var self = this;
    inquirer.prompt(questions).then(function (result) {
      if (result.appname) {
        self.options.appname = result.appname;
        self.options.template = result.template;
        self.writing();
      }
    }).catch(function (err) {
      console.error(err);
    });
  },
  getTemplatePath: function () {
    return pathTo.join(__dirname, '..');
  },
  getDestPath: function () {
    return this.options.output;
  },
  // files proecss all files will be generate in here
  writing: function () {
    var templatePath = pathTo.join(this.getTemplatePath(), this.options.template),
        fileArr = [];
    if(fs.exist(pathTo.join(templatePath, FILEMAP))) {
      fileArr = require(pathTo.join(this.getTemplatePath(), this.options.template, FILEMAP)).files;
    } else {
      fileArr = fs.readDir(templatePath);
    }
    fs.copyMultiFile(fileArr, templatePath, this.getDestPath());
    fs.replaceFile(pathTo.join(this.getDestPath(), 'package.json'), [{
      rule: /{{WEEX_APPNAME}}/,
      contents: this.options.appname
    }]);
  },
  install: function () {
    var self = this;
    if (!this.options.skipInstall) {
      return exec('npm install').then(function (result) {
        var stdout = result.stdout;
        var stderr = result.stderr;
        console.log('stdout: ', stdout);
        console.log('stderr: ', stderr);
        self.end();
      }).catch(function (err) {
        console.error(err);
      });
    }
    this.end();
  },
  end: function () {
    console.log(chalk.bold('All is Ready!!!'));
  },
  // a method to copy
  copy: function(src,dest,callback) {
    fs.copy(src,dest,callback);  
  }
};
