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
    }
  },

  configuring: function() {
    this.projectType = this.projectType.toLowerCase();
  },

  writing: function() {
    var done = this.async();

    switch (this.projectType) {
      case 'angularjs':
        this.composeWith("redspark:angular", {options: {appName: this.appName}});
        break;

      case 'backbonejs':
        this.composeWith("redspark:backbone", {options: {appName: this.appName}});
        break;

      default:
        this.composeWith("redspark:angular", {options: {appName: this.appName}});
    }

    done();
  }

});