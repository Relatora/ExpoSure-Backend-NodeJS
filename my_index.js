/**
 * RESTFUL Services by NodeJS
 * Author : Amr Abdallah
 * ExoSure Android App
 */
var express = require('express')
// import { express } from 'express'
var mysql = require('mysql')
var bodyParser = require('body-parser')
var ExpoPort = 3000

/**
 * Connect to mySQL
 */
var con = mysql.createConnection({
    host: 'localhost',
    user: 'ec2-user',
    password: 'Winter2020!',
    database: 'ExpoSure'
})

/**
 * Create RESTFUL
 */
var app = express()
var publicDir = (__dirname + '/public')
app.use(express.static(publicDir))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

/**
 * GET ALL Categories from DATABASE
 */
app.get("/categories", (req, res, next) => {
    con.query('SELECT * FROM Categories', function (error, result, fields) {
        con.on('error', function (err) {
            console.log('[MYSQL]ERROR', err);
        })
        if (result && result.length) {
            res.end(JSON.stringify(result))
        } else {
            console.log(error.message);
            res.end(JSON.stringify('No categories found'))
            console.log(error.message);
        }
    })
})

/** 
 *  SEARCH Categories by description
 */
app.post("/search_categories", (req, res, next) => {

    var post_data = req.body; // GET POST BODY
    // var description_search = post_data.search_categories // GET field 'search_categories' from post data
    var description_search = post_data.description // GET field 'search_categories' from post data

    var query = "SELECT * FROM Categories WHERE description LIKE '%" + description_search + "%'"


    con.query(query, function (error, result, fields) {
        con.on('error', function (err) {
            console.log('[MYSQL]ERROR', err);
        })
        if (result && result.length) {
            res.end(JSON.stringify(result))
        } else {
            res.end(JSON.stringify('No categories found'))
        }
    })
})

// Expo_Events ---------------------------------------------------------------------------

/**
 * GET ALL Expo_Events from DATABASE
 */
app.get("/Expo_Events", (req, res, next) => {
    con.query('SELECT * FROM Expo_Events ORDER BY date', function (error, result, fields) {
        con.on('error', function (err) {
            console.log('[MYSQL]ERROR', err);
        })
        if (result && result.length) {
            res.end(JSON.stringify(result))
        } else {
            res.end(JSON.stringify('No Events Found'))
        }
    })
})

/** 
 *  SEARCH Expo_Events by description
 */
app.post("/search_Expo_Events", (req, res, next) => {

    var post_data = req.body; // GET POST BODY
    var name_search = post_data.name // GET field 'name' from post data

    var query = "SELECT * FROM Expo_Events WHERE name LIKE '%" + name_search + "%' ORDER BY name"

    con.query(query, function (error, result, fields) {
        con.on('error', function (err) {
            console.log('[MYSQL]ERROR', err);
        })
        if (result && result.length) {
            res.end(JSON.stringify(result))
        } else {
            res.end(JSON.stringify('No Events Found'))
        }
    })
})

/**
 * Listening to port for requests 
 */
app.listen(ExpoPort, () => {
    console.log('ExpoSure API running on port -> ' + ExpoPort)
})


/*
- First, you would want to know which process is using port 3000

sudo lsof -i :3000


- this will list all PID listening on this port, once you have the PID you can terminate it with the following:

kill -9 {PID}

*/
