<template>
  <div class="input-com" :style="computedBlock">
    <div class="name" :style="computedStyle" v-if="params['labelShow']">
      <span v-if="params.required" class="required">*</span>
      {{ label }}
    </div>
    
  </div>
</template>

<script>
export default {
  name: 'VantchooseTag',
  props: {
    id: String,
    label: String,
    field: String,
    options: Object,
    formData: Object,
    params: Object
  },
  data () {
    return {

    }
  },
  computed: {
    computedStyle() {
      let obj = {}
      obj['width'] = this.params['labelWidth'];
      obj['height'] = this.params['labelHeight']
      if (this.params.labelFont) {
        IDM.style.setFontStyle(obj, this.params.labelFont)
      }
      if (this.params.labelBox) {
        IDM.style.setBoxStyle(obj, this.params.labelBox)
      }
      if (this.params.showAlign) {
        switch (this.params.showAlign) {
          case 'center':
            obj['justify-content'] = 'center'
            break
          case 'left':
            obj['justify-content'] = 'left'
            break
          case 'right':
            obj['justify-content'] = 'end'
            break
        }
      }
      return obj
    },
    computedBlock() {
      let styleObject = {}
      if (this.params['labelBlock']) {
        styleObject['display'] = 'block'
      }
      return styleObject
    },
  },
  methods: {

  }
}
</script>
