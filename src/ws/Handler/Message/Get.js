import HandlerAbstract from "ws/Handler/Abstract"

class MessageGet extends HandlerAbstract {
    async run() {
        await this.$store.dispatch('setMessages', this.getMessage().getData())
        await this.$store.commit('setFetchingCurrently', false)
    }
}

export default MessageGet