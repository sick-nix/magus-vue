import HandlerAbstract from "ws/Handler/Abstract"
import {HANDLER_MAP} from "ws/Handler/Map"

class Handler {
    /**
     * @param {Message} msg
     */
    handle(msg) {
        if(!msg.getType()) throw new Error('Cannot handle message without type')
        let msgHandler = this.getMessageHandler(msg.getType())
        if(!msgHandler) throw new Error(`Could not find handler for event: ${msg.getType()}`)

        const instance = new msgHandler(msg)

        if(instance instanceof HandlerAbstract)
            instance.run()

        return this
    }

    /**
     * @param {string} type
     * @returns {null|*}
     */
    getMessageHandler(type) {
        const msgHandler = this._getHandlerMap()[type]
        if(msgHandler) return msgHandler
        return null
    }

    _getHandlerMap() {
        return HANDLER_MAP
    }
}

export default Handler