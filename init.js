require('dotenv').config();
// require('./lib/connect');
const superagent = require('superagent');
// const Player = require('./lib/models/player');
const fs = require('fs');

function waitOne(n) {
    return new Promise(resolve => {
        setTimeout(resolve, (n+1)*1010);
    });
}

let teamIds = [];

const standingsUrl = `http://api.sportradar.us/nba-t3/seasontd/2016/REG/standings.json?api_key=${process.env.SPORTRADAR_API_TOKEN}`;
const rostersUrl = (teamId) => `http://api.sportradar.us/nba-t3/teams/${teamId}/profile.json?api_key=${process.env.SPORTRADAR_API_TOKEN}`;
const playerUrl = (playerId) => `http://api.sportradar.us/nba-t3/players/${playerId}/profile.json?api_key=${process.env.SPORTRADAR_API_TOKEN}`;

// superagent.get(standingsUrl)
//     .then((res) => {
//         return res.body.conferences.reduce((teams, conference) => {
//             conference.divisions.forEach(division => {
//                 division.teams.forEach(team => {
//                     teams.push(team.id);
//                 });
//             });
//             return teams;
//         }, []);

//     })
//     .then(teamIds => {
//         teamIds.forEach((teamId, i) => {
//             const n = i;
//             setTimeout(() => {
//                 superagent.get(rostersUrl(teamId))
//                     .then(res => {
//                         fs.writeFile(`teams/team${n}.json`, JSON.stringify(res.body.players), error => {
//                             if(error) console.log(error);
//                         });
//                     })
//                     .catch(error => console.log('error', error.message));
//             }, (n + 1)*1010);
//         });
//     })
//     .catch(console.log);

// const files = fs.readdirSync('teams');
// const players = [];

// files.forEach(file => {
//     const teamPlayers = JSON.parse(fs.readFileSync(`teams/${file}`));
//     players.push(...teamPlayers);
// });
// fs.writeFile('teams/players.json', JSON.stringify(players));

const current = JSON.parse(fs.readFileSync('teams/players.json'));
const players = current.map(player => {
    let newPlayer = {
        _id: player._id,
        name: player.name,
        position: player.position,
        score: 0
    };
    return newPlayer;
});

fs.writeFile('teams/players.json', JSON.stringify(players));