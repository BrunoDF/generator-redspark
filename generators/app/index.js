'use strict';

var generators = require('yeoman-generator');
var fs         = require('fs');
var path       = require('path');
var appPath    = path.join(process.cwd(), 'app');
var chalk      = require('chalk');

// Questions data
var frameWorks = ['angularjs', 'backbonejs'];
var extraDeps  = ['videojs', 'animate-css', 'momentjs', 'quick-ng-repeat', 'pace', 'angular-spinner', 'spin.js', 'angulartics'];

// Sort array alphabetically
extraDeps.sort();

module.exports = generators.Base.extend({
  constructor: function() {
    generators.Base.apply(this, arguments);
    this.config.save();

    this.options.selected = {};

    // redspark
    this.log(chalk.grey('\n======================================='));
    this.log(chalk.red('======================================='));
    this.log(chalk.red('red') + chalk.white('spark') + chalk.grey(' generator'));
    this.log(chalk.red('======================================='));
    this.log(chalk.grey('=======================================\n'));
  },

  prompting: {
    askForAppName: function() {
      var done = this.async();

      this.prompt({
        type    : 'input',
        name    : 'appName',
        message : "What's the project name?",
        default : this.appname
      }, function (result) {
        this.log('Project name: ' + chalk.bgCyan(chalk.black(' ' + result.appName + ' ')) + '\n');
        this.appName = this.options.selected.appName = result.appName;
        done();
      }.bind(this));
    },

    askForProjectType: function() {
      var done = this.async();

      this.prompt({
        type    : 'list',
        name    : 'projectType',
        message : 'What framework will you use?',
        choices : frameWorks,
        default : 0,
        store   : true
      }, function (result) {
        this.log('Selected framework: ' + chalk.bgCyan(chalk.black(' ' + result.projectType + ' ')) + '\n');
        this.projectType = this.options.selected.projectType = result.projectType;
        done();
      }.bind(this));
    },

    askForExtraDependencies: function() {
      var done = this.async();

      this.prompt({
        type    : 'checkbox',
        name    : 'extraDeps',
        message : 'Need any of the deps below?',
        choices : extraDeps,
        default : 0,
        store   : true
      }, function (result) {
        if (result.extraDeps.length) {
          this.log('This extra deps will be added: ' + chalk.bgCyan(chalk.black(' ' + result.extraDeps + ' ')) + '\n');
        } else {
          this.log(chalk.bgCyan(chalk.black(' No extra deps will be added ')) + '\n');
        }

        this.extraDeps = this.options.selected.extraDeps = result.extraDeps

        done();
      }.bind(this));
    }
  },

  configuring: function() {
    this.projectType = this.projectType.toLowerCase();
    if (this.extraDeps.length) {
      this.extraDeps = this.extraDeps.join(',').toLowerCase().split(',');
    }
  },

  writing: function() {
    var done = this.async();

    switch (this.projectType) {
      case 'angularjs':
        this.composeWith("redspark:angular", {options: {appName: this.appName, projectType: this.projectType, extraDeps: this.extraDeps}});
        break;

      case 'backbonejs':
        this.composeWith("redspark:backbone", {options: {appName: this.appName, projectType: this.projectType, extraDeps: this.extraDeps}});
        break;
    }

    done();
  }

});