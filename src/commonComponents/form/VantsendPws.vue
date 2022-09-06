<template>
  <div class="sendpws">
    <span v-if="params.required" class="required">*</span>
    <van-field
      v-model="formData[field]"
      :disabled="params['disabled']"
      :placeholder="params['placeholder']"
      @blur="handleBlur"
      :error-message="!fieldCheck ? params['errorFont'] : ''"
      :error-message-align="params['inputAlign']"
    />
    <span class="swnd-btn" :style="computedStyle" @click="handleClick(formData[field])">{{label}}</span>
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
      let styleObject = {}
      this.params.pwdWidth && (styleObject['width'] = this.params.pwdWidth)
      if (this.params.pwdHeight) {
        styleObject['height'] = this.params.pwdHeight
        styleObject['line-height'] = this.params.pwdHeight
      }
      this.params.pwdFont && (IDM.style.setFontStyle(styleObject, this.params.pwdFont))
      this.params.pwdBorder && (IDM.style.setBorderStyle(styleObject, this.params.pwdBorder))
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
    },
    handleClick (val) {
      this.$emit('callFunc', { type: 'VantsendPws', data: val})
    }
  }
}
</script>

<style lang="scss">
.sendpws .van-cell::after{
  border: 0;
}
</style>

<style lang="scss" scoped>
.sendpws{
  display: flex;
  align-items: center;
  .required{
    color: red;
    padding-right: 5px;
  }
  .swnd-btn{
    width: 35%;
    height: 30px;
    line-height: 30px;
    text-align: center;
    color: #f00;
    border: 1px solid #f00;
    border-radius: 5px;
    display: inline-block;
    font-size: 14px;
  }
}
</style>
