const mongoose = require('mongoose');


const partySchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  startsAt: { type: Date, required: true },
  creator: { type: String, required: true },
  join: { type: Array },
});

partySchema.statics.mostRecent = async function () {
  const currentDate = new Date();
  return this.find({ startsAt: { $gte: currentDate } }).sort({ startsAt: 1 });
  // .limit(10).exec();
};

module.exports = mongoose.model('Party', partySchema);

