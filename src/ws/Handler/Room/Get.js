import HandlerAbstract from "ws/Handler/Abstract"

class RoomGet extends HandlerAbstract {
    run() {
        const { rooms } = this.getMessage().getData()
        this.$store.dispatch('setRooms', rooms)
    }
}

export default RoomGet