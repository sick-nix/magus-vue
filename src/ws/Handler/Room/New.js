import HandlerAbstract from "ws/Handler/Abstract"


class RoomNew extends HandlerAbstract {
    run() {
        const room = this.getMessage().getData()
        this.$store.dispatch('addRoom', { room })
    }
}

export default RoomNew