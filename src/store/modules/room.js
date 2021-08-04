const state = () => ({
    rooms: []
})

const getters = {
    rooms: state => state.rooms
}

const actions = {
    addRoom(store, params) {
        store.commit('addRoom', params)
    }
}

const mutations = {
    addRoom(store, { room }) {
        store.rooms.push(room)
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}