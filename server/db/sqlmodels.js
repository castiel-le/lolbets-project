const sequelize = require("./connection");
const {DataTypes} = require("sequelize");


//Badge model
const Badge = sequelize.define("badge", {
    // Model attributes are defined here
    badge_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    badge_name: {
        type: DataTypes.STRING,
        allowNull: false
        // allowNull defaults to true
    },
    badge_image: {
        type: DataTypes.STRING,
        allowNull: false
    },  
}, {timestamps:false});

//Team model
const Team = sequelize.define("team", {
    //Model attributes
    team_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    team_name : {
        type: DataTypes.STRING,
        allowNull: false
    },
    logo: {
        type: DataTypes.STRING
    },
    abbreviation: {
        type: DataTypes.STRING
    },
    wins: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    losses: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {timestamps: false});

//Match model
const Match = sequelize.define("match", {
    //Model attributes
    match_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    team1_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    team2_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    winner_id: {
        type: DataTypes.INTEGER,
        defaultValue: null
    },
    match_start_time: {
        type: DataTypes.DATE,
        allowNull: false
    },
    in_progress: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    game_length: {
        type: DataTypes.INTEGER
    },
    pandascore_id: {
        type: DataTypes.INTEGER
    }
}, {timestamps: false});

//User model
const User = sequelize.define("user", {
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    date_created: {
        type: DataTypes.DATE,
        allowNull: false
    },
    profile_pic: {
        type: DataTypes.STRING
    },
    coins: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    user_role: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: true
    }
}, {timestamps: false});

// Bet participant model
const BetParticipant = sequelize.define("bet_participants", {
    bet_participant_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    bet_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: false
    },
    team_betted_on: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: false
    },
    amount_bet: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: false
    },
    creation_date: {
        type: DataTypes.DATE,
        allowNull: false
    },
}, {timestamps: false});

// Bet participant model
const Bet = sequelize.define("bets", {
    bet_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    creator_id: {
        type: DataTypes.INTEGER,
        allowNull: true
    },

    category_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: false
    },
    minimum_coins: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: false
    },
    maximum_coins: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: false
    },
    match_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    bet_locked: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    win_condition: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    win_condition2: {
        type: DataTypes.INTEGER,
        allowNull: true
    }
}, {timestamps: false});

// federated_credentials model
const FederatedCredentials = sequelize.define("federated_credentials", {
    federated_credentials_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: false
    },
    provider: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: false
    },
    profile_id: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: false
    },
}, {timestamps: false});

// Ban model
const Ban = sequelize.define("bans", {
    ban_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        defaultValue: false
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: false,
    },
    start_date: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: false
    },
    reason: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: false
    },
}, {timestamps: false});

// Timeout model
const Timeout = sequelize.define("timeouts", {
    timeouts_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        defaultValue: false
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: false,
    },
    start_date: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: false
    },
    end_date: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: false
    },
    reason: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: false
    },
}, {timestamps: false});

const Category = sequelize.define("categories", {
    category_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    category_name: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: false
    },
    category_description: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: false
    }
}, {timestamps: false});

module.exports = {Timeout, Ban, FederatedCredentials, Badge, Team, Match, User, BetParticipant, Bet, Category};
