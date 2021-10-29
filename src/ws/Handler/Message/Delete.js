import HandlerAbstract from "ws/Handler/Abstract"

class MessageDelete extends HandlerAbstract {
    run() {
        const message = this.getMessage().getData()
        this.$store.dispatch('removeDeletedMessage', { message })
    }
}

export default MessageDelete