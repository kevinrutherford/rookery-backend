#! /bin/sh

DEBUG=express:router:route node_modules/.bin/ts-node-dev --exit-child --transpile-only --watch ./src ./src/index.ts &
pid=$!

trap "echo 'Caught signal; killing watcher'; kill ${pid}; exit 1" INT QUIT TERM
wait

