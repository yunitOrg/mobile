<template>
  <div class="input-com">
    <div class="name" :style="computedStyle">
      {{label}}
    </div>
    <van-field
      v-model="formData[field]"
      :placeholder="params['placeholder']"
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
      console.log(obj)
      return obj
    }
  }
}
</script>
