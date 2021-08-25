import HandlerAbstract from "ws/Handler/Abstract"

class RoomEnter extends HandlerAbstract {
    run() {
        const room = this.getMessage().getData()
        this.$store.dispatch('setCurrentRoom', this.$store.getters.getRoomById(room._id))
        this.$store.dispatch('getMessages', {room})
    }
}

export default RoomEnter