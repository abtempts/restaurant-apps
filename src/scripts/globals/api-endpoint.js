import CONFIG from './config';

const API_ENDPOINT = {
  NOW_OPEN: `${CONFIG.BASE_URL}list`,
  DETAIL: (id) => `${CONFIG.BASE_URL}detail/${id}`,
  FAVORITE: `${CONFIG.BASE_URL}review`,
};

export default API_ENDPOINT;
