<template>
  <!--
    根目录规范(必须不能为空)：
    idm-ctrl：控件类型 drag_container：容器，drag_container_inlieblock：行内容器，idm_module：非容器的组件
    id：使用moduleObject.id，如果id不使用这个将会被idm-ctrl-id属性替换
    idm-ctrl-id：组件的id，这个必须不能为空
  -->
  <div idm-ctrl="idm_module" :id="moduleObject.id" :idm-ctrl-id="moduleObject.id">
    <div class="threefont">
      <div class="threefont-top" v-if="propData.isTips">
        <div>
          <span class="top-title">{{ propData.titleDesc }}</span>
        </div>
        <div v-if="propData.isNumberFlag">
          <span class="top-number">{{ allNumber }}</span>
          <span class="top-unit">{{ propData.numberGe }}</span>
        </div>
      </div>
      <div class="threefont-ul">
        <div class="threefont-li" v-for="(item, index) in list" :key="index" :style="computedStyle(item)">
          <div :style="handleNumberStyle(item)">{{ handleNumberFont(item, index)}}</div>
          <div :style="handleFontStyle(item)" >{{ handleTitleFont(item, index) }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'IthreeFont',
  data () {
    return {
      list: [],
      allNumber: '',
      fieldList: [],
      moduleObject: {},
      inforobj: {},
      propData: this.$root.propData.compositeAttr || {
        isTips: true,
        titleDesc: '基层党组织',
        isNumberFlag: true,
        allNumberVal: '213',
        numberGe: '个',
        titleWidth: '100%',
        titleHeight: "45px",
        tableMenu: [
          {
            key: '1',
            liWidth: '32%',
            liHeight: '100px',
            title: '党委',
            titleSub: '18',
            titleTop: '10px'
          }
        ]
      }
    }
  },
  mounted() {
    this.moduleObject = this.$root.moduleObject;
    this.init()
  },
  methods: {
    handleNumberStyle (item) {
      let { subFont } = item;
      let style = {};
      if (subFont) {
        IDM.style.setFontStyle(style, subFont);
      }
      return style;
    },
    handleFontStyle(item) {
      let { tableTitleFont, titleTop } = item;
      let style = {};
      if (tableTitleFont) {
        IDM.style.setFontStyle(style, tableTitleFont);
      }
      if (titleTop) {
        style['padding-top'] = titleTop;
      }
      return style;
    },
    computedStyle(item) {
      let { libox, border, bgColor, liWidth, liHeight } = item;
      let style = {};
      if (libox) {
        IDM.style.setBoxStyle(style, libox)
      }
      if (liWidth) {
        style['width'] = liWidth;
      }
      if (liHeight) {
        style['height'] = liHeight;
      }
      if (border) {
        IDM.style.setBorderStyle(style, border)
      }
      if (bgColor) {
        style['background-color'] = bgColor && bgColor.hex8
      }
      return style;
    },
    handleNumberFont(item, index) {
      if (item.numField && this.moduleObject.env == "production") {
        return (this.fieldList[index] || {})[item.numField];
      }
      return item.titleSub
    },
    handleTitleFont(item, index) {
      if (item.titleField && this.moduleObject.env == "production") {
        return (this.fieldList[index] || {})[item.titleField];
      }
      return item.title
    },
    propDataWatchHandle(propData) {
      this.propData = propData.compositeAttr || {};
      this.init();
    },
    handleStyle() {
      let styleObject = {},
        liStyle = {},
        titleStyle = {},
        titleFont = {},
        numberFont = {},
        unitFont = {},
        tipsStyleObj = {};
      for (const key in this.propData) {
        if (this.propData.hasOwnProperty.call(this.propData, key)) {
          const element = this.propData[key]
          if (!element && element !== false && element != 0) {
            continue
          }
          switch (key) {
            case 'width':
              styleObject['width'] = element
              break
            case 'height':
              styleObject['height'] = element;
              break
            case 'ulbox':
              IDM.style.setBoxStyle(styleObject, element)
              break
            case 'bgColor':
              styleObject['background-color'] = element && element.hex8
              break
            case 'boxShadow':
              styleObject['box-shadow'] = element
              break
            case 'boxborder':
              IDM.style.setBorderStyle(styleObject, element)
              break
            case 'titleWidth':
              titleStyle['width'] = element
              break
            case 'titleHeight':
              titleStyle['height'] = element;
              titleStyle['line-height'] = element;
              break
            case 'titleFont':
              IDM.style.setFontStyle(titleFont, element);
              break
            case 'numberFont':
              IDM.style.setFontStyle(numberFont, element);
              break
            case 'unitFont':
              IDM.style.setFontStyle(unitFont, element);
              break
          }
        }
      }
      window.IDM.setStyleToPageHead(this.moduleObject.id + " .threefont", styleObject);
      window.IDM.setStyleToPageHead(this.moduleObject.id + " .threefont-top", titleStyle);
      window.IDM.setStyleToPageHead(this.moduleObject.id + " .threefont-top .top-title", titleStyle);
      window.IDM.setStyleToPageHead(this.moduleObject.id + " .threefont-top .top-number", numberFont);
      window.IDM.setStyleToPageHead(this.moduleObject.id + " .threefont-top .top-unit", unitFont);
    },
    // 过滤接口参数
    fileterParams() {
      let obj = {};
      if (this.propData.customFunc && this.propData.customFunc.length > 0) {
        let name = this.propData.customFunc[0].name
        obj = window[name] && window[name].call(this, this.inforobj);
      }
      return obj
    },
    initData () {
      if (this.moduleObject.env == "production") {
        this.list = this.propData && (this.propData.tableMenu || []);
        if (this.propData.dataSource) {
          const routerParams = this.fileterParams();
          IDM.datasource.request(this.propData.dataSource[0]?.id, {
            moduleObject: this.moduleObject,
            param: { ...routerParams }
          }, (data) => {
            if (data) {
              if (data instanceof Array) {
                let list = (data || {})[this.propData.listFiled];
                this.propData.tableMenu = this.propData.tableMenu.slice(0, list.length);
                this.fieldList = list;
                this.allNumber = (data || {})[this.propData.allNumberField];
              } else {
                console.warn('接口返回必须是数组');
              }
            }
          })
        }
      } else {
        this.list = this.propData && (this.propData.tableMenu || []);
        this.allNumber = this.propData.allNumberVal;
      }
    },   
    init () {
      this.handleStyle();
      this.initData();
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
    receiveBroadcastMessage(object) {
      switch (object.type) {
        case 'linkageDemand':
          console.log('IthreeFont接收消息: ', object.message)
          this.inforobj = object.message;
          this.initData();
          break;
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.threefont{
  .threefont-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    span{
      display: inline-block;
    }
  }

  .threefont-ul{
    display: flex;
    .threefont-li{
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction:column;
    }
  }

}
</style>

