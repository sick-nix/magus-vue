<template>
  <button
      type="button"
      class="btn button--custom"
      @click="emitClick"
  >
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: "CustomButton",
  methods: {
    emitClick(evt) {
      this.$emit('click', evt)
    }
  }
}
</script>

<style>
.button--custom .las,
.button--custom .la {
  font-weight: 900;
}
</style>
<style scoped>

</style>