import { itActsAsFavoriteRestaurantModel } from './contract/favRestaurantContract';
import FavRestaurantIdb from '../src/scripts/data/favorite-restaurant-idb';

describe('Favorite Restaurant Idb Contract Test Implementation', () => {
  afterEach(async () => {
    (await FavRestaurantIdb.getAllRestaurants()).forEach(async (restaurant) => {
      await FavRestaurantIdb.deleteRestaurant(restaurant.id);
    });
  });

  itActsAsFavoriteRestaurantModel(FavRestaurantIdb);
});
