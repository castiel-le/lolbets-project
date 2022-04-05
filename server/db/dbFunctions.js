const models = require("./sqlmodels");
const {Op} = require("sequelize");

//Function to get all badges
async function getBadges() {
    const badges = await models.Badge.findAll();
    badges[0].dataValues.randomnewvalue = "hello";
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
    return await swapTeamData(matches);
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
    return await swapTeamData(matches);
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
    return await swapTeamData(matches);
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
    return await getBetAmount(await swapTeamData(await getBetIDForMatches(matches)));
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
            ["coins", "DESC"],
            ["date_created", "ASC"]
        ]
    });
    for (let i = 0; i < users.length; i++){
        let wins = 0;
        let losses = 0;
        const bets = await this.getAllBetsForUserWithMatchData(users[i].dataValues.user_id);
        if (bets.length !== 0) {
            for (let j = 0; j < bets.length; j++){
                if (bets[j].dataValues.team_betted_on === null){
                    continue;
                }
                if (bets[j].dataValues.match.dataValues.winner_id !== null){
                    if (bets[j].dataValues.team_betted_on.dataValues.team_id === bets[j].dataValues.match.dataValues.winner_id){
                        wins++;
                    } else {
                        losses++;
                    }
                }
            }
        }
        users[i].dataValues.wins = wins;
        users[i].dataValues.losses = losses;
    }
    return users;
}

