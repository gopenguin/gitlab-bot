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
        require('./plugin/comment-all-issues')
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
        let pluginName;
        if (typeof plugin === 'string') {
            pluginName = plugin;
            plugin = resolve(plugin, options);
        }

        const robot = createRobot(options.usertoken, options.url, logger.child({plugin: pluginName}));
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

        setup() {
            defaultApps.map(app => load(app));
        }
    };
};