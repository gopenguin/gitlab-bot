#!/usr/bin/env node

const program = require('commander');

program
    .option('-p, --port <n>', 'Port to start the server on', process.env.PORT || 3000)
    .parse(process.argv);

const createBot = require('../');

const bot = createBot({
    port: program.port
});

bot.start();
