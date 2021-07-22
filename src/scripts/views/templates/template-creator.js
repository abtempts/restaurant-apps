import CONFIG from '../../globals/config';

const createRestaurantDetailTemplate = (detail) => ` 
<br/>
  <div class="restaurant_detail">  
    <img id="detail_img" class="lazyload lazysizes" alt="image ${detail.name}" 
    data-src="${CONFIG.BASE_IMAGE_URL_L + detail.pictureId}"/>
    <br/>
  <div class="restaurant__name"><b>${detail.name}</b></div>
  <div class="remarks">
  <span>⭐${detail.rating}</span>
  &nbsp;•<span>
    ${detail.categories
    .map(
      (category) => `
          <span>${category.name}</span>
        `,
    ).join('')}
  </span>
  &nbsp;•&nbsp;</span><span>${detail.city}</span>&nbsp;•&nbsp;</span><span>${detail.address}</span>
  </div>
  <article class="detail_desc">
    <p>${detail.description}</p>
  </article>
  <div style="padding-bottom:10px"></div>
  <table class="menu">
    <tr>
    <td>
    <h3>Foods</h3>
    <ul>
      ${detail.menus.foods.map((food) => `<li>•&nbsp;${food.name}</li>`).join(' ')}
    </ul> 
    </td>
    <td> 
    <h3>Drinks</h3>
    <ul>  
      ${detail.menus.drinks.map((drink) => `<li>•&nbsp;${drink.name}</li>`).join(' ')}
    </ul>
    </td>
    </tr>
  </table>  
  <div style="padding-bottom:10px"></div>
    <h3>Reviews</h3>
    <div class="review">
    ${detail.customerReviews
    .map(
      (review) =>
        `
        <div class="detail_review">
          <div>
            <p><i title="restaurant" class="fa fa-user-circle"></i>&nbsp;${review.name}</p>
            <p>${review.date}</p>
          </div>
          <div class="review-review">
            ${review.review}
          </div>
        </div>
      `,
    )
    .join('')}
    </div>
    </div>
    </div>
    <div style="padding-bottom:100px"></div>
    `;

const createRestaurantItemTemplate = (restaurant) => `

      
        <div class="restaurant_card" onclick="window.location.assign('#/detail/${restaurant.id}')">
        
        <div class="restaurant_img">
          
          <img id="detail__img" class="lazyload lazysizes" 
          alt="image ${restaurant.name}" 
          data-src="${CONFIG.BASE_IMAGE_URL + restaurant.pictureId}"
          />
        </div>
        <div class="restaurant_name">
          ${restaurant.name}
        </div>
        <p>${restaurant.city} <i class="fa fa-star" aria-hidden="true"></i> ${restaurant.rating}</p>
        <span id="restaurant_desc">${restaurant.description}</span>
        </div>
  `;

const createLikeButtonTemplate = () => `
  <button aria-label="like this restaurant" id="likeButton" class="like">
     <i class="fa fa-heart-o" aria-hidden="true"></i>
  </button>
`;

const createDislikeButtonTemplate = () => `
  <button aria-label="dislike this restaurant" id="likeButton" class="like">
    <i class="fa fa-heart" aria-hidden="true"></i>
  </button>
`;

export {
  createRestaurantItemTemplate, createRestaurantDetailTemplate
  , createLikeButtonTemplate, createDislikeButtonTemplate,
};
