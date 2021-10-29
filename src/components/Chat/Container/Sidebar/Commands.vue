<template>
  <div class="chat__commands">
    <custom-btn-group
        class="commands"
        :buttons="buttonGroup"
    />
    <modal name="createRoom">
      <form-wrapper :text-props="{ headerText: getFormHeaderText }">
        <formulate-form
          :schema="getRoomSchema"
          v-model="formValues"
          ref="form"
        >
        </formulate-form>
      </form-wrapper>
    </modal>
  </div>
</template>

<script>
import channelSchema from 'components/Form/Schema/Chat/channel'
import directSchema from 'components/Form/Schema/Chat/direct'
import FormWrapper from 'components/Form/Wrapper'
import {mergeWithUniqueKeys} from "util/array"
import {ROOM_TYPES} from "constants/chat"
import CustomBtnGroup from "components/custom/BtnGroup"

export default {
  name: "ChatCommands",
  components: {CustomBtnGroup, FormWrapper},
  data() {
    return {
      usersOptions: [],
      formValues: null,
      searchedUsers: [],
      selectedType: null
    }
  },
  computed: {
    getRoomSchema() {
      const params = {
        options: this.searchedUsers,
        search: this.getUsers,
        cancel: () => {
          this.$modal.hide('createRoom')
          this.selectedType = null
        },
        create: async () => {
          await this.$store.dispatch('createRoom', this.formValues)
          this.$modal.hide('createRoom')
          this.selectedType = null
        },
        selectOpen: this.getUsers,
        hasErrors: this.$refs.form ? this.$refs.form.hasErrors : true
      }
      switch (this.selectedType) {
        case ROOM_TYPES.CHANNEL:
          return channelSchema(params)
        case ROOM_TYPES.DIRECT:
          return directSchema(params)
      }
    },
    getFormHeaderText() {
      if(!this.selectedType) return ''
      switch (this.selectedType) {
        case ROOM_TYPES.CHANNEL: return 'Create a new Channel'
        case ROOM_TYPES.DIRECT: return 'Create a new Direct'
      }
    },
    buttonGroup() {
      return [
        {
          title: 'Create a Channel',
          click: () => this.openModal(ROOM_TYPES.CHANNEL),
          icon: 'las la-users'
        },
        {
          title: 'Direct Chat',
          click: () => this.openModal(ROOM_TYPES.DIRECT),
          icon: 'las la-user-friends'
        }
      ]
    }
  },
  methods: {
    async getUsers(search, loading) {
      const request = await this.$store.dispatch('getUsers', {search: search || '', excludeCurrentUser: true})
      const users = await request.json()
      this.usersOptions = users.map(user => ({value: user._id, label: user.username}))
      this.searchedUsers = mergeWithUniqueKeys(this.usersOptions, this.searchedUsers, 'value')
    },
    openModal(type) {
      this.selectedType = type
      this.$modal.show('createRoom')
    }
  }
}
</script>

<style>
.chat__commands .v--modal {
  left: unset !important;
  max-width: max-content;
  height: auto !important;
  margin: auto;
  border-radius: 6px;
  border: 1px solid var(--color-border-secondary);
  background-color: var(--color-bg-tertiary);
  overflow: visible !important;
}
.chat__commands .v--modal .form__container {
  padding-top: 16px;
}
.chat__commands .v--modal .form__body {
  border-radius: unset;
  border: unset;
  background-color: unset;
}
.chat__commands #vs1__listbox {
  max-height: 200px;
}
.commands .btn {
  padding-inline: 10px;
}
.commands .btn > i {
  font-weight: 900;
  opacity: 1;
  font-size: 20px;
}
</style>

<style scoped>
.chat__commands {
  margin-top: auto;
  display: flex;
  align-items: center;
  padding: 5px;
  font-size: 30px;
}
.chat__commands .command:not(:first-child) {
  margin-left: 5px;
}
.chat__commands .command {
  cursor: pointer;
  border-radius: 6px;
  padding: 2px 4px;
}
.chat__commands .command:hover {
  background-color: var(--color-bg-secondary);
}
</style>