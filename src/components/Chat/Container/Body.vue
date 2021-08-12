<template>
  <div class="chat__body">
    <chat-body-header v-if="currentRoom"></chat-body-header>
    <message-list></message-list>
    <reply-box></reply-box>
  </div>
</template>

<script>
import ChatBodyHeader from "components/Chat/Container/Body/Header"
import {mapGetters} from "vuex"
import MessageList from "components/Chat/Container/Body/MessageList"
import ReplyBox from "components/Chat/Container/Body/ReplyBox"
export default {
  name: "ChatBody",
  components: {ReplyBox, MessageList, ChatBodyHeader},
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
  display: flex;
  flex-direction: column;
}
</style>