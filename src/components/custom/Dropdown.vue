<template>
  <details v-if="this.options.length" class="dropdown details-reset details-overlay d-inline-block">
    <summary class="btn" aria-haspopup="true">
      <i class="las la-ellipsis-v"></i>
    </summary>

    <ul class="dropdown-menu" :class="classes">
      <a
          v-for="option in options"
          :key="option.label"
          class="dropdown-item"
          href="#"
          @click="option.click"
      >
        {{ option.label }}
      </a>
    </ul>
  </details>
</template>

<script>
import {DROPDOWN_POSITIONS} from "constants/components"

export default {
  name: "CustomDropdown",
  props: {
    options: {
      type: Array,
      default: () => ([])
    },
    position: {
      type: String,
      default: DROPDOWN_POSITIONS.NORTH_EAST
    }
  },
  computed: {
    classes() {
      return {
        ['dropdown-menu-' + this.position]: true
      }
    }
  }
}
</script>

<style scoped>
.dropdown .btn {
  padding-inline: 10px;
}
.dropdown .btn > i {
  font-weight: 900;
  opacity: 1;
  font-size: 20px;
}
</style>