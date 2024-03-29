import store from "store"

class HandlerAbstract {
    _message = null

    /**
     * @param {Message} msg
     * @returns {HandlerAbstract}
     */
    constructor(msg) {
        this.setMessage(msg)
        return this
    }

    run() {
        return this
    }

    /**
     * @param {Message} msg
     * @returns {HandlerAbstract}
     */
    setMessage(msg) {
        this._message = msg
        return this
    }

    /**
     * @returns {null|Message}
     */
    getMessage() {
        return this._message
    }

    /**
     * @return {Vuex.Store}
     */
    get $store() {
        return store
    }
}

export default HandlerAbstract