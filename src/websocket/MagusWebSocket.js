import Message from "websocket/Message"
import Handler from "websocket/Handler"
import RobustWebSocket from "robust-websocket"

class MagusWebSocket extends RobustWebSocket {
    _handler = null

    /**
     * @param {string} url
     * @param {Array} protocols
     * @param {Object} params
     */
    constructor(url, protocols, params) {
        super(url, protocols, params)
        this._handler = new Handler()

        this.addEventListener('message', event => {
            let { data } = event
            data = JSON.parse(data)
            const wsMsg = new Message(data)
            this.getHandler().handle(wsMsg)
        })
    }

    /**
     * @returns {Handler}
     */
    getHandler() {
        return this._handler
    }

    /**
     * @param {Message} message
     * @returns {MagusWebSocket}
     */
    send(message) {
        super.send(message.toString())
        return this
    }
}

export default MagusWebSocket