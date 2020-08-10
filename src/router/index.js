import Vue from 'vue'
import VueRouter from 'vue-router'

// 防止重複路由的情況
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(VueRouter)

const routes = [
  {
    path: '*',
    redirect: '/'
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Backstage/Login.vue')
  },
  {
    path: '/',
    component: () => import('@/views/User.vue'),
    children: [
      {
        path: '/',
        name: 'UserHome',
        component: () => import('@/views/User/UserHome.vue')
      },
      {
        path: 'introduce',
        name: 'Introduce',
        component: () => import('@/views/User/Introduce.vue')
      },
      {
        path: 'products',
        name: 'Products',
        component: () => import('@/views/User/Products.vue')
      },
      {
        path: 'product/:productId',
        name: 'Product',
        component: () => import('@/views/User/Product.vue')
      },
      {
        path: 'favorite',
        name: 'Favorite',
        component: () => import('@/views/User/Favorite.vue')
      },
      {
        path: 'coupons',
        name: 'Coupons',
        component: () => import('@/views/User/Coupons.vue')
      },
      {
        path: 'order',
        name: 'Order',
        component: () => import('@/views/User/Order.vue')
      },
      {
        path: 'checkout/:orderId',
        name: 'CheckOut',
        component: () => import('@/views/User/CheckOut.vue')
      }
    ]
  },
  {
    path: '/admin',
    name: 'Backstage',
    meta: { requiresAuth: true },
    component: () => import('@/views/Backstage.vue'),
    children: [
      {
        path: 'productslist',
        name: 'ProductsList',
        component: () => import('@/views/Backstage/ProductsList.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: 'orderslist',
        name: 'OrdersList',
        component: () => import('@/views/Backstage/OrdersList.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: 'couponslist',
        name: 'CouponsList',
        component: () => import('@/views/Backstage/CouponsList.vue'),
        meta: { requiresAuth: true }
      }
    ]
  }
]

const router = new VueRouter({
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  },
  linkActiveClass: 'active',
  routes
})

export default router
