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
export default {
  name: "Room",
  components: {CustomAvatar},
  props: {
    room: {
      type: Object,
      required: true
    }
  },
  computed: {
    ...mapGetters({
      isCurrentRoom: 'isCurrentRoom'
    })
  },
  methods: {
    setCurrentRoom() {
      this.$store.dispatch('setCurrentRoom', this.room)
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