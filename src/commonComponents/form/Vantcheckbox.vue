<!-- 复选框 -->
<template>
  <div class="input-com" :style="computedBlock">
     <div class="name" :style="computedStyle" v-if="params['labelShow']">
      {{label}}
    </div>
    <van-checkbox-group class="chebox-group" v-model="formData[field]">
      <van-checkbox
      class="cheboxvan"
      v-for="(item, index) in checkboxList" :key="index"
      shape="square"
      :disabled="params['disabled']"
      :name="item.value">
      {{item.label}}
      </van-checkbox>
    </van-checkbox-group>
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
    params: Object,
    moduleObject: Object
  },
  data () {
    return {
      result: [],
      checkboxList: []
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
  methods: {
    // 过滤接口参数
    fileterParams() {
      let obj = {};
      if (this.params.checkboxCustomFun && this.params.checkboxCustomFun.length > 0) {
        let name = this.params.checkboxCustomFun[0].name
        obj = window[name] && window[name].call(this);
      }
      return obj
    },
    getPageData () {
      if (this.moduleObject.env !== "production") {
        this.checkboxList = [{label: '标签一', value: '1'},{label: '标签二', value: '2'}]
        return
      }
      const routerParams = this.fileterParams();
      IDM.datasource.request(this.params.checkboxSource[0]?.id, {
        moduleObject: this.moduleObject,
        param: { ...routerParams }
      }, (data) => {
        if (data) {
          let ary = data || [];
          let tem = this.params.checkboxFieldName;
          let str = this.params.checkboxFieldValue;
          this.checkboxList = ary.map(item => {
            return{
              label: item[tem],
              value: item[str]
            }
          })
        }
      })
    },
    setStyleObject () {
      let obj = {},
        styleobj = {};
      if (this.params.cheboxSplitWidth) {
        obj['margin-left'] = this.params.cheboxSplitWidth;
      }
      if (this.params.cheboxFontWidth) {
        styleobj['margin-left'] = this.params.cheboxFontWidth;
      }
      if (this.params.cheboxFont) {
        IDM.style.setFontStyle(styleobj, this.params.cheboxFont);
      }
      window.IDM.setStyleToPageHead(".chebox-group .cheboxvan+.cheboxvan", obj);
      window.IDM.setStyleToPageHead(".chebox-group .van-checkbox__label", styleobj);
    }
  },
  mounted () {
    this.getPageData()
    this.setStyleObject()
  }
}
</script>

<style lang="scss">
.chebox-group{
  display: flex;
  flex: 1;
  justify-content: flex-end;
}
</style>
