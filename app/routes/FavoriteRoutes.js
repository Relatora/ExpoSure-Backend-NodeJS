'use strict';
module.exports = (app) => {
    const Favorite = require('../controller/FavoriteController');

    // Favorite Routes
    app.route('/favorites')
        .get(Favorite.list_all_favorites)
        .post(Favorite.create_favorite);

    app.route('/favorites/:visitorId/:eventId/:productId')
        .get(Favorite.get_one_favorite_by_ids)
        .delete(Favorite.delete_favorite);
};
