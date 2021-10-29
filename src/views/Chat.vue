<template>
  <chat-container></chat-container>
</template>

<script>
import ChatContainer from "components/Chat/Container"
export default {
  name: "Chat",
  components: {ChatContainer},
  async mounted() {
    await this.$store.dispatch('createConnection')
  }
}
</script>

<style scoped>

</style>