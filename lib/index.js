const createWebhook = require('node-gitlab-webhook');

const resolve = require('./resolver');

const createRobot = require('./bot');
const createServer = require('./server');

module.exports = (options = {}) => {
    const webhook = createWebhook({path: options.webhookPath || '/', secret: options.secret || 'development'});
    const server = createServer(webhook);

    const defaultApps = [
        require('./plugin/log-all-events'),
    ];

    webhook.on('*', event => {
        receive(event);
    });

    let robots = [];

    function receive(event) {
        return Promise.all(robots.map(robot => robot.receive(event)));
    }

    function load(plugin) {
        if (typeof plugin === 'string') {
            plugin = resolve(plugin, options);
        }

        const robot = createRobot(options.usertoken, options.url);
        plugin(robot);

        robots.push(robot);
    }

    return {
        server,

        start() {
            server.listen(options.port, () => {
                console.log("Server is ready! Listening on port " + options.port);
            });
        },

        setup() {
            defaultApps.map(app => load(app));
        }
    };
};