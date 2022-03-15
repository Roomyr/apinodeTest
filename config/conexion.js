const mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'admin',
    port: 3306,
    database: 'angular5test'
});

connection.connect((err) => {
    if (err) {
        console.log('Error => ', err);
    } else {
        console.log('Connection succesfully...');
    }
});

module.exports = connection;