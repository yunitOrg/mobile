<template>
  <div class="sendpws">
    <van-field
      v-model="formData[field]"
      :disabled="params['disabled']"
      :placeholder="params['placeholder']"
    />
    <span class="swnd-btn" :style="computedStyle">{{label}}</span>
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
