const express = require('express');
const router = express.Router();
const Post = require('../Model/Posts');


//Get All of the Posts
router.get('/', async (request, response) => {
    try {
        const posts = await Post.find().limit(100).skip(0).exec();
        response.json(posts);
    } catch (err) {
        response.json({ message: err });
    }
});

// paginated results
router.get('/results', paginatedResults(Post), (req, res) => {
    res.json(res.paginatedResults)
});

//Delete Post
router.delete('/:postId', async (request, response) => {
    try {
        const removedPost = await Post.remove({ _id: request.params.postId });
        response.json(removedPost);
    } catch (err) {
        response.json({ message: err });
    }
});

// Update a post
router.put('/:postId', async (request, response) => {
    try {
        const putPost = await Post.updateOne(
            { _id: request.params.postId },
            {
                $set: {
                    jobtitle: request.body.jobtitle,
                    company: request.body.company,
                    companylink: request.body.companylink,
                    companyIcon: request.body.companyIcon,
                    location: request.body.location,
                    worktype: request.body.worktype,
                    jobcondition: request.body.jobcondition,
                    jobdescription: request.body.jobdescription,
                    postdate: request.body.postdate,
                    tags: request.body.tags,
                } }
        );
        response.json(putPost);
    } catch (err) {
        response.json({ message: err });
    }
});

// soft delete a post
router.put('/softdelete/:postId', async (request, response) => {
    try {
        const putPost = await Post.updateOne(
            { _id: request.params.postId },
            {
                $set: {
                    deleted: request.body.deleted
                }
            }
        );
        response.json(putPost);
    } catch (err) {
        response.json({ message: err });
    }
});

function paginatedResults(model) {
    return async (req, res, next) => {
        const page = parseInt(req.query.page)
        const limit = parseInt(req.query.limit)

        const startIndex = (page - 1) * limit
        const endIndex = page * limit

        const results = {}

        if (endIndex < await model.countDocuments().exec()) {
            results.next = {
                page: page + 1,
                limit: limit
            }
        }

        if (startIndex > 0) {
            results.previous = {
                page: page - 1,
                limit: limit
            }
        }
        try {
            results.results = await model.find().limit(limit).skip(startIndex).exec()
            res.paginatedResults = results
            next()
        } catch (e) {
            res.status(500).json({ message: e.message })
        }
    }
}

module.exports = router;