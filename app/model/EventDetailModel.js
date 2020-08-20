'user strict'
var sql = require('../../server/db')

//EventDetail object constructor
var EventDetail = function (event_detail) {
    this.event_detail = event_detail
}

EventDetail.createEventDetail = (newEventDetail, result) => {
    let sqlQuery = "INSERT INTO EventDetails(Expo_Events_event_id,Products_product_id,Visitors_visitor_id, note) VALUES (?,?,?,?)"
    sql.query(sqlQuery,
        [newEventDetail.event_detail.event_id,
        newEventDetail.event_detail.product_id,
        newEventDetail.event_detail.visitor_id,
        newEventDetail.event_detail.note], (err, res) => {
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


EventDetail.getAllEventDetails = (result) => {
    sql.query("Select * from event_view", (err, res) => {

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

EventDetail.getEventDetailByIds = (searchParams, result) => {
    sql.query("Select * from EventDetails where visitor_id= ? AND event_id= ? AND product_id=?",
        [searchParams.EventDetail.visitor_id,
        searchParams.EventDetail.product_id,
        searchParams.EventDetail.event_id], (err, res) => {
            if (err) {
                console.log("error: ", err)
                result(err, null)
            }
            else {
                result(null, res)

            }
        })
}

//TODO: Get fav by three ids

EventDetail.remove = (delParams, result) => {
    let sqlQuery = "DELETE FROM EventDetails WHERE Expo_Events_event_id=? AND Products_product_id=? AND Visitors_visitor_id=?"
    sql.query(sqlQuery,
        [delParams.EventDetail.event_id,
        delParams.EventDetail.product_id,
        delParams.EventDetail.visitor_id], (err, res) => {

            if (err) {
                console.log("error: ", err)
                result(null, err)
            }
            else {

                result(null, res)
            }
        })
}

module.exports = EventDetail
