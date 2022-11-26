const mysql = require('mysql')
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  port: 3306,
  password: '',
  database: 'caos'
})

connection.connect()

module.exports = connection;