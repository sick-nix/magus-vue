<template>
  <div class="message__list">
    <div ref="listBody" class="list__body" @scroll="handleScroll">
      <div v-if="fetchingCurrently" class="spinner__container">
        <custom-spinner></custom-spinner>
      </div>
      <message
          v-for="message in messageList"
          :message="message"
          :key="message._id"
      ></message>
    </div>
    <div v-if="isSidebarOpen" class="list__sidebar">
      <user-info
          v-for="user in currentRoom.users"
          :user-prop="user"
          :key="user.username"
          :highlight-current="true"
      />
    </div>
  </div>
</template>

<script>
import {mapGetters} from "vuex"
import Message from "components/Chat/Container/Body/MessageList/Message"
import $ from 'cash-dom'
import {scrollToBottom} from "util/html"
import Magus from "src/Magus"
import {EVENTS} from "constants/events"
import CustomSpinner from "components/custom/Spinner"
import UserInfo from "components/Chat/Container/Sidebar/User"

export default {
  name: "MessageList",
  components: {UserInfo, CustomSpinner, Message},
  data() {
    return {
      isSidebarOpen: false
    }
  },
  computed: {
    ...mapGetters({
      currentRoom: 'currentRoom',
      fetchingCurrently: 'fetchingCurrently'
    }),
    messageList() {
      if(this.currentRoom)
        return this.currentRoom.messages
      return []
    }
  },
  mounted() {
    Magus.getGlobalEventBus().on(EVENTS.SCROLL_TO_BOTTOM, this.doScrollToBottom)
    Magus.getGlobalEventBus().on(EVENTS.TOGGLE_MESSAGE_LIST_SIDEBAR, this.handleToggleSidebar)
  },
  destroyed() {
    Magus.getGlobalEventBus().off(EVENTS.SCROLL_TO_BOTTOM, this.doScrollToBottom)
    Magus.getGlobalEventBus().off(EVENTS.TOGGLE_MESSAGE_LIST_SIDEBAR, this.handleToggleSidebar)
  },
  methods: {
    handleScroll(evt) {
      if($(evt.target).prop('scrollTop') < 400)
        this.$store.dispatch('getMessages', {
          room: this.currentRoom.getData(),
          before:
              this.currentRoom.messages ? this.currentRoom.messages[0]?._id : null
        })
    },
    async doScrollToBottom() {
      await this.$nextTick()
      scrollToBottom(this.$refs.listBody)
    },
    handleToggleSidebar() {
      this.isSidebarOpen = !this.isSidebarOpen
    }
  }
}
</script>

<style>
.list__sidebar .user__info:first-child {
  border-top: none;
}
</style>

<style scoped>
.spinner__container {
  display: flex;
  align-items: center;
  justify-content: center;
}
.message__list {
  flex-grow: 1;
  display: flex;
  overflow-y: auto;
}
.list__body {
  flex-grow: 1;
  overflow-y: auto;
  flex-basis: 60%;
}
.list__sidebar {
  background-color: var(--color-bg-overlay);
}
</style>