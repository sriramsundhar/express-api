#!/bin/sh
set -x
mongoIsUp="0"
while [ "$mongoIsUp" != 1 ];
do
    echo "Waiting for MongoDB to be ready ********************"
    sleep 5
    # Check if MongoDB is up
    mongoIsUp=$(mongosh mongodb://dbUser:changeMe@localhost:27017 --eval "db.adminCommand('ping')" --json | jq -r '.ok."$numberInt"')
    echo "mongoStatus $mongoIsUp"
done
echo "MongoDB is ready!!"