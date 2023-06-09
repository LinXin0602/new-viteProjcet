import { createRouter, createWebHashHistory } from 'vue-router';

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/loginmanage',
      name: 'loginmanage',

      component: () => import('@/views/Backstage/LoginManage.vue'),
    },
    {
      path: '/dashboard',
      name: 'dashboard',

      component: () => import('@/views/Backstage/DashBoard.vue'),
      children: [
        {
          path: 'productdata',
          name: 'productdata',
          component: () => import('@/views/Backstage/ProductData.vue'),
        },
        {
          path: 'coupondata',
          name: 'coupondata',
          component: () => import('@/views/Backstage/CouponData.vue'),
        },
        {
          path: 'orderlist',
          name: 'orderlist',
          component: () => import('@/views/Backstage/OrderList.vue'),
        },
        {
          path: 'articledata',
          name: 'articledata',
          component: () => import('@/views/Backstage/ArticleData.vue'),
        },
      ],
    },
    {
      path: '/userboard',
      name: 'userboard',
      component: () => import('@/views/Front/UserBoard.vue'),
      children: [
        {
          path: '/',
          name: 'homeview',
          component: () => import('@/views/Front/HomeView.vue'),
        },
        {
          path: 'aboutview',
          name: 'aboutview',
          component: () => import('@/views/Front/AboutView.vue'),
        },
        {
          path: 'articlelistview',
          name: 'articlelistview',
          component: () => import('@/views/Front/ArticleListView.vue'),
        },
        {
          path: 'articleview/:id',
          name: 'articleview',
          component: () => import('@/views/Front/ArticleView.vue'),
        },
        {
          path: 'productlist',
          name: 'productlist',
          component: () => import('@/views/Front/ProductList.vue'),
        },
        {
          path: 'productintro/:id',
          name: 'productintro',
          component: () => import('@/views/Front/ProductIntro.vue'),
        },
        {
          path: 'favoriteview',
          name: 'favoriteview',
          component: () => import('@/views/Front/FavoriteView.vue'),
        },
        {
          path: 'checkout',
          name: 'checkout',
          component: () => import('@/views/Front/CheckOut.vue'),
        },
        {
          path: 'checkandpaying/:id',
          name: 'checkandpaying',
          component: () => import('@/views/Front/CheckAndPaying.vue'),
        },
        {
          path: 'checkoutfinish',
          name: 'checkoutfinish',
          component: () => import('@/views/Front/CheckOutFinish.vue'),
        },
      ],
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('@/views/NotFoundPage.vue'),
    },
  ],
});

export default router;
