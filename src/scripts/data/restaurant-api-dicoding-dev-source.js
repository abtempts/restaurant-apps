import API_ENDPOINT from '../globals/api-endpoint';
import CONFIG from '../globals/config';

class RestaurantApiDicodingDevSource {
  static async nowOpenRestaurants() {
    const response = await fetch(API_ENDPOINT.NOW_OPEN);
    return response.json();
  }

  static async detailRestaurant(id) {
    const response = await fetch(API_ENDPOINT.DETAIL(id));
    // console.log(response);
    return response.json();
  }

  static async postRestaurant(data) {
    const rawResponse = await fetch(API_ENDPOINT.FAVORITE, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Auth-Token': CONFIG.KEY,
      },
      body: JSON.stringify(data),
    });
    return rawResponse;
  }
}

export default RestaurantApiDicodingDevSource;
