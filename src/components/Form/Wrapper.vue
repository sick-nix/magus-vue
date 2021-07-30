<template>
  <div class="login__container">
    <div class="form__container">
      <div class="form__header">
        <h1 class="header__text">{{ textProps.headerText }}</h1>
      </div>
      <div class="form__body">
        <slot/>
      </div>
      <div class="form-callout">
        {{ textProps.calloutMessage }}
        <router-link :to="linkTo">{{ textProps.calloutLink }}</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "FormWrapper",
  props: {
    textProps: {
      type: Object,
      default: () => ({
        headerText: '',
        calloutMessage: '',
        calloutLink: '',
      })
    },
    linkTo: {
      type: String,
      default: '/login'
    }
  }
}
</script>

<style scoped>
.form__container {
  margin: 0 auto;
  width: 340px;
  padding-right: 16px;
  padding-left: 16px;
}
.form__header {
  background-color: transparent;
  border: 0;
  color: var(--text-color-primary);
  margin: 0 0 15px;
  text-align: center;
  text-shadow: none;
  border-radius: 6px 6px 0 0;
  padding: 0;
}
.header__text {
  font-size: 24px;
  font-weight: 300;
  letter-spacing: -.5px;
}
.form__body {
  border-radius: 6px;
  border: 1px solid var(--color-border-secondary);
  background-color: var(--color-bg-tertiary);
  font-size: 14px;
  padding: 20px;
  margin-top: 16px;
}
.form-callout {
  border: 1px solid var(--color-border-tertiary);
  border-radius: 6px;
  padding: 15px 20px;
  text-align: center;
  margin-top: 16px;
  margin-bottom: 10px;
}
</style>