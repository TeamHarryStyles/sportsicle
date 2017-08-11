const http = require('http');
require('dotenv').config();

const app = require('./lib/app'); //TODO: initialize app file

const connect = require('./lib/connect'); //DONE: write connect file
connect(process.env.MONGODB_URI);
const server = http.createServer(app);

const port = process.env.PORT || 3000;

server.listen( port, () => {
    console.log('server is running on ', server.address().port);//eslint-disable-line
});