'use strict'
const EventDetail = require('../model/EventDetailModel.js')

exports.list_all_event_details = (req, res) => {
    EventDetail.getAllEventDetails((err, event_detail) => {
        console.log("EventDetail Controller")
        if (err) {
            res.send(err)
            console.log('res', event_detail)
        }
        res.send(event_detail)
    })
}

exports.create_event_detail = (req, res) => {
    let new_event_detail = new EventDetail(req.body)

    if (!new_event_detail.event_detail) {

        res.status(400).send({ error: true, message: 'Please provide EventDetail' })
    } else {
        EventDetail.createEventDetail(new_event_detail, (err, event_detail) => {

            if (err) res.send(err)

            res.json(event_detail)
        })
    }
}

exports.get_one_event_detail_by_ids = (req, res) => {
    let search_param = new EventDetail(req.body)
    EventDetail.getEventDetailByIds(search_param, (err, event_detail) => {
        if (err)
            res.send(err)
        res.json(event_detail)
    })
}


exports.delete_event_detail = (req, res) => {
    let delete_event_detail = new EventDetail(req.body)
    EventDetail.remove(delete_event_detail, (err, event_detail) => {
        if (err)
            res.send(err)
        res.json({ message: 'EventDetail successfully deleted ' })
    })
}
