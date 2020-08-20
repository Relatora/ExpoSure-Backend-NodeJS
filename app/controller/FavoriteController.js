'use strict'
const Favorite = require('../model/FavoriteModel.js')

exports.list_all_favorites = (req, res) => {
    Favorite.getAllFavorites((err, favorite) => {
        console.log("Favorite Controller")
        if (err) {
            res.send(err)
            console.log('res', favorite)
        }
        res.send(favorite)
    })
}

exports.create_favorite = (req, res) => {
    let new_favorite = new Favorite(req.body)

    if (!new_favorite.favorite) {

        res.status(400).send({ error: true, message: 'Please provide Favorite' })
    } else {
        Favorite.createFavorite(new_favorite, (err, favorite) => {

            if (err) res.send(err)

            res.json(favorite)
        })
    }
}

exports.get_one_favorite_by_ids = (req, res) => {
    let search_param = new Favorite(req.body)
    Favorite.getFavoriteByIds(search_param, (err, favorite) => {
        if (err)
            res.send(err)
        res.json(favorite)
    })
}


exports.delete_favorite = (req, res) => {
    let delete_favorite = new Favorite(req.body)
    Favorite.remove(delete_favorite, (err, favorite) => {
        if (err)
            res.send(err)
        res.json({ message: 'Favorite successfully deleted ' })
    })
}
