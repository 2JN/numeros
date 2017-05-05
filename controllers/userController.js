var User = require('../models/user');
var bcrypt = require('bcryptjs');
var async = require('async');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

exports.user_login_get = function(req, res, next) {
  res.render('login');
}

passport.use(new LocalStrategy(
  function(username, password, done) {
    User.findOne({ username: username }, function(err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Unknown user.' });
      }

      bcrypt.compare(password, user.password, function(err, match) {
        if (err) { return done(err); }

        if (!match) {
          return done(null, false, { message: 'Invalid password.' });
        }

        return done(null, user);
      });
    });
  }
));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

exports.user_login_post = {
  authenticate: passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/users/login',
    failureFlash: true
  }),
  callback: function(req, res) {
    res.redirect('/');
  }
}

exports.user_logout_get = function(req, res, next) {
  req.logout();

  req.flash('success_msg', 'You are logged out');

  res.redirect('/users/login')
}

exports.user_register_get = function(req, res, next) {
  res.render('register');
}

exports.user_register_post = function(req, res, next) {
  req.checkBody('name', 'Name is required').notEmpty();
  req.checkBody('username', 'Username is required').notEmpty();
  req.checkBody('email', 'Email is required').notEmpty();
  req.checkBody('password', 'Password is required').notEmpty();

  req.checkBody('email', 'Email is not valid').isEmail();

  req.checkBody('password2', 'Passwords do not match')
    .equals(req.body.password);

  var errors = req.validationErrors();

  if (errors) {
    res.render('register', {
      errors: errors
    });
  } else {
    async.parallel(
      {
        encrypt: function(callback) {
          bcrypt.genSalt(10, function(err, salt) {
            bcrypt.hash(req.body.password, salt, callback);
          });
        }
      },

      function(err, results) {
        var user = new User({
          name: req.body.name,
          username: req.body.username,
          email: req.body.email,
          password: results.encrypt
        });

        user.save(function(err) {
          if (err) { return next(err); }

          req.flash('success_msg', 'You can now login');

          res.redirect('/users/login');
        });
      }
    );
  }
}
