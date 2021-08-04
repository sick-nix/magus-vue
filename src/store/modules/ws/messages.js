import Message from "websocket/Message"
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
        store.getters.connection.send(message)
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