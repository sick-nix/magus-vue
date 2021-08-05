<template>
  <div class="custom--avatar">
    {{ initials }}
  </div>
</template>

<script>
import v from 'voca'
// @todo complete with random background
export default {
  name: "CustomAvatar",
  props: {
    name: {
      type: String,
      required: true,
    }
  },
  computed: {
    initials() {
      return this.name.split(' ').map(el => v.first(el)).join('')
    }
  }
}
</script>

<style scoped>
.custom--avatar {
  text-transform: uppercase;
}
</style>