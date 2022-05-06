import Vue from 'vue';
import Router from 'vue-router';

import Layout from '@/components/Layout/Layout'
import Login from '@/pages/Login/Login'
import Profile from '@/pages/Profile/Profile'
import Forgot from '@/pages/Forgot/Forgot'
import VerifyEmail from '@/pages/VerifyEmail/VerifyEmail'
import Reset from '@/pages/Reset/Reset'
import StarterPage from '@/pages/Starter/StarterPage'
import Error from '@/pages/Error/Error'

// Pages
import Dashboard from '@/pages/Dashboard/Dashboard';

import UsersTable from '@/components/CRUD/Users/UsersTable'
import UsersEdit from '@/components/CRUD/Users/UsersEdit'
import UsersNew from '@/components/CRUD/Users/UsersNew'

import ProductsTable from '@/components/CRUD/Products/ProductsTable'
import ProductsEdit from '@/components/CRUD/Products/ProductsEdit'
import ProductsNew from '@/components/CRUD/Products/ProductsNew'

import CategoriesTable from '@/components/CRUD/Categories/CategoriesTable'
import CategoriesEdit from '@/components/CRUD/Categories/CategoriesEdit'
import CategoriesNew from '@/components/CRUD/Categories/CategoriesNew'

import OrdersTable from '@/components/CRUD/Orders/OrdersTable'
import OrdersEdit from '@/components/CRUD/Orders/OrdersEdit'
import OrdersNew from '@/components/CRUD/Orders/OrdersNew'

import ReviewsTable from '@/components/CRUD/Reviews/ReviewsTable'
import ReviewsEdit from '@/components/CRUD/Reviews/ReviewsEdit'
import ReviewsNew from '@/components/CRUD/Reviews/ReviewsNew'

import Promo_codesTable from '@/components/CRUD/Promo_codes/Promo_codesTable'
import Promo_codesEdit from '@/components/CRUD/Promo_codes/Promo_codesEdit'
import Promo_codesNew from '@/components/CRUD/Promo_codes/Promo_codesNew'

// Documentation
import { isAuthenticated } from './mixins/auth';
import ChangePassword from "./pages/ChangePassword/ChangePassword";

Vue.use(Router);

export default new Router({
  routes: [
    { path: '/', redirect: { name: 'Dashboard' } },
    {
      path: '/login',
      name: 'Login',
      component: Login,
    },
    {
      path: '/forgot',
      name: 'Forgot',
      component: Forgot
    },
    {
      path: '/password-reset',
      name: 'reset',
      component: Reset
    },
    {
      path: '/verify-email',
      component: VerifyEmail
    },
    {
          path: '/starter',
          name: 'starter',
          component: StarterPage
    },
    {
      path: '/app',
      name: 'Layout',
      component: Layout,
      redirect: { name: 'Dashboard' },
      beforeEnter: ((to, from, next) => {
        isAuthenticated() ? next() : next({ path: '/starter'  })
      }),
      children: [
        // main pages
        {
          path: 'dashboard',
          name: 'Dashboard',
          component: Dashboard,
        },
        {
          path: 'profile',
          name: 'Profile',
          component: Profile,
        },
        {
          path: 'password',
          name: 'Password',
          component: ChangePassword,
        },
      ]
    },
    {
      path: '/admin',
      name: 'Admin',
      redirect: { name: 'Dashboard' },
      component: Layout,
      beforeEnter: ((to, from, next) => {
        isAuthenticated() ? next() : next({ path: '/login'  })
      }),
      children: [
        {
          path: 'users',
          name: 'Users',
          component: UsersTable,
        },
        {
          path: 'users/:id/edit',
          component: UsersEdit,
        },
        {
          path: 'users/new',
          component: UsersNew,
        },
        {
          path: 'users/:id',
          beforeEnter(from, to, next) {
          if (from.params.id === 'new') next()
          else next(`/admin/users/${from.params.id}/edit`)
        },
      },

        {
          path: 'products',
          name: 'Products',
          component: ProductsTable,
        },
        {
          path: 'products/:id/edit',
          component: ProductsEdit,
        },
        {
          path: 'products/new',
          component: ProductsNew,
        },
        {
          path: 'products/:id',
          beforeEnter(from, to, next) {
          if (from.params.id === 'new') next()
          else next(`/admin/products/${from.params.id}/edit`)
        },
      },

        {
          path: 'categories',
          name: 'Categories',
          component: CategoriesTable,
        },
        {
          path: 'categories/:id/edit',
          component: CategoriesEdit,
        },
        {
          path: 'categories/new',
          component: CategoriesNew,
        },
        {
          path: 'categories/:id',
          beforeEnter(from, to, next) {
          if (from.params.id === 'new') next()
          else next(`/admin/categories/${from.params.id}/edit`)
        },
      },

        {
          path: 'orders',
          name: 'Orders',
          component: OrdersTable,
        },
        {
          path: 'orders/:id/edit',
          component: OrdersEdit,
        },
        {
          path: 'orders/new',
          component: OrdersNew,
        },
        {
          path: 'orders/:id',
          beforeEnter(from, to, next) {
          if (from.params.id === 'new') next()
          else next(`/admin/orders/${from.params.id}/edit`)
        },
      },

        {
          path: 'reviews',
          name: 'Reviews',
          component: ReviewsTable,
        },
        {
          path: 'reviews/:id/edit',
          component: ReviewsEdit,
        },
        {
          path: 'reviews/new',
          component: ReviewsNew,
        },
        {
          path: 'reviews/:id',
          beforeEnter(from, to, next) {
          if (from.params.id === 'new') next()
          else next(`/admin/reviews/${from.params.id}/edit`)
        },
      },

        {
          path: 'promo_codes',
          name: 'Promo_codes',
          component: Promo_codesTable,
        },
        {
          path: 'promo_codes/:id/edit',
          component: Promo_codesEdit,
        },
        {
          path: 'promo_codes/new',
          component: Promo_codesNew,
        },
        {
          path: 'promo_codes/:id',
          beforeEnter(from, to, next) {
          if (from.params.id === 'new') next()
          else next(`/admin/promo_codes/${from.params.id}/edit`)
        },
      },
      ]
    },
    {
      path: '*',
      name: 'Error',
      component: Error,
    },
  ],
});

