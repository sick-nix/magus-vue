import HandlerAbstract from "ws/Handler/Abstract"
import Magus from "src/Magus"
import {EVENTS} from "constants/events"

class RoomEnter extends HandlerAbstract {
    run() {
        const room = this.getMessage().getData()
        this.$store.dispatch('setCurrentRoom', this.$store.getters.getRoomById(room._id))
        this.$store.dispatch('getMessages', {room})
        Magus.getGlobalEventBus().emit(EVENTS.SCROLL_TO_BOTTOM)
    }
}

export default RoomEnter