<template>
  <div class="custom--avatar" :style="{backgroundColor: getRandomColor}">
    <img v-if="avatarUri" class="avatar__img" :src="avatarUri" alt=""/>
    <span v-else class="avatar__initials">{{ initials }}</span>
  </div>
</template>

<script>
import v from 'voca'
import stc from "string-to-color"

export default {
  name: "CustomAvatar",
  props: {
    name: {
      type: String,
      required: true,
    },
    avatarUri: {
      type: String,
      default: null
    }
  },
  computed: {
    initials() {
      return this.name.split(' ').map(el => v.first(el)).join('')
    },
    getRandomColor() {
      return stc(this.name)
    }
  }
}
</script>

<style scoped>
.custom--avatar {
  text-transform: uppercase;
  width: 40px;
  height: 40px;
  border-radius: 6px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.avatar__img {
  border-radius: 6px;
}
.avatar__initials {
  font-weight: 900;
  color: var(--color-text-inverse);
}
</style>