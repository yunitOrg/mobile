<!-- 动作面板 -->
<template>
  <div class="input-com" :style="computedBlock">
    <div class="name" :style="computedStyle" v-if="params['labelShow']">
      {{label}}
    </div>
    <div class="celright" :style="`text-align:${params['inputAlign']}`" @click="handleShowSheet">{{formData[field] ? setFormName : params['placeholder']}}</div>
    <van-action-sheet class="customclas" v-model="sheetShow" :actions="actionList" @select="onSelect" />
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
    formData: {
      type: Object,
      default: () => {
        return {};
      }
    },
    params: Object,
    moduleObject: Object
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
    setFormName () {
      let fid = this.field;
      let tem = this.formData[fid];
      let obj = this.actionList.find(item => item.value == tem)
      return obj.name
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
      sheetShow: false,
      actionList: []
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
    getSelectData () {
      console.log(999, this.moduleObject, this.params)
      const customInterfaceUrl = '/ctrl/dataSource/getDatas';
      if (this.moduleObject.env == "production") {
        this.params.selectSource &&
          IDM.http.post(
              customInterfaceUrl,
              {
                id: this.params.selectSource && this.params.selectSource.value,
              },
              {
                headers: {
                  "Content-Type": "application/json;charset=UTF-8",
                },
              }
            )
            .then((res) => {
              if (res.status == 200 && res.data.code == 200) {
                let ary = res.data.data || [];
                let tem = this.params.selectName;
                let str = this.params.selectValue;
                this.actionList = ary.map(item => {
                  return{
                    name: item[tem],
                    value: item[str]
                  }
                })
              } else {
                IDM.message.error(res.message);
              }
            });
      }
    },
    getPageData () {
      if (this.params['selectType'] === 'static') {
        this.actionList = this.handleOption(this.params.selectOptions)
      } else if (this.params['selectType'] === 'interface') {
        this.getSelectData()
      }
    },
    onSelect (item) {
      let temp = this.params.selectValue;
      this.$set(this.formData, this.field, item[temp] || item.value)
      this.sheetShow = false
    }
  },
  mounted () {
    this.getPageData()
  }
}
</script>
