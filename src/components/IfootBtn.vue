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
      <van-checkbox v-model="checked" class="footbtn-check" shape="square" @change="handleChange">{{allData.selectNumber}}/{{allData.total}}</van-checkbox>
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
      checked: false,
      moduleObject:{},
      allData: {
        selectNumber: 0,
        total: 0
      },
      propData:this.$root.propData.compositeAttr||{
        positionTop: 'auto',
        positionRight: 'auto',
        positionBottom: '0',
        positionLeft: 'auto',
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
        width: '100%',
        height: '60px',
        boxShadow: "0px 0px 10px 0px #e3dede",
        checkBorder: {
          hex: "#f00",
          hex8: "#f00"
        },
        checkBg:{
          hex: "#f00",
          hex8: "#f00"
        },
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
      this.converThemeListObject();
    },
    converStyleObj () {
      let styleObject = {},
          numStyleObject = {},
          checkStyleObject = {},
          colorCheck = {};
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
            case 'numFont':
              IDM.style.setFontStyle(numStyleObject, element)
              break
            case 'checkBorder':
              checkStyleObject['border-color'] = element && element.hex8 + ' !important'
              break
            case 'checkBg':
              colorCheck['color'] = element && element.hex8 + ' !important'
              break
            case 'positionTop':
              styleObject['top'] = element
              break
            case 'positionRight':
              styleObject['right'] = element
              break
            case 'positionBottom':
              styleObject['bottom'] = element
              break
            case 'positionLeft':
              styleObject['left'] = element
              break
          }
        }
      }
      window.IDM.setStyleToPageHead(this.moduleObject.id + " .idm-footbtn", styleObject);
      window.IDM.setStyleToPageHead(this.moduleObject.id + " .van-checkbox__label", numStyleObject);
      window.IDM.setStyleToPageHead(this.moduleObject.id + " .van-checkbox__icon--checked .van-icon", checkStyleObject);
      window.IDM.setStyleToPageHead(this.moduleObject.id + " .van-checkbox__icon--checked .van-icon-success:before", colorCheck);
    },
    handleClick (row) {
      let that = this;
      let { customClickFunc, key } = row;
      if (customClickFunc && customClickFunc.length > 0 ) {
        customClickFunc.forEach(item => {
          window[item.name] && window[item.name].call(that, {
            chooseData: this.allData,
            value: key,
            checked: this.checked,
          });
        })
      }
    },
    // 设置主题
    converThemeListObject () {
      let themeList = this.propData.themeList;
      if (!themeList) {
        return;
      }
      const themeNamePrefix =
        IDM.setting &&
        IDM.setting.applications &&
        IDM.setting.applications.themeNamePrefix
          ? IDM.setting.applications.themeNamePrefix
          : "idm-theme-";
      for (let i=0; i<themeList.length; i++) {
        let item = themeList[i]
        if(item.key!=IDM.theme.getCurrentThemeInfo()){
            //此处比对是不渲染输出不用的样式，如果页面会刷新就可以把此处放开
            continue;
        }
        let tempobj = {};
        tempobj = {
          "border-color": item.mainColor ? item.mainColor.hex8 : "",
        }
        IDM.setStyleToPageHead(
          `.${themeNamePrefix}${item.key} #${(this.moduleObject.id || "module_demo")} .van-checkbox__icon--checked .van-icon`,
          tempobj
        );
        IDM.setStyleToPageHead(
          `.${themeNamePrefix}${item.key} #${(this.moduleObject.id || "module_demo")} .van-checkbox__icon--checked .van-icon-success:before`,
          {
            "color": item.mainColor ? item.mainColor.hex8 : ""
          }
        );
      }
    },
    handleChange (val) {
      this.sendBroadcastMessage({
        type: 'ifootbtn-all',
        rangeModule: this.propData.triggerComponents && this.propData.triggerComponents.map(el => el.moduleId),
        message: { checkAll: val }
      })
    },
    /**
     * 组件通信：接收消息的方法
     * @param {
     *  type:"发送消息的时候定义的类型，这里可以自己用来要具体做什么，统一规定的type：linkageResult（组件联动传结果值）、linkageDemand（组件联动传需求值）、linkageReload（联动组件重新加载）
     * 、linkageOpenDialog（打开弹窗）、linkageCloseDialog（关闭弹窗）、linkageShowModule（显示组件）、linkageHideModule（隐藏组件）、linkageResetDefaultValue（重置默认值）"
     *  message:{发送的时候传输的消息对象数据}
     *  messageKey:"消息数据的key值，代表数据类型是什么，常用于表单交互上，比如通过这个key判断是什么数据"
     *  isAcross:如果为true则代表发送来源是其他页面的组件，默认为false
     * } object
     */
    receiveBroadcastMessage (object) {
      switch (object.type) {
        case 'i-checkbox-card-change':
          console.log('底部按钮-接收消息', object.message)
          this.allData = object.message || {}
          this.checked = (object.message || {}).total === (object.message || {}).selectNumber
          break;
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
      window.IDM.broadcast && window.IDM.broadcast.send(object);
    }
  }
}
</script>

<style lang="scss">
.footbtn-check{
  .van-checkbox__icon--checked .van-icon{
    background-color: #fff;
  }
}
</style>

<style lang="scss" scoped>
.idm-footbtn{
  display: flex;
  justify-content: space-between;
  position: fixed;
  .footbtn-flex{
    display: flex;
    align-items: center;
  }
  .footbtn-btn{
    text-align: center;
  }
}
</style>
