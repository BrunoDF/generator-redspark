'use strict';

var generators = require('yeoman-generator');
var fs         = require('fs');
var path       = require('path');
var appPath    = path.join(process.cwd(), 'app');
var chalk      = require('chalk');

module.exports = generators.Base.extend({
  constructor: function(args, options) {
    generators.Base.apply(this, arguments);

    this.appName     = options.appName;
    this.projectType = options.projectType;
    this.extraDeps   = options.extraDeps;
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

  install: {
    installDeps: function() {
      this.log(chalk.yellow('\n======================================='));
      this.log('Installing dependencies:');
      this.log(chalk.yellow('======================================='));
      this.installDependencies();
    },

    installExtraDeps: function() {
      if (this.extraDeps.length) {
        for (var i=0; i < this.extraDeps.length; i++) {
          this.bowerInstall([this.extraDeps[i]], {'save': true});
        }
      }
    }
  },

  end: function() {
    this.log(chalk.yellow('\n======================================='));
    this.log('Output:');
    this.log(chalk.yellow('=======================================\n'));

    this.log(chalk.yellow('> ') + chalk.white('Project name: ') + chalk.yellow(this.appName));
    this.log(chalk.yellow('> ') + chalk.white('Framework: ')    + chalk.yellow(this.projectType));

    if (this.extraDeps.length) {
      this.log(chalk.yellow('> ') + chalk.white('Extra deps: '));
      for (var i=0; i < this.extraDeps.length; i++) {
        this.log(chalk.yellow('  - ') + chalk.yellow(this.extraDeps[i]));
      }
    }

    this.log(chalk.yellow('\n=======================================\n'));
    this.log(chalk.bgGreen(chalk.black(' Finished ')));
  }

});