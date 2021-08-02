<template>
  <div class="header">
    <div class="header__banner">
      <div class="banner__container">
        <router-link to="/">
          <img class="banner__brand" :src="$assets.brand"  alt=""/>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CustomHeader"
}
</script>

<style scoped>
.header {
  position: relative;
}
.header__banner {
  background-color: transparent;
  border-bottom: 0;
  padding-top: 32px;
  padding-bottom: 24px;
  width: 100%;
}
.banner__container {
  margin-left: auto;
  margin-right: auto;
  text-align: center;
  width: 100%;
}
.banner__brand {
  height: 48px;
  width: 48px;
}
</style>