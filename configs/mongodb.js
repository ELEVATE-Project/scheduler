const mongoose = require("mongoose");

const dbConnection = mongoose.createConnection(
    process.env.MONGODB_URL,
    {
    useNewUrlParser: true
    }
);

dbConnection.on("error", function () {
    console.log("Database connection error:")
});

dbConnection.once("open", function () {
    console.log("Connected to DB");
});

module.exports = dbConnection;