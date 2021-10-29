<template>
  <div class="room__list">
    <div class="list__section list__section--channels">
      <div class="section__title" @click="setFlag('channelListOpen')">
        <span>Channels</span>
        <i class="las" :class="{[getCaret('channelListOpen')]: true}"></i>
      </div>
      <div v-show="channelListOpen" class="channel-list">
        <room v-for="room in channels" :room="room" :key="room._id"></room>
      </div>
    </div>
    <div class="list__section list__section--directs">
      <div class="section__title" @click="setFlag('directListOpen')">
        <span>Directs</span>
        <i class="las" :class="{[getCaret('directListOpen')]: true}"></i>
      </div>
      <div v-show="directListOpen" class="channel-list">
        <room v-for="room in directs" :room="room" :key="room._id"></room>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from "vuex"
import Room from "components/Chat/Container/Sidebar/RoomList/Room"

export default {
  name: "RoomList",
  components: {Room},
  data() {
    return {
      channelListOpen: true,
      directListOpen: true,
    }
  },
  computed: {
    ...mapGetters({
      rooms: 'rooms',
      channels: 'channels',
      directs: 'directs'
    }),
    getCaret() {
      return (flagName) => {
        return this[flagName] ? 'la-angle-down' : 'la-angle-left'
      }
    }
  },
  methods: {
    setFlag(flagName, value = undefined) {
      if(this[flagName] === undefined) throw new Error(`No flag named ${flagName} exists`)
      let flagValue = value
      if(flagValue === undefined) flagValue = !this[flagName]

      this[flagName] = flagValue
    }
  }
}
</script>

<style scoped>
.room__list {
  overflow-y: auto;
  padding: 10px;
}
.section__title {
  padding: 10px;
  border: 1px solid var(--color-btn-border);
  border-radius: 6px;
  display: flex;
  align-items: center;
}
.section__title:hover {
  background-color: var(--color-state-hover-secondary-bg);
  cursor: pointer;
}
.section__title > i {
  margin-left: auto;
}
.channel-list {
  padding: 10px;
}
</style>