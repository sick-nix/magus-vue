import Message from "websocket/Message"

const state = () => ({

})

const getters = {
}

const actions = {
    createRoom(store, params) {
        const message = new Message({
            type: 'room.new',
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