'user strict'
var sql = require('../../server/db')

//Venue object constructor
var Venue = function (venue) {
    this.venue = venue
}

Venue.createVenue = (newVenue, result) => {
    let sqlQuery = "INSERT INTO Venues(name,address,contact_name,contact_phone,contact_email) VALUES (?,?,?,?,?)"
    sql.query(sqlQuery,
        [newVenue.venue.name,
        newVenue.venue.address,
        newVenue.venue.contact_name,
        newVenue.venue.contact_phone,
        newVenue.venue.contact_email], (err, res) => {
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

Venue.getVenueById = (venueId, result) => {
    sql.query("Select * from Venues where venue_id = ? ", venueId, (err, res) => {
        if (err) {
            console.log("error: ", err)
            result(err, null)
        }
        else {
            result(null, res)

        }
    })
}

Venue.getAllVenues = (result) => {
    sql.query("Select * from Venues", (err, res) => {

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

Venue.updateById = (id, updatedVenue, result) => {
    let sqlQuery = "UPDATE Venues SET name= ?, address=?, contact_name=?, contact_phone=?, contact_email=? WHERE venue_id = ?"
    sql.query(sqlQuery,
        [updatedVenue.venue.name,
        updatedVenue.venue.address,
        updatedVenue.venue.contact_name,
        updatedVenue.venue.contact_phone,
        updatedVenue.venue.contact_email, id], (err, res) => {
            if (err) {
                console.log("error: ", err)
                result(null, err)
            }
            else {
                result(null, res)
            }
        })
}

Venue.remove = (id, result) => {
    sql.query("DELETE FROM Venues WHERE venue_id = ?", [id], (err, res) => {

        if (err) {
            console.log("error: ", err)
            result(null, err)
        }
        else {

            result(null, res)
        }
    })
}

module.exports = Venue
