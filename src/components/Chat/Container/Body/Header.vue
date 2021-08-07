<template>
  <div class="chat-body__header">
    <custom-avatar :name="currentRoom.name"></custom-avatar>
    <div class="room__name">{{ currentRoom.name }}</div>
  </div>
</template>

<script>
import {mapGetters} from "vuex"
import CustomAvatar from "components/custom/Avatar"

export default {
  name: "ChatBodyHeader",
  components: {CustomAvatar},
  computed: {
    ...mapGetters({
      currentRoom: 'currentRoom'
    })
  }
}
</script>

<style scoped>
.chat-body__header {
  background-color: var(--color-bg-overlay);
  border-bottom: 1px solid var(--color-border-primary);
  display: flex;
  align-items: center;
  padding: 10px;
}
.room__name {
  margin-left: 10px;
}
</style>