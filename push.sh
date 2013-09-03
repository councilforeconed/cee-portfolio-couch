#!/bin/bash
FILES=./app*.js

for f in $FILES
do
  echo "Processing $f file..."
  ./node_modules/couchapp/bin.js push $f $COUCHDB
done