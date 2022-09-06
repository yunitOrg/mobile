<template>
  <!--
    根目录规范(必须不能为空)：
    idm-ctrl：控件类型 drag_container：容器，drag_container_inlieblock：行内容器，idm_module：非容器的组件
    id：使用moduleObject.id，如果id不使用这个将会被idm-ctrl-id属性替换
    idm-ctrl-id：组件的id，这个必须不能为空
  -->
  <div
    class="i-login-card-outer"
    idm-ctrl="idm_module"
    :id="moduleObject.id"
    :idm-ctrl-id="moduleObject.id"
    v-show="propData.defaultStatus != 'hidden'"
  >
    <!--
      组件内部容器
      增加class="drag_container" 必选
      idm-ctrl-id：组件的id，这个必须不能为空
      idm-container-index  组件的内部容器索引，不重复唯一且不变，必选
    -->
    <div class="mobile-container">
      <div class="pre-icon"><svg-icon icon-class="mobile" /></div>
      <div class="input-box">
        <input v-model="mobile" type="text" placeholder="请输入手机号码">
        <div class="msg-error">{{mobileTip}}</div>
      </div>
    </div>
    <div class="password-container">
      <div class="pre-icon"><svg-icon icon-class="password" /></div>
      <div class="input-box">
        <input v-model="password" :type="pwdHidden?'password':'text'" placeholder="请输入密码">
        <div class="msg-error">{{passwordTip}}</div>
      </div>
      <div class="suffix-icon" @click="pwdHidden = !pwdHidden"><svg-icon :icon-class="pwdHidden?'hidden':'visiable'" /></div>
    </div>
    <div class="btn-container">
      <button @click="login">登录</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "ILoginCard",
  components: {},
  data() {
    return {
      moduleObject: {},
      propData: this.$root.propData.compositeAttr || {},
      pwdHidden: true,
      mobile:'',
      password:'',
      mobileTip:'',
      passwordTip:''
    };
  },
  props: {},
  created() {
    this.moduleObject = this.$root.moduleObject;
    this.convertAttrToStyleObject();
    this.convertThemeListAttrToStyleObject();
  },
  mounted() {},
  destroyed() {},
  methods: {
    /**
     * 登录
     */
    login(){
      if(!this.mobile){
        this.mobileTip = '请输入手机号码'
        return
      }
      const reg = new RegExp(/^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/)
      if(!reg.test(this.mobile)){
        this.mobileTip = '请正确的手机号码'
        return
      }
      if(!this.password){
        this.passwordTip = '请输入密码'
        return
      }
      if (this.propData.loginCustomFunc && this.propData.loginCustomFunc[0]) {
        const loginCustomFunc = this.propData.loginCustomFunc[0];
        const func = window[loginCustomFunc.name];
        const that = this;
        func && func.call(this, {
            mobile:this.mobile,
            password:this.password,
            ...that.commonParam(),
            customParam: loginCustomFunc.param,
            _this: that,
          });
      }
    },
    /**
     * 适配页面
     */
    getScale(pageWidth){
      const base = this.propData.baseValue || 414
      const ratio = this.propData.adaptationRatio || 1.2
      const width = this.moduleObject.env ===  "production" ? window.innerWidth : pageWidth || 414
      return (width / base - 1) * (ratio - 1) + 1
    },
    /**
     * 提供父级组件调用的刷新prop数据组件
     */
    propDataWatchHandle(propData) {
      this.propData = propData.compositeAttr || {};
      this.convertAttrToStyleObject();
      this.convertThemeListAttrToStyleObject();
    },
    /**
     * 把属性转换成样式对象
     */
    convertAttrToStyleObject(pageSize={}) {
      var styleObject = {};

      const scale  = this.getScale(pageSize.width);
      styleObject['--i-login-card-scale'] = scale;

      if (this.propData.bgSize && this.propData.bgSize == "custom") {
        styleObject["background-size"] =
          (this.propData.bgSizeWidth
            ? this.propData.bgSizeWidth.inputVal +
              this.propData.bgSizeWidth.selectVal
            : "auto") +
          " " +
          (this.propData.bgSizeHeight
            ? this.propData.bgSizeHeight.inputVal +
              this.propData.bgSizeHeight.selectVal
            : "auto");
      } else if (this.propData.bgSize) {
        styleObject["background-size"] = this.propData.bgSize;
      }
      if (this.propData.positionX && this.propData.positionX.inputVal) {
        styleObject["background-position-x"] =
          this.propData.positionX.inputVal + this.propData.positionX.selectVal;
      }
      if (this.propData.positionY && this.propData.positionY.inputVal) {
        styleObject["background-position-y"] =
          this.propData.positionY.inputVal + this.propData.positionY.selectVal;
      }
      for (const key in this.propData) {
        if (this.propData.hasOwnProperty.call(this.propData, key)) {
          const element = this.propData[key];
          if (!element && element !== false && element != 0) {
            continue;
          }
          switch (key) {
            case "width":
            case "height":
              styleObject[key] = element;
              break;
            case "bgColor":
              if (element && element.hex8) {
                styleObject["background-color"] = IDM.hex8ToRgbaString(element.hex8);
              }
              break;
            case "box":
              if (element.marginTopVal) {
                styleObject["margin-top"] = `${element.marginTopVal}`;
              }
              if (element.marginRightVal) {
                styleObject["margin-right"] = `${element.marginRightVal}`;
              }
              if (element.marginBottomVal) {
                styleObject["margin-bottom"] = `${element.marginBottomVal}`;
              }
              if (element.marginLeftVal) {
                styleObject["margin-left"] = `${element.marginLeftVal}`;
              }
              if (element.paddingTopVal) {
                styleObject["padding-top"] = `${element.paddingTopVal}`;
              }
              if (element.paddingRightVal) {
                styleObject["padding-right"] = `${element.paddingRightVal}`;
              }
              if (element.paddingBottomVal) {
                styleObject["padding-bottom"] = `${element.paddingBottomVal}`;
              }
              if (element.paddingLeftVal) {
                styleObject["padding-left"] = `${element.paddingLeftVal}`;
              }
              break;
            case "bgImgUrl":
              styleObject[
                "background-image"
              ] = `url(${window.IDM.url.getWebPath(element)})`;
              break;
            case "positionX":
              //背景横向偏移

              break;
            case "positionY":
              //背景纵向偏移

              break;
            case "bgRepeat":
              //平铺模式
              styleObject["background-repeat"] = element;
              break;
            case "bgAttachment":
              //背景模式
              styleObject["background-attachment"] = element;
              break;
            case "border":
              if (element.border.top.width > 0) {
                styleObject["border-top-width"] =
                  element.border.top.width + element.border.top.widthUnit;
                styleObject["border-top-style"] = element.border.top.style;
                if (element.border.top.colors.hex8) {
                  styleObject["border-top-color"] =
                    IDM.hex8ToRgbaString(element.border.top.colors.hex8);
                }
              }
              if (element.border.right.width > 0) {
                styleObject["border-right-width"] =
                  element.border.right.width + element.border.right.widthUnit;
                styleObject["border-right-style"] = element.border.right.style;
                if (element.border.right.colors.hex8) {
                  styleObject["border-right-color"] =
                    IDM.hex8ToRgbaString(element.border.right.colors.hex8);
                }
              }
              if (element.border.bottom.width > 0) {
                styleObject["border-bottom-width"] =
                  element.border.bottom.width + element.border.bottom.widthUnit;
                styleObject["border-bottom-style"] =
                  element.border.bottom.style;
                if (element.border.bottom.colors.hex8) {
                  styleObject["border-bottom-color"] =
                    IDM.hex8ToRgbaString(element.border.bottom.colors.hex8);
                }
              }
              if (element.border.left.width > 0) {
                styleObject["border-left-width"] =
                  element.border.left.width + element.border.left.widthUnit;
                styleObject["border-left-style"] = element.border.left.style;
                if (element.border.left.colors.hex8) {
                  styleObject["border-left-color"] =
                    IDM.hex8ToRgbaString(element.border.left.colors.hex8);
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
              break;
            case "boxShadow":
              styleObject["box-shadow"] = element;
              break;
            case "font":
              styleObject["font-family"] = element.fontFamily;
              if (element.fontColors.hex8) {
                styleObject["color"] = IDM.hex8ToRgbaString(element.fontColors.hex8);
              }
              styleObject["font-weight"] =
                element.fontWeight && element.fontWeight.split(" ")[0];
              styleObject["font-style"] = element.fontStyle;
              styleObject["font-size"] =
                element.fontSize + element.fontSizeUnit;
              styleObject["line-height"] =
                element.fontLineHeight +
                (element.fontLineHeightUnit == "-"
                  ? ""
                  : element.fontLineHeightUnit);
              styleObject["text-align"] = element.fontTextAlign;
              styleObject["text-decoration"] = element.fontDecoration;
              break;
          }
        }
      }
      window.IDM.setStyleToPageHead(this.moduleObject.id, styleObject);
    },
    /**
     * 主题颜色
     */
    convertThemeListAttrToStyleObject() {
      const themeList = this.propData.themeList;
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

        IDM.setStyleToPageHead(
          "." +
            themeNamePrefix +
            item.key +
            " #" +
            (this.moduleObject.packageid || "module_demo") +
            " .pre-icon",
          {
            "color" : item.mainColor ? IDM.hex8ToRgbaString(item.mainColor.hex8) : "",
          }
        );

        IDM.setStyleToPageHead(
          "." +
            themeNamePrefix +
            item.key +
            " #" +
            (this.moduleObject.packageid || "module_demo") +
            " .btn-container button",
          {
            "background-color" : item.mainColor ? IDM.hex8ToRgbaString(item.mainColor.hex8) : "",
          }
        );

        IDM.setStyleToPageHead(
          "." +
            themeNamePrefix +
            item.key +
            " #" +
            (this.moduleObject.packageid || "module_demo") +
            " .msg-error",
          {
            "color" : item.mainColor ? IDM.hex8ToRgbaString(item.mainColor.hex8) : "",
          }
        );
      }
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
    /**
     * 通用的获取表达式匹配后的结果
     */
    getExpressData(dataName, dataFiled, resultData) {
      //给defaultValue设置dataFiled的值
      var _defaultVal = undefined;
      if (dataFiled) {
        var filedExp = dataFiled;
        filedExp = dataName + (filedExp.startsWiths("[") ? "" : ".") + filedExp;
        var dataObject = { IDM: window.IDM };
        dataObject[dataName] = resultData;
        _defaultVal = window.IDM.express.replace.call(
          this,
          "@[" + filedExp + "]",
          dataObject
        );
      }
      //对结果进行再次函数自定义
      if (
        this.propData.customFunction &&
        this.propData.customFunction.length > 0
      ) {
        var params = this.commonParam();
        var resValue = "";
        try {
          resValue =
            window[this.propData.customFunction[0].name] &&
            window[this.propData.customFunction[0].name].call(this, {
              ...params,
              ...this.propData.customFunction[0].param,
              moduleObject: this.moduleObject,
              expressData: _defaultVal,
              interfaceData: resultData,
            });
        } catch (error) {}
        _defaultVal = resValue;
      }

      return _defaultVal;
    },
    showThisModuleHandle() {
      this.propData.defaultStatus = "default";
    },
    hideThisModuleHandle() {
      this.propData.defaultStatus = "hidden";
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
    receiveBroadcastMessage(messageObject) {
      console.log("组件收到消息", messageObject);
      switch(messageObject.type) {
        case 'websocket':
          if(this.propData.messageRefreshKey && messageObject.message){
            const messageData = typeof messageObject.message === 'string' && JSON.parse(messageObject.message) || messageObject.message
            const arr = Array.isArray(this.propData.messageRefreshKey) ? this.propData.messageRefreshKey : [this.propData.messageRefreshKey]
            if(messageData.badgeType && arr.includes(messageData.badgeType)){
            }
          }
          break;
        case 'linkageReload':
          break;
        case 'pageResize':
          this.convertAttrToStyleObject(messageObject.message);
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
  },
};
</script>

<style lang="scss" scoped>
$scale: var(--i-login-card-scale);

.i-login-card-outer {
  width: auto;
  background-color: #fff;
  margin: calc($scale * 12px);
  padding: 0 calc($scale * 16px);
  box-shadow: 0px calc($scale * 2px) calc($scale * 8px) 0px rgba(194,194,194,0.5);
  border-radius: calc($scale * 10px);
  font-size: calc($scale * 16px);

  .mobile-container,.password-container {
    display: flex;
    height: calc($scale * 70px);
    line-height: calc($scale * 70px);
    border-bottom: 1px solid #E1E1E1;
    
    input {
      width: 100%;
      border: none;
      background-color: transparent;

      &::-webkit-input-placeholder {
        color: #999;
      }
      &:-webkit-autofill{
        -webkit-text-fill-color: #999;
      }
      &:-internal-autofill-previewed{
        transition: background-color 5000s ease-in-out 0s !important;
      }
      &:-internal-autofill-selected {
          transition: background-color 5000s ease-in-out 0s !important;
      } 
    }
     
    .pre-icon {
      color: rgb(196, 0, 0);
      margin-left: calc($scale * 10px);
      font-size: calc($scale * 20px);
    }
    
    .suffix-icon {
      font-size: calc($scale * 20px);
      color: #999;
      margin-right: calc($scale * 10px);
    }

    .input-box {
      position: relative;
      flex: 1;
      padding: 0 calc($scale * 20px);
    }

    .msg-error {
      position: absolute;
      left: 0;
      bottom: 0;
      line-height: calc($scale * 20px);
      margin-left: calc($scale * 20px);
      color: rgb(196, 0, 0);
    }
  }

  .btn-container  button{
    width: 100%;
    height: calc($scale * 44px);
    background-color: #E02020;
    border-radius: calc($scale * 22px);
    border: none;
    color: #fff;
    margin: calc($scale * 40px) 0;
  }
}
</style>
