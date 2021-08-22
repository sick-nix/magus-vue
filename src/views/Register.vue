<template>
  <div class="register-view">
    <custom-header/>
    <form-wrapper
        :text-props="formWrapperTextProps"
        :form-class="{ 'auth-form': true }"
    >
      <formulate-form
          #default="{ hasErrors }"
          :schema="registerSchema"
          v-model="formValues"
      >
        <formulate-input
            type="button"
            :disabled="hasErrors"
            @click="register"
        />
      </formulate-form>
    </form-wrapper>
  </div>
</template>

<script>
import getRegisterSchema from "components/Form/Schema/register"
import CustomHeader from "components/Header"
import FormWrapper from "components/Form/Wrapper"
import {renderToasts} from "util/error"

export default {
  name: "Register",
  components: {CustomHeader, FormWrapper},
  data() {
    return {
      formValues: {},
      registerSchema: null
    }
  },
  mounted() {
    this.registerSchema = getRegisterSchema({
      available: async context => {
        if(context.value !== '')
          return (await this.$store.dispatch('checkAvailable', context))
        return false
      }
    })
  },
  computed: {
    formWrapperTextProps() {
      return {
        headerText: 'Sign up to Magus',
        calloutMessage: ' Already have an account? ',
        calloutLink: 'Sign In'
      }
    }
  },
  methods: {
    async register() {
      const request = await this.$store.dispatch('register', this.formValues)
      request.json(async json => {
        if(json && json.success) {
          await this.$router.push('/login')
          renderToasts(json)
        }
      })
    }
  }
}
</script>

<style scoped>
</style>