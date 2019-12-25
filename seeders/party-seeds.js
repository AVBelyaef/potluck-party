const faker = require('faker');
const mongoose = require("mongoose");

mongoose.connect('mongodb://localhost:27017/potluckParty', { useNewUrlParser: true });

const Party = require('../models/party');

const party = [
  {
    name: faker.lorem.word(),
    location: faker.address.city(),
    startsAt: faker.date.future(),
  },
  {
    name: faker.lorem.word(),
    location: faker.address.city(),
    startsAt: faker.date.future(),
  },
  {
    name: faker.lorem.word(),
    location: faker.address.city(),
    startsAt: faker.date.future(),
  },
  {
    name: faker.lorem.word(),
    location: faker.address.city(),
    startsAt: faker.date.future(),
  },
  {
    name: faker.lorem.word(),
    location: faker.address.city(),
    startsAt: faker.date.future(),
  },
  {
    name: faker.lorem.word(),
    location: faker.address.city(),
    startsAt: faker.date.future(),
  },
  {
    name: faker.lorem.word(),
    location: faker.address.city(),
    startsAt: faker.date.future(),
  },
  {
    name: faker.lorem.word(),
    location: faker.address.city(),
    startsAt: faker.date.future(),
  },
  {
    name: faker.lorem.word(),
    location: faker.address.city(),
    startsAt: faker.date.future(),
  },

];

Party.insertMany(party).then(() => {
  mongoose.connection.close();
});