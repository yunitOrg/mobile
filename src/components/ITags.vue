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
        <span v-for="(item, index) in tablist" :key="index" :class="item.defaultActiveKey&&'active'" @click="handleClick(item, index)">
          {{item.tab}}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { getDatasInterfaceUrl } from '@/api/config'
export default {
  data () {
    return {
      moduleObject:{},
      tablist: [],
      pageData: [],
      propData:this.$root.propData.compositeAttr||{
        selfShow: true,
        title: '类型选择(多选)',
        staticTabPaneList: [
          {
            key: '1',
            tab: '支部简介',
          },
          {
            key: '2',
            tab: '支部党员',
          },
          {
            key: '3',
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
      if (this.moduleObject.env == "production" && this.propData.tabDataType === 'dynamic') {
        this.getPageData()
      }
      this.converThemeListObject()
    },
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
        if (this.propData.tagActiveBorder) {
          let element = this.propData.tagActiveBorder;
          if (element.border.top.width > 0) {
            tempobj["border-top-color"] = item.mainColor ? item.mainColor.hex8 : ""
          }
          if (element.border.right.width > 0) {
            tempobj["border-right-color"] = item.mainColor ? item.mainColor.hex8 : ""
          }
          if (element.border.bottom.width > 0) {
            tempobj["border-bottom-color"] = item.mainColor ? item.mainColor.hex8 : ""
          }
          if (element.border.left.width > 0) {
            tempobj["border-left-color"] = item.mainColor ? item.mainColor.hex8 : ""
          }
        }
        tempobj['color'] = item.mainColor ? item.mainColor.hex8 : "";
        IDM.setStyleToPageHead(
          `.${themeNamePrefix}${item.key} #${(this.moduleObject.id || "module_demo")} .idm-tips-ul .active`,
          tempobj
        );
      }
    },
    /** 
     * 获取数据源
    */
    getPageData () {
      window.IDM.http
      .post(
        getDatasInterfaceUrl,
        { id: this.propData.dataSource && this.propData.dataSource.value },
        { headers: {'Content-Type': 'application/json;charset=UTF-8'} })
      .then(res => {
        if (res.status == 200 && res.data.code == 200) {
            this.pageData = res.data.data
            this.pageData.forEach(item => {
              item.tab = item[this.propData.nameField]
            })
            this.tablist = this.pageData;
        } else {
            IDM.message.error(res.data.message)
        }
      })
    },
    handleClick (row, val) {
      this.tablist.forEach((item, index) => {
        if (index === val) {
          item.defaultActiveKey =  item.defaultActiveKey ? false : (item.defaultActiveKey === 'undefined' ? true : !item.defaultActiveKey)
        }
      })
      // 发送消息给组件
      this.sendBroadcastMessage({
        type: 'chooseTag',
        rangeModule: this.propData.triggerComponents && this.propData.triggerComponents.map(el => el.moduleId),
        message: this.tablist.filter(item => item.defaultActiveKey)
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
      // padding: 5px 8px;
      // border-radius: 50px;
      // border: 1px solid #ccc;
      // max-width: 100px;
      // width: 80px;
      text-align: center;
    }
    .active{
      border: 1px solid #f00;
      color: #f00;
    }
  }
}
</style>
