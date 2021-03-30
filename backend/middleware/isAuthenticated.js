const isAuthenticated = () => {
    return (req, res, next) => {
        if (req.session.username && req.session.username !== ''){
            next()
        } else {
            res.status(400).send('you must be authenticated')
        }
    }
}

exports.isAuthenticated = isAuthenticated