function cookiesCleaner(req, res, next) {
  if (req.cookies.user_sid && !req.session.user) {
    res.clearCookie('user_sid')
  }
  next();
}

const sessionChecker = (req, res, next) => {
  if (req.session.user) {
    next();
  } else {
    res.redirect('/party');
  }
};

const sessionCheckerAuth = (req, res, next) => {
  if (req.session.user) {
    res.redirect('/party');
  } else {
    next();
  }
};

module.exports = {
  sessionChecker,
  sessionCheckerAuth,
  cookiesCleaner,
};
