<template>
  <div>
    <formulate-form
        :schema="loginSchema"
        v-model="formValues"
    >
      <formulate-input
          type="button"
          @click="login"
      />
    </formulate-form>
    <router-link to="/register">Register</router-link>
  </div>
</template>

<script>
import getLoginSchema from "components/Form/Schema/login";

export default {
  name: "Login",
  data() {
    return {
      formValues: {},
      loginSchema: null
    }
  },
  mounted() {
    this.$store.dispatch('checkAuth')

    this.loginSchema = getLoginSchema()
  },
  methods: {
    async login() {
      const user = await this.$store.dispatch('login', this.formValues)
      if(user && user.id)
        await this.$router.push('/chat')
    }
  }
}
</script>

<style scoped>

</style>