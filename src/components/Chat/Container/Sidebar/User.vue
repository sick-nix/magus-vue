<template>
  <div class="user__info">
    <img
        v-if="user && user.avatar"
        class="avatar"
        :src="user.avatar"
        alt=""
        :title="user.username"
    />
    <details class="dropdown details-reset details-overlay d-inline-block">
      <summary class="btn" aria-haspopup="true">
        <i class="las la-ellipsis-v"></i>
      </summary>

      <ul class="dropdown-menu dropdown-menu-ne">
        <a class="dropdown-item" href="#" @click="logout">Logout</a>
      </ul>
    </details>
  </div>
</template>

<script>
import { mapGetters } from "vuex"

export default {
  name: "UserInfo",
  data() {
    return {
      showDropdown: false
    }
  },
  computed: {
    ...mapGetters({
      user: "user"
    })
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
  width: 48px;
  height: 48px;
  border: 1px solid var(--color-border-tertiary);
}
.dropdown .btn {
  padding-inline: 10px;
}
.dropdown .btn > i {
  font-weight: 900;
  opacity: 1;
  font-size: 20px;
}
</style>