import HandlerAbstract from "websocket/Handler/Abstract"

class Handler {
    /**
     * @param {Message} msg
     */
    handle(msg) {
        if(!msg.getType()) return this
        let msgHandler = this.getMessageHandler(msg.getType())
        if(msgHandler) {
            msgHandler = new msgHandler(msg)

            if(msgHandler instanceof HandlerAbstract)
                msgHandler.run()
        }
    }

    /**
     * @param {string} type
     * @returns {null|*}
     */
    getMessageHandler(type) {
        if(!type) return null
        const msgHandler = this._getHandlerMap()[type]
        if(msgHandler) return msgHandler
        return null
    }

    _getHandlerMap() {
        return {

        }
    }
}

export default Handler