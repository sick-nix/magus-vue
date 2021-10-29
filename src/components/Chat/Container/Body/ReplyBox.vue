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
          ref="textarea"
          :input-value="message"
          v-model="message"
          @keydown="handleKeydown"
      ></resizable-textarea>
    </div>
    <div class="reply__footer">
      <div class="footer__buttons">
        <file-upload
            ref="upload"
            class="btn"
            @input-file="inputFile"
            title="Send Attachment"
            :size="maxAttachmentSize"
        >
          <i class="las la-paperclip"></i>
        </file-upload>
        <custom-emoji-picker :on-insert="writeToTextarea">
          <custom-button title="Select an Emoji">
            <i class="las la-grin-alt"></i>
          </custom-button>
        </custom-emoji-picker>
      </div>
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
import {isEnter, isEscape, isShift} from "util/event"
import Magus from "src/Magus"
import {EVENTS} from "constants/events"
import {MESSAGE_REPLY_MODES} from "constants/chat"
import FileUpload from 'vue-upload-component'
import CustomButton from "components/custom/Button"
import uuid from "uuid"
import CustomEmojiPicker from "components/custom/EmojiPicker"
import {insertAtCaretPosition} from "util/html"
import {CONFIG_OPTIONS} from "constants/config"

export default {
  name: "ReplyBox",
  components: {CustomEmojiPicker, CustomButton, ResizableTextarea, FileUpload},
  mixins: [replyBoxMixin],
  data() {
    return {
      message: null,
      editingMessage: null,
      files: [],
    }
  },
  mounted() {
    Magus.getGlobalEventBus().on(EVENTS.EDIT_MESSAGE, this.enableEditMode)
  },
  destroyed() {
    Magus.getGlobalEventBus().off(EVENTS.EDIT_MESSAGE, this.enableEditMode)
  },
  computed: {
    ...mapGetters({
      currentRoom: 'currentRoom'
    }),
    maxAttachmentSize() {
      return Magus.instance.getConfigOption(CONFIG_OPTIONS.MAX_ATTACHMENT_SIZE)
    }
  },
  methods: {
    writeToTextarea(value) {
      this.message = insertAtCaretPosition(this.$refs.textarea.$el, value)
    },
    handleKeydown(evt) {
      if(isEnter(evt) && !isShift(evt)) {
        evt.preventDefault()
        this.sendMessage()
      } else if(isEscape(evt)) {
        this.disableEditMode()
      }
    },
    async sendMessage(attachment = undefined) {
      switch (true) {
        case this.isReply:
        case this.isPrivateNote:
            await this.$store.dispatch('newMessage', {
              content: this.message,
              room: this.currentRoom._id,
              private: this.isPrivateNote,
              attachment
            })
            this.message = ''
            break
        case this.isEdit:
          if(this.editingMessage) {
            await this.$store.dispatch('editMessage', {
              content: this.message,
              message: this.editingMessage.getData()
            })
            this.message = ''
            this.disableEditMode()
          }
      }
    },
    enableEditMode(params) {
      const { message } = params
      this.editingMessage = message
      this.message = this.editingMessage.content
    },
    disableEditMode() {
      this.editingMessage = null
      this.$store.dispatch('setSelectedMode', MESSAGE_REPLY_MODES.REPLY)
    },
    async inputFile(newFile) {
      if(newFile) {
        this.disableEditMode()
        const uniq = `${uuid()}-${Date.now()}`
        if(newFile.file.size > this.maxAttachmentSize)
            Magus.notyf.error("Attachment too large!")
        else {
          await this.$store.dispatch('addAttachmentInProgress', {
            file: newFile.file,
            uniq
          })

          await this.sendMessage({uniq})
        }
      }
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
  color: var(--selected-reply-mode-color);
  user-select: none;
  cursor: pointer;
  border-bottom: 2px solid transparent;
}
.reply__mode.active,
.reply__mode:hover:not(.disabled) {
  border-bottom-color: var(--selected-reply-mode-color);
  background-color: var(--color-bg-overlay);
}
.reply__mode:hover {

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
.footer__buttons {
  display: flex;
  position: relative;
}
.footer__buttons * {
  font-weight: 900;
}
.footer__buttons :hover {
  cursor: pointer;
}
.footer__buttons *:not(:first-child) {
  margin-left: 10px;
}
</style>