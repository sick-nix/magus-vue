import HandlerAbstract from "ws/Handler/Abstract"

class MessageEdit extends HandlerAbstract {
    run() {
        const message = this.getMessage().getData()
        this.$store.dispatch('addEditedMessage', { message })
    }
}

export default MessageEdit