const state = () => ({
    rooms: []
})

const getters = {
    rooms: state => state.rooms
}

const actions = {
    setRooms(store, rooms) {
        store.commit('setRooms', rooms)
    },
    addRoom(store, params) {
        store.commit('addRoom', params)
    }
}

const mutations = {
    setRooms(store, rooms) {
        store.rooms = rooms
    },
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