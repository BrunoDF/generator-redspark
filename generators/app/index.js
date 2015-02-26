'use strict';

var generators = require('yeoman-generator');
var fs         = require('fs');
var path       = require('path');
var appPath    = path.join(process.cwd(), 'app');
var chalk      = require('chalk');

module.exports = generators.Base.extend({
  constructor: function() {
    generators.Base.apply(this, arguments);
    this.config.save();

    this.options.selected = {};
  },

  prompting: {
    askForAppName: function() {
      var done = this.async();

      this.prompt({
        type    : 'input',
        name    : 'appName',
        message : 'Nome do projeto',
        default : this.appname
      }, function (result) {
        this.log('Nome escolhido: ' + chalk.bgCyan(chalk.black(' ' + result.appName + ' ')) + '\n');
        this.appName = this.options.selected.appName = result.appName;
        done();
      }.bind(this));
    },

    askForProjectType: function() {
      var done = this.async();

      this.prompt({
        type    : 'list',
        name    : 'projectType',
        message : 'Qual framework será utilizado',
        choices : ['AngularJS', 'BackboneJS'],
        default : 0,
        store   : true
      }, function (result) {
        this.log('Famework escolhido: ' + chalk.bgCyan(chalk.black(' ' + result.projectType + ' ')) + '\n');
        this.projectType = this.options.selected.projectType = result.projectType;
        done();
      }.bind(this));
    },

    askForExtraDependencies: function() {
      var done = this.async();

      this.prompt({
        type    : 'checkbox',
        name    : 'extraDeps',
        message : 'Alguma dependência abaixo te interessa?',
        choices : ['VideoJS', 'Animate-CSS', 'MomentJS', 'Quick-ng-repeat', 'Pace', 'Angular-spinner', 'Spin.JS', 'Angulartics'],
        default : 0,
        store   : true
      }, function (result) {
        this.log('Dependências extras: ' + chalk.bgCyan(chalk.black(' ' + result.extraDeps + ' ')) + '\n');
        this.extraDeps = this.options.selected.extraDeps = result.extraDeps;
        done();
      }.bind(this));
    }
  },

  configuring: function() {
    this.projectType = this.projectType.toLowerCase();
    this.extraDeps   = this.extraDeps.join(',').toLowerCase().split(',');
  },

  writing: function() {
    var done = this.async();

    switch (this.projectType) {
      case 'angularjs':
        this.composeWith("redspark:angular", {options: {appName: this.appName, extraDeps: this.extraDeps}});
        break;

      case 'backbonejs':
        this.composeWith("redspark:backbone", {options: {appName: this.appName, extraDeps: this.extraDeps}});
        break;
    }

    done();
  }

});