'use strict'
const Category = require('../model/CategoryModel.js')

exports.list_all_categories = (req, res) => {
    Category.getAllCategories((err, category) => {
        console.log("Category Controller")
        if (err) {
            res.send(err)
            console.log('res', category)
        }
        res.send(category)
    })
}

exports.create_category = (req, res) => {
    let new_category = new Category(req.body)

    if (!new_category.category) {

        res.status(400).send({ error: true, message: 'Please provide Category' })
    } else {
        Category.createCategory(new_category, (err, category) => {

            if (err) res.send(err)

            res.json(category)
        })
    }
}

exports.get_one_category_by_id = (req, res) => {
    Category.getCategoryById(req.params.categoryId, (err, category) => {
        if (err)
            res.send(err)
        res.json(category)
    })
}

exports.update_category = (req, res) => {
    let update_category = new Category(req.body)
    Category.updateById(req.params.categoryId, update_category, (err, category) => {
        if (err)
            res.send(err)
        res.json(category)
    })
}


exports.delete_category = (req, res) => {

    Category.remove(req.params.categoryId, (err, category) => {
        if (err)
            res.send(err)
        res.json({ message: 'Category successfully deleted ' })
    })
}
