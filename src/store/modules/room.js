import {ROOM_TYPES} from "constants/chat"
import ReactiveObject from "util/class/Reactive/Object"
import {removeAndResetIndexes} from "util/array"

const state = () => ({
    rooms: [],
    currentRoom: null
})

const getters = {
    currentRoom: state => state.currentRoom,
    isCurrentRoom: state => room => state.currentRoom === room,
    rooms: state => state.rooms,
    channels: (state, getters) => state.rooms.filter(room => getters.isChannel(room)),
    directs: (state, getters) => state.rooms.filter(room => getters.isDirect(room)),
    getRoomById: state => id => state.rooms.find(room => room._id === id),
    getRoomIndexById: state => id => state.rooms.findIndex(room => room._id === id),
    isChannel: state => room => room.type === ROOM_TYPES.CHANNEL,
    isDirect: state => room => room.type === ROOM_TYPES.DIRECT,
    isUserOwnerOfRoom: state => (room, user) => {
        if(user instanceof Object) user = user._id
        return room.ownerUser === user
    },
    otherUser: (state, getters, rootState, rootGetters) => room => {
        if(!getters.isDirect(room)) return null
        return room.users.find(user => user._id !== rootGetters.user._id)
    },
    getOtherUserAvatar: (state, getters) => room => {
        const otherUser = getters.otherUser(room)
        if(otherUser) return otherUser.avatar
        return null
    }
}

const actions = {
    setRooms(store, rooms) {
        store.commit('setRooms', ReactiveObject.getReactiveObject(rooms))
    },
    addRoom(store, room) {
        const reactiveRoom = ReactiveObject.getReactiveObject(room)
        const existingRoom = store.getters.getRoomById(reactiveRoom._id)
        if(existingRoom)
            existingRoom.addData(reactiveRoom.getData())
        else
            store.commit('addRoom', reactiveRoom)
    },
    setCurrentRoom(store, room) {
        store.commit('setCurrentRoom', room)
    },
    removeRoom(store, room) {
        const index = store.getters.getRoomIndexById(room._id)
        removeAndResetIndexes(store.state.rooms, index)
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