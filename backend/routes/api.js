let Question = require('../models/question')
let auth = require('../middleware/isAuthenticated')

let router = require('express').Router();

router.get('/', function(req, res) {
    res.json({
        status: 'API Works',
        message: 'Welcome to FirstRest API'
    });
});

const resObj = (success, msg) => {
    return {
        'success': success,
        'message': msg
    }
}

router.get('/questions', function(req, res) {
    try {
        Question.find({}, (err, questions) => {
            if (err) {
                next(err)
            } else {
                res.send(questions)
            }
        })
    } catch (err) {
        res.status(500).send(err.message)
    }
});

router.post('/questions/add', auth.isAuthenticated(), async (req, res) => {
    const {question} = req.body
    const author = req.session.username
    try {
        await Question.create({
            "questionText": question,
            "answer": '',
            "author": author
        })
        res.send(resObj(true, "quesiton created"))
    } catch(err) {
        res.send(resObj(false, err.message))
    }
})

router.post('/questions/answer', auth.isAuthenticated(), async (req, res) => {
    const {id, answer} = req.body
    try {
        await Question.updateOne({_id: id}, {
            "answer": answer
        })
        res.status(200).send("answer updated")
    } catch(err) {
        res.status(500).send(err.message)
    }
})

module.exports = router;
