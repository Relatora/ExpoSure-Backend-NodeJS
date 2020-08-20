'use strict'
const Venue = require('../model/VenueModel.js')

exports.list_all_venues = (req, res) => {
    Venue.getAllVenues((err, venue) => {
        console.log("Venue Controller")
        if (err) {
            res.send(err)
            console.log('res', venue)
        }
        res.send(venue)
    })
}

exports.create_venue = (req, res) => {
    let new_venue = new Venue(req.body)

    if (!new_venue.venue) {

        res.status(400).send({ error: true, message: 'Please provide Venue' })
    } else {
        Venue.createVenue(new_venue, (err, venue) => {

            if (err) res.send(err)

            res.json(venue)
        })
    }
}

exports.get_one_venue_by_id = (req, res) => {
    Venue.getVenueById(req.params.venueId, (err, venue) => {
        if (err)
            res.send(err)
        res.json(venue)
    })
}

exports.update_venue = (req, res) => {
    let update_venue = new Venue(req.body)
    Venue.updateById(req.params.venueId, update_venue, (err, venue) => {
        if (err)
            res.send(err)
        res.json(venue)
    })
}


exports.delete_venue = (req, res) => {

    Venue.remove(req.params.venueId, (err, venue) => {
        if (err)
            res.send(err)
        res.json({ message: 'Venue successfully deleted ' })
    })
}
