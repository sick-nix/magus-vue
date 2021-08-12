<template>
  <div class="reply__box">
    <div class="reply__modes">
      <div
          v-for="mode in getModes"
          class="reply__mode"
          :class="mode.class"
          @click="mode.click"
      >
        {{ mode.label }}
      </div>
    </div>
    <div class="box__textarea-container">
      <resizable-textarea
          :input-value="message"
          v-model="message"
          @keydown="handleKeydown"
      ></resizable-textarea>
    </div>
    <div class="reply__footer">
      <button
          class="btn button--send"
          type="button"
          @click="sendMessage"
      >Send</button>
    </div>
  </div>
</template>

<script>
import ResizableTextarea from "components/custom/ResizableTextarea"
import {replyBoxMixin} from "mixins/replyBox"
import {mapGetters} from "vuex"
import {isEnter, isShift} from "util/event"

export default {
  name: "ReplyBox",
  components: {ResizableTextarea},
  mixins: [replyBoxMixin],
  data() {
    return {
      message: null,
    }
  },
  computed: {
    ...mapGetters({
      currentRoom: 'currentRoom'
    })
  },
  methods: {
    handleKeydown(evt) {
      if(isEnter(evt) && !isShift(evt)) {
        evt.preventDefault()
        this.sendMessage()
      }
    },
    async sendMessage() {
      await this.$store.dispatch('newMessage', {
        content: this.message,
        room: this.currentRoom._id,
        private: this.isPrivateNote
      })
      this.message = ''
    }
  }
}
</script>

<style scoped>
.reply__box {
  margin-top: auto;
  background-color: var(--color-bg-overlay);
  border-top: 1px solid var(--color-border-primary);
}
.reply__modes {
  display: flex;
  background-color: var(--color-bg-tertiary);
  border-bottom: 1px solid var(--color-border-primary);
}
.reply__mode {
  padding: 5px 10px;
  background-color: var(--color-bg-tertiary);
  --selected-reply-mode-color: var(--reply-color);
  color: var(--selected-reply-mode-color)
}
.reply__mode.active {
  border-bottom: 2px solid var(--selected-reply-mode-color);
  border-right: 1px solid var(--color-border-primary);
  border-left: 1px solid var(--color-border-primary);
  background-color: var(--color-bg-overlay);
}
.reply__mode--reply {
  --selected-reply-mode-color: var(--reply-color);
}
.reply__mode--private {
  --selected-reply-mode-color: var(--private-color);
}
.reply__mode--edit {
  --selected-reply-mode-color: var(--edit-color);
}
.box__textarea-container {
  padding: 10px;
}
.reply__footer {
  display: flex;
  align-items: center;
  padding: 0 10px 10px;
}
.button--send {
  margin-left: auto;
}
</style>