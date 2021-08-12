import HandlerAbstract from "ws/Handler/Abstract"
import Magus from "src/Magus"
import {EVENTS} from "constants/events"

class MessageNew extends HandlerAbstract {
    run() {
        const message = this.getMessage().getData()
        this.$store.dispatch('addMessage', { message })
        Magus.getGlobalEventBus().emit(EVENTS.SCROLL_TO_BOTTOM)
    }
}

export default MessageNew