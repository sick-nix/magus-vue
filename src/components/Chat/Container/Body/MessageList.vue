<template>
  <div class="message__list" @scroll="handleScroll">
    <message
        v-for="message in messageList"
        :message="message"
        :key="message._id"
    ></message>
  </div>
</template>

<script>
import {mapGetters} from "vuex"
import Message from "components/Chat/Container/Body/MessageList/Message"
import $ from 'cash-dom'
import {scrollToBottom} from "util/html"
import Magus from "src/Magus"
import {EVENTS} from "constants/events"

export default {
  name: "MessageList",
  components: {Message},
  computed: {
    ...mapGetters({
      currentRoom: 'currentRoom'
    }),
    messageList() {
      if(this.currentRoom)
        return this.currentRoom.messages
      return []
    }
  },
  mounted() {
    Magus.getGlobalEventBus().on(EVENTS.SCROLL_TO_BOTTOM, this.doScrollToBottom)
  },
  destroyed() {
    Magus.getGlobalEventBus().off(EVENTS.SCROLL_TO_BOTTOM, this.doScrollToBottom)
  },
  methods: {
    handleScroll(evt) {
      if($(evt.target).prop('scrollTop') < 75)
        this.$store.dispatch('getMessages', {
          room: this.currentRoom.getData(),
          before:
              this.currentRoom.messages ? this.currentRoom.messages[0]?._id : null
        })
    },
    async doScrollToBottom() {
      await this.$nextTick()
      scrollToBottom(this.$el)
    }
  },
  watch: {
    'currentRoom.messages': {
      deep: true,
      immediate: true,
      async handler(newVal, oldVal) {
        if(newVal && !oldVal) await this.doScrollToBottom()
      }
    }
  }
}
</script>

<style scoped>
.message__list {
  flex-grow: 1;
  overflow-y: auto;
}
</style>