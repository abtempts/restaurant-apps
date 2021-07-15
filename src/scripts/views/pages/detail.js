import UrlParser from '../../routes/url-parser';
import RestaurantApiDicodingDevSource from '../../data/restaurant-api-dicoding-dev-source';
import { createRestaurantDetailTemplate } from '../templates/template-creator';
import LikeButtonInitiator from '../../utils/like-button-initiator';
import FavoriteRestaurantIdb from '../../data/favorite-restaurant-idb';

const Detail = {
  async render() {
    return `
      <h2 class="content__heading">Detail</h2>
      <div id="restaurant" class="restaurant"></div>
      <div id="likeButtonContainer"></div>
    `;
  },

  async afterRender() {
    const restaurantContainer = document.querySelector('#restaurant');
    const url = UrlParser.parseActiveUrlWithoutCombiner();
    try {
      const data = await RestaurantApiDicodingDevSource.detailRestaurant(url.id);
      restaurantContainer.innerHTML += createRestaurantDetailTemplate(data.restaurant);
      await LikeButtonInitiator.init({
        likeButtonContainer: document.querySelector('#likeButtonContainer'),
        favoriteRestaurant: FavoriteRestaurantIdb,
        data,
      });
    } catch (err) {
      restaurantContainer.innerHTML = `file detail.js; Error: ${err}`;
    }
  },
};
export default Detail;
