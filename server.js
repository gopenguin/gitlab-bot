const http = require('http');

server = http.createServer((req, res) => {
    res.end('Hello World');
});

server.listen(8080);

