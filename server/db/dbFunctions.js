const models = require("./sqlmodels");
const { Op, Sequelize } = require("sequelize");

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
async function getRemainingUsers(pageNum) {
    const users = await models.User.findAll({
        offset: (pageNum - 1) * 10 + 5,
        limit: 10,
        order: [
            ["coins", "DESC"]
        ]
    });
    return users;
}

//Function to get number of users
async function getNumOfUsers() {
    const users = await models.User.count();
    return users;
}

//Function to get user by id
async function getUserById(id) {
    const user = await models.User.findOne({
        where: {
            /* eslint-disable */
            user_id: id
            /* eslint-enable */
        },
    });
    await setBetsStats(user);
    await setBan(user);
    await setTimeout(user);
    return user;
}

/**
 * Helper function to get the timeout of the user, if it exists
 * @param {Model} user 
 */
async function setTimeout(user) {
    const timeout = await models.Timeout.findOne({
        where: {
            user_id: user.dataValues.user_id,
            // only get Timeout that is still ongoing
            end_date: {
                [Op.gte]: new Date()
            }
        }
    });
    user.dataValues.timeout = timeout;
}

/**
 * Helper function to get the ban of the user, if it exists
 * @param {Model} user 
 */
async function setBan(user) {
    user.dataValues.banned = await models.Ban.findOne({
        where: {
            user_id: user.dataValues.user_id
        }
    });
}

/**
 * Helper function to get the bets placed for the user
 * @param {Model} user 
 */
async function setBetsStats(user) {
    const bets = await models.BetParticipant.count({
        where: {
            user_id: user.dataValues.user_id
        }
    });
    let rank = await models.User.count({
        where: {
            coins: {
                [Op.gt]:  user.dataValues.coins
            },       
        }
    })
    rank++;
    user.dataValues.bets_placed = bets;
    user.dataValues.rank = rank;
}

//Function to get user's bets history by id and with pagination
async function getUserBetsById(id, page, limit) {
    const limitNum = parseInt(limit);
    const pageNum = parseInt(page);
    const bets = await models.BetParticipant.findAll({
        offset: limitNum * (pageNum - 1),
        limit: limitNum,
        where: {
            user_id: id
        },
        order: [
            ["creation_date", "DESC"]
        ]
    })
    return await populateTeamOnBets(bets);
}

/**
 * Helper function to replace team_betted_on to team data.
 * @param {Object} bets Array of BetParticipant models
 * @returns Array of BetParticipant models with replaced team_betted_on
 */
async function populateTeamOnBets(bets) {
    for (let i = 0; i < bets.length; i++){
        const teamId = bets[i].dataValues.team_betted_on;
        const teamData = await getTeamById(teamId);
        bets[i].dataValues.team_betted_on = teamData;

        const matchData = await getMatchById(teamId)
        bets[i].dataValues.match = matchData;
    }
    return bets;
}

//Helper function to put team data inside of matches
async function swapTeamData(matches){
    for (let i = 0; i < matches.length; i++){
        // eslint-disable-next-line max-len
        matches[i].dataValues.match_start_time = new Date(matches[i].dataValues.match_start_time).valueOf();
        let team1string = await getTeamById(matches[i].dataValues.team1_id);
        let team2string = await getTeamById(matches[i].dataValues.team2_id);
        matches[i].dataValues.team1_id = team1string;
        matches[i].dataValues.team2_id = team2string;
    }
    return matches;
}

//Function to get match by id
async function getMatchById(id) {
    const match = await models.Match.findOne({
        where: {
            match_id: id
        }
    });
    return match;
}
/**
 * Function to check if user logged in before on the specified
 * provider.
 * @param {String} provider provider used to log in
 * @param {String} profileId the id of the user on
 * @returns FederatedCredentials record
 */
async function isUserExist(provider, profileId) {
    const row = await models.FederatedCredentials.findOne({
        where: {
            provider: provider,
            profile_id: profileId
        }
    });
    return row;
}

