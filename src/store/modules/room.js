import {ROOM_TYPES} from "constants/chat"

const state = () => ({
    rooms: [],
    currentRoom: null
})

const getters = {
    currentRoom: state => state.currentRoom,
    isCurrentRoom: state => room => state.currentRoom === room,
    rooms: state => state.rooms,
    channels: state => state.rooms.filter(room => room.type === ROOM_TYPES.CHANNEL),
    directs: state => state.rooms.filter(room => room.type === ROOM_TYPES.DIRECT)
}

const actions = {
    setRooms(store, rooms) {
        store.commit('setRooms', rooms)
    },
    addRoom(store, params) {
        store.commit('addRoom', params)
    },
    setCurrentRoom(store, room) {
        store.commit('setCurrentRoom', room)
    }
}

const mutations = {
    setRooms(state, rooms) {
        state.rooms = rooms
    },
    addRoom(state, { room }) {
        state.rooms.push(room)
    },
    setCurrentRoom(state, room) {
        state.currentRoom = room
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}