const http = require('http');

const app = require('./lib/app'); //TODO: initialize app file

require('./lib/connect'); //TODO: write connect file

const server = http.createServer(app);

const port = 3000;

server.listen( port, () => {
    console.log('server is running on ', server.address().port);
});