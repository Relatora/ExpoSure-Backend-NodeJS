'user strict'
var sql = require('../../server/db')

//Product object constructor
var Product = function (product) {
    this.product = product
}

Product.createProduct = (newProduct, result) => {
    let sqlQuery = "INSERT INTO Products(name,description,dimentions, price, QR_code, Businesses_business_id) VALUES (?,?,?,?,?,?)"
    sql.query(sqlQuery,
        [newProduct.product.name,
        newProduct.product.description,
        newProduct.product.dimentions,
        newProduct.product.price,
        newProduct.product.QR_code,
        newProduct.product.business_id], (err, res) => {
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

Product.getProductById = (productId, result) => {
    sql.query("Select * from Products where product_id = ? ", productId, (err, res) => {
        if (err) {
            console.log("error: ", err)
            result(err, null)
        }
        else {
            result(null, res)

        }
    })
}

Product.getAllProducts = (result) => {
    sql.query("Select * from Products", (err, res) => {

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

Product.updateById = (id, updatedProduct, result) => {
    let sqlQuery = "UPDATE Products SET name=?,description=?,dimentions=?, price=?, QR_code=?, Businesses_business_id=? WHERE product_id = ?"
    sql.query(sqlQuery,
        [updatedProduct.product.name,
        updatedProduct.product.description,
        updatedProduct.product.dimentions,
        updatedProduct.product.price,
        updatedProduct.product.QR_code,
        updatedProduct.product.business_id, id], (err, res) => {
            if (err) {
                console.log("error: ", err)
                result(null, err)
            }
            else {
                result(null, res)
            }
        })
}

Product.remove = (id, result) => {
    sql.query("DELETE FROM Products WHERE product_id = ?", [id], (err, res) => {

        if (err) {
            console.log("error: ", err)
            result(null, err)
        }
        else {

            result(null, res)
        }
    })
}

module.exports = Product
