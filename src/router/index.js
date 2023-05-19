import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('@/views/AboutView.vue'),
    },
    {
      path: '/loginmanage',
      name: 'loginmanage',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('@/views/Backstage/LoginManage.vue'),
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
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
  ],
});

export default router;