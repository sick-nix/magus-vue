import userApi from 'api/user'

const state = () => ({
    user: null
})

const getters = {
    user: (state) => state.user
}

const actions = {
    async checkAvailable(store, params) {
        const { name, value } = params
        let result = null
        await userApi.isAvailable({[name]: value})
            .json(json => ({ available: result } = json))
        return result
    },
    getUsers(store, params) {
        const { search, excludeCurrentUser } = params
        return userApi.getUsers({
            username: search,
            excludeCurrentUser: Number(excludeCurrentUser)
        })
    },
    setUser: (store, user) => {
        store.commit('setUser', user)
    }
}

const mutations = {
    setUser: (state, user) => {
        state.user = user
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}