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
    password_id: {
        type: DataTypes.INTEGER
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
    flagged: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    banned: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
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
        allowNull: false,
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

module.exports = {FederatedCredentials, Badge, Team, Match, User, BetParticipant};
