const express = require('express')
const app = express()
const port = 3000

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
  res.render('pages/dashboard');
});

app.get('/login', function(req, res) {
  res.render('pages/login');
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})