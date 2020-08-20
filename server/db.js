'user strict';

const mysql = require('mysql');

//local mysql db connection
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'ec2-user',
    password: 'Winter2020!',
    database: 'ExpoSure'
});

connection.connect(function (err) {
    if (err) throw err;

    console.log('CONNECTED to MySQL ExpoSure Database ...');
    console.log('Ready ...');
});

module.exports = connection;
