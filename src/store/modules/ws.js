import config, {CONFIG_OPTIONS} from "constants/config"
import Cookies from "js-cookie"
import MagusWebSocket from "websocket/MagusWebSocket"
import Vue from "vue"

const state = () => ({
    connection: null
})

const getters = {
    connection: (state) => state.connection
}

const actions = {
    createConnection(store, params = {}) {
        let { url = config[CONFIG_OPTIONS.WS_ENDPOINT] } = params
        const magusCookie = Cookies.get('magus') || ''
        url = `${url}?magus=${magusCookie}`
        const connection = new MagusWebSocket(url, [],{
            shouldReconnect(event, ws) {
                if (event.code === 1008 || event.code === 1011) return
                return ws.attempts * 2000
            }
        })
        store.commit('setConnection', {connection})
        Vue.prototype.$socket = store.getters.connection
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