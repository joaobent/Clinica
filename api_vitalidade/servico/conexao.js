import mysql from 'mysql2/promise'

const pool = mysql.createPool({
    host : 'localhost',
    user : 'Clinica',
    password : 'clinica12345',
    database : 'clinica'
})

export default pool;