const express = require('express');
const router = express.Router();
const Party = require('../models/party');

console.log('Погналиииииии!!!!');

// party
router.get('/', async function (req, res, next) {
  let party = await Party.mostRecent();
  // const party = await Party.find()
  // console.log(party);
  // res.send('hi')
  res.render('party/index', { party });
  // res.render('party/index');
});

router.post('/', async function (req, res, next) {
  // console.log(req.body);
  // console.log(req.session);

  const newParty = new Party({
    name: req.body.name,
    location: req.body.location,
    startsAt: req.body.startsAt,
    creator: req.session.user.username
  });
  await newParty.save();
  res.redirect(`/party/${newParty.id}`);
});

//new party
router.get('/new', function (req, res, next) {
  // console.log(req.body);
  res.render('party/new');
});

// render signup handle bars
router.get('/signup', (req, res) => {
  const message = req.session.message;
  delete req.session.message;
  res.render('signup', { message });
});

router.get('/login', (req, res) => {
  const message = req.session.message;
  delete req.session.message;
  res.render('login', { message });
});

router.get('/creator', async (req, res) => {
  const party = await Party.find({ creator: req.session.user.username });
  res.render('party/index', { party });
});

//detail party
router.get('/:id', async function (req, res, next) {
  let isCreator = false;
  let party = await Party.findById(req.params.id);
  if (req.session.user && party.creator === req.session.user.username) {
    isCreator = true;
    res.render('party/show', { party, isCreator });
  } else {
    party.creator = party.creator;
    res.render('party/show', { party });
  }

});

router.put('/:id', async function (req, res, next) {
  // let party = await Party.findById(req.params.id);
  let party = await Party.findById(req.body.id);
  console.log(party, '........................................................');
  party.name = req.body.name;
  party.locarion = req.body.locarion;
  party.startsAt = req.body.startsAt;

  await party.save();
  res.end();
});

router.delete('/:id', async function (req, res, next) {
  await Party.deleteOne({ '_id': req.params.id });
  res.redirect('/');
});

router.get('/:id/edit', async function (req, res, next) {
  let party = await Party.findById(req.params.id);
  res.render('party/edit', { party });
});

module.exports = router;


