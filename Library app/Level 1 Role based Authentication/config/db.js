const mongoose = require("mongoose");
require("dotenv").config();

const connectToDB = mongoose.connect(process.env.DB_URL);

module.exports = connectToDB;
