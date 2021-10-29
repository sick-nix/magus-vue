import {MESSAGE_GET_ORIGIN, MESSAGE_REPLY_MODES} from "constants/chat"
import ReactiveObject from "util/class/Reactive/Object"
import Magus from "src/Magus"
import {EVENTS} from "constants/events"
import {removeAndResetIndexes} from "util/array"

const state = () => ({
    selectedMode: MESSAGE_REPLY_MODES.REPLY
})

const getters = {
    selectedMode: state => state.selectedMode,
    isReply: (state) => state.selectedMode === MESSAGE_REPLY_MODES.REPLY,
    isPrivateNote: (state) => state.selectedMode === MESSAGE_REPLY_MODES.PRIVATE,
    isEdit: (state) => state.selectedMode === MESSAGE_REPLY_MODES.EDIT,
}

const actions = {
    setSelectedMode(store, value) {
        store.commit('setSelectedMode', value)
    },
    addMessage(store, params) {
        let { room, message } = params
        const roomObj = store.getters.getRoomById(room?._id || message?.room)
        if(roomObj && !message.private)
            roomObj.messageCount++
        if(!roomObj.messages) roomObj.messages = []
        roomObj.messages.push(ReactiveObject.getReactiveObject(message, roomObj.getReactiveClassByProp('messages')))
    },
    setMessages(store, params) {
        let { room, messages, messagesOrigin } = params
        const roomObj = store.getters.getRoomById(room?._id || messages[0]?.room)
        switch (messagesOrigin) {
            case MESSAGE_GET_ORIGIN.ROOM_ENTER:
                // when entering room replace all messages
                roomObj.messages = messages
                Magus.getGlobalEventBus().emit(EVENTS.SCROLL_TO_BOTTOM)
                break
            case MESSAGE_GET_ORIGIN.SCROLL:
                // when scrolling insert fetched messages before the others
                // because they are in order of arrival
                roomObj.messages = [
                    ...messages,
                    ...roomObj.messages
                ]
                break
        }
    },
    addEditedMessage(store, params) {
        const { message } = params
        const roomObj = store.getters.getRoomById(message.room)
        if(roomObj) {
            const oldMessage = roomObj.messages?.find(mess => mess._id === message._id)
            if(oldMessage) oldMessage.addData(message)
        }
    },
    removeDeletedMessage(store, { message }) {
        const roomObj = store.getters.getRoomById(message.room)
        if(roomObj) {
            const index = roomObj.messages.findIndex(mess => mess._id === message._id)
            removeAndResetIndexes(roomObj.messages, index)
        }
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