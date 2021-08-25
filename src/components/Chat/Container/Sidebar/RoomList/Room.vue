<template>
  <div
      v-if="!room.hidden"
      class="room"
      :class="{ selected: isCurrentRoom }"
      @click="setCurrentRoom"
  >
    <custom-avatar :name="room.name" :avatar-uri="getOtherUserAvatar"></custom-avatar>
    <div class="room__name">{{ room.name }}</div>
    <div v-show="unreadMessages > 0" class="room__msg-count">{{ unreadMessages }}</div>
  </div>
</template>

<script>
import CustomAvatar from "components/custom/Avatar"
import {mapGetters} from "vuex"
import ReactiveObject from "util/class/Reactive/Object"
import {ROOM_TYPES} from "constants/chat"
export default {
  name: "Room",
  components: {CustomAvatar},
  props: {
    room: {
      type: ReactiveObject,
      required: true
    }
  },
  computed: {
    ...mapGetters({
      lastMessageCountByRoom: 'lastMessageCountByRoom',
      user: 'user'
    }),
    /**
     * Note: "overwrites" in this component the isCurrentRoom getter from store
     * @return {boolean}
     */
    isCurrentRoom() {
      return this.$store.getters.isCurrentRoom(this.room)
    },
    unreadMessages() {
      return Number(this.room.messageCount) - Number(this.lastMessageCountByRoom(this.room))
    },
    isChannel() {
      return this.room.type === ROOM_TYPES.CHANNEL
    },
    isDirect() {
      return this.room.type === ROOM_TYPES.DIRECT
    },
    otherUser() {
      if(!this.isDirect) return null
      return this.room.users.find(user => user._id !== this.user._id)
    },
    getOtherUserAvatar() {
      if(this.otherUser) return this.otherUser.avatar
      return null
    }
  },
  methods: {
    async setCurrentRoom() {
      if(!this.isCurrentRoom)
        await this.$store.dispatch('roomEnter', this.room.getData())
    }
  }
}
</script>

<style scoped>
.room {
  display: flex;
  align-items: center;
}
.room:hover, .room.selected {
  background-color: var(--color-state-hover-secondary-bg);
  cursor: pointer;
}
.room:not(:only-of-type) {
  margin-bottom: 5px;
}
.room:not(:first-child) {
  margin-top: 5px;
}
.room__name {
  margin-left: 10px;
}
.room__msg-count {
  margin-left: auto;
  margin-right: 10px;
  background: var(--color-bg-success);
  padding: 5px;
  border-radius: 50%;
  height: 25px;
  width: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>