var exec = require('child_process').execSync;
var chalk = require('chalk');
module.exports = {
  // extend a object
  extend: function (src, defaults) {
    src = src || {};
    for (var k in defaults) {
      src[k] = src[k] || defaults[k];
    }
    return src;
  },
  // use command line to get user and email ref: https://github.com/vuejs/vue-cli/blob/master/lib/git-user.js
  getGitUer: function () {
    var name, 
      email;
    try {
      name = exec('git config --get user.name')
      email = exec('git config --get user.email')
    } catch (e) {}

    name = name && JSON.stringify(name.toString().trim()).slice(1, -1);
    email = email && (' <' + email.toString().trim() + '>');
    return (name || '') + (email || '');
  },
  
  echoScriptSCommand: function (path) {
    var pkg = require(path),
      npmPrefix = '$ npm run ';
    if(pkg.scripts && typeof pkg.scripts == 'object') {
      for(var k in pkg.scripts) {
        console.log(npmPrefix + k +  ': ' + chalk.grey(pkg.scripts[k]));
      }
    }
  }
  
};
