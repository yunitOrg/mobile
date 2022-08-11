<template>
  <div
    idm-ctrl="idm_module"
    :id="moduleObject.id"
    :idm-ctrl-id="moduleObject.id"
    :title="propData.htmlTitle"
  >
    <ICommonListContainer
      :moduleObject="moduleObject"
      :ref="'listContainerRef-' + moduleObject.id"
      :propData="propData"
      :pageData="pageData"
    >
      <template #list>
        <div v-for="(item, index) in pageData.value" :key="index" class="box-line">
          <span class="module-name" :style="getModuleStyle(item)">[{{ item.moduleName }}]</span>{{ item.title }}
        </div>
      </template>
    </ICommonListContainer>
  </div>
</template>
<script>
import ICommonListContainer from "../commonComponents/ICommonListContainer";
const todoData = {
  value: [
    {
      jumpUrl: "",
      readStatus: "0",
      moduleName: "党费缴纳",
      title: "您已经连续两个月没有交党费了",
    },
    {
      jumpUrl: "",
      moduleName: "组织生活",
      readStatus: "1",
      title: "您已经连续两个月没有参加活动了",
    },
  ],
  count: 2,
  moreUrl: "",
};
export default {
  name: "ITodoList",
  components: {
    ICommonListContainer,
  },
  data() {
    return {
      moduleObject: {},
      propData: this.$root.propData.compositeAttr || {},
      pageWidth: null,
      pageData: { value: []},
    };
  },
  created() {
    this.moduleObject = this.$root.moduleObject;
    this.convertAttrToStyleObject();
    this.convertThemeListAttrToStyleObject();
  },
  methods: {
    //
    getModuleStyle(item){
      if(Array.isArray(this.propData.moduleStyleList) && this.propData.moduleStyleList.length > 0){
        const currentMoudle = this.propData.moduleStyleList.find(el => el.moduleName === item.moduleName), styleObj = {}
        if(currentMoudle && currentMoudle.moduleFont){
          IDM.style.setFontStyle(styleObj, currentMoudle.moduleFont)
          return styleObj
        }
      }
      return {}
    },
    propDataWatchHandle(propData) {
      this.propData = propData.compositeAttr || {};
      this.convertAttrToStyleObject();
      this.convertThemeListAttrToStyleObject();
    },

    convertAttrToStyleObject() {
      var boxLineStyleObj = {};
      for (const key in this.propData) {
        if (this.propData.hasOwnProperty.call(this.propData, key)) {
          const element = this.propData[key];
          if (!element && element !== false && element != 0) {
            continue;
          }
          switch (key) {
            case "messageFontStyle":
              IDM.style.setFontStyle(boxLineStyleObj, element)
              break;
            case "lineBox":
              IDM.style.setBoxStyle(boxLineStyleObj, element)
              break;
            case "lineBorder":
              IDM.style.setBorderStyle(boxLineStyleObj, element)
              break;
          }
        }
      }
      window.IDM.setStyleToPageHead(this.moduleObject.id + ' .box-line', boxLineStyleObj);
      this.$nextTick(() => {
        this.$refs[
          "listContainerRef-" + this.moduleObject.id
        ].convertAttrToStyleObject();
      });
      
      this.initData();
    },
    /**
     * 主题颜色
     */
    convertThemeListAttrToStyleObject() {
      var themeList = this.propData.themeList;
      if (!themeList) {
        return;
      }
      const themeNamePrefix =
        IDM.setting &&
        IDM.setting.applications &&
        IDM.setting.applications.themeNamePrefix
          ? IDM.setting.applications.themeNamePrefix
          : "idm-theme-";
      for (var i = 0; i < themeList.length; i++) {
        var item = themeList[i];
        let moduleColorObj = {
          "font-size": item.mainColor
            ? IDM.hex8ToRgbaString(item.mainColor.hex8)
            : "",
        };
        IDM.setStyleToPageHead("." + themeNamePrefix + item.key + (` #${this.moduleObject.id}-common-list` || "module_demo") + " .module-name",
          moduleColorObj
        );
      }
      // 通用样式
      this.$nextTick(() => {
        this.$refs[
          "listContainerRef-" + this.moduleObject.id
        ].convertThemeListAttrToStyleObject();
      });
    },
    reload() {
      //请求数据源
      this.initData();
    },
    //点击更多
    handleClickMore() {},

    initData() {
      let that = this;
      if(this.moduleObject.env === 'develop') {
          this.pageData = todoData
          return
      }
      //所有地址的url参数转换
      var params = that.commonParam();
      switch (this.propData.dataSourceType) {
        case "customInterface":
          this.propData.customInterfaceUrl &&
            window.IDM.http
              .get(this.propData.customInterfaceUrl, params)
              .then((res) => {
                //res.data
                that.$set(
                  that.propData,
                  "fontContent",
                  that.getExpressData(
                    "resultData",
                    that.propData.dataFiled,
                    res.data
                  )
                );
                // that.propData.fontContent = ;
              })
              .catch(function (error) {});
          break;
        case "pageCommonInterface":
          //使用通用接口直接跳过，在setContextValue执行
          break;
        case "customFunction":
          if (
            this.propData.customFunction &&
            this.propData.customFunction.length > 0
          ) {
            var resValue = "";
            try {
              resValue =
                window[this.propData.customFunction[0].name] &&
                window[this.propData.customFunction[0].name].call(this, {
                  ...params,
                  ...this.propData.customFunction[0].param,
                  moduleObject: this.moduleObject,
                });
            } catch (error) {}
            that.propData.fontContent = resValue;
          }
          break;
      }
    },
    receiveBroadcastMessage(messageObject){
      switch(messageObject.type) {
        case 'websocket':
          if(this.propData.messageRefreshKey && messageObject.message){
            const messageData = typeof messageObject.message === 'string' && JSON.parse(messageObject.message) || messageObject.message
            const arr = Array.isArray(this.propData.messageRefreshKey) ? this.propData.messageRefreshKey : [this.propData.messageRefreshKey]
            if(messageData.badgeType && arr.includes(messageData.badgeType)){
              this.initData()
            }
          }
          break;
        case 'linkageReload':
          this.initData()
          break;
        case 'pageResize':
          this.pageWidth = messageObject.message.width
          this.convertAttrToStyleObject()
          break;
      }
      console.log("组件收到消息",messageObject)
    },
    setContextValue(object) {
      console.log("统一接口设置的值", object);
      if (object.type != "pageCommonInterface") {
        return;
      }
      //这里使用的是子表，所以要循环匹配所有子表的属性然后再去设置修改默认值
      if (object.key == this.propData.dataName) {
        // this.propData.fontContent = this.getExpressData(this.propData.dataName,this.propData.dataFiled,object.data);
        this.$set(
          this.propData,
          "fontContent",
          this.getExpressData(
            this.propData.dataName,
            this.propData.dataFiled,
            object.data
          )
        );
      }
    },
    sendBroadcastMessage(object) {
      window.IDM.broadcast && window.IDM.broadcast.send(object);
    },
    /**
     * 通用的url参数对象
     * 所有地址的url参数转换
     */
    commonParam() {
      let urlObject = IDM.url.queryObject();
      var params = {
        pageId:
          window.IDM.broadcast && window.IDM.broadcast.pageModule
            ? window.IDM.broadcast.pageModule.id
            : "",
        urlData: JSON.stringify(urlObject),
      };
      return params;
    },
  },
};
</script>

<style lang="scss" scoped>
.box-line:last-child{
  border-bottom: 0 !important;
}
</style>
