const mysql = require('mysql2');


var pool = mysql.createPool({
    "user": "root",
    "password": "root",
    "database": "ecomerce",
    "host": "localhost",
    "port": 3306
});



exports.pool = pool;