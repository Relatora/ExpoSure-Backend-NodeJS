'user strict'
var sql = require('../../server/db')

//Visitor object constructor
var Visitor = function (visitor) {
    this.visitor = visitor
}

Visitor.createVisitor = (newVisitor, result) => {
    let sqlQuery = "INSERT INTO Visitors(first_name,last_name) VALUES (?,?)"
    sql.query(sqlQuery,
        [newVisitor.visitor.first_name,
        newVisitor.visitor.last_name], (err, res) => {
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

Visitor.getVisitorById = (visitorId, result) => {
    sql.query("Select * from Visitors where visitor_id = ? ", visitorId, (err, res) => {
        if (err) {
            console.log("error: ", err)
            result(err, null)
        }
        else {
            result(null, res)

        }
    })
}

Visitor.getAllVisitors = (result) => {
    sql.query("Select * from Visitors", (err, res) => {

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

Visitor.updateById = (id, updatedVisitor, result) => {
    let sqlQuery = "UPDATE Visitors SET first_name= ?, last_name=? WHERE visitor_id = ?"
    sql.query(sqlQuery,
        [updatedVisitor.visitor.first_name,
        updatedVisitor.visitor.last_name, id], (err, res) => {
            if (err) {
                console.log("error: ", err)
                result(null, err)
            }
            else {
                result(null, res)
            }
        })
}

Visitor.remove = (id, result) => {
    sql.query("DELETE FROM Visitors WHERE visitor_id = ?", [id], (err, res) => {

        if (err) {
            console.log("error: ", err)
            result(null, err)
        }
        else {

            result(null, res)
        }
    })
}

module.exports = Visitor
