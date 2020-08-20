'use strict'
const Business = require('../model/BusinessModel.js')

exports.list_all_businesses = (req, res) => {
    Business.getAllBusinesses((err, business) => {
        console.log("Business Controller")
        if (err) {
            res.send(err)
            console.log('res', business)
        }
        res.send(business)
    })
}

exports.create_business = (req, res) => {
    let new_business = new Business(req.body)

    if (!new_business.business) {

        res.status(400).send({ error: true, message: 'Please provide Business' })
    } else {
        Business.createBusiness(new_business, (err, business) => {

            if (err) res.send(err)

            res.json(business)
        })
    }
}

exports.get_one_business_by_id = (req, res) => {
    Business.getBusinessById(req.params.businessId, (err, business) => {
        if (err)
            res.send(err)
        res.json(business)
    })
}

exports.update_business = (req, res) => {
    let update_business = new Business(req.body)
    Business.updateById(req.params.businessId, update_business, (err, business) => {
        if (err)
            res.send(err)
        res.json(business)
    })
}


exports.delete_business = (req, res) => {

    Business.remove(req.params.businessId, (err, business) => {
        if (err)
            res.send(err)
        res.json({ message: 'Business successfully deleted ' })
    })
}
