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
    <div class="idm-integral">
      <div class="integral-img" :style="`width:${propData.imgWidth};height:${propData.imgHeight};background-color: ${propData.colorBg}`" v-if="propData.showImg">
        <img :src="propData.topImgUrl || topimgUrl" alt="">
        <div class="integral-position integral-white">
          <div class="integral-top-title">累计积分</div>
          <div class="integral-block">
            <span>4551</span>
            <b>今日已获得3积分</b>
          </div>
        </div>
      </div>
      <div class="integral-bottom">
        <div class="integral-p" v-if="propData.integralShow">
          <svg-icon icon-class="shu" class-name="idm_svg_author_icon"></svg-icon>
          <span>{{propData.integralTitle}}</span>
        </div>
        <div class="integral-li">
          <div class="integral-top">
            <span>登录</span>
            <b>已完成</b>
          </div>
          <div class="integral-li-p">每日首次登录1分</div>
        </div>
        <div class="integral-li">
          <div class="integral-top">
            <span>登录</span>
            <b>已完成</b>
          </div>
          <div class="integral-li-p">每浏览1篇文章积1分，每日上限5分</div>
          <div class="integral-li-p">每篇文章浏览不超过30秒不计分</div>
          <div class="integral-li-p">同一篇文章当天不重复积分</div>
          <div class="integral-tip">已获得2分/每日上限5分</div>
        </div>
        <div class="integral-li">
          <div class="integral-top">
            <span>登录</span>
            <b>已完成</b>
          </div>
          <div class="integral-li-p">每浏览1篇文章积1分，每日上限5分</div>
          <div class="integral-li-p">每篇文章浏览不超过30秒不计分</div>
          <div class="integral-li-p">同一篇文章当天不重复积分</div>
          <div class="integral-tip">已获得2分/每日上限5分</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Integral',
  data () {
    return {
      moduleObject:{},
      topimgUrl: IDM.url.getModuleAssetsWebPath(require("../assets/integral.png"), this.moduleObject),
      propData:this.$root.propData.compositeAttr||{
        imgWidth: 'auto',
        imgHeight: '200px',
        showImg: true,
        colorBg: "#DA1412",
        integralTitle: '积分奖励',
        boxShadow: "0px 0px 10px 0px #e3dede",
        integralShow: true,
        bgColor: {
          hex: '#ffffff',
          hex8: '#ffffffff'
        },
        box: {
          marginTopVal: "-0",
          marginRightVal: "10px",
          marginBottomVal: "",
          marginLeftVal: "10px",
          paddingTopVal: "20px",
          paddingRightVal: "10px",
          paddingBottomVal: "",
          paddingLeftVal: "10px"
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
      console.log(this.propData, '数据');
      this.converStyleObj();
      this.converThemeListObject();
    },
    converStyleObj () {
      let styleObject = {},
          subtitleObject = {},
          desctitleObject = {},
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
            case 'titleFont':
              IDM.style.setFontStyle(styleObject, element)
              break
            case 'subTitleFont':
              IDM.style.setFontStyle(subtitleObject, element)
              break
            case 'descTitleFont':
              IDM.style.setFontStyle(desctitleObject, element)
              break
            case 'boxShadow':
              numStyleObject['box-shadow'] = element
              break
            case 'box':
              IDM.style.setBoxStyle(numStyleObject, element)
              break
            case 'bgColor':
              numStyleObject['background-color'] = element && element.hex8
              break
            case 'boxBorder':
              IDM.style.setBorderStyle(numStyleObject, element)
              break
            case 'integralFont':
              IDM.style.setFontStyle(checkStyleObject, element)
              break
            // case 'width':
            //   styleObject['width'] = element;
            //   break
            // case 'height':
            //   styleObject['height'] = element;
            //   break
            // case 'bgColor':
            //   styleObject['background-color'] = element && element.hex8
            //   break
            // case 'boxShadow':
            //   styleObject['box-shadow'] = element
            //   break
            // case 'boxBorder':
            //   IDM.style.setBorderStyle(styleObject, element)
            //   break
            // case 'numFont':
            //   IDM.style.setFontStyle(numStyleObject, element)
            //   break
            // case 'checkBorder':
            //   checkStyleObject['border-color'] = element && element.hex8 + ' !important'
            //   break
            // case 'checkBg':
            //   colorCheck['color'] = element && element.hex8 + ' !important'
            //   break
          }
        }
      }
      window.IDM.setStyleToPageHead(this.moduleObject.id + " .integral-top-title", styleObject);
      window.IDM.setStyleToPageHead(this.moduleObject.id + " .integral-block span", subtitleObject);
      window.IDM.setStyleToPageHead(this.moduleObject.id + " .integral-block b", desctitleObject);
      window.IDM.setStyleToPageHead(this.moduleObject.id + " .integral-bottom", numStyleObject);
      window.IDM.setStyleToPageHead(this.moduleObject.id + " .integral-p span", checkStyleObject);
    },
    handleClick (row) {
      let that = this;
      let { customClickFunc, key } = row;
      if (customClickFunc && customClickFunc.length > 0 ) {
        customClickFunc.forEach(item => {
          window[item.name] && window[item.name].call(that, {
            value: key
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
          `.${themeNamePrefix}${item.key} #${(this.moduleObject.id || "module_demo")} .idm_svg_author_icon`,
          {
            "color": item.mainColor ? item.mainColor.hex8 : "",
            "fill": item.mainColor ? item.mainColor.hex8 : ""
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
          console.log('接收消息', object.message)
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

<style lang="scss" scoped>
.idm-integral{
  .integral-img{
    position: relative;
    img{
      width: 100%;
      height: 100%;
    }
    .integral-white{
      color: #fff;
      position: absolute;
      text-align: center;
    }
    .integral-position{
      top: 35%;
      left: 50%;
      transform: translate(-50%, 0);
    }
    .integral-top-title{
      font-size: 16px;
    }
    .integral-block{
      position: absolute;
      top: 35px;
      span{
        font-size: 30px;
      }
      b{
        position: absolute;
        right: -123px;
        top: 15px;
      }
    }
  }
  .integral-bottom .integral-li:last-child{
    border: 0;
  }
  .integral-li{
    border-bottom: 1px dashed #eee;
    padding: 10px 0;
    .integral-top{
      display: flex;
      align-items: center;
      justify-content: space-between;
      b{
        font-weight: normal;
        background-color: #ccc;
        color: #fff;
        border-radius: 3px;
        padding: 3px 5px;
      }
    }
    .integral-li-p{
      font-size: 12px;
      color: #ccc;
      padding-top: 5px;
    }
    .integral-tip{
      color: #f00;
      text-align: center;
    }
  }
}
</style>
