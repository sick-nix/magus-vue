<template>
  <div class="chat-body__header">
    <custom-avatar :name="currentRoom.name" :avatar-uri="getOtherUserAvatar"></custom-avatar>
    <div class="room__name">{{ currentRoom.name }}</div>
    <div class="header__container--end">
      <custom-button v-if="!isDirect(currentRoom)" title="Show Members" @click="toggleMessageListSidebar">
        <i class="las la-user-friends"></i>
      </custom-button>
      <custom-dropdown
          :options="getDropdownOptions"
          :position="DROPDOWN_POSITION_SOUTH_WEST"
      />
    </div>
  </div>
</template>

<script>
import {mapGetters} from "vuex"
import CustomAvatar from "components/custom/Avatar"
import CustomDropdown from "components/custom/Dropdown"
import {DROPDOWN_POSITIONS} from "constants/components"
import CustomButton from "components/custom/Button"
import Magus from "src/Magus"
import { EVENTS } from "constants/events"

export default {
  name: "ChatBodyHeader",
  components: {CustomButton, CustomDropdown, CustomAvatar},
  created() {
    this.DROPDOWN_POSITION_SOUTH_WEST = DROPDOWN_POSITIONS.SOUTH_WEST
  },
  computed: {
    ...mapGetters({
      currentRoom: 'currentRoom',
      isDirect: 'isDirect',
      isChannel: 'isChannel',
      isUserOwnerOfRoom: 'isUserOwnerOfRoom',
      user: 'user',
      otherUserAvatarGetter: 'getOtherUserAvatar'
    }),
    getDropdownOptions() {
      const options = []

      if(this.isDirect(this.currentRoom)) {
        options.push({
          label: 'Hide',
          click: () => {
            this.$store.dispatch('roomHide', this.currentRoom.getData())
          }
        })
      } else if(this.isChannel(this.currentRoom)) {
        if(this.isUserOwnerOfRoom(this.currentRoom, this.user)) {
          options.push({
            label: 'Delete',
            click: () => {
              this.$store.dispatch('roomDelete', this.currentRoom.getData())
            }
          })
        }
      }

      return options
    },
    getOtherUserAvatar() {
      return this.otherUserAvatarGetter(this.currentRoom)
    }
  },
  methods: {
    toggleMessageListSidebar() {
      Magus.getGlobalEventBus().emit(EVENTS.TOGGLE_MESSAGE_LIST_SIDEBAR)
    }
  }
}
</script>

<style>
.chat-body__header .button--custom > i {
  opacity: 1;
  font-size: 20px;
}
</style>

<style scoped>
.chat-body__header {
  background-color: var(--color-bg-overlay);
  border-bottom: 1px solid var(--color-border-primary);
  display: flex;
  align-items: center;
  padding: 10px;
}
.room__name {
  margin-left: 10px;
}
.header__container--end {
  margin-left: auto;
}
</style>