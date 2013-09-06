#!/usr/bin/env node

var argv = require('optimist').argv;

var child = require('child_process');
var sys = require('sys');

var couch = "http://" + process.env.COUCHDB_USERNAME + ":" + process.env.COUCHDB_USERNAME + "@localhost:5984/cee_portfolio";

function puts(err, stdout, stderr) {
  sys.print(stdout);
  sys.print(stderr);
  if (err) console.log('exec error: ' + error);
}

if (argv['purge-ve']) require('./lib/remove-ve-lessons')();
if (argv['push-all']) child.exec(__dirname + "/bin/push-all.sh", puts);

if (argv.s) child.spawn(__dirname + "/node_modules/couchapp/bin.js serve app.js " + couch);