require("dotenv").config();

const fs = require('fs');
const dbUrl = process.env.dbUrl;
const dbUsername = process.env.dbUsername;
const dbPassword = process.env.dbPassword;
const database = process.env.database;
const serverCa = [fs.readFileSync(__dirname + "/DigiCertGlobalRootCA.crt.pem", "utf8")];

var mysql = require('mysql')
var connection = mysql.createConnection({
    host: dbUrl,
    user: dbUsername,
    password: dbPassword,
    database: database,
    port: 3306,
    ssl: {
        rejectUnauthorized: true,
        ca: serverCa
    }
})

try {
    connection.connect()
} catch (exception) {
    console.error(exception);
}


connection.query('SELECT 1 + 1 AS solution', function (err, rows, fields) {
    if (err) throw err

    console.log('The solution is: ', rows[0].solution)
})

connection.end()

module.exports = [
    connection,
];