/**
 * Adds a new User record on the database
 * @param {String} username username of new user
 * @param {String} email email of new user
 * @param {String} profilePic profile pic url of new user
 * @returns User model of new user
 */
async function createUser(username, email, profilePic) {
    const newUser = await models.User.create({
        username: username,
        email: email,
        profile_pic: profilePic,
        coins: 1000,
        date_created: new Date()
    })
    return newUser;
}

/**
 * Creates a federated_credential on the database
 * @param {String} provider provider used to login
 * @param {String} profileId profile id from provider of user
 * @param {Number} userId user_id of user in db
 */
async function createFederatedCredentials(provider, profileId, userId) {
    await models.FederatedCredentials.create({
        provider: provider,
        profile_id: profileId,
        user_id: userId
    });
}

/**
 * Create a bet pariticpant if the user has not entered the bet yet
 * Edit the current bet if the user has already joing the bet
 * @param {Number} bet_id the id of the bet the user is joining
 * @param {Number} user_id the user id
 * @param {Number} team the team the user bet on
 * @param {Number} amount the amount the user bet
 */
async function updateOrCreateBetParticipant(bet_id, user_id, team, amount) {
    // First try to find the record
    const existingBetParticipant = await models.BetParticipant.findOne({
        where: {
            bet_id: bet_id,
            user_id: user_id
        }
    });
   
    if (!existingBetParticipant) {
        // Item not found, create a new one
        const betAdded = await models.BetParticipant.create({
            bet_id: bet_id,
            user_id: user_id,
            team_betted_on: team,
            amount_bet: amount,
            creation_date: Date.now()   
        });
        return {betAdded, created: true, ok: true}
    }
    existingBetParticipant.team_betted_on = team;
    existingBetParticipant.amount_bet = amount;
    existingBetParticipant.save();
    return {existingBetParticipant, created: false, ok: true};
}

/**
 * Remove a bet participant
 * @param {Number} bet_id the id of the bet the user is joining
 * @param {Number} user_id the user id
 * @returns JSON response telling if transaction succeeded
 */
async function destroyBetParticipant(bet_id, user_id) {
    // First try to find the record
    const existingBetParticipant = await models.BetParticipant.findOne({
        where: {
            bet_id: bet_id,
            user_id: user_id
        }
    });
    // destroy... sounds like they just nuke the poor db or something
    existingBetParticipant.destroy();
    return {destroyed: true, ok: true};
}

/**
 * Function that gets all bans from bans table sorted
 * by most recent start date.
 * @returns array of Ban models 
 */
async function getAllBans() {
    const bans = await models.Ban.findAll({
        order: [
            ["start_date", "DESC"]
        ]
    })
    await setUsers(bans)
    return bans;
}

/**
 * Function that gets all timeouts from bans table sorted
 * by most recent start date.
 * @returns array of Ban models 
 */
async function getAllTimeouts() {
    const timeouts = await models.Timeout.findAll({
        order: [
            ["start_date", "DESC"]
        ]
    })
    await setUsers(timeouts);
    return timeouts;
}

/**
 * Helper function that sets user_id into data
 * from User model
 * @param {Array} arrModels Array of sequelize models where to add User 
 */
async function setUsers(arrModels) {
    for (let i = 0; i < arrModels.length; i++) {
        arrModels[i].dataValues.user_id = await models.User.findOne({
            where: {
                user_id: arrModels[i].dataValues.user_id
            }
        })
    }
}


// eslint-disable-next-line max-len
module.exports = { getAllTimeouts, getAllBans, createFederatedCredentials, createUser, isUserExist, updateOrCreateBetParticipant, destroyBetParticipant, getMatchById, getUserBetsById, getBadges, getTeams, getTeamById, getTeamByName, getMatches, getUsers, getUserById, getMatchHistory, getMatchesAfter, getMatchesBetween, getTotalMatches, getWins, getTop5Users, getRemainingUsers, getNumOfUsers};
