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
    <van-tabs v-model="activeTab"
    :animated="propData.animated !== false ? true : false"
    :sticky="propData.sticky !== false ? true : false"
    :swipeable="propData.swipeable !== false ? true : false"
    :scrollspy="propData.scrollspy !== false ? true : false"
    :offset-top="(propData.offsetTop || {}).inputVal + (propData.offsetTop || {}).selectVal"
    :type="propData.type || 'line'"
    @change="changeCallback"
    :before-change="beforeChange">
      <van-tab v-for="item in allTabList" :key="item.key" :title="item.tab" :disabled="item.disable" title-class="tab-custom" :title-style="setFontStyle(item.tableFont)">
        <template v-if="propData.isDrag === 'container'">
          <div class="tab-conent drag_container"
            v-if="item.opened"
            :class="`idm-tab-inner-${item.key}`"
            idm-ctrl-inner
            :idm-ctrl-id="moduleObject.id"
            :idm-container-index="item.key"
          ></div>
        </template>
        <!-- <div class="tab-conent">{{item.tab}}</div> -->
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
export default{
  name: 'ITab',
  data () {
    return {
      activeTab: '',
      allTabList: [],
      moduleObject:{},
      propData:this.$root.propData.compositeAttr||{
        isDrag: "normal",
        type: 'line',
        animated: true,
        sticky: true,
        swipeable: false,
        scrollspy: false,
        offsetTop: {
          inputVal: 11,
          selectVal: 'px'
        },
        staticTabPaneList: [
          {
            key: "1",
            opened: true,
            tab: "全部",
            defaultActiveKey: true
          },
          {
            key: "2",
            opened: false,
            tab: "第一步",
            tableFont: {
              fontColors: {
                hex8: "#792828FF"
              },
              fontDecoration: "line-through",
              fontFamily: "arial, helvetica, 'microsoft yahei'",
              fontLetterSpacing: 4,
              fontLetterSpacingUnit: 'px',
              fontLineHeight: 4,
              fontLineHeightUnit: 'px',
              fontSize: 3,
              fontSizeUnit: 'px',
              fontTextAlign: 'left',
              fontWeight: "100 Thin"
            }
          }
        ],
        beforChange: []
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
      window.IDM.setStyleToPageHead(
        this.moduleObject.id + " .tab-conent",
        styleObject
      );
    },
    initAttrToModule () {
      console.log(this.propData, '数据源');
      this.initBaseAttrToModule();
      this.convertAttrToStyleObject();
    },
    setFontStyle (item) {
      console.log(item)
      let obj = {};
      if (item) {
        item.fontColors && (obj['color'] = item.fontColors.hex8);
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
          console.log(this.activeTab, '初始化')
          that.propData.staticTabPaneList.forEach(item => {
            if (item.defaultActiveKey) {
              console.log(item.key, '222')
              this.activeTab = item.key;
            }
            if (!this.activeTab) {
              this.activeTab = this.propData.staticTabPaneList[0].key
            }
          })
        }
        that.propData.staticTabPaneList.forEach(item => {
          item.opened = this.moduleObject.env=='develop'?true: this.activeTab==item.key;
        });
        that.allTabList = that.propData.staticTabPaneList;
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
          if(!item.opened){
            item.opened = true;
            that.$nextTick(function(params) {
              //去加载内部组件
              that.moduleObject.moduleReload&&that.moduleObject.moduleReload(that.moduleObject.packageid, item.key);
            })
          }
        }
      })
      this.changeEventFunHandle("changeFunction");
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
