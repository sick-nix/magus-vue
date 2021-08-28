<template>
  <div class="BtnGroup d-block">
    <div
        v-for="btn in buttons"
        :key="btn.title"
        class="BtnGroup-item btn"
        :title="btn.title" @click="btn.click"
    >
      <i v-if="btn.icon" :class="{ [btn.icon]: true }"></i>
      <span v-else>{{ btn.label }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "CustomBtnGroup",
  props: {
    buttons: {
      type: Array,
      default: () => ([])
    }
  }
}
</script>

<style scoped>
.btn i {
  font-weight: 900;
}
</style>