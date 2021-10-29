<template>
  <textarea
      ref="textarea"
      class="resizable-textarea"
      :value="inputValue"
      @input="resize"
      @keydown="emitKeyDown"
  ></textarea>
</template>

<script>
import $ from 'cash-dom'

export default {
  name: "ResizableTextarea",
  props: {
    inputValue: {
      type: String,
      default: ''
    }
  },
  methods: {
    resize(evt) {
      this.$emit('input', $(evt.target).val())
      this.$refs.textarea.style.height = 'auto'
      this.$refs.textarea.style.height = `${this.$refs.textarea.scrollHeight}px`
    },
    emitKeyDown(evt) {
      this.$emit('keydown', evt)
    }
  }
}
</script>

<style scoped>
textarea {
  max-height: 110px;
  resize: none;
  display: block;
  width: 100%;
  padding: .375rem .75rem;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: var(--color-text-primary);
  background-color: var(--color-bg-overlay);
  background-clip: padding-box;
  border: 1px solid var(--color-border-primary);
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  border-radius: 6px;
  transition: border-color .15s ease-in-out,box-shadow .15s ease-in-out;
}
textarea:focus {
  border-color: var(--color-btn-focus-shadow);
  outline: 0;
  box-shadow: 0 0 0 0.25rem rgb(13 110 253 / 25%);
}
</style>