const mysql = require('mysql2')

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '123456'
  database: 'test',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
})