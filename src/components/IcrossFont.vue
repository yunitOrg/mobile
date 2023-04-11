<template>
  <!--
    根目录规范(必须不能为空)：
    idm-ctrl：控件类型 drag_container：容器，drag_container_inlieblock：行内容器，idm_module：非容器的组件
    id：使用moduleObject.id，如果id不使用这个将会被idm-ctrl-id属性替换
    idm-ctrl-id：组件的id，这个必须不能为空
  -->
  <div idm-ctrl="idm_module" :id="moduleObject.id" :idm-ctrl-id="moduleObject.id">
    <div class="crossfont-wrap">
      <div class="crossfont-li" v-for="(item, index) in propData.tableMenu" :key="index" :style="computedStyle(item)">
        <span class="crossblock" :style="computedBlock(item)"></span>
        <span class="cross-title">{{ handleTitle(item, index) }}</span>
        <span class="cross-num">{{ handleNum(item, index) }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default{
  name: 'IcrossFont',
  data() {
    return {
      moduleObject: {},
      fieldObj: [],
      propData: this.$root.propData.compositeAttr || {
        tableMenu: [
          {
            key: '1',
            blockwidth: '10px',
            blockheight: '10px',
            blockbgColor: {
              hex8: "#0091FFFF"
            },
            title: '收文：',
            titleSub: '1'
          },
          {
            key: '2',
            blockwidth: '10px',
            blockheight: '10px',
            blockbgColor: {
              hex8: "#0091FFFF"
            },
            title: '发文：',
            titleSub: '2'
          },
          {
            key: '3',
            blockwidth: '10px',
            blockheight: '10px',
            blockbgColor: {
              hex8: "#0091FFFF"
            },
            title: '签报：',
            titleSub: '1'
          },
        ]
      }
    }
  },
  mounted() {
    this.moduleObject = this.$root.moduleObject;
    this.init()
  },
  methods: {
    handleTitle (item, index) {
      if (item.titleField && this.moduleObject.env == "production") {
        return (this.fieldObj[index] || {})[item.titleField];
      }
      return item.title
    },
    handleNum (item, index) {
      if (item.numField && this.moduleObject.env == "production") {
        return (this.fieldObj[index] || {})[item.numField];
      }
      return item.titleSub
    },
    computedBlock (item) {
      let { blockwidth, blockheight, blockbgColor, blockbox } = item;
      let style = {};
      if (blockwidth) {
        style['width'] = blockwidth;
      }
      if (blockheight) {
        style['height'] = blockheight;
      }
      if (blockbgColor) {
        style['background-color'] = blockbgColor && blockbgColor.hex8
      }
      if (blockbox) {
        IDM.style.setBoxStyle(style, blockbox)
      }
      return style;
    },
    computedStyle(item) {
      let { titleFont } = item;
      let style = {};
      if (titleFont) {
        IDM.style.setFontStyle(style, titleFont);
      }
      return style;
    },
    propDataWatchHandle(propData) {
      this.propData = propData.compositeAttr || {};
      this.init();
    },
    handleStyle() {
      let styleObject = {},
        tipsStyleObj = {},
        titlebox = {},
        imgObject = {},
        imgboxobject = {},
        titleStyle = {};
      for (const key in this.propData) {
        if (this.propData.hasOwnProperty.call(this.propData, key)) {
          const element = this.propData[key]
          if (!element && element !== false && element != 0) {
            continue
          }
          switch (key) {
            case 'layout':
              if (element.display && element.display == "flex") {
                styleObject['display'] = 'flex';
                if (element.direction) {
                  styleObject["flex-direction"] = element.direction;
                }
                if (element.direction) {
                  styleObject["align-items"] = element.align;
                }
                if (element.direction) {
                  styleObject["justify-content"] = element.justify;
                }
              } else if (element.display) {
                styleObject["display"] = element.display;
              }
              break;
            case 'width':
              styleObject['width'] = element;
              break;
            case 'height':
              styleObject['height'] = element;
              break;
            case 'ulbox':
              IDM.style.setBoxStyle(styleObject, element)
              break
            case 'bgColor':
              styleObject['background-color'] = element && element.hex8;
              break
            case 'bglinear':
              styleObject['background-image'] = element;
              break
            case 'boxShadow':
              styleObject['box-shadow'] = element;
              break
            case 'boxborder':
              IDM.style.setBorderStyle(styleObject, element);
              break
          }
        }
      }
      window.IDM.setStyleToPageHead(this.moduleObject.id + " .crossfont-wrap", styleObject);
    },
    getMockData () {
      
    },
    initData() {
      if (this.moduleObject.env !== 'production') {
        this.getMockData();
        return
      }
      let params = {}
      if (this.propData.paramsFunc && this.propData.paramsFunc.length > 0) {
        const funcName = this.propData.paramsFunc[0].name
        params = window[funcName].call(this, {
          params: this.propData.paramsFunc[0].param,
          router: IDM.router.getParam(this.moduleObject.routerId)
        }) || {}
      }
      if (this.propData.dataSource && this.propData.dataSource[0]) {
        IDM.datasource.request(
          this.propData.dataSource[0]?.id,
          {
            moduleObject: this.moduleObject,
            param: {
              ...params,
              ...IDM.router.getParam(this.moduleObject.routerId),
            }
          },
          (data) => {
            if (data instanceof Array) {
              this.propData.tableMenu = this.propData.tableMenu.slice(0, data.length);
              this.fieldObj = data;
            } else {
              console.warn('接口返回必须是数组');
            }
          }
        )
      } else {
        this.getMockData()
      }
    },
    init () {
      console.log(this.propData, '数据');
      this.handleStyle();
      this.initData();
    }
  }
}
</script>

<style lang="scss" scoped>
.crossfont-wrap{
  .crossblock{
    display: inline-block;
    border-radius: 50%;
  }
}
</style>
