<template>
  <div
      class="room"
      :class="{ selected: isCurrentRoom(room) }"
      @click="setCurrentRoom"
  >
    <custom-avatar :name="room.name"></custom-avatar>
    <div class="room__name">{{ room.name }}</div>
  </div>
</template>

<script>
import CustomAvatar from "components/custom/Avatar"
import {mapGetters} from "vuex"
import ReactiveObject from "util/class/Reactive/Object"
export default {
  name: "Room",
  components: {CustomAvatar},
  props: {
    room: {
      type: ReactiveObject,
      required: true
    }
  },
  computed: {
    ...mapGetters({
      isCurrentRoom: 'isCurrentRoom'
    })
  },
  methods: {
    async setCurrentRoom() {
      if(!this.isCurrentRoom(this.room))
        await this.$store.dispatch('roomEnter', this.room.getData())
    }
  }
}
</script>

<style scoped>
.room {
  display: flex;
  align-items: center;
}
.room:hover, .room.selected {
  background-color: var(--color-state-hover-secondary-bg);
  cursor: pointer;
}
.room:not(:only-of-type) {
  margin-bottom: 5px;
}
.room:not(:first-child) {
  margin-top: 5px;
}
.room__name {
  margin-left: 10px;
}
</style>