import {CONFIG_OPTIONS} from "constants/config"
import MagusWebSocket from "ws/MagusWebSocket"
import Vue from "vue"
import {waitForOpenSocket} from "util/ws"
import Magus from "src/Magus"

const state = () => ({
    connection: null
})

const getters = {
    connection: (state) => state.connection
}

const actions = {
    async createConnection(store, params = {}) {
        let { url = Magus.instance.getConfigOption(CONFIG_OPTIONS.WS_ENDPOINT) } = params
        const connection = new MagusWebSocket(url, [],{
            shouldReconnect(event, ws) {
                if (event.code === 1008 || event.code === 1011) return
                return ws.attempts * 2000
            }
        })
        store.commit('setConnection', {connection})
        Vue.prototype.$socket = store.getters.connection
        await store.dispatch('getRooms')
    },
    async sendMessage(store, message) {
        await waitForOpenSocket(store.getters.connection)
        store.getters.connection.send(message)
    }
}

const mutations = {
    setConnection(state, params) {
        const { connection = null } = params
        state.connection = connection
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}