const express = require('express');
const router = express.Router();
const Entry = require('../models/party');

router.get('/:id/party', async (req, res) => {
    const party = await Entry.find({author: req.query.author});
    res.render('party/index', {party});
});

module.exports = router;