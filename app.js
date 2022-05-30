require("dotenv").config();

const express = require('express');
const bodyParser = require('body-parser');
const configuration = require('./config');
const router = require('./route/routes');
const { agenda, jobsReady } = require('./services/agendaServices');
//const expressValidator = require('express-validator');


//express
const app = express();
//app.use(expressValidator());
const PORT = configuration.port;

agenda;
jobsReady;

//config
require("./configs")

//middleware definition
app.use(bodyParser.json({ limit: '50MB' }));
app.use(bodyParser.urlencoded({ limit: '50MB', extended: false }));
app.use('/',router);




//starting the server at port defined in config.js
const server=app.listen( PORT,()=> {
    console.log(`server started at: http://localhost:${PORT}`);
});

async function graceful() {
    console.log("\nClosing server...");
    await server.close();
    console.log("Shutting down gracefully...");
    await agenda.stop();
    process.exit(0);
  }
  
  process.on("SIGTERM", graceful);
  process.on("SIGINT", graceful);