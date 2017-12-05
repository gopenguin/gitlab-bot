#!/usr/bin/env node

const program = require('commander');

program
    .option('-p, --port <n>', 'Port to start the server on', process.env.PORT || 3000)
    .option('-w, --webhook-path <path>', 'URL path which receives webhooks. Ex: /webhook', process.env.WEBHOOK_PATH)
    .option('-s, --secret <secret>', 'Webhook secret of the GitLab App', process.env.WEBHOOK_SECRET)
    .parse(process.argv);

const createBot = require('../');

const bot = createBot({
    port: program.port
});

bot.setup();
bot.start();
