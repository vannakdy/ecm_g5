
const mysql = require("mysql")

const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"db_test",
    port:"5306" // 3306 || 
})

module.exports = db;
