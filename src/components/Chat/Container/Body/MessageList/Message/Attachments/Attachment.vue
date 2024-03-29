<template>
  <div class="attachment">
    <div v-if="isInProgress"><custom-spinner></custom-spinner></div>
    <div v-else class="attachment__content">
      <div v-if="isImage" class="attachment__image">
        <img :src="attachmentUrl" alt="image attachment"/>
      </div>
      <div class="non-image-attachment" v-else-if="this.attachment.fileType">
        <a href="#" target="_blank" @click.prevent="download">
          <i class="las la-paperclip"></i>
          <span>{{ attachment.origFilename }}</span>
        </a>
      </div>
      <div v-else class="attachment--missing">No attachment found</div>
    </div>
  </div>
</template>

<script>
import MagusObject from "util/class/Magus/Object"
import CustomSpinner from "components/custom/Spinner"
import v from 'voca'
import Magus from "src/Magus"
import {download} from "util/html"
import { EVENTS } from "constants/events"
import {mapGetters} from "vuex"
import { differenceInSeconds } from 'date-fns'

export default {
  name: "Attachment",
  components: {CustomSpinner},
  props: {
    attachment: {
      type: MagusObject,
      default: () => (new MagusObject())
    }
  },
  mounted() {
    Magus.getGlobalEventBus().on(EVENTS.ATTACHMENT_DOWNLOAD, this.downloadHandler)
  },
  destroyed() {
    Magus.getGlobalEventBus().off(EVENTS.ATTACHMENT_DOWNLOAD, this.downloadHandler)
  },
  computed: {
    ...mapGetters({
      isCreatedByUser: 'isCreatedByUser',
      getInProgressFile: 'getInProgressFile'
    }),
    isImage() {
      return v.indexOf(this.attachment.fileType, 'image') >= 0
    },
    isInProgress() {
      if(this.attachment.filePath) return false
      return this.getInProgressFile(this.attachment.tempId)
        || this.isInProgressByOtherUser
    },
    attachmentUrl() {
      return Magus.instance.getUrl('attachment' + this.attachment.filePath.replace('/media',''))
    },
    isInProgressByOtherUser() {
      return !this.isCreatedByUser(this.attachment) && differenceInSeconds(new Date(this.attachment.createdAt), new Date()) > -120
    }
  },
  methods: {
    async download() {
      const blob = await(this.$store.dispatch('downloadFile', {
        id: this.attachment._id
      }))

      download(blob, this.attachment)
    },
    async downloadHandler(params) {
      const { message } = params
      if(message?._id && this.attachment.message === message._id)
        await this.download()
    }
  }
}
</script>

<style scoped>
.attachment__image {
  height: 200px;
}
.attachment__image img {
  object-fit: contain;
  max-width: 100%;
  max-height: 100%;
  width: auto;
  height: auto;
}
.attachment--missing {
  font-style: italic;
}
</style>