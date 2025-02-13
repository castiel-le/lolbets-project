require("dotenv").config();

// module imports
const { Sequelize } = require("sequelize");

// database variables
const dbUrl = process.env.dbURL;
const dbUsername = process.env.dbUsername;
const dbPassword = process.env.dbPassword;
const database = process.env.database;
const serverCa = process.env.certificate;

const sequelize = new Sequelize(
    `mysql://${dbUsername}:${dbPassword}@${dbUrl}:3306/${database}`, {
        dialectOptions: {
            ssl: {
                ca: serverCa
            }
        },
        logging: false
    });

module.exports = sequelize;