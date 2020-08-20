'use strict';
module.exports = (app) => {
    const Product = require('../controller/ProductController');

    // Product Routes
    app.route('/products')
        .get(Product.list_all_products)
        .post(Product.create_product);

    app.route('/products/:productId')
        .get(Product.get_one_product_by_id)
        .put(Product.update_product)
        .delete(Product.delete_product);
};
