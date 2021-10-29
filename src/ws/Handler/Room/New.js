import HandlerAbstract from "ws/Handler/Abstract"


class RoomNew extends HandlerAbstract {
    run() {
        const room = this.getMessage().getData()
        this.$store.dispatch('addRoom', room)
        const reactiveRoom = this.$store.getters.getRoomById(room._id)

        if(this.$store.getters.user?._id === this.getMessage().getFromUser() && !reactiveRoom.hidden) {
            this.$store.dispatch('setCurrentRoom', reactiveRoom)
            this.$store.dispatch('roomEnter', reactiveRoom.getData())
        }
    }
}

export default RoomNew