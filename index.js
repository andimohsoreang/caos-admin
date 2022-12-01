const express = require('express')
const app = express()
const session = require('express-session');
const flash = require('connect-flash');
const bodyParser = require('body-parser')
const PORT = process.env.PORT || 3000

app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');

// config data http
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// config library session
app.use(session({
    secret:'caosBayesGakNgotak',
    saveUninitialized: true,
    resave: true,
    name: 'secretName',
    cookie: {
        sameSite: true,
        maxAge: 24 * 60 * 60 * 1000 // 24 hours
    },
}))
app.use(flash());
app.use((req, res, next) => {
    res.locals.alert = req.flash("alert");
    res.locals.message = req.flash("message");
    next();
});

const web = require('./routes/web.js')
app.use('/', web)

const api = require('./routes/api.js')
app.use('/api', api)

app.use((req, res, next) => {
    res.status(404);
    if (req.accepts('html')) {
      res.render('./errors/404');
      return;
    }
})

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`))