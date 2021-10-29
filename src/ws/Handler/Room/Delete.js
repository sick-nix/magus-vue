import HandlerAbstract from "ws/Handler/Abstract"
import Magus from "src/Magus"
import {EVENTS} from "constants/events"

class RoomDelete extends HandlerAbstract {
    run() {
        const room = this.getMessage().getData()
        this.$store.dispatch('removeRoom', room)
        this.$store.dispatch('setCurrentRoom', null)
    }
}

export default RoomDelete