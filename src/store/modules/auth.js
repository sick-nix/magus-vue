import authApi from "api/auth"

const state = () => ({

})

const getters = {

}

const actions = {
    checkAuth: (store) => {
        return authApi.checkAuth()
            .json(user => {
                if(user && user._id) store.dispatch('setUser', user)
            })
    },
    register: (store, params) => {
        return authApi.register(params)
    },
    login: (store, params) => {
        return authApi.login(params).json(async user => {
            if(user && user._id) await store.dispatch('setUser', user)
            return user
        })
    },
    logout: (store) => {
        return authApi.logout().res(res => {
            store.dispatch('setUser', {})
        })
    }
}

const mutations = {

}

export default {
    state,
    getters,
    actions,
    mutations
}