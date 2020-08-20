'use strict';
module.exports = (app) => {
    const Category = require('../controller/CategoryController.js');

    // Category Routes
    app.route('/categories')
        .get(Category.list_all_categories)
        .post(Category.create_category);

    app.route('/categories/:categoryId')
        .get(Category.get_one_category_by_id)
        .put(Category.update_category)
        .delete(Category.delete_category);
};
