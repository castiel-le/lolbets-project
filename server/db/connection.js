require("dotenv").config();

const fs = require('fs');

const serverCa = [fs.readFileSync(__dirname + "/DigiCertGlobalRootCA.crt.pem", "utf8")];

const dbUrl = process.env.dbUrl;
const dbUsername = process.env.dbUsername;
const dbPassword = process.env.dbPassword;
const database = process.env.database;
var mysql = require('mysql')
var connection = mysql.createConnection({
    host: dbUrl,
    user: dbUsername,
    password: dbPassword,
    database: database,
    port: 3306,
    ssl: {
        ca: serverCa
    }
})

try {
    connection.connect()
} catch (exception) {
    console.error(exception);
}


connection.query('SELECT * FROM user', function (err, rows, fields) {
    if (err) throw err
    rows.forEach(user => console.log('Username is ', user.username));
})

connection.end()

module.exports = [
    connection,
];
/*const { Sequelize } = require("sequelize");
const fs = require('fs');

const sequelize = new Sequelize({
    "host": dbUrl,
    "port": 3306,
    "database": database,
    "user": dbUsername,
    "password": dbPassword,
    "dialect": "mysql",
    "ssl": true,
    "dialectOptions": {
        "ssl": {
            "require": true,
            "ca": [fs.readFileSync(__dirname + "/DigiCertGlobalRootCA.crt.pem", "utf8")]
        }
    }
});

(async function() {try {
    await sequelize.authenticate();
    console.log('Connection successfully established');
} catch(error){
    console.error('Unable to connect: ', error);
}})();*/