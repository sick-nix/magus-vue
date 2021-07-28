<template>
  <div>
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
  </div>
</template>

<script>
import getRegisterSchema from "components/Form/Schema/register";

export default {
  name: "Register",
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
  methods: {
    register() {
      this.$store.dispatch('register', this.formValues)
    }
  }
}
</script>

<style scoped>

</style>