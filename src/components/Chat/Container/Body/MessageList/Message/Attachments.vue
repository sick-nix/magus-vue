<template>
  <div v-if="attachments.length" class="attachment__list">
    <attachment
        v-for="attachment in attachments"
        class="attachment__wrapper"
        :attachment="attachment"
        :key="attachment.uniq"
    >
    </attachment>
  </div>
</template>

<script>
import Attachment from "components/Chat/Container/Body/MessageList/Message/Attachments/Attachment"

export default {
  name: "AttachmentsList",
  components: {Attachment},
  props: {
    attachments: {
      type: Array,
      default: () => ([])
    }
  },
  computed: {
    isImage() {

    }
  }
}
</script>

<style scoped>

</style>