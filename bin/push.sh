#!/bin/bash
FILES=./ddocs/ddoc-*.js

for f in $FILES
do
  echo "Processing $f file..."
  ./node_modules/couchapp/bin.js push $f http://$COUCHDB_USERNAME:$COUCHDB_PASSWORD@localhost:5984/cee_portfolio
done