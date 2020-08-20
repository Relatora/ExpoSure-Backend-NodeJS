'use strict';
module.exports = (app) => {
    var expoEvent = require('../controller/EventController');

    // expoEvent Routes
    app.route('/expo_events')
        .get(expoEvent.list_all_events)
        .post(expoEvent.create_an_event);

    app.route('/expo_events/:eventId')
        .get(expoEvent.read_an_event)
        .put(expoEvent.update_an_event)
        .delete(expoEvent.delete_an_event);
};
