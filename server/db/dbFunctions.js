const models = require("./sqlmodels");
const { Op } = require("sequelize");

//Function to get all badges
async function getBadges() {
    const badges = await models.Badge.findAll();
    badges[0].dataValues.randomnewvalue = "hello";
    console.log(badges[0]);
    return badges;
}

//Function to get all teams
async function getTeams() {
    const teams = await models.Team.findAll();
    return teams;
}

//Function to get team data by id
async function getTeamById(id) {
    const team = await models.Team.findAll({
        where: {
            /* eslint-disable */
            team_id: id
            /* eslint-enable */
        }
    });
    // eslint-disable-next-line max-len
    team[0].dataValues.winrate = Math.round(await getWins(id) / await getTotalMatches(id) * 10000) / 100;
    return team[0];
}

//Function to get team data by name
async function getTeamByName(name) {
    const team = await models.Team.findAll({
        where: {
            // eslint-disable-next-line camelcase
            team_name: name
        }
    });
    return team;
}

//Function to get all matches
async function getMatches() {
    const matches = await models.Match.findAll();
    return swapTeamData(matches);
}

//Function to get match history from a specific team
async function getMatchHistory(id, pageNum) {
    const matches = await models.Match.findAll({
        offset: 15 * (pageNum - 1),
        limit: 15,
        where: {
            [Op.or]: [
                // eslint-disable-next-line camelcase
                { team1_id: id },
                { team2_id: id },
            ],
            in_progress: false
        },
        order: [
            ["match_start_time", "DESC"]
        ]
    });
    return swapTeamData(matches);
}

//Function to get all matches after a certain date
async function getMatchesAfter(date, pageNum) {
    const matches = await models.Match.findAll({
        offset: 15 * (pageNum - 1),
        limit: 15,
        where: {
            // eslint-disable-next-line camelcase
            match_start_time: {
                [Op.gte]: date.valueOf()
            }
        },
        order: [
            ["match_start_time", "DESC"]
        ]
    });
    return swapTeamData(matches);
}

//Function to get all matches between two dates
async function getMatchesBetween(afterthis, beforethis) {
    const matches = await models.Match.findAll({
        where: {
            // eslint-disable-next-line camelcase
            match_start_time: {
                [Op.gte]: afterthis,
                [Op.lte]: beforethis
            }
        },
        order: [
            ["match_start_time", "ASC"]
        ]
    });
    return swapTeamData(matches);
}

//Function to get total number of matches played for a specific team
async function getTotalMatches(id){
    const numOfMatches = await models.Match.count({
        where: {
            [Op.or]: [
                // eslint-disable-next-line camelcase
                { team1_id: id },
                // eslint-disable-next-line camelcase
                { team2_id: id }
            ]
        }
    })
    return numOfMatches;
}

//Function to get total number of wins
async function getWins(id){
    const wins = await models.Match.count({
        where: {
            // eslint-disable-next-line camelcase
            winner_id: id
        }
    });
    console.log(wins);
    return wins;
}

//Function to get all users
async function getUsers() {
    const users = await models.User.findAll();
    return users;
}

//Function to get top 5 users
async function getTop5Users() {
    const users = await models.User.findAll({
        limit: 5,
        order: [
            ["coins", "DESC"]
        ]
    });
    return users;
}

//Function to get remaining users, minus top 5
async function getRemainingUsers() {
    const users = await models.User.findAll({
        offset: 5,
        order: [
            ["coins", "DESC"]
        ]
    });
    return users;
}

//Function to get user by id
async function getUserById(id) {
    const user = await models.User.findAll({
        where: {
            /* eslint-disable */
            user_id: id
            /* eslint-enable */
        }
    });
    return user;
}


//Helper function to put team data inside of matches
async function swapTeamData(matches){
    for (let i = 0; i < matches.length; i++){
        // eslint-disable-next-line max-len
        matches[parseInt(i)].dataValues.match_start_time = new Date(matches[i].dataValues.match_start_time).valueOf();
        let team1string = await getTeamById(matches[parseInt(i)].dataValues.team1_id);
        let team2string = await getTeamById(matches[parseInt(i)].dataValues.team2_id);
        matches[parseInt(i)].dataValues.team1_id = team1string;
        matches[parseInt(i)].dataValues.team2_id = team2string;
    }
    return matches;
}

// eslint-disable-next-line max-len
module.exports = { getBadges, getTeams, getTeamById, getTeamByName, getMatches, getUsers, getUserById, getMatchHistory, getMatchesAfter, getMatchesBetween, getTotalMatches, getWins, getTop5Users, getRemainingUsers};