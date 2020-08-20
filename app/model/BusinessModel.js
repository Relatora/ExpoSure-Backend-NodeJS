'user strict'
var sql = require('../../server/db')

//Business object constructor
var Business = function (business) {
    this.business = business
}

Business.createBusiness = (newBusiness, result) => {
    let sqlQuery = "INSERT INTO Businesses(name,address,contact_name,contact_phone,contact_email,Categories_category_id) VALUES (?,?,?,?,?,?)"
    sql.query(sqlQuery,
        [newBusiness.business.name,
        newBusiness.business.address,
        newBusiness.business.contact_name,
        newBusiness.business.contact_phone,
        newBusiness.business.contact_email,
        newBusiness.business.category_id], (err, res) => {
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

Business.getBusinessById = (businessId, result) => {
    sql.query("Select * from Businesses where business_id = ? ", businessId, (err, res) => {
        if (err) {
            console.log("error: ", err)
            result(err, null)
        }
        else {
            result(null, res)

        }
    })
}

Business.getAllBusinesses = (result) => {
    sql.query("Select * from Businesses", (err, res) => {

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

Business.updateById = (id, updatedBusiness, result) => {
    let sqlQuery = "UPDATE Businesses SET name= ?, address=?, contact_name=?, contact_phone=?, contact_email=?, Categories_category_id=? WHERE business_id = ?"
    sql.query(sqlQuery,
        [updatedBusiness.business.name,
        updatedBusiness.business.address,
        updatedBusiness.business.contact_name,
        updatedBusiness.business.contact_phone,
        updatedBusiness.business.contact_email,
        updatedBusiness.business.category_id, id], (err, res) => {
            if (err) {
                console.log("error: ", err)
                result(null, err)
            }
            else {
                result(null, res)
            }
        })
}

Business.remove = (id, result) => {
    sql.query("DELETE FROM Businesses WHERE business_id = ?", [id], (err, res) => {

        if (err) {
            console.log("error: ", err)
            result(null, err)
        }
        else {

            result(null, res)
        }
    })
}

module.exports = Business
