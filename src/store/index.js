import Vuex from "vuex"
import Vue from "vue"
import auth from "./modules/auth"
import user from "./modules/user"
import ws from "./modules/ws"
import wsMessages from "./modules/ws/messages"

Vue.use(Vuex)
export default new Vuex.Store({
    modules: {
        auth,
        user,
        ws,
        wsMessages
    }
})