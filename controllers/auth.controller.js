const bcrypt = require('bcryptjs')
const model = require('../models/index')

module.exports = {
    login: async (req, res) => {
        // cek email
        const userData = await model.User.findOne({ where: { email: req.body.email } })
        if (userData === null) {
            req.flash('alert', {hex: '#f3616d', color: 'danger', status: 'Failed'})
            req.flash('message', 'Your email or password is incorrect!')
            res.redirect('/login')
        } else {
            // cek password
            bcrypt.compare(req.body.password, userData.password, async (err, result) => {
                if (result) {
                    // Jika data ditemukan, set sesi user tersebut menjadi true
                    req.session.loggedin = true;
                    req.session.userid = userData.uuid;
                    req.session.name = userData.name;
                    req.flash('alert', {hex: '#28ab55', color: 'success', status: 'Success'})
                    req.flash('message', 'Welcome to Admin CAOS!')
                    return res.redirect('/')
                }
                req.flash('alert', {hex: '#f3616d', color: 'danger', status: 'Failed'})
                req.flash('message', 'Your email or password is incorrect!')
                res.redirect('/login')
            })
        }
    },
    logout: (req, res) => {
        // Hapus sesi user dari browser
        req.session.destroy((err) => {
            if(err) {
                return console.log(err);
            }
            // Hapus cokie yang masih tertinggal
            res.clearCookie('secretName');
            res.redirect('/login');
        });
    }
}