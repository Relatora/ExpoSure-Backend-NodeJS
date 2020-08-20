'user strict'
var sql = require('../../server/db')

//Category object constructor
var Category = function (category) {
    this.category = category
}

Category.createCategory = (newCategory, result) => {
    let sqlQuery = "INSERT INTO Categories(description) VALUES (?)"
    sql.query(sqlQuery,
        [newCategory.category.description], (err, res) => {
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

Category.getCategoryById = (categoryId, result) => {
    sql.query("Select * from Categories where category_id = ? ", categoryId, (err, res) => {
        if (err) {
            console.log("error: ", err)
            result(err, null)
        }
        else {
            result(null, res)

        }
    })
}

Category.getAllCategories = (result) => {
    sql.query("Select * from Categories", (err, res) => {

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

Category.updateById = (id, updatedCategory, result) => {
    let sqlQuery = "UPDATE Categories SET description= ? WHERE category_id = ?"
    sql.query(sqlQuery,
        [updatedCategory.category.description, id], (err, res) => {
            if (err) {
                console.log("error: ", err)
                result(null, err)
            }
            else {
                result(null, res)
            }
        })
}

Category.remove = (id, result) => {
    sql.query("DELETE FROM Categories WHERE category_id = ?", [id], (err, res) => {

        if (err) {
            console.log("error: ", err)
            result(null, err)
        }
        else {

            result(null, res)
        }
    })
}

module.exports = Category
