<template>
  <div class="room">
    <custom-avatar :name="room.name"></custom-avatar>
  </div>
</template>

<script>
import CustomAvatar from "components/custom/Avatar"
export default {
  name: "Room",
  components: {CustomAvatar},
  props: {
    room: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>

</style>