'use strict';

var generators = require('yeoman-generator');
var fs         = require('fs');
var path       = require('path');
var appPath    = path.join(process.cwd(), 'app');
var chalk      = require('chalk');

module.exports = generators.Base.extend({
  constructor: function() {
    generators.Base.apply(this, arguments);
  },

  configuring: {
    cleanHiddenFiles: function() {
      var hiddenFiles = ['Thumbs.db', '.DS_Store', '.yo-rc.json', '.gitignore', '.bowerrc', '.editorconfig', '.jshintrc'];
      hiddenFiles.forEach(function(filename) {
        var file = path.join(process.cwd(), filename);
        if (fs.existsSync(file)) {
          fs.unlinkSync(file);
        }
      });
    },

    copyFiles: function() {
      this.log('Criando estrutura em:\n' + this.destinationRoot());
      this.directory('', '');
    }
  },

  install: function() {
    this.log(chalk.yellow('\n======================================='));
    this.log('Installing dependencies:');
    this.log(chalk.yellow('======================================='));
    this.installDependencies();
  }

});