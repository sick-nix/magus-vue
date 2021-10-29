<template>
  <div class="chat__container">
    <chat-sidebar v-show="sidebarOpen"></chat-sidebar>
    <chat-body v-if="currentRoom"></chat-body>
  </div>
</template>

<script>
import ChatSidebar from "components/Chat/Container/Sidebar"
import ChatBody from "components/Chat/Container/Body"
import {mapGetters} from "vuex"
import {EVENTS} from "constants/events"
import Magus from "src/Magus"

export default {
  name: "ChatContainer",
  components: {ChatBody, ChatSidebar},
  data() {
    return {
      sidebarOpen: true
    }
  },
  mounted() {
    Magus.getGlobalEventBus().on(EVENTS.TOGGLE_MAIN_SIDEBAR, this.toggleSidebar)
  },
  destroyed() {
    Magus.getGlobalEventBus().off(EVENTS.TOGGLE_MAIN_SIDEBAR, this.toggleSidebar)
  },
  computed: {
    ...mapGetters({
      currentRoom: 'currentRoom'
    })
  },
  methods: {
    toggleSidebar() {
      this.sidebarOpen = !this.sidebarOpen
    }
  },
  watch: {
    currentRoom: {
      handler: function (newVal) {
        if(!newVal) this.sidebarOpen = true
      }
    }
  }
}
</script>

<style scoped>
.chat__container {
  width: 100%;
  height: 100%;
  border-radius: 6px;
  border: 1px solid var(--color-border-secondary);
  background-color: var(--color-bg-tertiary);
  display: flex;
  position: relative;
}
</style>