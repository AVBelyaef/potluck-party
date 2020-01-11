const mongoose = require("mongoose");
// mongoose.connect('mongodb://localhost:27017/potluckParty', {useUnifiedTopology: true, useNewUrlParser: true});
const db = process.env.MONGODB_URL;

mongoose.connect(db, {
  useUnifiedTopology: true,
  useNewUrlParser: true
});

module.exports = mongoose.connection;

