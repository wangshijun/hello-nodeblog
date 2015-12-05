var express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose'),
    Post = mongoose.model('Post'),
    Category = mongoose.model('Category');

module.exports = function (app) {
    app.use('/posts', router);
};

router.get('/', function (req, res, next) {
    Post.find({ published: true })
        .sort('created')
        .populate('author')
        .populate('category')
        .exec(function (err, posts) {
            if (err) return next(err);

            var pageNum = Math.abs(parseInt(req.query.page || 1, 10));
            var pageSize = 10;

            var totalCount = posts.length;
            var pageCount = Math.ceil(totalCount / pageSize);

            if (pageNum > pageCount) {
                pageNum = pageCount;
            }

            res.render('blog/index', {
                posts: posts.slice((pageNum - 1) * pageSize, pageNum * pageSize),
                pageNum: pageNum,
                pageCount: pageCount,
                pretty: true,
            });
        });
});

router.get('/category/:name', function (req, res, next) {
    Category.findOne({ name: req.params.name }).exec(function (err, category) {
        if (err) {
            return next(err);
        }

        Post.find({ category: category, published: true })
            .sort('created')
            .populate('category')
            .populate('author')
            .exec(function (err, posts) {
                if (err) {
                    return next(err);
                }

                res.render('blog/category', {
                    posts: posts,
                    category: category,
                    pretty: true,
                });

            });
    });
});

router.get('/view', function (req, res, next) {
});

router.get('/comment', function (req, res, next) {
});

router.get('/favourite', function (req, res, next) {
});
