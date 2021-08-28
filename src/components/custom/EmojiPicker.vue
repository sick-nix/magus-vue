<template>
  <emoji-picker @emoji="onInsert" :search="search">
    <div class="emoji-invoker" slot="emoji-invoker" slot-scope="{ events: { click: clickEvent } }" @click.stop="clickEvent">
      <slot></slot>
    </div>
    <div slot="emoji-picker" slot-scope="{ emojis, insert, display }">
      <div class="emoji-picker">
        <div class="emoji-picker__search">
          <input type="text" class="form-control" v-model="search" placeholder="Search">
        </div>
        <div>
          <div v-for="(emojiGroup, category) in emojis" :key="category" class="emoji__category">
            <h5>{{ category }}</h5>
            <div class="emojis">
              <span
                v-for="(emoji, emojiName) in emojiGroup"
                :key="emojiName"
                @click="insert(emoji)"
                :title="emojiName"
              >
                {{ emoji }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </emoji-picker>
</template>

<script>
import EmojiPicker from 'vue-emoji-picker'

export default {
  name: "CustomEmojiPicker",
  components: {EmojiPicker},
  data() {
    return {
      search: '',
    }
  },
  props: {
    onInsert: {
      type: Function,
      default: () => {}
    }
  }
}
</script>

<style scoped>
.emoji-picker {
  position: absolute;
  z-index: 1;
  border: 1px solid var(--color-border-primary);
  width: 15rem;
  height: 10rem;
  overflow-y: auto;
  padding: 1rem;
  box-sizing: border-box;
  border-radius: 0.5rem;
  background: var(--color-bg-canvas);
  box-shadow: 1px 1px 8px #c7dbe6;
  bottom: 33px;
  right: 0;
}
.emoji__category {
  margin-top: 10px;
}
.emoji-picker h5 {
  margin-bottom: 0;
  text-transform: uppercase;
  font-size: 0.8rem;
  cursor: default;
}
.emoji-picker .emojis {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.emoji-picker .emojis:after {
  content: "";
  flex: auto;
}
.emoji-picker .emojis span {
  padding: 0.2rem;
  cursor: pointer;
  border-radius: 5px;
}
.emoji-picker .emojis span:hover {
  background: var(--color-btn-hover-bg);
  cursor: pointer;
}
</style>