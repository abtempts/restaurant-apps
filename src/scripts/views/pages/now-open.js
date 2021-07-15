import RestaurantApiDicodingDevSource from '../../data/restaurant-api-dicoding-dev-source';
import { createRestaurantItemTemplate } from '../templates/template-creator';

const NowOpen = {
  async render() {
    return `
      <div class="content">
        <h2 class="content__heading">Open Now</h2>
        <div id="restaurants" class="restaurants">
        </div>
      </div>
      <div style="padding-bottom:100px"></div>
    `;
  },

  async afterRender() {
    const restaurantsContainer = document.querySelector('#restaurants');
    try {
      const data = await RestaurantApiDicodingDevSource.nowOpenRestaurants();
      data.restaurants.forEach((restaurant) => {
        restaurantsContainer.innerHTML += '<div>';
        restaurantsContainer.innerHTML += createRestaurantItemTemplate(restaurant);
        restaurantsContainer.innerHTML += '</div>';
      });
    } catch (err) {
      restaurantsContainer.innerHTML = `Error: ${err}`;
    }
  },
};

export default NowOpen;
