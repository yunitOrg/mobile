<template>
  <div class="input-com" :style="computedBlock">
    <div class="name" :style="computedStyle" v-if="params['labelShow']">
      {{label}}
    </div>
    <van-field
      v-model="formData[field]"
      :rows="params[rows]"
      :autosize="params[autosize]"
      type="textarea"
      :disabled="params['disabled']"
      :placeholder="params['placeholder']"
      :input-align="params['inputAlign']"
      :maxlength="params[maxlength]"
      :show-word-limit="params[showWordLimit]"
    />
  </div>
</template>

<script>
export default{
  name: 'VantInput',
  props: {
    label: String,
    field: String,
    options: Object,
    formData: Object,
    params: Object
  },
  computed: {
    computedStyle () {
      let obj = {}
      obj['width'] = this.params['labelWidth'];
      obj['height'] = this.params['labelHeight']
      if (this.params.labelFont) {
        IDM.style.setFontStyle(obj, this.params.labelFont)
      }
      if (this.params.labelBox) {
        IDM.style.setBoxStyle(obj, this.params.labelBox)
      }
      return obj
    },
    computedBlock () {
      let styleObject = {}
      if (this.params['labelBlock']) {
        styleObject['flex-wrap'] = 'wrap'
      }
      return styleObject
    }
  }
}
</script>