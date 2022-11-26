module.exports = {
    validateUserStore: (req, res, next) => {
        const message = []
        // name min length 3
        if (!req.body.name || req.body.name.length < 3) {
            message.push('Please enter a name with min. 3 chars')
        }
        // password min 8 chars
        if (!req.body.password || req.body.password.length < 8) {
            message.push('Please enter a password with min. 8 chars')
        }
        // password (repeat) does not match
        if (!req.body.password_repeat || req.body.password != req.body.password_repeat) {
            message.push('Both passwords must match')
        }
        if(message.length) {
            return res.status(400).send({
                status: 'Failed',
                message: message
            })
        }
        next()
    }
}