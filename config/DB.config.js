const mongoose = require("mongoose");
const mongoDB_URI = process.env.MONGODB_URI;
const catchAsync = require("../utilities/catch-async.utils");
const ConnectDB = mongoose
  .connect(mongoDB_URI)
  .then(console.log("Database Connected Successfully"));

module.exports = ConnectDB;
