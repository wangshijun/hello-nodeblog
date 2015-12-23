var express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose'),
    Post = mongoose.model('Post');

module.exports = function (app) {
    app.use('/admin/users', router);
};

router.get('/login', function (req, res, next) {
    res.render('admin/user/login', {
    	pretty: true,
    });
});

router.post('/login', function (req, res, next) {
    res.jsonp(req.body);
});

router.get('/register', function (req, res, next) {
    res.render('admin/user/register', {
    	pretty: true,
    });
});

router.post('/register', function (req, res, next) {
    res.jsonp(req.body);
});

router.get('/logout', function (req, res, next) {
    // TODO
    res.redirect('/');
});
