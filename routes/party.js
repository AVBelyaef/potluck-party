const express = require('express');
const router = express.Router();
const Party = require('../models/party');
const moment = require('moment');
const { sessionChecker } = require('../middleware/auth');
console.log('Погналиииииии!!!!');

// party
router
  .route('/')
  .get(async function (req, res, next) {
    let party = await Party.mostRecent();
    party = party.map((p) => {
      p = p.toObject();
      p.startsAt = moment(p.startsAt).format('Do MMMM YYYY, h:mm a');
      return p;
    });
    res.render('party/index', { party });
  })

  .post(async function (req, res, next) {
    const newParty = new Party({
      name: req.body.name.toUpperCase(),
      location: req.body.location,
      startsAt: req.body.startsAt,
      creator: req.session.user.username,
    });
    await newParty.save();
    res.redirect(`/party/${newParty.id}`);
  });

//new party
router.get('/new', sessionChecker, function (req, res) {
  res.render('party/new');
});

//detail party
router
  .route('/:id')
  .get(sessionChecker, async function (req, res, next) {
    let isCreator = false;
    let party = await Party.findById(req.params.id);
    let isJoin = true;
    party = party.toObject();
    party.startsAt = moment(party.startsAt).format('Do MMMM YYYY, h:mm a');


    if (req.session.user && party.creator === req.session.user.username) {
      isCreator = true;
      res.render('party/show', { party, isCreator });
    } else if (req.session.user && party.join.some(join => join.name === req.session.user.username)) {
      isJoin = false;
      res.render('party/show', { party, isJoin });
    } else {
      res.render('party/show', { party, isJoin });
    }
  })

  .put(sessionChecker, async function (req, res) {
    let party = await Party.findById(req.body.id);
    party.name = req.body.name;
    party.location = req.body.location;
    party.startsAt = req.body.startsAt;
    await party.save();
    res.end();
  })

  .delete(sessionChecker, async function (req, res, next) {
    await Party.deleteOne({ '_id': req.params.id });
    res.end();
  });

// edit party
router.get('/:id/edit', sessionChecker, async function (req, res, next) {
  let party = await Party.findById(req.params.id);
  const startsAtFormatHTML5 = moment(party.startsAt).format(moment.HTML5_FMT.DATETIME_LOCAL);
  res.render('party/edit', { party, startsAtFormatHTML5 });
});

// join party
router
  .route('/:id/join')
  .get(sessionChecker, (req, res) => {
    const party = {};
    party.id = req.params.id;
    res.render('party/join', { party });
  })

  .post(async (req, res) => {
    let party = await Party.findById(req.params.id);
    party.join.push({
      name: req.session.user.username,
      bring: req.body.bring
    });
    await party.save();
    res.redirect(`/party/${req.params.id}`);
  });


module.exports = router;


