'use strict';
module.exports = (app) => {
    const Venue = require('../controller/VenueController');

    // Venue Routes
    app.route('/venues')
        .get(Venue.list_all_venues)
        .post(Venue.create_venue);

    app.route('/venues/:venueId')
        .get(Venue.get_one_venue_by_id)
        .put(Venue.update_venue)
        .delete(Venue.delete_venue);
};
