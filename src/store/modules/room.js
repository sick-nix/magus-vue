import {ROOM_TYPES} from "constants/chat"
import ReactiveObject from "util/class/Reactive/Object"

const state = () => ({
    rooms: [],
    currentRoom: null
})

const getters = {
    currentRoom: state => state.currentRoom,
    isCurrentRoom: state => room => state.currentRoom === room,
    rooms: state => state.rooms,
    channels: state => state.rooms.filter(room => room.type === ROOM_TYPES.CHANNEL),
    directs: state => state.rooms.filter(room => room.type === ROOM_TYPES.DIRECT),
    getRoomById: state => id => state.rooms.find(room => room._id === id),
    getRoomIndexById: state => id => state.rooms.findIndex(room => room._id === id),
}

const actions = {
    setRooms(store, rooms) {
        store.commit('setRooms', ReactiveObject.getReactiveObject(rooms))
    },
    addRoom(store, room) {
        store.commit('addRoom', ReactiveObject.getReactiveObject(room))
    },
    setCurrentRoom(store, room) {
        store.commit('setCurrentRoom', room)
    }
}

const mutations = {
    setRooms(state, rooms) {
        state.rooms = rooms
    },
    addRoom(state, room) {
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