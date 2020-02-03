const mongoose = require("mongoose");
require('dotenv').config();

const db = process.env.MONGODB_URL;

mongoose.connect(db, {
  useUnifiedTopology: true,
  useNewUrlParser: true
});

module.exports = mongoose.connection;

