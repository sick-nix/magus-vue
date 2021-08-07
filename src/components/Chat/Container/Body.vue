<template>
  <div class="chat__body">
    <chat-body-header v-if="currentRoom"></chat-body-header>
  </div>
</template>

<script>
import ChatBodyHeader from "components/Chat/Container/Body/Header"
import {mapGetters} from "vuex"
export default {
  name: "ChatBody",
  components: {ChatBodyHeader},
  computed: {
    ...mapGetters({
      currentRoom: 'currentRoom'
    })
  }
}
</script>

<style scoped>
.chat__body {
  flex-grow: 1;
}
</style>