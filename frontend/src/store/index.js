import Vue from 'vue'
import Vuex from 'vuex'

import layout from "./layout"
import snackbar from "./snackbar"
import auth from "./auth"
import register from "@/store/register"
import changePassword from './changePassword'
import forgot from './forgot'
import reset from './reset'
import users from './lists/usersList';
import usersForm from './forms/usersForm';

import products from './lists/productsList';
import productsForm from './forms/productsForm';

import categories from './lists/categoriesList';
import categoriesForm from './forms/categoriesForm';

import orders from './lists/ordersList';
import ordersForm from './forms/ordersForm';

import reviews from './lists/reviewsList';
import reviewsForm from './forms/reviewsForm';

import promo_codes from './lists/promo_codesList';
import promo_codesForm from './forms/promo_codesForm';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth,
    register,
    layout,
    changePassword,
    forgot,
    reset,
    snackbar,

    users,
    usersForm,

    products,
    productsForm,

    categories,
    categoriesForm,

    orders,
    ordersForm,

    reviews,
    reviewsForm,

    promo_codes,
    promo_codesForm,

  }
});

