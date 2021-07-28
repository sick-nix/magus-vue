import authApi from "api/auth"

const state = () => ({

})

const getters = {

}

const actions = {
    checkAuth: (store) => {
        return authApi.checkAuth()
            .json(user => {
                if(user && user.id) store.dispatch('setUser', user)
            })
    },
    register: (store, params) => {
        return authApi.register(params)
    },
    login: (store, params) => {
        return authApi.login(params).json(user => {
            if(user && user.id) store.dispatch('setUser', user)
            return user
        })
    },
    logout: (store) => {
        return authApi.logout()
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