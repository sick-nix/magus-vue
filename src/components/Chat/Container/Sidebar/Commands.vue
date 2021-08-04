<template>
  <div class="chat__commands">
    <div class="commands BtnGroup d-block">
      <div class="BtnGroup-item btn" title="Create a Channel" @click="$modal.show('createChannel')">
        <i class="las la-users"></i>
      </div>
      <div class="BtnGroup-item btn" title="Direct Chat">
        <i class="las la-user-friends"></i>
      </div>
    </div>
    <modal name="createChannel">
      <form-wrapper :text-props="{ headerText: 'Create a new Channel'}" link-to="/register">
        <formulate-form
          :schema="getCreateChannelSchema"
          v-model="formValues"
        >
        </formulate-form>
      </form-wrapper>
    </modal>
  </div>
</template>

<script>
import channelSchema from 'components/Form/Schema/Chat/channel'
import FormWrapper from 'components/Form/Wrapper'
import {mergeWithUniqueKeys} from "util/array"

export default {
  name: "ChatCommands",
  components: {FormWrapper},
  data() {
    return {
      createChannelSchema: null,
      usersOptions: [],
      formValues: null,
      searchedUsers: []
    }
  },
  computed: {
    getCreateChannelSchema() {
      return channelSchema({
        options: this.searchedUsers,
        search: this.getUsers,
        cancel: () => {
          this.$modal.hide('createChannel')
        },
        create: async () => {
          await this.$store.dispatch('createRoom', this.formValues)
          this.$modal.hide('createChannel')
        },
        selectOpen: this.getUsers
      })
    }
  },
  methods: {
    async getUsers(search, loading) {
      const request = await this.$store.dispatch('getUsers', {search: search || '', excludeCurrentUser: true})
      const users = await request.json()
      this.usersOptions = users.map(user => ({value: user._id, label: user.username}))
      this.searchedUsers = mergeWithUniqueKeys(this.usersOptions, this.searchedUsers, 'value')
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
.commands .btn {
  padding-inline: 10px;
}
.commands .btn > i {
  font-weight: 900;
  opacity: 1;
  font-size: 20px;
}
</style>