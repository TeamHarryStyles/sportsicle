const connect = require('../../lib/connect');
const { execSync } = require('child_process');


let connection = null;

before(() => {
    return connect('mongodb://localhost:27017/sportsicle-test')
        .then(cn => connection = cn);
});

before(() => connection.dropDatabase());

before(() => {
    execSync('mongoimport --db sportsicle-test --collection players --drop --jsonArray --file teams/players.json');
    
});



after(() => connection.close());
