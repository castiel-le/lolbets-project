require("dotenv").config();

const fs = require('fs');

const serverCa = [fs.readFileSync(__dirname + "/DigiCertGlobalRootCA.crt.pem", "utf8")];

const dbUrl = process.env.dbUrl;
const dbUsername = process.env.dbUsername;
const dbPassword = process.env.dbPassword;
const database = process.env.database;

const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
    `mysql://${dbUsername}:${dbPassword}@${dbUrl}:3306/${database}`, {
    dialectOptions: {
        ssl: {
            ca: serverCa
        }
    }
});

(async function () {
    try {
        await sequelize.authenticate();
        console.log('Connection successfully established');
    } catch (error) {
        console.error('Unable to connect: ', error);
    }
})();