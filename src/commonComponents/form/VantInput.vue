<!-- 输入框 -->
<template>
  <div class="input-com" :style="computedBlock">
    <div class="name" :style="computedStyle" v-if="params['labelShow']">
      <span v-if="params.required" class="required">*</span>
      {{label}}
    </div>
    <van-field
      class="form-cel"
      v-model="formData[field]"
      :placeholder="params['placeholder']"
      :input-align="params['inputAlign']"
      :disabled="params['disabled']"
      :type="params['inputType']"
      @blur="handleBlur"
      :error-message="!fieldCheck ? params['errorFont'] : ''"
      :error-message-align="params['inputAlign']"
    />
  </div>
</template>

<script>
export default{
  name: 'VantInput',
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
      fieldCheck: true
    }
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
        styleObject['display'] = 'block'
      }
      return styleObject
    }
  },
  methods: {
    handleBlur (event) {
      const val = event.target.value;
      const func = this.params['checkField'];
      if (func && func[0] && func[0].name) {
        this.fieldCheck = window[func[0].name] && window[func[0].name].call(this, val, {params: this.formData, data: this.params})
      }
    }
  }
}
</script>
