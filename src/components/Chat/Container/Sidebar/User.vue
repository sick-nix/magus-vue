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
    <div class="info__identifications">
      <div class="identifications__username">
        <div class="username">{{ user.username }}</div>
        <div v-if="highlightCurrentUser" class="is-current">You</div>
      </div>
      <div class="identifications__email">{{ user.email }}</div>
    </div>
    <custom-dropdown v-if="!userProp" :options="getDropdownOptions"/>
  </div>
</template>

<script>
import { mapGetters } from "vuex"
import CustomDropdown from "components/custom/Dropdown"
import MagusObject from "util/class/Magus/Object"

export default {
  name: "UserInfo",
  components: {CustomDropdown},
  data() {
    return {
      showDropdown: false
    }
  },
  props: {
    userProp: {
      type: MagusObject,
      default: null
    },
    highlightCurrent: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    ...mapGetters({
      currentUser: "user"
    }),
    getDropdownOptions() {
      return [
        {
          click: this.logout,
          label: 'Logout'
        }
      ]
    },
    user() {
      if(this.userProp) return this.userProp
      return this.currentUser
    },
    highlightCurrentUser() {
      return this.highlightCurrent && this.userProp && this.userProp.email === this.currentUser.email
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
  width: 100%;
}
.avatar {
  border: 1px solid var(--color-border-tertiary);
}
.info__identifications {
  margin-inline: 10px;
  overflow: hidden;
}
.identifications__username {
  display: flex;
}
.identifications__username .username {
  font-weight: bold;
  overflow: hidden;
  text-overflow: ellipsis;
}
.is-current {
  margin-left: 10px;
  font-style: italic;
  opacity: 0.6;
  line-height: 17px;
}
.identifications__email {
overflow: hidden;
text-overflow: ellipsis;
}
</style>