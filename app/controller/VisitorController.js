'use strict'
const Visitor = require('../model/VisitorModel.js')

exports.list_all_visitors = (req, res) => {
    Visitor.getAllVisitors((err, visitor) => {
        console.log("Visitor Controller")
        if (err) {
            res.send(err)
            console.log('res', visitor)
        }
        res.send(visitor)
    })
}

exports.create_visitor = (req, res) => {
    let new_visitor = new Visitor(req.body)

    if (!new_visitor.visitor) {

        res.status(400).send({ error: true, message: 'Please provide Visitor' })
    } else {
        Visitor.createVisitor(new_visitor, (err, visitor) => {

            if (err) res.send(err)

            res.json(visitor)
        })
    }
}

exports.get_one_visitor_by_id = (req, res) => {
    Visitor.getVisitorById(req.params.visitorId, (err, visitor) => {
        if (err)
            res.send(err)
        res.json(visitor)
    })
}

exports.update_visitor = (req, res) => {
    let update_visitor = new Visitor(req.body)
    Visitor.updateById(req.params.visitorId, update_visitor, (err, visitor) => {
        if (err)
            res.send(err)
        res.json(visitor)
    })
}


exports.delete_visitor = (req, res) => {

    Visitor.remove(req.params.visitorId, (err, visitor) => {
        if (err)
            res.send(err)
        res.json({ message: 'Visitor successfully deleted ' })
    })
}
