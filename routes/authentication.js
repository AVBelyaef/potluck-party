const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const Users = require('../models/user');
const { sessionCheckerAuth } = require('../middleware/auth');

const saltRounds = 10;

router
  .route('/signup')
  .get(sessionCheckerAuth, (req, res) => {
    const message = req.session.message;
    delete req.session.message;
    res.render('signup', { message });
  })

  .post(async (req, res) => {
    const { username, email, password } = req.body;
    const user = new Users(
      {
        username: username,
        email: email,
        password: await bcrypt.hash(password, saltRounds)
      }
    );
    let message;
    const dbusername = await Users.findOne({ username });
    const dbemail = await Users.findOne({ email });
    if (dbusername && dbusername.username === username) {
      message = 'Имя пользователя уже используется, выберите другое.';
      req.session.message = message;
      res.redirect('/signup');
    } else if (dbemail && dbemail.email === email) {
      message = 'Email уже используется, пожалуйста, выберите другой.';
      req.session.message = message;
      res.redirect('/signup');
    } else {
      await user.save();
      req.session.user = user;
      res.redirect('/party');
    }
  });

router
  .route('/login')
  .get(sessionCheckerAuth, (req, res) => {
    const message = req.session.message;
    delete req.session.message;
    res.render('login', { message });
  })

  .post(async (req, res) => {
    const { username, password } = req.body;
    const user = await Users.findOne({ username });

    if (user && (await bcrypt.compare(password, user.password))) {
      req.session.user = user;
      res.redirect('/party');
    } else {
      let message;
      message = 'Вы не авторизованы, пожалуйста, проверьте ваше имя пользователя или пароль!';
      req.session.message = message;
      res.redirect('/login');
    }
  });

router.get('/logout', async (req, res, next) => {
  if (req.session.user) {
    try {
      await req.session.destroy();
      res.clearCookie('user_sid');
      res.redirect('/');
    } catch (error) {
      next(error);
    }
  } else {
    res.redirect('/login');
  }
});


module.exports = router;
