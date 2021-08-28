<template>
  <div class="message__list" @scroll="handleScroll">
    <div v-if="fetchingCurrently" class="spinner__container">
      <custom-spinner></custom-spinner>
    </div>
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
import CustomSpinner from "components/custom/Spinner"

export default {
  name: "MessageList",
  components: {CustomSpinner, Message},
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
  },
  destroyed() {
    Magus.getGlobalEventBus().off(EVENTS.SCROLL_TO_BOTTOM, this.doScrollToBottom)
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
      scrollToBottom(this.$el)
    }
  }
}
</script>

<style scoped>
.spinner__container {
  display: flex;
  align-items: center;
  justify-content: center;
}
.message__list {
  flex-grow: 1;
  overflow-y: auto;
}
</style>