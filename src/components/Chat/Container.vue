<template>
  <div class="chat__container">
    <chat-sidebar></chat-sidebar>
    <chat-body></chat-body>
  </div>
</template>

<script>
import ChatSidebar from "components/Chat/Container/Sidebar"
import ChatBody from "components/Chat/Container/Body"

export default {
  name: "ChatContainer",
  components: {ChatBody, ChatSidebar}
}
</script>

<style scoped>
.chat__container {
  width: 100%;
  height: 100%;
  border-radius: 6px;
  border: 1px solid var(--color-border-secondary);
  background-color: var(--color-bg-tertiary);
}
</style>