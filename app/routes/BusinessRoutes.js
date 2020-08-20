'use strict';
module.exports = (app) => {
    const Business = require('../controller/BusinessController.js');

    // Business Routes
    app.route('/businesses')
        .get(Business.list_all_businesses)
        .post(Business.create_business);

    app.route('/businesses/:businessId')
        .get(Business.get_one_business_by_id)
        .put(Business.update_business)
        .delete(Business.delete_business);
};
