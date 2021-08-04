<template>
  <div class="chat__sidebar">
    <room-list></room-list>
    <chat-commands></chat-commands>
    <user-info></user-info>
  </div>
</template>

<script>
import UserInfo from "components/Chat/Container/Sidebar/User"
import ChatCommands from "components/Chat/Container/Sidebar/Commands"
import RoomList from "components/Chat/Container/Sidebar/RoomList"

export default {
  name: "ChatSidebar",
  components: {RoomList, ChatCommands, UserInfo}
}
</script>

<style scoped>
.chat__sidebar {
  height: 100%;
  display: flex;
  flex-direction: column;
  width: 300px;
  background-color: var(--color-bg-overlay);
  border-right: 1px solid var(--color-border-primary);
}
@media screen and (max-width: 300px){
  .chat__sidebar {
    width: 100%;
  }
}
</style>