import {MESSAGE_REPLY_MODES} from "constants/chat"
import {mergeWithUniqueKeys} from "util/array"

const state = () => ({
    selectedMode: MESSAGE_REPLY_MODES.REPLY
})

const getters = {
    isReply: (state) => state.selectedMode === MESSAGE_REPLY_MODES.REPLY,
    isPrivateNote: (state) => state.selectedMode === MESSAGE_REPLY_MODES.PRIVATE,
    isEdit: (state) => state.selectedMode === MESSAGE_REPLY_MODES.EDIT,
}

const actions = {
    setSelectedMode(store, value) {
        store.commit('setSelectedMode', value)
    },
    addMessage(store, params) {
        let { message } = params
        store.dispatch('setMessages', {messages: [message]})
    },
    setMessages(store, params) {
        let { room, messages } = params
        const roomObj = store.getters.getRoomById(room?._id || messages[0]?.room)
        if(roomObj)
            roomObj.messages = mergeWithUniqueKeys(roomObj.messages || [], messages)
    }
}

const mutations = {
    setSelectedMode(state, value) {
        state.selectedMode = value
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}