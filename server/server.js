var app = require("./app");
var http = require("http");
const sequelize = require("./db/connection");

// Set the port that the app will use
const PORT = process.env.PORT || 3001;
app.set("port", normalizePort(PORT));

// Sets up the http server
var server = http.createServer(app);
server.listen(normalizePort(PORT));
server.on("error", onError);
server.on("listening", onListening);

/**
  * Event listener for HTTP server "listening" event.
  */
async function onListening() {
    try {
        await sequelize.authenticate()
        console.log("Connection established with database")
    } catch (e) {
        console.error("Could not connect to db")
        console.error(e)
        process.exit()
    }
}

/**
 * Normalizes the port number used by the app
 * @param {number} val port number you want to normalize
 * @returns a normalized port number
 */
function normalizePort(val) {
    var port = parseInt(val, 10);

    if (isNaN(port)) {
        // named pipe
        return val;
    }

    if (port >= 0) {
        // port number
        return port;
    }

    return false;
}

/**
 * Displays an error if the server cannot start
 * @param {*} error Error message on why the api cannot start
 */
function onError(error) {
    if (error.syscall !== "listen") {
        throw error;
    }

    var bind = typeof PORT === "string"
        ? "Pipe " + PORT
        : "Port " + PORT;

    // handle specific listen errors with friendly messages
    switch (error.code) {
    case "EACCES":
        console.error(bind + " requires elevated privileges");
        process.exit(1);
        break;
    case "EADDRINUSE":
        console.error(bind + " is already in use");
        process.exit(1);
        break;
    default:
        throw error;
    }
}
