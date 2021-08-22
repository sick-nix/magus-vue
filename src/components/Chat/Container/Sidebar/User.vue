<template>
  <div class="user__info">
    <img
        v-if="user && user.avatar"
        class="avatar"
        :src="user.avatar"
        width="48"
        height="48"
        alt=""
        :title="user.username"
    />
    <custom-dropdown :options="getDropdownOptions"/>
  </div>
</template>

<script>
import { mapGetters } from "vuex"
import CustomDropdown from "components/custom/Dropdown"

export default {
  name: "UserInfo",
  components: {CustomDropdown},
  data() {
    return {
      showDropdown: false
    }
  },
  computed: {
    ...mapGetters({
      user: "user"
    }),
    getDropdownOptions() {
      return [
        {
          click: this.logout,
          label: 'Logout'
        }
      ]
    }
  },
  methods: {
    async logout() {
      await this.$store.dispatch('logout')
      await this.$router.push({name: 'login'})
    }
  }
}
</script>

<style>
.user__info .dropdown {
  margin-left: auto;
  position: relative;
}
</style>

<style scoped>
.user__info {
  border-top: 1px solid var(--color-border-primary);
  padding: 8px;
  display: flex;
  align-items: center;
}
.avatar {
  border: 1px solid var(--color-border-tertiary);
}
</style>