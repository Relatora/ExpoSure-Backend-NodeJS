'use strict';
module.exports = (app) => {
    const Visitor = require('../controller/VisitorController');

    // Visitor Routes
    app.route('/visitors')
        .get(Visitor.list_all_visitors)
        .post(Visitor.create_visitor);

    app.route('/visitors/:visitorId')
        .get(Visitor.get_one_visitor_by_id)
        .put(Visitor.update_visitor)
        .delete(Visitor.delete_visitor);
};
