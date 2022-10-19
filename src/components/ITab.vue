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
    <van-tabs class="tab-ul" v-model="activeTab"
    :lazy-render="false"
    :background="(propData.bgColor || {}).hex"
    :animated="propData.animated !== false ? true : false"
    :sticky="propData.sticky !== false ? true : false"
    :swipeable="propData.swipeable !== false ? true : false"
    :scrollspy="propData.scrollspy !== false ? true : false"
    :offset-top="(propData.offsetTop || {}).inputVal + (propData.offsetTop || {}).selectVal"
    :type="propData.type || 'line'"
    @change="changeCallback"
    :before-change="beforeChange">
      <van-tab v-for="item in allTabList" :key="item.key" :name="item.key" :title="item.tab" :disabled="item.disable" title-class="tab-custom" :title-style="setFontStyle(item.tableFont)">
        <template v-if="propData.isDrag === 'container'">
          <div class="tab-conent drag_container"
            :class="`idm-tab-inner-${item.key}`"
            idm-ctrl-inner
            :idm-ctrl-id="moduleObject.id"
            :idm-container-index="item.key"
            :idm-refresh-container="`flex-${item.key}`"
          ></div>
        </template>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { getDatasInterfaceUrl } from '@/api/config'
export default{
  name: 'ITab',
  data () {
    return {
      activeTab: '',
      allTabList: [],
      moduleObject:{},
      dataList: [],
      propData:this.$root.propData.compositeAttr||{
        isDrag: 'container',
        staticTabPaneList: [
          {
            key: '1',
            tab: '支部简介',
          },
          {
            key: '2',
            tab: '支部党员',
            defaultActiveKey: true,
          }
        ],
        tableStyleFont: {
          fontColors: {
            hex8: '#f00'
          }
        },
        tableChooseFont: {
          fontColors: {
            hex8: '#000'
          }
        }
      }
    }
  },
  created () {
    this.moduleObject = this.$root.moduleObject
    this.initAttrToModule()
  },
  methods: {
    propDataWatchHandle (propData) {
      this.propData = propData.compositeAttr||{};
      this.initAttrToModule();
    },
    convertAttrToStyleObject () {
      let styleObject = {};
      if (this.propData.offsetTop && this.propData.offsetTop.inputVal + "" && this.propData.offsetTop.selectVal) {
        styleObject["margin-top"] = this.propData.offsetTop.inputVal + this.propData.offsetTop.selectVal;
      }
      let styleHeight = {};
      if (this.propData.width) {
        styleHeight['width'] = this.propData.width;
      }
      if (this.propData.height) {
        styleHeight['height'] = this.propData.height;
      }
      let fontStyleObj = {};
      if (this.propData.tableStyleFont) {
        let item = this.propData.tableStyleFont || {};
        item.fontColors && (fontStyleObj['color'] = item.fontColors.hex8);
        item.fontFamily && (fontStyleObj['font-family'] = item.fontFamily);
        item.fontWeight && (fontStyleObj['font-weight'] = item.fontWeight.split(" ")[0]);
        item.fontStyle && (fontStyleObj['font-style'] = item.fontStyle);
        item.fontSize && (fontStyleObj['font-size'] = item.fontSize + item.fontSizeUnit);
        item.fontLineHeight && (fontStyleObj['line-height'] = item.fontLineHeight + (item.fontLineHeightUnit == "-" ? "" : item.fontLineHeightUnit));
        item.fontTextAlign && (fontStyleObj['text-align'] = item.fontTextAlign);
        item.fontDecoration && (fontStyleObj['text-decoration'] = item.fontDecoration);
      }
      let chooseFontStyle = {};
      if (this.propData.tableChooseFont) {
        let item = this.propData.tableChooseFont || {};
        item.fontColors && (chooseFontStyle['color'] = item.fontColors.hex8);
        item.fontFamily && (chooseFontStyle['font-family'] = item.fontFamily);
        item.fontWeight && (chooseFontStyle['font-weight'] = item.fontWeight.split(" ")[0]);
        item.fontStyle && (chooseFontStyle['font-style'] = item.fontStyle);
        item.fontSize && (chooseFontStyle['font-size'] = item.fontSize + item.fontSizeUnit);
        item.fontLineHeight && (chooseFontStyle['line-height'] = item.fontLineHeight + (item.fontLineHeightUnit == "-" ? "" : item.fontLineHeightUnit));
        item.fontTextAlign && (chooseFontStyle['text-align'] = item.fontTextAlign);
        item.fontDecoration && (chooseFontStyle['text-decoration'] = item.fontDecoration);
      }
      window.IDM.setStyleToPageHead(this.moduleObject.id + " .tab-ul .van-tab", fontStyleObj);
      window.IDM.setStyleToPageHead(this.moduleObject.id + " .tab-ul .van-tab--active", chooseFontStyle);
      window.IDM.setStyleToPageHead(this.moduleObject.id + " .tab-conent", styleObject);
      window.IDM.setStyleToPageHead(this.moduleObject.id + " .tab-ul .van-tabs__wrap", styleHeight);
    },
    convertBorderStyleObject () {
      let styleObject = {};
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
      if (this.propData.box) {
        let item = this.propData.box || {};
        if (item.marginTopVal) {
          styleObject["margin-top"] = `${item.marginTopVal}`;
        }
        if (item.marginRightVal) {
          styleObject["margin-right"] = `${item.marginRightVal}`;
        }
        if (item.marginBottomVal) {
          styleObject["margin-bottom"] = `${item.marginBottomVal}`;
        }
        if (item.marginLeftVal) {
          styleObject["margin-left"] = `${item.marginLeftVal}`;
        }
        if (item.paddingTopVal) {
          styleObject["padding-top"] = `${item.paddingTopVal}`;
        }
        if (item.paddingRightVal) {
          styleObject["padding-right"] = `${item.paddingRightVal}`;
        }
        if (item.paddingBottomVal) {
          styleObject["padding-bottom"] = `${item.paddingBottomVal}`;
        }
        if (item.paddingLeftVal) {
          styleObject["padding-left"] = `${item.paddingLeftVal}`;
        }
      }
      let chooseTabObject = {}
      if (this.propData.chooseWidth) {
        chooseTabObject['width'] = this.propData.chooseWidth
      }
      if (this.propData.chooseHeight) {
        chooseTabObject['height'] = this.propData.chooseHeight
      }
      if (this.propData.chooseBgColor) {
        chooseTabObject['background-color'] = (this.propData.chooseBgColor || {}).hex + ' !important'
      }
      window.IDM.setStyleToPageHead(this.moduleObject.id + " .tab-ul .van-tabs__line", chooseTabObject);
      window.IDM.setStyleToPageHead(this.moduleObject.id + " .tab-ul", styleObject);
    },
    initAttrToModule () {
      console.log(this.propData, '数据源');
      this.handleBackData(() => {
        this.initBaseAttrToModule();
      });
      this.convertAttrToStyleObject();
      this.convertBorderStyleObject();
      this.converThemeListObject();
    },
    handleBackData (fn) {
      if (this.moduleObject.env == "production" && this.propData.requireFlag) {
        this.propData.dataSource &&
          IDM.http
            .post(
              getDatasInterfaceUrl,
              {
                id: this.propData.dataSource && this.propData.dataSource.value,
              },
              {
                headers: {
                  "Content-Type": "application/json;charset=UTF-8",
                },
              }
            )
            .then((res) => {
              if (res.status == 200 && res.data.code == 200) {
                  this.dataList = res.data.data;
                  fn()
              } else {
                  IDM.message.error(res.data.message)
              }
            })
      } else {
        fn();
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
          "background-color": item.mainColor ? item.mainColor.hex8 : "",
        }
        IDM.setStyleToPageHead(
          `.${themeNamePrefix}${item.key} #${(this.moduleObject.id || "module_demo")} .tab-ul .van-tabs__line`,
          tempobj
        );
      }
    },
    setFontStyle (item) {
      let obj = {};
      if (item) {
        item.fontColors && (obj['color'] = item.fontColors.hex8);
        item.fontFamily && (obj['font-family'] = item.fontFamily);
        item.fontWeight && (obj['font-weight'] = item.fontWeight.split(" ")[0]);
        item.fontStyle && (obj['font-style'] = item.fontStyle);
        item.fontSize && (obj['font-size'] = item.fontSize + item.fontSizeUnit);
        item.fontLineHeight && (obj['line-height'] = item.fontLineHeight + (item.fontLineHeightUnit == "-" ? "" : item.fontLineHeightUnit));
        item.fontTextAlign && (obj['text-align'] = item.fontTextAlign);
        item.fontDecoration && (obj['text-decoration'] = item.fontDecoration);
      }
      return obj
    },
    /**
    * 加载基本属性到组件中
    */
    initBaseAttrToModule () {
      let that = this;
      if (
        that.propData.staticTabPaneList &&
        (that.propData.staticTabPaneList.length > 1 ||
          (that.propData.staticTabPaneList.length == 1 &&
            Object.keys(that.propData.staticTabPaneList[0]).length > 0))
      ) {
        if (this.moduleObject.env!='develop') {
          that.propData.staticTabPaneList.forEach(item => {
            if (item.defaultActiveKey) {
              this.activeTab = item.key;
            }
            if (!this.activeTab) {
              this.activeTab = this.propData.staticTabPaneList[0].key
            }
          })
        }
        // that.propData.staticTabPaneList.forEach(item => {
        //   item.opened = this.moduleObject.env=='develop'?true: this.activeTab==item.key;
        // });
        if (this.dataList && this.dataList.length > 0) {
          this.dataList.forEach(item => {
            this.propData.staticTabPaneList.forEach(k => {
              k.tab = item[k.field] || k.tab
            })
          })
        } else {
          that.allTabList = that.propData.staticTabPaneList;
        }
      }
    },
    /** 
     * 切换面板的回调
    */
    changeCallback (key) {
      let that = this;
      this.activeTab = key;
      this.allTabList.forEach(item=>{
        if(this.activeTab === item.key){
          // that.$nextTick(function(params) {
          //     //去加载内部组件
          //     that.moduleObject.moduleReload&&that.moduleObject.moduleReload(that.moduleObject.packageid, item.key);
          //   })
          // if(!item.opened){
          //   item.opened = true;
          //   that.$nextTick(function(params) {
          //     //去加载内部组件
          //     that.moduleObject.moduleReload&&that.moduleObject.moduleReload(that.moduleObject.packageid, item.key);
          //   })
          // }
        }
      })
      this.changeEventFunHandle("changeFunction");
      if (this.propData.triggerComponents && this.propData.triggerComponents.length > 0) {
        this.sendBroadcastMessage({
          type: 'chooseTab',
          rangeModule: this.propData.triggerComponents && this.propData.triggerComponents.map(el => el.moduleId),
          message: this.allTabList.find(item => item.key === key)
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
      console.log('点击tab发送消息', object);
      window.IDM.broadcast && window.IDM.broadcast.send(object);
    },
    /**
     * 切换标签前执行特定逻辑
     */
    beforeChange (index) {
      if (this.propData.beforChange && this.propData.beforChange.length > 0) {
        this.changeEventFunHandle("beforChange", '', {current: index});
      } else {
        return true
      }
    },
    /**
    * 通用的url参数对象
    * 所有地址url参数转换
    */
    commonParam () {
      let urlObject = IDM.url.queryObject();
      return {
        pageId: window.IDM.broadcast && window.IDM.broadcast.pageModule
            ? window.IDM.broadcast.pageModule.id
            : "",
        urlData: JSON.stringify(urlObject)
      }
    },
    /**
    * 通过自定义函数
    * name：属性名 会根据此属性名去propData中获取
    * customFunctionList: 忽略name直接传自定义函数集合
    */
     changeEventFunHandle (name, customFunctionList, params) {
      let that = this;
      let customHandle = customFunctionList || that.propData[name];
      customHandle && customHandle.forEach(item => {
        window[item.name] && window[item.name].call(that, {
          ...that.commonParam(),
          ...params,
          customParam: item.param,
          _that: that,
          activeKey: that.activeTab
        });
      });
    },
  }
}
</script>

<style scoped>
.tab-conent{
  min-height: 200px;
}
</style>
