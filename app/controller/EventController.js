'use strict'
var ExpoEvent = require('../model/EventModel')

exports.list_all_events = (req, res) => {
    ExpoEvent.getAllEvents((err, expo_event) => {
        console.log("Event Controller")
        if (err) {
            res.send(err)
            console.log('res', expo_event)
        }
        res.send(expo_event)
    })
}

exports.create_an_event = (req, res) => {
    let new_event = new ExpoEvent(req.body)

    if (!new_event.expo_event) {
        // res.json(expo_event)
        res.status(400).send({ error: true, message: 'Please provide Expo Event' })
    } else {
        ExpoEvent.createEvent(new_event, (err, expo_event) => {
            console.log('HERE');
            if (err) res.send(err)

            res.json(expo_event)
        })
    }
}

exports.read_an_event = (req, res) => {
    ExpoEvent.getEventById(req.params.eventId, (err, expo_event) => {
        if (err)
            res.send(err)
        res.json(expo_event)
    })
}

exports.update_an_event = (req, res) => {
    let update_event = new ExpoEvent(req.body)
    ExpoEvent.updateById(req.params.eventId, update_event, (err, expo_event) => {
        if (err)
            res.send(err)
        res.json(expo_event)
    })
}


exports.delete_an_event = (req, res) => {

    ExpoEvent.remove(req.params.eventId, (err, expo_event) => {
        if (err)
            res.send(err)
        res.json({ message: 'Event successfully deleted ' })
    })
}
