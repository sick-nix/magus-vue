<template>
  <div class="chat-body__header">
    <custom-avatar :name="currentRoom.name"></custom-avatar>
    <div class="room__name">{{ currentRoom.name }}</div>
    <custom-dropdown
        :options="getDropdownOptions"
        :position="DROPDOWN_POSITION_SOUTH_WEST"
    />
  </div>
</template>

<script>
import {mapGetters} from "vuex"
import CustomAvatar from "components/custom/Avatar"
import CustomDropdown from "components/custom/Dropdown"
import {DROPDOWN_POSITIONS} from "constants/components"

export default {
  name: "ChatBodyHeader",
  components: {CustomDropdown, CustomAvatar},
  created() {
    this.DROPDOWN_POSITION_SOUTH_WEST = DROPDOWN_POSITIONS.SOUTH_WEST
  },
  computed: {
    ...mapGetters({
      currentRoom: 'currentRoom',
      isDirect: 'isDirect',
      isChannel: 'isChannel',
      isUserOwnerOfRoom: 'isUserOwnerOfRoom',
      user: 'user'
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
    }
  }
}
</script>

<style>
.chat-body__header .dropdown {
  margin-left: auto;
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
</style>