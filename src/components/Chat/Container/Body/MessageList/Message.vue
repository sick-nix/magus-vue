<template>
  <div class="message">
    <div class="message__avatar">
      <custom-avatar :name="createdBy"></custom-avatar>
    </div>
    <div class="message__middle">
      <div class="middle__header">
        <div class="message__created-by">{{ createdBy }}</div>
        <div class="message__created-at">{{ formatDateTime(message.createdAt) }}</div>
      </div>
      <div class="middle__content">{{ message.content }}</div>
    </div>
    <div v-if="isCreatedByUser" class="message__shortcuts">
      <div>test</div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from "vuex"
import ReactiveObject from "util/class/Reactive/Object"
import CustomAvatar from "components/custom/Avatar"
import {utilMixin} from "mixins/util"

export default {
  name: "Message",
  components: {CustomAvatar},
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
      if(!user) return ''
      return user.username
    },
    isCreatedByUser() {
      return this.message.createdBy === this.user._id
    }
  }
}
</script>

<style>
.message .custom--avatar {
  width: 32px;
  height: 32px;
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
}
.message:hover .message__shortcuts {
  display: block;
}
</style>