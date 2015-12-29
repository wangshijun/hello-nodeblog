var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose'),
    User = mongoose.model('User');

module.exports.init = function () {
    console.log('passport.local.init');
    
    passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    }, function(email, password, done) {
        console.log('passport.local.find:', email);

        User.findOne({ email: email }, function (err, user) {
            console.log('passport.local.find:', user, err);
            if (err) {
                return done(err);
            }
            if (!user) {
                return done(null, false);
            }
            if (!user.verifyPassword(password)) {
                return done(null, false);
            }
            
            return done(null, user);
        });
    }));

    passport.serializeUser(function(user, done) {
        console.log('passport.local.serializeUser:', user);
        done(null, user._id);
    });

    passport.deserializeUser(function(id, done) {
        console.log('passport.local.deserializeUser:', id);
        User.findById(id, function (err, user) {
            done(err, user);
        });
    });
};
