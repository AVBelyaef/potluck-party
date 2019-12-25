const mongoose = require("mongoose");
mongoose.connect('mongodb://localhost:27017/potluckParty', { useNewUrlParser: true });

module.exports = mongoose.connection;
