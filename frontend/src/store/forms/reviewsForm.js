import axios from 'axios';

export default {
  namespaced: true,
  state: {
    data: {},
    loading: false,

    searchResultProduct: [],

    searchResultUser: [],
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

    setProduct(state, payload) {
      state.searchResultProduct = payload;
    },

    setUser(state, payload) {
      state.searchResultUser = payload;
    },
  },
  actions: {
    async newHandler({ commit, dispatch }, payload) {
      commit('startLoading');
      try {
        const result = await axios.post('/reviews', { data: payload.data });
        dispatch('snackbar/showSnackbar', 'Reviews has been created', {
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
        const result = await axios.put(`/reviews/${payload.id}`, {
          id: payload.id,
          data: payload.data,
        });

        dispatch('snackbar/showSnackbar', 'Reviews has been updated', {
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
        const result = await axios.get(`/reviews/${payload}`);
        commit(`getData`, result.data);
      } catch (e) {
        dispatch('snackbar/showSnackbar', e, { root: true });
      } finally {
        commit('finishLoading');
      }
    },

    async searchProduct({ commit, dispatch }, val) {
      try {
        if (val) {
          const result = await axios(
            `/products/autocomplete?query=${val}&limit=100`,
          );
          commit('setProduct', result.data);
        } else {
          const result = await axios(`/products/autocomplete?limit=100`);
          commit('setProduct', result.data);
        }
      } catch (e) {
        dispatch('snackbar/showSnackbar', e, { root: true });
        commit('setProduct', []);
      }
    },

    async searchUser({ commit, dispatch }, val) {
      try {
        if (val) {
          const result = await axios(
            `/users/autocomplete?query=${val}&limit=100`,
          );
          commit('setUser', result.data);
        } else {
          const result = await axios(`/users/autocomplete?limit=100`);
          commit('setUser', result.data);
        }
      } catch (e) {
        dispatch('snackbar/showSnackbar', e, { root: true });
        commit('setUser', []);
      }
    },
  },
};
