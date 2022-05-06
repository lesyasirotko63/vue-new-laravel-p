import axios from "axios"

export default {
    namespaced: true,
    state: {
        data: {},
        loading: false,

        searchResultProducts: [],

    },
    mutations: {
        getData(state, payload) {
            state.data = payload
        },

        startLoading(state) {
            state.loading = true
        },

        finishLoading(state) {
            state.loading = false
        },

        setProducts(state, payload) {
            state.searchResultProducts = payload
        },

    },
    actions: {
        async newHandler({commit, dispatch}, payload) {
            commit('startLoading')
            try {
                const result = await axios.post('/promo_codes', {data: payload.data})
                dispatch('snackbar/showSnackbar', 'Promo_codes has been created', {root: true})
                commit(`getData`, result.data)
            } catch (e) {
                dispatch('snackbar/showSnackbar', e, {root: true})
            } finally {
                commit('finishLoading')
            }
        },
        async edit({commit, dispatch}, payload) {
            commit('startLoading')
            try {
                const result = await axios.put(`/promo_codes/${payload.id}`, {id: payload.id, data: payload.data})

                dispatch('snackbar/showSnackbar', 'Promo_codes has been updated', {root: true})
                commit(`getData`, result.data)
            } catch (e) {
                dispatch('snackbar/showSnackbar', e, {root: true})
            } finally {
                commit('finishLoading')
            }
        },
        async getData({commit, dispatch}, payload) {
            commit('startLoading')
            try {
                const result = await axios.get(`/promo_codes/${payload}`)
                commit(`getData`, result.data)
            } catch (e) {
                dispatch('snackbar/showSnackbar', e, {root: true})
            } finally {
                commit('finishLoading')
            }
        },

        async searchProducts({commit, dispatch}, val) {
            try {
                if (val) {
                    const result = await axios(`/products/autocomplete?query=${val}&limit=100`)
                    commit('setProducts', result.data)
                } else {
                    const result = await axios(`/products/autocomplete?limit=100`)
                    commit('setProducts', result.data)
                }
            } catch (e) {
                dispatch('snackbar/showSnackbar', e, {root: true})
                commit('setProducts', [])
            }
        },

    },
}

