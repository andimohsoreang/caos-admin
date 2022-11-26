const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000

app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');

const web = require('./routes/web.js')
app.use('/', web)

const api = require('./routes/api.js')
app.use('/api', api)

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))