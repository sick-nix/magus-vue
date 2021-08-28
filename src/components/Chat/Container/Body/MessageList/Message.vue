<template>
  <div class="message">
    <div class="message__avatar">
      <custom-avatar
          :avatar-uri="createdBy.avatar || ''"
          :name="createdBy.username || ''"
      ></custom-avatar>
    </div>
    <div class="message__middle">
      <div class="middle__header">
        <div class="message__created-by">{{ createdBy.username }}</div>
        <div class="message__created-at">{{ formatDateTime(message.createdAt) }}</div>
        <div class="message__edited" v-if="message.createdAt !== message.updatedAt"><i class="las la-pen"></i></div>
      </div>
      <vue-markdown-plus
          class="middle__content"
          :html="false"
          :source="message.content || ''"
      />
      <attachments-list :attachments="message.attachments"></attachments-list>
    </div>
    <div v-if="isCreatedByUser" class="message__shortcuts">
      <custom-btn-group
        :buttons="buttonGroup"
      />
    </div>
  </div>
</template>

<script>
import {mapGetters} from "vuex"
import ReactiveObject from "util/class/Reactive/Object"
import CustomAvatar from "components/custom/Avatar"
import {utilMixin} from "mixins/util"
import VueMarkdownPlus from "vue-markdown-plus"
import CustomBtnGroup from "components/custom/BtnGroup"
import {MESSAGE_REPLY_MODES} from "constants/chat"
import {EVENTS} from "constants/events"
import Magus from "src/Magus"
import AttachmentsList from "components/Chat/Container/Body/MessageList/Message/Attachments"

export default {
  name: "Message",
  components: {AttachmentsList, CustomBtnGroup, CustomAvatar, VueMarkdownPlus},
  mixins: [utilMixin],
  props: {
    message: {
      type: ReactiveObject,
      default: () => ({})
    }
  },
  computed: {
    ...mapGetters({
      currentRoom: 'currentRoom',
      user: 'user'
    }),
    createdBy() {
      const user = this.getUserById(this.currentRoom, this.message.createdBy)
      if(!user) return {}
      return user
    },
    isCreatedByUser() {
      return this.message.createdBy === this.user._id
    },
    buttonGroup() {
      const group = [
        {
          title: 'Edit',
          click: () => {
            this.$store.dispatch('setSelectedMode', MESSAGE_REPLY_MODES.EDIT)
            Magus.getGlobalEventBus().emit(EVENTS.EDIT_MESSAGE, {
              message: this.message
            })
          },
          icon: 'las la-edit'
        },
        {
          title: 'Delete',
          click: () => {
            this.$store.dispatch('deleteMessage', this.message.getData())
          },
          icon: 'las la-trash-alt'
        }
      ]


      if(this.message.attachments.length)
        group.unshift({
          title: 'Download',
          click: () => {
            Magus.getGlobalEventBus().emit(EVENTS.ATTACHMENT_DOWNLOAD, {
              message: this.message
            })
          },
          icon: 'las la-download'
        })

      return group
    }
  }
}
</script>

<style>
.message .custom--avatar {
  width: 32px;
  height: 32px;
}
.middle__content * {
  white-space: pre-wrap;
}
.message__shortcuts .btn {
  padding: 5px 8px;
  background: var(--color-bg-overlay);
  border: none;
  font-size: 18px;
}
</style>

<style scoped>
.message {
  display: flex;
  margin: 10px;
  background-color: white;
  padding: 10px;
  position: relative;
}
.message:hover {
  background: var(--color-btn-hover-bg);
}
.message__avatar {
  margin-right: 10px;
}
.middle__header {
  display: flex;
}
.message__created-by {
  font-weight: 900;
}
.message__created-at {
  font-weight: 100;
  font-style: italic;
  margin-left: 10px;
}
.message__shortcuts {
  position: absolute;
  display: none;
  right: 10px;
  top: -15px;
  background: var(--color-bg-overlay);
  border: 1px solid var(--color-btn-border);
  border-radius: 6px;
  padding: 3px;
}
.message:hover .message__shortcuts {
  display: block;
}
.message__edited {
  margin-left: 10px;
}
</style>