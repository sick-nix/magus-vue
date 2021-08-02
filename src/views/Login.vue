<template>
  <div class="login-view">
    <custom-header/>
    <form-wrapper
        :text-props="formWrapperTextProps"
        link-to="/register"
        :form-class="{ 'auth-form': true }"
    >
      <formulate-form
          :schema="loginSchema"
          v-model="formValues"
      >
      </formulate-form>
    </form-wrapper>
  </div>
</template>

<script>
import getLoginSchema from "components/Form/Schema/login"
import CustomHeader from "components/Header"
import FormWrapper from "components/Form/Wrapper"

export default {
  name: "Login",
  components: {FormWrapper, CustomHeader},
  data() {
    return {
      formValues: {},
      loginSchema: null
    }
  },
  mounted() {
    this.loginSchema = getLoginSchema({
      login: this.login
    })
  },
  computed: {
    formWrapperTextProps() {
      return {
        headerText: 'Sign in to Magus',
        calloutMessage: ' New to Magus? ',
        calloutLink: 'Create an account'
      }
    }
  },
  methods: {
    async login() {
      const user = await this.$store.dispatch('login', this.formValues)
      if(user && user._id) await this.$router.push({ name: 'chat' })
    }
  }
}
</script>

<style scoped>
</style>