//Function to get remaining users, minus top 5
async function getRemainingUsers(pageNum) {
    const users = await models.User.findAll({
        offset: (pageNum - 1) * 10 + 5,
        limit: 10,
        order: [
            ["coins", "DESC"],
            ["date_created", "ASC"]
        ]
    });
    for (let i = 0; i < users.length; i++){
        let wins = 0;
        let losses = 0;
        const bets = await this.getAllBetsForUserWithMatchData(users[i].dataValues.user_id);
        if (bets.length !== 0) {
            for (let j = 0; j < bets.length; j++){
                if(bets[j].dataValues.team_betted_on === null){
                    continue;
                }
                if (bets[j].dataValues.match.dataValues.winner_id !== null){
                    if (bets[j].dataValues.team_betted_on.dataValues.team_id === bets[j].dataValues.match.dataValues.winner_id){
                        wins++;
                    } else {
                        losses++;
                    }
                }
            }
        }
        users[i].dataValues.wins = wins;
        users[i].dataValues.losses = losses;
    }
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

async function getAllBetsForUser(userID) {
    const allBets = await models.BetParticipant.findAll({
        where: {
            user_id: userID,
        }
    })
    return allBets;
}

//Function to get user's bets history by id and with pagination
async function getUserBetsById(id, page, limit) {
    const limitNum = parseInt(limit);
    const pageNum = parseInt(page);
    const bets = await models.BetParticipant.findAll({
        offset: limitNum * (pageNum - 1),
        limit: limitNum,
        where: {
            user_id: id,
            team_betted_on: {
                [Op.not]: null
            }
        },
        order: [
            ["creation_date", "DESC"]
        ]
    })
    return await populateTeamOnBets(bets);
}

async function getAllBetsForUserWithMatchData(id) {
    const allBets = await models.BetParticipant.findAll({
        where: {
            user_id: id,
        }
    })
    return await populateTeamOnBets(allBets);
}
/**
 * Helper function to replace team_betted_on to team data.
 * @param {Object} bets Array of BetParticipant models
 * @returns Array of BetParticipant models with replaced team_betted_on
 */
async function populateTeamOnBets(bets) {
    for (let i = 0; i < bets.length; i++){
        // Get team data of team betted on
        const teamId = bets[i].dataValues.team_betted_on;
        if (teamId === null) {
            continue;
        }
        const teamData = await getTeamById(teamId);
        bets[i].dataValues.team_betted_on = teamData;

        // Get match data from bet
        const betOfBetParticipant = await models.Bet.findOne({
            where: {
                bet_id: bets[i].dataValues.bet_id
            }
        });
        const matchData = await getMatchById(betOfBetParticipant.dataValues.match_id)
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

async function getBetIDForMatches(matches) {
    for (let i = 0; i < matches.length; i++) {
        const betID = await models.Bet.findOne({
            where: {
                match_id: matches[i].dataValues.match_id,
            }
        });
        matches[i].dataValues.bet = betID;
    }
    return matches;
}

// Helper function to get total bet amount and total bet amount in team 1
async function getBetAmount(matches) {
    for (let i = 0; i < matches.length; i++) {
        try {
            const total = await models.BetParticipant.sum("amount_bet", {
                where: {
                    bet_id: matches[i].dataValues.bet.dataValues.bet_id
                } 
            });
            const team1Total = await models.BetParticipant.sum("amount_bet", {
                where: {
                    team_betted_on: matches[i].dataValues.team1_id.dataValues.team_id,
                    bet_id: matches[i].dataValues.bet.dataValues.bet_id
                }
            })
            matches[i].dataValues.total_bet = total;
            matches[i].dataValues.team1Total = team1Total;
        } catch (e) {
            continue;
        }
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
 * Function that returns all users that have a matching username to the keyword
 * @param {String} keyword word to search for
 * @returns Users Array that match the keyword
 */
async function searchUsersByKeyword(keyword) {
    const users = await models.User.findAll({
        where: {
            username:{
                [Op.like]: "%" + keyword + "%"
            }
        },
        order: [
            ["coins", "DESC"]
        ]
    });
    for (let i = 0; i < users.length; i++) {
        let rank = await models.User.count({
            where: {
                coins: {
                    [Op.gt]:  users[parseInt(i)].dataValues.coins
                },       
            }
        })
        rank++;
        users[parseInt(i)].dataValues.rank = rank;
    }
    return users;
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

async function getAllCustomBetsForUserWithMatchData(id) {
    const allBets = await models.BetParticipant.findAll({
        where: {
            user_id: id,
            category_id: {
                [Op.not]: 1
            }
        }
    });
    return await populateTeamOnBets(allBets);
}

/**
 * Creates a custom bet
 * @param {Number} creator_id bet creator user id
 * @param {Number} category_id win category id
 * @param {Number} match_id match associated to bet id
 * @param {Array} win_conditions values of win conditions
 * @returns the created bet
 */
async function createCustomBet(creator_id, category_id, match_id, win_conditions) {
    
    const existingCustomBet = await models.Bet.findOne({
        where: {
            creator_id: creator_id,
            match_id: match_id
        }
    })

    // If bet exists, modify it
    if (existingCustomBet) {
        existingCustomBet.category_id = category_id;
        existingCustomBet.win_condition = parseInt(win_conditions[0]);
        existingCustomBet.win_condition2 = win_conditions.length === 2 ? parseInt(win_conditions[1]) : null;
        existingCustomBet.save();
        return {created: false, ok: true};
    } else {
        // create a bet if it does not exist
        const customBetCreated = await models.Bet.create({
            creator_id: creator_id,
            category_id: category_id,
            minimum_coins: 1,
            maximum_coins: 999,
            match_id: match_id,
            bet_locked: false,
            win_condition: parseInt(win_conditions[0]),
            win_condition2: win_conditions.length === 2 ? parseInt(win_conditions[1]) : null
        });
        if (customBetCreated) {
            updateOrCreateBetParticipant(customBetCreated.bet_id, creator_id);
            return {customBetCreated: customBetCreated, created: true, ok: true};
        }
    }

    return {created: false, ok: false};
}

/**
 * Delete custom bet
 * @param {Number} bet_id id of custom bet
 * @returns destroyed status
 */
async function destroyExistingCustomBet(bet_id) {
    const existingCustomBet = await models.Bet.findOne({
        where: {
            bet_id: bet_id
        }
    });
    existingCustomBet.destroy();
    return {destroyed: true, ok: true};
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

    // get the match id for the bet
    const betInfo = await models.Bet.findOne({
        where: {
            bet_id: bet_id
        }
    });

    // get matchInfo based on bet id to see it's close time
    const matchInfo = await models.Match.findOne({
        where: {
            match_id: betInfo.match_id
        }
    });

    // if the match start time was in the past, do not allow the user to enter a bet
    const matchDateInEpoch = new Date(matchInfo.match_start_time).valueOf();
    if (matchDateInEpoch <= Date.now()) {
        return {created: false, ok: false};
    }
   
    if (!existingBetParticipant) {
        // Item not found, create a new one
        // if amount is not specifically defined, it is a custom bet which always costs 100 to enter
        try {
            const betAdded = await models.BetParticipant.create({
                bet_id: bet_id,
                user_id: user_id,
                team_betted_on: typeof team === "number" ? team : null,
                amount_bet: typeof amount === "number" ? amount : 100,
                creation_date: Date.now()   
            });
            console.log(betAdded)
            return {betAdded, created: true, ok: true}
        } catch (e) {
            console.log(e);
        }
        
    }
    if (existingBetParticipant) {
        existingBetParticipant.team_betted_on = team;
        existingBetParticipant.amount_bet = amount;
        existingBetParticipant.date_created = Date.now();
        existingBetParticipant.save();
        return {existingBetParticipant, created: false, ok: true};
    }
    return {created: false, ok: false};
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

/**
 * Creates a new Ban record on the database.
 * @param {Number} userId user_id of ban
 * @param {Date} startDate start_date of ban
 * @param {String} reason  reason of ban
 * @returns the Ban model after it is saved on db.
 */
async function createBan(userId, startDate, reason) {
    const newBan =  await models.Ban.create({
        user_id: userId,
        start_date: startDate,
        reason: reason
    })
    return newBan;
}

/**
 * Creates a new Timeout record on the database.
 * @param {Number} userId user_id of timeout
 * @param {Date} startDate start_date of timeout
 * @param {String} reason  reason of timeout
 * @returns the Timeout model after it is saved on db.
 */
async function createTimeout(userId, startDate, endDate, reason) {
    const newTimeout =  await models.Timeout.create({
        user_id: userId,
        start_date: startDate,
        end_date: endDate,
        reason: reason
    })
    return newTimeout;
}

/**
 * Removes a Ban record on the database.
 * @param {Number} banId ban_id of Ban record to be deleted
 * @returns true if successful. False otherwise.
 */
async function deleteBan(banId) {
    const rowsAffected = await models.Ban.destroy({
        where: {
            ban_id: banId
        }
    });
    return rowsAffected === 1;
}

/**
 * Removes a Timeout record on the database.
 * @param {Number} timeoutId timeouts_id of Ban record to be deleted
 * @returns true if successful. False otherwise.
 */
async function deleteTimeout(timeoutId) {
    const rowsAffected = await models.Timeout.destroy({
        where: {
            timeouts_id: timeoutId
        }
    });
    return rowsAffected === 1;
}

async function getCategories(){
    const categories = await models.Category.findAll({
        offset: 1
    });
    return categories;
}

/**
 * calculates payout percentage when a user is placing a custom bet
 * @param {Number} time1 defined if choosing category before or after
 * @param {Number} amount amount that will be bet 
 * @param {Number} time2 defined only if choosing between 2 times
 * @returns the payout the use will get if they place this bet and win
 */
async function getPayoutPercentageCustomBet(time1, amount, time2) {

    let returnObject = {before: parseInt(amount), after: parseInt(amount), between: parseInt(amount)};

    const countMatches = await models.Match.count();

    // if time 2 is passed into the function and is an int
    if (parseInt(time2)) {
        const countMatchesBetween = await models.Match.count({
            where: {
                game_length: {
                    [Op.between]: [time1, time2]
                },
                in_progress: 0
            }
        });
        const percentageBetween = countMatchesBetween / countMatches;
        returnObject.between = Math.round(Number(amount) + Number(amount) * (1 - percentageBetween));
    }

    const countMatchesBefore = await models.Match.count({
        where: {
            game_length: {
                [Op.lte]: time1
            },
            in_progress: 0
        }
    });

    const percentageBefore = countMatchesBefore / countMatches;

    // after is the inverse of before
    const percentageAfter = 1 - countMatchesBefore / countMatches;

    returnObject.before = Math.round(Number(amount) + Number(amount) * (1 - percentageBefore));
    returnObject.after = Math.round(Number(amount) + Number(amount) * (1 - percentageAfter));

    return returnObject;
}

/**
 * Makes a user follow another user
 * @param {Number} follower_id Person who's following id
 * @param {Number} following_id Person followed id
 * @returns Followed row
 */
async function followUser(follower_id, following_id) {
    const follow = await models.Follow.create({
        follower_id: follower_id,
        following_id: following_id
    });
    return follow;
}

/**
 * Unfollow a user
 * @param {Number} follower_id Person who's following id
 * @param {Number} following_id Person followed id
 * @returns Unfollowed row
 */
async function unfollowUser(follower_id, following_id) {
    const unfollow = await models.Follow.destroy({
        where: {
            follower_id: follower_id,
            following_id: following_id
        }
    });
    return unfollow;
}

/**
 * Get all users a user is following
 * @param {Number} follower_id Person who follows
 * @returns All Following users
 */
async function getAllFollowing(follower_id) {
    const follows = await models.Follow.findAll({
        where: {
            follower_id: follower_id
        }
    });
    for (let i = 0; i < follows.length; i++) {
        follows[i].dataValues.user = await getUserById(follows[i].dataValues.following_id);
    }
    return follows;
}



/**
 * Check if a user is following another user
 * @param {Number} follower_id 
 * @param {Number} following_id 
 * @returns 
 */
async function checkIfFollowing(follower_id, following_id) {
    try {
        const checkFollow = await models.Follow.findAll({
            where: {
                follower_id: follower_id,
                following_id: following_id
            }
        });
        if (checkFollow.length > 0) {
            return {"result": true};
        } else {
            return {"result": false};
        }
    } catch(e) {
        res.sendStatus(404);
    }
}

/**
 * Gets a user's most recent bet
 * @param {Number} user_id User to get most recent bet
 * @returns Given user's most recent bet
 */
async function getUserMostRecentBet(user_id) {
    const recentBet = await models.BetParticipant.findOne({
        where: {
            user_id: user_id,
            team_betted_on: {
                [Op.not]: null
            }
        },
        order: [
            ["creation_date", "DESC"]
        ]
    })
    return recentBet;
}

async function getMatchByBetId(bet_id) {
    const bet = await models.Bet.findOne({
        where: {
            bet_id: bet_id
        }
    });
    const match = await this.getMatchById(bet.dataValues.match_id);
    return match;
}

/**
 * Gets all following's most recent bet, with match data
 * @param {Number} follower_id Follower to get all following's recent bets
 * @returns Most recent following bets
 */
async function getAllFollowingRecentBet(follower_id) {
    const follows = await this.getAllFollowing(follower_id);
    for (let i = 0; i < follows.length; i++) {
        follows[parseInt(i)].dataValues.mostRecentBet = await this.getUserMostRecentBet(follows[parseInt(i)].dataValues.following_id);
        follows[parseInt(i)].dataValues.following_id = await this.getUserById(follows[parseInt(i)].dataValues.following_id); 
        if (follows[parseInt(i)].dataValues.mostRecentBet !== null) {
            follows[parseInt(i)].dataValues.mostRecentBet.dataValues.matchData = await this.getMatchByBetId(follows[parseInt(i)].dataValues.mostRecentBet.dataValues.bet_id);
        }
    }
    return follows;
}

// eslint-disable-next-line max-len
module.exports = { deleteBan, deleteTimeout, createTimeout, createBan, getAllTimeouts,
    getAllBans, getAllBetsForUser, createFederatedCredentials, createUser, isUserExist,
    updateOrCreateBetParticipant, destroyBetParticipant, getMatchById, getUserBetsById,
    getBadges, getTeams, getTeamById, getTeamByName, getMatches, getUsers, getUserById,
    getMatchHistory, getMatchesAfter, getMatchesBetween, getTotalMatches, getWins, getTop5Users,
    getRemainingUsers, getNumOfUsers, searchUsersByKeyword, getAllBetsForUserWithMatchData,
    createCustomBet, destroyExistingCustomBet, getAllCustomBetsForUserWithMatchData,
    getCategories, getPayoutPercentageCustomBet, followUser, unfollowUser, getAllFollowing,
    checkIfFollowing, getUserMostRecentBet, getAllFollowingRecentBet};
