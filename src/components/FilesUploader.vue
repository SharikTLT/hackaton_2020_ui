<template>
  <q-file
      v-model="files"
      @input="(value) => onFileChange()"
      label="Выберите документы для загрузки"
      outlined
      use-chips
      multiple
      style="max-width: 300px"
    />
</template>

<script>
export default {
  name: 'FilesUploaders',
  props: ['bus', 'package'],
  mounted: function () {
    this.bus.$on('uploadFiles', this.uploadFiles)
    this.files = this.package.files
  },
  data () {
    return {
      files: null
    }
  },
  computed: {
    workingPackage: function () {
      const pack = this.$$store.getters['attachmenet/getPackage'](this.package.id)
      if (pack.state === 'ready') {
        this.bus.$emit('filesUploaded')
      }
      return pack
    }
  },
  methods: {
    uploadFiles: function () {
      this.$store.dispatch('attachment/upload', { files: this.files, packId: this.packId })
    },
    onFileChange: function () {
      this.$store.dispatch('attachment/updatePackage', {
        id: this.package.id,
        files: this.files,
        state: 'edit'
      })
    }
  }
}
</script>
