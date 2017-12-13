#!/usr/bin/env node

require('dotenv').config();

const pkgConf = require('pkg-conf');

const program = require('commander');

program
    .option('-p, --port <n>', 'Port to start the server on', process.env.PORT || 3000)
    .option('-w, --webhook-path <path>', 'URL path which receives webhooks. Ex: /webhook', process.env.WEBHOOK_PATH)
    .option('-s, --secret <secret>', 'Webhook secret of the GitLab App', process.env.WEBHOOK_SECRET)
    .option('--usertoken <usertoken>', 'Usertoken of the Gitlab Robot User', process.env.GITLAB_USERTOKEN)
    .option('--url <url>', 'Url of gitlab instance', process.env.URL)
    .parse(process.argv);

const createBot = require('../');

const bot = createBot({
    port: program.port,
    webhookPath: program.webhookPath,
    secret: program.secret,
    usertoken: program.usertoken,
    url: program.url
});

pkgConf('gitlab-bot').then(pkg => {
    bot.setup(program.args.concat(pkg.plugins || []));
    bot.start();
});
