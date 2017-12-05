const express = require('express');
const morgan = require('morgan');

module.exports = function (webhook) {
    const app = express();

    app.use(morgan('dev'));
    app.use(webhook);
    app.get('/ping', (req, res) => {
        res.end('PONG');
    });

    return app;
};
