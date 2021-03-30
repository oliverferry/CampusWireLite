let User = require('../models/user')
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

router.post('/login', async (req, res) => {
    const {username, password} = req.body
    try {
        User.findOne({username, password}, (err, user) => {
            if (user) {
                req.session.username = username
                res.send(resObj(true, 'logged in'))
            } else {
                res.send(resObj(false, 'incorrect credentials'))
            }
            if (err) {
                next(err)
            }
        })
    } catch {
        res.send(resObj(false, 'error logging in'))
    }
})

router.post('/logout', auth.isAuthenticated(), async (req, res) => {
    try {
        req.session = null
        res.send(resObj(true, 'logout successful'))
    } catch {
        res.send('error occured when loggin out')
    }
})

router.post('/signup', async (req, res) => {
    const {username, password} = req.body
    try {
        await User.create({username, password})
        res.send(resObj(true, "user created"))
    } catch {
        res.send(resObj(false, "error creating account"))
    }
})

module.exports = router;
