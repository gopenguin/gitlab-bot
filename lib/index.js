const createServer = require('./server');
const createWebhook = require('node-gitlab-webhook');

module.exports = (options = {}) => {
    const webhook = createWebhook({path: options.webhookPath || '/', secret: options.secret || 'development'});
    const server = createServer(webhook);

    webhook.on('*', event => {
        console.log(event);
    })

    return {
        server,

        start() {
            server.listen(options.port, () => {
                console.log("Server is ready! Listening on port " + options.port);
            })
        }
    };
};