'user strict'
var sql = require('../../server/db')

//Favorite object constructor
var Favorite = function (favorite) {
    this.favorite = favorite
}

Favorite.createFavorite = (newFavorite, result) => {
    let sqlQuery = "INSERT INTO Favorites(Expo_Events_event_id,Products_product_id,Visitors_visitor_id, note) VALUES (?,?,?,?)"
    sql.query(sqlQuery,
        [newFavorite.favorite.event_id,
        newFavorite.favorite.product_id,
        newFavorite.favorite.visitor_id,
        newFavorite.favorite.note], (err, res) => {
            if (err) {
                console.log("error: ", err)
                result(err, null)
            }
            else {
                console.log(res.insertId)
                result(null, res.insertId)
            }
        })
}


Favorite.getAllFavorites = (result) => {
    sql.query("Select * from favorite_view", (err, res) => {

        if (err) {
            console.log("error: ", err)
            result(null, err)
        }
        else {
            console.log('events : ', res)

            result(null, res)
        }
    })
}

Favorite.getFavoriteByIds = (searchParams, result) => {
    sql.query("Select * from Favorites where visitor_id= ? AND event_id= ? AND product_id=?",
        [searchParams.Favorite.visitor_id,
        searchParams.Favorite.product_id,
        searchParams.Favorite.event_id], (err, res) => {
            if (err) {
                console.log("error: ", err)
                result(err, null)
            }
            else {
                result(null, res)

            }
        })
}

//TODO: Get fav by three ids

Favorite.remove = (delParams, result) => {
    let sqlQuery = "DELETE FROM Favorites WHERE Expo_Events_event_id=? AND Products_product_id=? AND Visitors_visitor_id=?"
    sql.query(sqlQuery,
        [delParams.Favorite.event_id,
        delParams.Favorite.product_id,
        delParams.Favorite.visitor_id], (err, res) => {

            if (err) {
                console.log("error: ", err)
                result(null, err)
            }
            else {

                result(null, res)
            }
        })
}

module.exports = Favorite
