<template>
  <div ref="hamburger" class="hamburger" @click="emitClick">
    <div class="bar"></div>
    <div class="bar"></div>
    <div class="bar"></div>
  </div>

</template>

<script>
import { EVENTS } from "constants/events"
import Magus from "src/Magus"

export default {
  name: "CustomHamburgerButton",
  methods: {
    emitClick() {
      Magus.getGlobalEventBus().emit(EVENTS.TOGGLE_MAIN_SIDEBAR)
    }
  }
}
</script>

<style scoped>
.hamburger {
  display: inline-block;
  cursor: pointer;
  margin-right: 10px;
}

.hamburger .bar {
  width: 22px;
  height: 2px;
  background-color: #333;
  margin: 5px 0;
}

@media screen and (min-width: 768px){
  .hamburger {
    display: none;
  }
}
</style>