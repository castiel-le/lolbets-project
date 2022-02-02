#!/usr/bin/env node

var app = require("./app");
var http = require("http");
//const DAO = require("./db/conn");

const PORT = process.env.PORT || 3001;
app.set("port", normalizePort(PORT));

var server = http.createServer(app);
server.listen(normalizePort(PORT));
server.on("error", onError);
server.on("listening", onListening);

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

/**
  * Event listener for HTTP server "listening" event.
  */

async function onListening() {
    try {
        //let db = new DAO()
        //await db.connect("murals", "mtl_murals")
    } catch (e) {
        console.error("Could not connect to db")
        console.error(e)
        process.exit()
    }
    var addr = server.address();
    var bind = typeof addr === "string"
        ? "pipe " + addr
        : "port " + addr.port;
}
