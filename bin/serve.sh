#!/bin/bash

./node_modules/couchapp/bin.js serve app.js http://$COUCHDB_USERNAME:$COUCHDB_PASSWORD@localhost:5984/cee_portfolio