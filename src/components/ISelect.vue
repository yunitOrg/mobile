<template>
  <!--
    根目录规范(必须不能为空)：
    idm-ctrl：控件类型 drag_container：容器，drag_container_inlieblock：行内容器，idm_module：非容器的组件
    id：使用moduleObject.id，如果id不使用这个将会被idm-ctrl-id属性替换
    idm-ctrl-id：组件的id，这个必须不能为空
  -->
  <div idm-ctrl="idm_module"
  :id="moduleObject.id"
  :idm-ctrl-id="moduleObject.id">
    <div class="idm-select">
      <div class="select-flex" v-for="(item, index) in propData.tableMenu" :key="index">
          <span class="select-span">{{item.title}}</span>
          <van-dropdown-menu :direction="propData.direction" :overlay="propData.overlay">
            <van-dropdown-item
              title-class="select-custom"
              v-model="formData[item.field]" 
              :options="item.copyOptions"
              :disabled="item.disabled"
              @change="handleChange"
            />
          </van-dropdown-menu>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ISelect',
  data () {
    return {
      formData: {},
      moduleObject:{},
      pageData: {},
      propData:this.$root.propData.compositeAttr||{
        bgColor: {
          hex: "#fff",
          hex8: "#fff"
        },
        boxShadow: 'none',
        tableMenu: [
           {
              key: "1",
              title: "类型:",
              field: "type",
              type: "static",
              selectVal: 0,
              disabled: false,
              options: "[{ text: '全部商品', value: 0 }, { text: '新款商品', value: 1 }, { text: '活动商品', value: 2 }]"
            },
            {
              key: "2",
              title: "状态:",
              field: "state",
              type: "static",
              selectVal: 0,
              disabled: false,
              options: "[{ text: '全部商品', value: 0 }, { text: '新款商品', value: 1 }, { text: '活动商品', value: 2 }]"
            }
        ]
      }
    }
  },
  created () {
    this.moduleObject = this.$root.moduleObject
    if (this.propData.tableMenu && this.propData.tableMenu.length > 0) {
       this.propData.tableMenu.forEach(item => {
        this.$set(this.formData, item.field, item.selectVal)
        item.copyOptions = item.type === 'static'?this.handleOption(item.options):[];
      })
      if (this.propData.tableMenu.filter(item => item.type === 'interface').length > 0) {
        this.initData()
      }
      this.propData.tableMenu.forEach(item => {
        if (item.selectVal) {
          this.formData[item.field] = Number(item.selectVal)
        }
      })
      this.handleChange()
    }
    this.init()
  },
  methods: {
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
    propDataWatchHandle (propData) {
      this.propData = propData.compositeAttr||{};
      this.init();
    },
    init () {
      console.log(this.propData, '数据源')
      this.converStyleObj()
    },
    initData () {
      let that = this;
      if (this.moduleObject.env == "production") {
        if (this.propData.dataSource) {
          IDM.datasource.request(this.propData.dataSource[0]?.id, {
            moduleObject: this.moduleObject
          }, (data) => {
            if (data) {
              this.pageData = data;
              this.propData.tableMenu.forEach(item => {
                  if (item.type === 'interface') {
                    item.copyOptions = that.pageData[item.selectField]
                  }
                })
            }
          })
        }
      }
    },
    converStyleObj () {
      let styleObject = {},
          itemStyleObject = {},
          fontStyle = {},
          chooseFontStyle = {},
          styleDropdom = {},
          selectFont = {};
      for (const key in this.propData) {
        if (this.propData.hasOwnProperty.call(this.propData, key)) {
          const element = this.propData[key]
          if (!element && element !== false && element != 0) {
              continue
          }
          switch (key) {
            case 'box':
              IDM.style.setBoxStyle(styleObject, element)
              break
            case 'width':
              styleObject['width'] = element;
              break
            case 'height':
              styleObject['height'] = element;
              break
            case 'bgColor':
              styleObject['background-color'] = element && element.hex8
              itemStyleObject['background-color'] = element && element.hex8
              break
            case 'boxShadow':
              itemStyleObject['box-shadow'] = element
              break
            case 'itemFontStyle':
              IDM.style.setFontStyle(fontStyle, element)
              break
            case 'chooseStyle':
              IDM.style.setFontStyle(chooseFontStyle, element, true)
              break
            case 'selectFont':
              IDM.style.setFontStyle(selectFont, element, true)
              break
            case 'popPosition':
              styleDropdom['top'] = element + '!important'
              break
          }
        }
      }
      window.IDM.setStyleToPageHead(this.moduleObject.id + " .idm-select", styleObject);
      window.IDM.setStyleToPageHead(this.moduleObject.id + " .idm-select .van-dropdown-menu__bar", itemStyleObject);
      window.IDM.setStyleToPageHead(this.moduleObject.id + " .idm-select .select-custom", fontStyle);
      window.IDM.setStyleToPageHead(this.moduleObject.id + " .idm-select .select-span", fontStyle);
      window.IDM.setStyleToPageHead(this.moduleObject.id + " .idm-select .van-dropdown-menu__title--active", chooseFontStyle);
      window.IDM.setStyleToPageHead(this.moduleObject.id + " .idm-select .van-cell", selectFont);
      window.IDM.setStyleToPageHead(this.moduleObject.id + " .idm-select .van-dropdown-item", styleDropdom);
    },
    handleChange () {
      let ary = []
      this.propData.tableMenu.forEach(item => {
        if (this.formData.hasOwnProperty.call(this.formData, item.field)) {
          ary.push(
            {
              [item.field]: this.formData[item.field],
              font: (item.copyOptions.find(i => i.value == this.formData[item.field]) || {}).text
            }
          )
        }
      });
      if (this.propData.triggerComponents && this.propData.triggerComponents.length > 0) {
        this.sendBroadcastMessage({
          type: 'iselect_chooseData',
          rangeModule: this.propData.triggerComponents && this.propData.triggerComponents.map(el => el.moduleId),
          message: ary
        })
      }
    },
    /**
     * 组件通信：发送消息的方法
     * @param {
     *  type:"自己定义的，统一规定的type：linkageResult（组件联动传结果值）、linkageDemand（组件联动传需求值）、linkageReload（联动组件重新加载）
     * 、linkageOpenDialog（打开弹窗）、linkageCloseDialog（关闭弹窗）、linkageShowModule（显示组件）、linkageHideModule（隐藏组件）、linkageResetDefaultValue（重置默认值）",
     *  message:{实际的消息对象},
     *  rangeModule:"为空发送给全部，根据配置的属性中设定的值（值的内容是组件的packageid数组），不取子表的，比如直接 this.$root.propData.compositeAttr["attrKey"]（注意attrKey是属性中定义的bindKey）,这里的格式为：['1','2']"",
     *  className:"指定的组件类型，比如只给待办组件发送，然后再去过滤上面的值"
     *  globalSend:如果为true则全站发送消息，注意全站rangeModule是无效的，只有className才有效，默认为false
     * } object 
     */
    sendBroadcastMessage(object) {
      console.log('ISelect组件发送消息', object);
      window.IDM.broadcast && window.IDM.broadcast.send(object);
    }
  }
}
</script>

<style lang="scss">
.idm-select{
  width: 100%;
  display: flex;
  .van-dropdown-item__content{
    position: absolute;
  }
  .van-dropdown-menu__title::after{
    position: absolute;
    top: 50%;
    right: -6px;
    margin-top: -2px;
    width: 8px;
    height: 8px;
    border: 1px solid transparent;
    border-top: 1px solid #f00;
    border-right: 1px solid #f00;
  }
  .van-dropdown-menu__title--down::after{
    margin-top: -6px;
  }
  .select-flex{
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 1;
  }
}
</style>

