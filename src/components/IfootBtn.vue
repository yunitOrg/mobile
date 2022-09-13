<template>
  <!--
    根目录规范(必须不能为空)：
    idm-ctrl：控件类型 drag_container：容器，drag_container_inlieblock：行内容器，idm_module：非容器的组件
    id：使用moduleObject.id，如果id不使用这个将会被idm-ctrl-id属性替换
    idm-ctrl-id：组件的id，这个必须不能为空
  -->
  <div idm-ctrl="idm_module"
  :id="moduleObject.id" 
  :idm-ctrl-id="moduleObject.id" 
  >
    <div class="idm-footbtn">
      <van-checkbox v-model="checked" disabled @change="handleChange">复选框</van-checkbox>
      <div class="footbtn-flex">
        <div class="footbtn-btn" v-for="(item, index) in propData.table" :key="index" :style="computedStyle(item)" @click="handleClick(item)">{{item.tab}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'IfootBtn',
  data () {
    return {
      checked: true,
      moduleObject:{},
      propData:this.$root.propData.compositeAttr||{
        box: {
          marginTopVal: "",
          marginRightVal: "",
          marginBottomVal: "",
          marginLeftVal: "",
          paddingTopVal: "",
          paddingRightVal: "20px",
          paddingBottomVal: "",
          paddingLeftVal: "20px"
        },
        width: 'auto',
        height: '60px',
        boxShadow: "0px 0px 10px 0px #e3dede",
        table: [
          {
            key: "1",
            tab: "拒绝",
            itemWidth: "100px",
            itemHeight: "40px",
            btnSplit: "10px",
            itemFontStyle: {
              fontSize: 16,
              fontSizeUnit: "px"
            },
            itemBg: {
              hex: "#FFFFFF",
              hex8: "FFFFFFFF"
            }
          },
          {
            key: "2",
            tab: "同意",
            itemWidth: "100px",
            btnSplit: "10px",
            itemHeight: "40px",
            itemFontStyle: {
              fontColors: {
                hex: "#000000"
              },
              fontSize: 16,
              fontSizeUnit: "px"
            },
            itemBg: {
              hex: "#FFFFFF",
              hex8: "FFFFFFFF"
            }
          }
        ]
      }
    }
  },
  created () {
    this.moduleObject = this.$root.moduleObject
    this.init()
  },

  methods: {
    computedStyle (item) {
      let obj = {}
      for (const key in item) {
        if (item.hasOwnProperty.call(item, key)) {
          const element = item[key]
          if (!element && element !== false && element != 0) {
              continue
          }
          switch (key) {
            case 'itemWidth':
              obj['width'] = element
              break
            case 'itemHeight':
              obj['height'] = element;
              obj['line-height'] = element;
              break
            case 'itemFontStyle':
              IDM.style.setFontStyle(obj, element)
              break
            case 'itemBg':
              obj['background-color'] = element && element.hex8
              break
            case 'itemBorder':
              IDM.style.setBorderStyle(obj, element)
              break
            case 'btnSplit':
              obj['margin-right'] = element
          }
        }
      }
      return obj
    },
    propDataWatchHandle (propData) {
      this.propData = propData.compositeAttr||{};
      this.init();
    },
    init () {
      console.log(this.propData, '数据');
      this.converStyleObj();
    },
    converStyleObj () {
      let styleObject = {},
          itemStyleObject = {},
          fontStyle = {},
          chooseFontStyle = {},
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
              break
            case 'boxShadow':
              styleObject['box-shadow'] = element
              break
            case 'boxBorder':
              IDM.style.setBorderStyle(styleObject, element)
              break
          }
        }
      }
      window.IDM.setStyleToPageHead(this.moduleObject.id + " .idm-footbtn", styleObject);
    },
    handleClick (row) {
      console.log(row)
    },
    handleChange (val) {
      console.log(val)
      this.sendBroadcastMessage({
        type: 'iselect_chooseData',
        rangeModule: this.propData.triggerComponents && this.propData.triggerComponents.map(el => el.moduleId),
        message: {}
      })
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
      window.IDM.broadcast && window.IDM.broadcast.send(object);
    }
  }
}
</script>

<style lang="scss" scoped>
.idm-footbtn{
  display: flex;
  justify-content: space-between;
  .footbtn-flex{
    display: flex;
    align-items: center;
  }
  .footbtn-btn{
    text-align: center;
  }
  .footbtn-btn:last-child{
    margin-right: 0;
  }
}
</style>
