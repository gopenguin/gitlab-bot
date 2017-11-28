const createServer = require('./server');

module.exports = (options = {}) => {
    const server = createServer();

    return {
        server,

        start() {
            server.listen(options.port)
        }
    };
};