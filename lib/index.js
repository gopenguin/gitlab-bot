const createWebhook = require('node-gitlab-webhook');
const bunyan = require('bunyan');
const bunyanFormat = require('bunyan-format');

const resolve = require('./resolver');

const createRobot = require('./bot');
const createServer = require('./server');

module.exports = (options = {}) => {
    const logger = bunyan.createLogger({
        name: 'gitlab-bot',
        level: 'info',
        stream: bunyanFormat({outputMode: process.env.LOG_FORMAT || 'short'})
    });

    const webhook = createWebhook({path: options.webhookPath || '/', secret: options.secret || 'development'});
    const server = createServer(webhook);

    const defaultApps = [
        require('./plugin/log-all-events'),
        require('./plugin/comment-all-issues'),
        require('./plugin/comment-all-notes-from-bot')
    ];

    webhook.on('*', event => {
        receive(event);
    });

    let robots = [];

    function receive(event) {
        logger.info({event}, "Webhook received");

        return Promise.all(robots.map(robot => robot.receive(event)));
    }

    function load(plugin) {
        let childLogger;
        if (typeof plugin === 'string') {
            childLogger = logger.child({plugin: plugin});
            childLogger.info("Registering plugin");

            plugin = resolve(plugin, options);
        } else {
            childLogger = logger.child();
        }

        const robot = createRobot(options.usertoken, options.url, childLogger);
        plugin(robot);

        robots.push(robot);
    }

    return {
        server,

        start() {
            server.listen(options.port, () => {
                logger.info("Server is ready! Listening on port " + options.port);
            });
        },

        setup(apps) {
            apps.concat(defaultApps).forEach(app => load(app));
        }
    };
};