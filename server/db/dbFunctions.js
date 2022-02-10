const models = require("./sqlmodels");

//Function to get all badges
async function getBadges(){
    const badges = await models.Badge.findAll();
    return badges;
}

//Function to get all teams
async function getTeams(){
    const teams = await models.Team.findAll();
    return teams;
}

//Function to get team data by id
async function getTeamById(id){
    const team = await models.Team.findAll({
        where: {
            team_id: id
        }
    });
    return team;
}

//Function to get all matches
async function getMatches(){
    const matches = await models.Match.findAll();
    return matches;
}

//Function to get all users
async function getUsers(){
    const users = await models.User.findAll();
    return users;
}

//Function to get user by id
async function getUserById(id){
    const user = await models.User.findAll({
        where: {
            user_id: id
        }
    });
    return user;
}

module.exports = {getBadges, getTeams, getTeamById, getMatches, getUsers, getUserById};