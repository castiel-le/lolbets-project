require("dotenv").config();

const fs = require('fs');

const serverCa = [fs.readFileSync(__dirname + "/DigiCertGlobalRootCA.crt.pem", "utf8")];

const dbUrl = process.env.dbUrl;
const dbUsername = process.env.dbUsername;
const dbPassword = process.env.dbPassword;
const database = process.env.database;

const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize(
    `mysql://${dbUsername}:${dbPassword}@${dbUrl}:3306/${database}`, {
    dialectOptions: {
        ssl: {
            ca: serverCa
        }
    }
});

/*(async function () {
    try {
        await sequelize.authenticate();
        console.log('Connection successfully established');
    } catch (error) {
        console.error('Unable to connect: ', error);
    }
})();*/

const Badge = sequelize.define('badge', {
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

(async function (){
    const badges = await Badge.findAll();
    console.log(badges.every(badge => badge instanceof Badge));
    console.log("All badges: ", JSON.stringify(badges, null, 2));
})();