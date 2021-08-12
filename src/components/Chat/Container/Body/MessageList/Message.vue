<template>
  <div class="message">{{ message.content }}</div>
</template>

<script>
export default {
  name: "Message",
  props: {
    message: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>

<style scoped>

</style>