require("dotenv").config();

// module imports
const fs = require("fs");
const { Sequelize } = require("sequelize");

// database variables
const dbUrl = process.env.dbUrl;
const dbUsername = process.env.dbUsername;
const dbPassword = process.env.dbPassword;
const database = process.env.database;
const serverCa = [fs.readFileSync(__dirname + "/DigiCertGlobalRootCA.crt.pem", "utf8")];

const sequelize = new Sequelize(
    `mysql://${dbUsername}:${dbPassword}@${dbUrl}:3306/${database}`, {
        dialectOptions: {
            ssl: {
                ca: serverCa
            }
        }
    });

module.exports = sequelize;