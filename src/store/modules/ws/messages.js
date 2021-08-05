import Message from "ws/Message"
import {MESSAGE_DISPATCHERS} from "constants/chat"

const state = () => ({

})

const getters = {
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