const express = require('express');
const router = express.Router();
const Party = require('../models/party');

router.get('/:id/party', async (req, res) => {
    const party = await Party.find({author: req.query.author});
    res.render('party/index', {party});
});

module.exports = router;
