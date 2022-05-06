import axios from 'axios';

export default {
  namespaced: true,
  state: {
    data: {},
    loading: false,

    searchResultCategories: [],

    searchResultMoreProducts: [],
  },
  mutations: {
    getData(state, payload) {
      state.data = payload;
    },

    startLoading(state) {
      state.loading = true;
    },

    finishLoading(state) {
      state.loading = false;
    },

    setCategories(state, payload) {
      state.searchResultCategories = payload;
    },

    setMoreProducts(state, payload) {
      state.searchResultMoreProducts = payload;
    },
  },
  actions: {
    async newHandler({ commit, dispatch }, payload) {
      commit('startLoading');
      try {
        const result = await axios.post('/products', { data: payload.data });
        dispatch('snackbar/showSnackbar', 'Products has been created', {
          root: true,
        });
        commit(`getData`, result.data);
      } catch (e) {
        dispatch('snackbar/showSnackbar', e, { root: true });
      } finally {
        commit('finishLoading');
      }
    },
    async edit({ commit, dispatch }, payload) {
      commit('startLoading');
      try {
        const result = await axios.put(`/products/${payload.id}`, {
          id: payload.id,
          data: payload.data,
        });

        dispatch('snackbar/showSnackbar', 'Products has been updated', {
          root: true,
        });
        commit(`getData`, result.data);
      } catch (e) {
        dispatch('snackbar/showSnackbar', e, { root: true });
      } finally {
        commit('finishLoading');
      }
    },
    async getData({ commit, dispatch }, payload) {
      commit('startLoading');
      try {
        const result = await axios.get(`/products/${payload}`);
        commit(`getData`, result.data);
      } catch (e) {
        dispatch('snackbar/showSnackbar', e, { root: true });
      } finally {
        commit('finishLoading');
      }
    },

    async searchCategories({ commit, dispatch }, val) {
      try {
        if (val) {
          const result = await axios(
            `/categories/autocomplete?query=${val}&limit=100`,
          );
          commit('setCategories', result.data);
        } else {
          const result = await axios(`/categories/autocomplete?limit=100`);
          commit('setCategories', result.data);
        }
      } catch (e) {
        dispatch('snackbar/showSnackbar', e, { root: true });
        commit('setCategories', []);
      }
    },

    async searchMoreProducts({ commit, dispatch }, val) {
      try {
        if (val) {
          const result = await axios(
            `/products/autocomplete?query=${val}&limit=100`,
          );
          commit('setMoreProducts', result.data);
        } else {
          const result = await axios(`/products/autocomplete?limit=100`);
          commit('setMoreProducts', result.data);
        }
      } catch (e) {
        dispatch('snackbar/showSnackbar', e, { root: true });
        commit('setMoreProducts', []);
      }
    },
  },
};
