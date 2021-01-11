
import { DOMAIN_TITLE } from '@/.env';

// @shop Routes
import ShopPage from '@/pages/Shop.vue';
import BuildShopTemplate from '@/module/shop/BuildShopTemplate.vue';

export default {
  path: '/shop',
  name: 'shop',
  component: ShopPage,
  meta: { isAuth: true, title: `${DOMAIN_TITLE} | shop` },
  children: [
    {
      path: 'new-template',
      name: 'shop:template',
      component: BuildShopTemplate
    }
  ]
};
