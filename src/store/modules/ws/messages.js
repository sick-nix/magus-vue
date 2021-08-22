import Message from "ws/Message"
import {MESSAGE_DISPATCHERS} from "constants/chat"

const state = () => ({
    fetchingCurrently: false,
    lastFetchedMessageByRoom: {},
    lastMessageCount: {}
})

const getters = {
    fetchingCurrently: store => store.fetchingCurrently,
    lastFetchedMessageByRoom: store => store.lastFetchedMessageByRoom,
    lastMessageCount: store => store.lastMessageCount,
    lastMessageCountByRoom: store => room => store.lastMessageCount[room._id]
}

const actions = {
    createRoom(store, params) {
        const message = new Message({
            type: MESSAGE_DISPATCHERS.ROOM_NEW,
            data: params
        })
        store.dispatch('sendMessage', message)
    },
    getRooms(store) {
        const message = new Message({
            type: MESSAGE_DISPATCHERS.ROOM_GET,
        })
        store.dispatch('sendMessage', message)
    },
    newMessage(store, params) {
        const message = new Message({
            type: MESSAGE_DISPATCHERS.MESSAGE_NEW,
            data: params
        })
        store.dispatch('sendMessage', message)
    },
    getMessages(store, params) {
        if(!params.room || store.getters.fetchingCurrently) return
        const { room, before } = params
        const lastMessage = store.getters.lastFetchedMessageByRoom[room._id]

        // don't fetch if last message before which to fetch was the same as current before value
        if(before && lastMessage && before === lastMessage) return
        store.commit('setFetchingCurrently', true)
        const message = new Message({
            type: MESSAGE_DISPATCHERS.MESSAGE_GET,
            data: params
        })
        store.dispatch('sendMessage', message)

        // if any messages were fetched update last fetched message
        if(before)
            store.commit('setLastFetchedMessageByRoom', {room, messageId: before})
    },
    setLastMessageCount(store, data) {
        store.commit('setLastMessageCount', data)
    },
    roomEnter(store, room) {
        const message = new Message({
            type: MESSAGE_DISPATCHERS.ROOM_ENTER,
            data: room
        })
        store.dispatch('sendMessage', message)
    },
    roomHide(store, room) {
        const message = new Message({
            type: MESSAGE_DISPATCHERS.ROOM_HIDE,
            data: room
        })
        store.dispatch('sendMessage', message)
    },
    roomDelete(store, room) {
        const message = new Message({
            type: MESSAGE_DISPATCHERS.ROOM_DELETE,
            data: room
        })
        store.dispatch('sendMessage', message)
    }
}

const mutations = {
    setFetchingCurrently(state, value) {
        state.fetchingCurrently = value
    },
    setLastFetchedMessageByRoom(state, { room, messageId }) {
        state.lastFetchedMessageByRoom = {
            ...state.lastFetchedMessageByRoom,
            [room._id]: messageId
        }
    },
    setLastMessageCount(state, data) {
        state.lastMessageCount = data
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}