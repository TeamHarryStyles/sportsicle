const http = require('http');
const db = require('./lib/db'); //TODO: write db file
const app = require('./lib/app'); //TODO: initialize app file

db.connect(url); // TODO: Establish url

const server = http.createServer();

const port = 3000;

server.listen( port, () => {
    console.log('server is running on ', server.address().port);
});