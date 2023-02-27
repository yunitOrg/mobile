<template>
  <div class="input-com" :style="computedBlock">
    <div class="name" :style="computedStyle" v-if="params['labelShow']">
      <span v-if="params.required" class="required">*</span>
      {{ label }}
    </div>
    <div class="tag-ul">
      <div class="tag-li" :style="computedTagli" :class="activeList.includes(item.value)&&'active'"
        v-for="(item, index) in tagList"
        :key="index"
        @click="handleClick(item)"
      >
        {{item.label}}
      </div>
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
    params: Object,
    moduleObject: Object
  },
  data () {
    return {
      tagList: [],
      activeList: []
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
      if (this.params.tagMarginBtm) {
        obj['margin-bottom'] = this.params.tagMarginBtm;
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
    computedTagli () {
      let liStyleObject = {};
      if (this.params.tagBorder) {
        IDM.style.setBorderStyle(liStyleObject, this.params.tagBorder);
      }
      if (this.params.tagWidth) {
        liStyleObject['width'] = this.params.tagWidth;
      }
      if (this.params.tagHeight) {
        liStyleObject['height'] = this.params.tagHeight;
        liStyleObject['line-height'] = this.params.tagHeight;
      }
      if (this.params.tagFont) {
        IDM.style.setFontStyle(liStyleObject, this.params.tagFont);
      }
      return liStyleObject
    }
  },
  methods: {
    handleBackData () {
      let field = this.field;
      if (typeof this.formData[field] == 'string') {
        this.activeList = this.formData[field] && this.formData[field].split(',');
      } else {
        this.activeList = this.formData[field] || [];
      }
    },
    handleClick (row) {
      let {value} = row;
      if (this.activeList.includes(value)) {
        this.activeList.splice(this.activeList.indexOf(value), 1);
      } else {
        this.activeList.push(value);
      }
      let field = this.field;
      this.formData[field] = this.activeList;
    },
    setStyleObject () {
      let obj = {},
        styleobj = {};
      if (this.params.tagSplitWidth) {
        obj['margin-left'] = this.params.tagSplitWidth;
      }
      if (this.params.tagChooseColor) {
        IDM.style.setBorderStyle(styleobj, this.params.tagChooseColor);
      }
      if (this.params.tagDefaultFont) {
        IDM.style.setFontStyle(styleobj, this.params.tagDefaultFont);
      }
      window.IDM.setStyleToPageHead(this.moduleObject.id + " .tag-ul .tag-li+.tag-li", obj);
      window.IDM.setStyleToPageHead(this.moduleObject.id + " .tag-ul .active", styleobj);
    },
    // 过滤接口参数
    fileterParams() {
      let obj = {};
      if (this.params.tagCustomFun && this.params.tagCustomFun.length > 0) {
        let name = this.params.tagCustomFun[0].name
        obj = window[name] && window[name].call(this);
      }
      return obj
    },
    getPageData () {
      if (this.moduleObject.env !== "production") {
        this.tagList = [{label: '标签一', value: '1'},{label: '标签二', value: '2'}]
        return
      }
      if (this.params.tagSource) {
        const routerParams = this.fileterParams();
        IDM.datasource.request(this.params.tagSource[0]?.id, {
          moduleObject: this.moduleObject,
          param: { ...routerParams }
        }, (data) => {
          if (data) {
            let ary = data || [];
            let tem = this.params.tagFieldName;
            let str = this.params.tagFieldValue;
            this.tagList = ary.map(item => {
              return{
                label: item[tem],
                value: item[str]
              }
            })
          }
        })
      }
    }
  },
  mounted () {
    this.getPageData()
    this.setStyleObject()
    this.handleBackData()
  }
}
</script>

<style lang="scss" scoped>
.tag-ul{
  display: flex;
  .tag-li{
    // border-radius: 30px;
    text-align: center;
    // border: 1px solid #dedede;
  }
}
</style>
