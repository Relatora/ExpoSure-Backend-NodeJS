'use strict'
const Product = require('../model/ProductModel.js')

exports.list_all_products = (req, res) => {
    Product.getAllProducts((err, product) => {
        console.log("Product Controller")
        if (err) {
            res.send(err)
            console.log('res', product)
        }
        res.send(product)
    })
}

exports.create_product = (req, res) => {
    let new_product = new Product(req.body)

    if (!new_product.product) {

        res.status(400).send({ error: true, message: 'Please provide Product' })
    } else {
        Product.createProduct(new_product, (err, product) => {

            if (err) res.send(err)

            res.json(product)
        })
    }
}

exports.get_one_product_by_id = (req, res) => {
    Product.getProductById(req.params.productId, (err, product) => {
        if (err)
            res.send(err)
        res.json(product)
    })
}

exports.update_product = (req, res) => {
    let update_product = new Product(req.body)
    Product.updateById(req.params.productId, update_product, (err, product) => {
        if (err)
            res.send(err)
        res.json(product)
    })
}


exports.delete_product = (req, res) => {

    Product.remove(req.params.productId, (err, product) => {
        if (err)
            res.send(err)
        res.json({ message: 'Product successfully deleted ' })
    })
}
