import mysql from 'mysql2/promise'

const pool = mysql.createPool({
    host : 'localhost',
    user : 'usuario',
    password : 'senha',
    database : 'banco de dados'
})

export default pool;