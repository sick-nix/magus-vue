import HandlerAbstract from "ws/Handler/Abstract"

class RoomHide extends HandlerAbstract {
    run() {
        const room = this.getMessage().getData()
        this.$store.dispatch('addRoom', room)
        this.$store.dispatch('setCurrentRoom', null)
    }
}

export default RoomHide