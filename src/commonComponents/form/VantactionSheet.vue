<!-- 动作面板 -->
<template>
  <div class="input-com" :style="computedBlock">
    <div class="name" :style="computedStyle" v-if="params['labelShow']">
      {{label}}
    </div>
    <van-field
      class="form-cel"
      v-model="formData[field]"
      :placeholder="params['placeholder']"
      :input-align="params['inputAlign']"
      :disabled="params['disabled']"
      :type="params['inputType']"
      @click="handleShowSheet"
      :error-message="!fieldCheck ? params['errorFont'] : ''"
      :error-message-align="params['inputAlign']"
    />
    <van-action-sheet v-model="sheetShow" :actions="handleActiion" @select="onSelect" />
  </div>
</template>

<script>
export default{
  name: 'VantActionSheet',
  props: {
    id: String,
    label: String,
    field: String,
    options: Object,
    formData: Object,
    params: Object
  },
  computed: {
    handleActiion () {
      let result = []
      if (this.params['selectType'] === 'static') {
        result = this.handleOption(this.params.selectOptions)
      } else if (this.params['selectType'] === 'interface') {

      }
      return result
    },
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
    computedBlock () {
      let styleObject = {}
      if (this.params['labelBlock']) {
        styleObject['display'] = 'block'
      }
      return styleObject
    }
  },
  data () {
    return {
      sheetShow: false
    }
  },
  methods: {
    handleShowSheet () {
      this.sheetShow = true
    },
    handleOption (val) {
      let result = []
      try {
        let temp = val.replace(/\s+/g,"")
        result = eval('(' + temp + ')')
      } catch (e) {
        result = []
      }
      return result
    },
    onSelect (item) {
      console.log(item)
      let tem = this.field;
      this.formData[tem] = item.name;
    }
  }
}
</script>
