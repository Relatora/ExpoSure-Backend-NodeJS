'use strict';
module.exports = (app) => {
    const EventDetail = require('../controller/EventDetailController');

    // EventDetail Routes
    app.route('/event_details')
        .get(EventDetail.list_all_event_details)
        .post(EventDetail.create_event_detail);

    app.route('/event_details/:visitorId/:eventId/:productId')
        .get(EventDetail.get_one_event_detail_by_ids)
        .delete(EventDetail.delete_event_detail);
};
