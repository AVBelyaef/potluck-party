const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const Users = require('../models/user');
// const sessionChecker = require('../middleware/auth');

const saltRounds = 10;

router.post('/signup', async (req, res) => {
  const { username, email, password } = req.body;
  const user = new Users(
    {
      username: username,
      email: email,
      password: await bcrypt.hash(password, saltRounds)
    }
  );

  const dbusername = await Users.findOne({ username });
  const dbemail = await Users.findOne({ email });
  if (dbusername && dbusername.username === username) {
    let message = 'Имя пользователя уже используется, выберите другое.';
    req.session.message = message;
    res.redirect('/party/signup');
  } else if (dbemail && dbemail.email === email) {
    let message = 'Email уже используется, пожалуйста, выберите другой.';
    req.session.message = message;
    res.redirect('/party/signup');
  } else {
    await user.save();
    req.session.user = user;
    res.redirect('/party');
  }
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await Users.findOne({ username });

  if (user && (await bcrypt.compare(password, user.password))) {
    req.session.user = user;
    res.redirect('/party');
  } else {
    let message = 'Вы не авторизованы, пожалуйста, проверьте ваше имя пользователя или пароль!';
    req.session.message = message;
    res.redirect('/party/login');
  }
});

router.get('/logout', async (req, res, next) => {
  if (req.session.user) {
    try {
      await req.session.destroy();
      res.clearCookie("user_sid");
      res.redirect("/");
    } catch (error) {
      next(error);
    }
  } else {
    res.redirect("/party/login");
  }
});


module.exports = router;