import NowOpen from '../views/pages/now-open';
import Favorite from '../views/pages/favorite';
import Detail from '../views/pages/detail';

const routes = {
  '/restaurant-apps/': NowOpen, // default page
  '/favorite': Favorite,
  '/detail/:id': Detail,
};

export default routes;
