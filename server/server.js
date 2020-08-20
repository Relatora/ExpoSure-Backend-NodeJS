const express = require('express')
const mc = require('./db') // // connection configurations
const VenueRoutes = require('../app/routes/VenueRoutes')
const EventRoutes = require('../app/routes/EventRoutes')
const BusinessRoutes = require('../app/routes/BusinessRoutes')
const CategoryRoutes = require('../app/routes/CategoryRoutes')
const VisitorRoutes = require('../app/routes/VisitorRoutes')
const ProductRoutes = require('../app/routes/ProductRoutes')


const app = express()
const bodyParser = require('body-parser')

const port = process.env.PORT || 3000

app.listen(port)

console.log('API server started on: ' + port)

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// Register routes
VenueRoutes(app)
EventRoutes(app)
BusinessRoutes(app)
CategoryRoutes(app)
VisitorRoutes(app)
ProductRoutes(app)
