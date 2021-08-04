<template>
  <div>
    <div v-for="room in rooms">
      {{ room.name }}
    </div>
  </div>
</template>

<script>
import {mapGetters} from "vuex"

export default {
  name: "RoomList",
  computed: {
    ...mapGetters({
      rooms: 'rooms'
    })
  }
}
</script>

<style scoped>

</style>