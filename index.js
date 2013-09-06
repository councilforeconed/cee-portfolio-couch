#!/usr/bin/env node

var argv = require('optimist').argv;
var removeVELessonsFromCouch = require('./lib/remove-ve-lessons');

if (argv['remove-ve']) removeVELessonsFromCouch();