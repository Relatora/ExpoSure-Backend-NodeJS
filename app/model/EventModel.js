'user strict'
var sql = require('../../server/db')

//Event object constructor
var ExpoEvent = function (expo_event) {
    this.expo_event = expo_event
}

ExpoEvent.createEvent = (newEvent, result) => {
    let sqlQuery = "INSERT INTO Expo_Events(name,location,contact_name,contact_phone,contact_email,date) VALUES (?,?,?,?,?,?)"
    sql.query(sqlQuery,
        [newEvent.expo_event.name,
        newEvent.expo_event.location,
        newEvent.expo_event.contact_name,
        newEvent.expo_event.contact_phone,
        newEvent.expo_event.contact_email,
        newEvent.expo_event.date], (err, res) => {
            if (err) {
                console.log("error: ", err)
                result(err, null)
            }
            else {
                console.log(res.insertId)
                result(null, res.insertId)
            }
        })
}

ExpoEvent.getEventById = (eventId, result) => {
    sql.query("Select * from Expo_Events where event_id = ? ", eventId, (err, res) => {
        if (err) {
            console.log("error: ", err)
            result(err, null)
        }
        else {
            result(null, res)

        }
    })
}

ExpoEvent.getAllEvents = (result) => {
    sql.query("Select * from Expo_Events", (err, res) => {

        if (err) {
            console.log("error: ", err)
            result(null, err)
        }
        else {
            console.log('events : ', res)

            result(null, res)
        }
    })
}

ExpoEvent.updateById = (id, updatedEvent, result) => {
    let sqlQuery = "UPDATE Expo_Events SET name= ?, location=?, contact_name=?, contact_phone=?, contact_email=?, date=? WHERE event_id = ?"
    sql.query(sqlQuery,
        [updatedEvent.expo_event.name,
        updatedEvent.expo_event.location,
        updatedEvent.expo_event.contact_name,
        updatedEvent.expo_event.contact_phone,
        updatedEvent.expo_event.contact_email,
        updatedEvent.expo_event.date, id], (err, res) => {
            if (err) {
                console.log("error: ", err)
                result(null, err)
            }
            else {
                result(null, res)
            }
        })
}

ExpoEvent.remove = (id, result) => {
    sql.query("DELETE FROM Expo_Events WHERE event_id = ?", [id], (err, res) => {

        if (err) {
            console.log("error: ", err)
            result(null, err)
        }
        else {

            result(null, res)
        }
    })
}

module.exports = ExpoEvent
