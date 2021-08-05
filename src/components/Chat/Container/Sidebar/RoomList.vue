<template>
  <div>
    <div v-for="room in rooms">
      <room :room="room"></room>
    </div>
  </div>
</template>

<script>
import {mapGetters} from "vuex"
import Room from "components/Chat/Container/Sidebar/RoomList/Room"

export default {
  name: "RoomList",
  components: {Room},
  computed: {
    ...mapGetters({
      rooms: 'rooms'
    })
  }
}
</script>

<style scoped>

</style>