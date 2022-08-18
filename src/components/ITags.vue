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
    <div class="idm_tags">
      <div class="idm-tips-title" v-if="propData.selfShow">{{propData.title}}</div>
      <div class="idm-tips-ul">
        <span v-for="item in tablist" :key="item.key" :class="item.defaultActiveKey&&'active'" @click="handleClick(item)">
          {{item.tab}}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      moduleObject:{},
      tablist: [],
      propData:this.$root.propData.compositeAttr||{
        selfShow: true,
        title: '类型选择(多选)',
        staticTabPaneList: [
          {
            key: '1',
            tab: '支部简介'
          },
          {
            key: '2',
            tab: '支部党员'
          },
          {
            key: '3',
            tab: '党费',
          },
          {
            key: '4',
            tab: '党费',
          },
          {
            key: '5',
            tab: '党费',
          },
          {
            key: '6',
            tab: '党费',
          }
        ],
        boxWidth: '300px',
        boxHeight: 'auto',
        minWidth: '80px',
        box:{
          marginTopVal: "",
          marginRightVal: "",
          marginBottomVal: "",
          marginLeftVal: "",
          paddingTopVal: "",
          paddingRightVal: "",
          paddingBottomVal: "",
          paddingLeftVal: ""
        },
        tagBox: {
          marginTopVal: "10px",
          marginRightVal: "10px",
          marginBottomVal: "",
          marginLeftVal: "",
          paddingTopVal: "",
          paddingRightVal: "",
          paddingBottomVal: "",
          paddingLeftVal: ""
        }
      }
    }
  },
  created () {
    this.moduleObject = this.$root.moduleObject
    this.init()
  },
  methods: {
    propDataWatchHandle (propData) {
      this.propData = propData.compositeAttr||{};
      this.init();
    },
    init () {
      console.log(this.propData, '数据源')
      this.propData.staticTabPaneList.forEach(item => {
        let flag = item.defaultActiveKey ? item.defaultActiveKey : false
        this.$set(item, 'defaultActiveKey', flag)
      })
      this.tablist = this.propData.staticTabPaneList || [];
      this.convertTitleStyleObject();
      this.convertBoxStyleObject();
      this.convertLiBoxStyleObject();
    },
    handleClick (row) {
      this.tablist.forEach(item => {
        if (item.key === row.key) {
          item.defaultActiveKey =  item.defaultActiveKey ? false : (item.defaultActiveKey === 'undefined' ? true : !item.defaultActiveKey)
        }
      })
    },
    convertTitleStyleObject () {
      let styleObject = {};
      if (this.propData.itemFontStyle) {
        let item = this.propData.itemFontStyle || {};
        if (item.fontColors) {
          styleObject["color"] = item.fontColors.hex;
        }
        if (item.fontDecoration) {
          styleObject["text-decoration"] = item.fontDecoration;
        }
        if (item.fontFamily) {
          styleObject['font-family'] = item.fontFamily;
        }
        if (item.fontLetterSpacing) {
          styleObject["word-spacing"] = item.fontLetterSpacing + item.fontLetterSpacingUnit;
        }
        if (item.fontLineHeight) {
          styleObject['line-height'] = item.fontLineHeight + (item.fontLineHeightUnit == "-" ? "" : item.fontLineHeightUnit);
        }
        if (item.fontSize) {
          styleObject['font-size'] = item.fontSize + item.fontSizeUnit
        }
        if (item.fontStyle) {
          styleObject['font-style'] = item.fontStyle
        }
        if (item.fontTextAlign) {
          styleObject['text-align'] = item.fontTextAlign
        }
        if (item.fontWeight) {
          styleObject['font-weight'] = item.fontWeight.split(" ")[0]
        }
      }
      window.IDM.setStyleToPageHead(this.moduleObject.id + " .idm-tips-title", styleObject);
    },
    convertBoxStyleObject () {
      let styleObject = {}
      if (this.propData.boxWidth) {
        styleObject['width'] = this.propData.boxWidth;
      }
      if (this.propData.boxHeight) {
        styleObject['height'] = this.propData.boxHeight;
      }
      if (this.propData.boxbg) {
        styleObject["background-color"] = (this.propData.boxbg || {}).hex
      } else {
        styleObject["background-color"] = '#ffffff'
      }
      if (this.propData.box) {
        let ulbox = this.propData.box || {};
        if (ulbox.marginTopVal) {
          styleObject["margin-top"] = `${ulbox.marginTopVal}`;
        }
        if (ulbox.marginRightVal) {
          styleObject["margin-right"] = `${ulbox.marginRightVal}`;
        }
        if (ulbox.marginBottomVal) {
          styleObject["margin-bottom"] = `${ulbox.marginBottomVal}`;
        }
        if (ulbox.marginLeftVal) {
          styleObject["margin-left"] = `${ulbox.marginLeftVal}`;
        }
        if (ulbox.paddingTopVal) {
          styleObject["padding-top"] = `${ulbox.paddingTopVal}`;
        }
        if (ulbox.paddingRightVal) {
          styleObject["padding-right"] = `${ulbox.paddingRightVal}`;
        }
        if (ulbox.paddingBottomVal) {
          styleObject["padding-bottom"] = `${ulbox.paddingBottomVal}`;
        }
        if (ulbox.paddingLeftVal) {
          styleObject["padding-left"] = `${ulbox.paddingLeftVal}`;
        }
      }
      window.IDM.setStyleToPageHead(this.moduleObject.id + " .idm_tags", styleObject);
    },
    convertLiBoxStyleObject () {
      let styleObject = {}
      if (this.propData.tagBox) {
        let ulbox = this.propData.tagBox || {};
        if (ulbox.marginTopVal) {
          styleObject["margin-top"] = `${ulbox.marginTopVal}`;
        }
        if (ulbox.marginRightVal) {
          styleObject["margin-right"] = `${ulbox.marginRightVal}`;
        }
        if (ulbox.marginBottomVal) {
          styleObject["margin-bottom"] = `${ulbox.marginBottomVal}`;
        }
        if (ulbox.marginLeftVal) {
          styleObject["margin-left"] = `${ulbox.marginLeftVal}`;
        }
        if (ulbox.paddingTopVal) {
          styleObject["padding-top"] = `${ulbox.paddingTopVal}`;
        }
        if (ulbox.paddingRightVal) {
          styleObject["padding-right"] = `${ulbox.paddingRightVal}`;
        }
        if (ulbox.paddingBottomVal) {
          styleObject["padding-bottom"] = `${ulbox.paddingBottomVal}`;
        }
        if (ulbox.paddingLeftVal) {
          styleObject["padding-left"] = `${ulbox.paddingLeftVal}`;
        }
      }
      if (this.propData.tagStyle) {
        let item = this.propData.tagStyle || {};
        if (item.fontColors) {
          styleObject["color"] = item.fontColors.hex;
        }
        if (item.fontDecoration) {
          styleObject["text-decoration"] = item.fontDecoration;
        }
        if (item.fontFamily) {
          styleObject['font-family'] = item.fontFamily;
        }
        if (item.fontLetterSpacing) {
          styleObject["word-spacing"] = item.fontLetterSpacing + item.fontLetterSpacingUnit;
        }
        if (item.fontLineHeight) {
          styleObject['line-height'] = item.fontLineHeight + (item.fontLineHeightUnit == "-" ? "" : item.fontLineHeightUnit);
        }
        if (item.fontSize) {
          styleObject['font-size'] = item.fontSize + item.fontSizeUnit
        }
        if (item.fontStyle) {
          styleObject['font-style'] = item.fontStyle
        }
        if (item.fontTextAlign) {
          styleObject['text-align'] = item.fontTextAlign
        }
        if (item.fontWeight) {
          styleObject['font-weight'] = item.fontWeight.split(" ")[0]
        }
      }
      if (this.propData.border) {
        let element = this.propData.border;
        if (element.border.top.width > 0) {
          styleObject["border-top-width"] =
            element.border.top.width + element.border.top.widthUnit;
          styleObject["border-top-style"] = element.border.top.style;
          if (element.border.top.colors.hex) {
            styleObject["border-top-color"] =
              element.border.top.colors.hex;
          }
        }
        if (element.border.right.width > 0) {
          styleObject["border-right-width"] =
            element.border.right.width + element.border.right.widthUnit;
          styleObject["border-right-style"] = element.border.right.style;
          if (element.border.right.colors.hex) {
            styleObject["border-right-color"] =
              element.border.right.colors.hex;
          }
        }
        if (element.border.bottom.width > 0) {
          styleObject["border-bottom-width"] =
            element.border.bottom.width + element.border.bottom.widthUnit;
          styleObject["border-bottom-style"] =
            element.border.bottom.style;
          if (element.border.bottom.colors.hex) {
            styleObject["border-bottom-color"] =
              element.border.bottom.colors.hex;
          }
        }
        if (element.border.left.width > 0) {
          styleObject["border-left-width"] =
            element.border.left.width + element.border.left.widthUnit;
          styleObject["border-left-style"] = element.border.left.style;
          if (element.border.left.colors.hex) {
            styleObject["border-left-color"] =
              element.border.left.colors.hex;
          }
        }

        styleObject["border-top-left-radius"] =
          element.radius.leftTop.radius +
          element.radius.leftTop.radiusUnit;
        styleObject["border-top-right-radius"] =
          element.radius.rightTop.radius +
          element.radius.rightTop.radiusUnit;
        styleObject["border-bottom-left-radius"] =
          element.radius.leftBottom.radius +
          element.radius.leftBottom.radiusUnit;
        styleObject["border-bottom-right-radius"] =
          element.radius.rightBottom.radius +
          element.radius.rightBottom.radiusUnit;
      }
      let activeObj = {};
      if (this.propData.tagActiveStyle) {
        let item = this.propData.tagActiveStyle || {};
        if (item.fontColors) {
          activeObj["color"] = item.fontColors.hex;
        }
        if (item.fontDecoration) {
          activeObj["text-decoration"] = item.fontDecoration;
        }
        if (item.fontFamily) {
          activeObj['font-family'] = item.fontFamily;
        }
        if (item.fontLetterSpacing) {
          activeObj["word-spacing"] = item.fontLetterSpacing + item.fontLetterSpacingUnit;
        }
        if (item.fontLineHeight) {
          activeObj['line-height'] = item.fontLineHeight + (item.fontLineHeightUnit == "-" ? "" : item.fontLineHeightUnit);
        }
        if (item.fontSize) {
          activeObj['font-size'] = item.fontSize + item.fontSizeUnit
        }
        if (item.fontStyle) {
          activeObj['font-style'] = item.fontStyle
        }
        if (item.fontTextAlign) {
          activeObj['text-align'] = item.fontTextAlign
        }
        if (item.fontWeight) {
          activeObj['font-weight'] = item.fontWeight.split(" ")[0]
        }
      }
      if (this.propData.tagActiveBorder) {
        let element = this.propData.tagActiveBorder;
        if (element.border.top.width > 0) {
          activeObj["border-top-width"] =
            element.border.top.width + element.border.top.widthUnit;
          activeObj["border-top-style"] = element.border.top.style;
          if (element.border.top.colors.hex) {
            activeObj["border-top-color"] =
              element.border.top.colors.hex;
          }
        }
        if (element.border.right.width > 0) {
          activeObj["border-right-width"] =
            element.border.right.width + element.border.right.widthUnit;
          activeObj["border-right-style"] = element.border.right.style;
          if (element.border.right.colors.hex) {
            activeObj["border-right-color"] =
              element.border.right.colors.hex;
          }
        }
        if (element.border.bottom.width > 0) {
          activeObj["border-bottom-width"] =
            element.border.bottom.width + element.border.bottom.widthUnit;
          activeObj["border-bottom-style"] =
            element.border.bottom.style;
          if (element.border.bottom.colors.hex) {
            activeObj["border-bottom-color"] =
              element.border.bottom.colors.hex;
          }
        }
        if (element.border.left.width > 0) {
          activeObj["border-left-width"] =
            element.border.left.width + element.border.left.widthUnit;
          activeObj["border-left-style"] = element.border.left.style;
          if (element.border.left.colors.hex) {
            activeObj["border-left-color"] =
              element.border.left.colors.hex;
          }
        }

        activeObj["border-top-left-radius"] =
          element.radius.leftTop.radius +
          element.radius.leftTop.radiusUnit;
        activeObj["border-top-right-radius"] =
          element.radius.rightTop.radius +
          element.radius.rightTop.radiusUnit;
        activeObj["border-bottom-left-radius"] =
          element.radius.leftBottom.radius +
          element.radius.leftBottom.radiusUnit;
        activeObj["border-bottom-right-radius"] =
          element.radius.rightBottom.radius +
          element.radius.rightBottom.radiusUnit;
      }
      if (this.propData.minWidth) {
        styleObject['min-width'] = this.propData.minWidth;
      }
      window.IDM.setStyleToPageHead(this.moduleObject.id + " .idm-tips-ul span", styleObject);
      window.IDM.setStyleToPageHead(this.moduleObject.id + " .idm-tips-ul .active", activeObj);
    }
  }
}
</script>

<style lang="scss" scoped>
.idm_tags{
  .idm-tips-ul{
    span{
      display: inline-block;
      padding: 5px 8px;
      border-radius: 50px;
      border: 1px solid #ccc;
      // max-width: 100px;
      // width: 80px;
      text-align: center;
    }
    // .active{
    //   border: 1px solid #f00;
    //   color: #f00;
    // }
  }
}
</style>
