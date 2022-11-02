<template>
  <!--
    根目录规范(必须不能为空)：
    idm-ctrl：控件类型 drag_container：容器，drag_container_inlieblock：行内容器，idm_module：非容器的组件
    id：使用moduleObject.id，如果id不使用这个将会被idm-ctrl-id属性替换
    idm-ctrl-id：组件的id，这个必须不能为空
  -->
  <div
    class="i-my-list-outer"
    idm-ctrl="idm_module"
    :id="moduleObject.id"
    :idm-ctrl-id="moduleObject.id"
    v-show="propData.defaultStatus != 'hidden'"
  >
    <ul v-if="propData.tabList">
      <li v-for="(item,index) in propData.tabList" :key="index" @click="listClick(item)" :class="{'hidden-splitline':propData.showSplitLine === false}">
        <div v-if="item.showLeftIcon" class="list-left-icon">
          <img v-if="item.leftIconUrl" :src="IDM.url.getWebPath(item.leftIconUrl)" alt="">
          <img v-else src="../assets/archives.png"/>
        </div>
        <div class="list-text">{{item.tabText}}</div>
        <div v-if="item.showRightNum" class="list-right-num">
          <span v-if="infoList && item.tabKey && infoList[item.tabKey]">{{infoList[item.tabKey][propData.numInterface]}}</span>
          <span v-else>6</span>
        </div>
        <div v-if="item.showRightIcon" class="list-right-icon" :style="iconStyleObject(item)">
          <svg
            v-if="item.rightIcon && item.rightIcon.length > 0"
            class="idm_filed_svg_icon"
            aria-hidden="true"
          >
            <use
              :xlink:href="`#${item.rightIcon && item.rightIcon[0]}`"
            ></use>
          </svg>
          <svg-icon v-else icon-class="arrowRight2" />
        </div>
      </li>
    </ul>
    <div class="i-my-list-mask" v-if="moduleObject.env !== 'production' && !propData.dataSource">
      <span>！未绑定数据源</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "IMyList",
  data() {
    return {
      moduleObject: {},
      propData: this.$root.propData.compositeAttr || {
        showSplitLine:false,
        numInterface:"num",
        tabList:[
          {
            tabKey:"wddn",
            tabText:"我的档案",
            showLeftIcon:true,
            leftIconUrl:'',
            showRightIcon:true
          },
          {
            tabKey:"zzsh",
            tabText:"组织生活",
            showLeftIcon:true,
            showRightIcon:true,
            showRightNum:true
          },
          {
            tabKey:"wdsc",
            tabText:"我的收藏",
            showLeftIcon:true,
            showRightIcon:true
          }
        ]
      },
      infoList:{}
    };
  },
  props: {},
  created() {
    this.moduleObject = this.$root.moduleObject;
    this.convertAttrToStyleObject();
    this.isLoading = true;
    this.initData();
  },
  mounted() {},
  destroyed() {},
  methods: {
    iconStyleObject(item){
      let str = ''
      if(item.rightIconColor){
        str += `color:${IDM.hex8ToRgbaString(item.rightIconColor.hex8)};`
      }
      if(item.rightIconSize){
        str += `font-size:${item.rightIconSize.inputVal + item.rightIconSize.selectVal};`;
      }
      return str
    },
    /**
     * 列表点击
     */
    listClick(item){
      if (item.listJump && item.listJump.length > 0) {
        IDM.router.push(
          this.moduleObject.pageid,
          item.listJump[0].id,
          item.isPageKeep,
          item,
          "",
          ""
        );
      } else {
        IDM.message.warning("请选择要跳转的子页面");
      }
    },
    /**
     * 重载
     */
    reload(){
      this.isLoading = true;
      this.initData();
    },
    /**
     * 加载动态数据
     */
    initData() {
      if (!this.moduleObject.env || this.moduleObject.env == "develop") {
        // mock数据
        setTimeout(() => {
          this.isLoading = false;
          const res = {
            wddn:{
              num:2
            },
            zzsh:{
              num:5
            }
          };
          this.infoList = res;
        }, 1000);

        return;
      }
      let dataSource = this.propData.dataSource;
      if (!dataSource) {
        this.isLoading = false;
        return;
      }
      let url = `ctrl/dataSource/getDatas`;


      IDM.datasource.request(this.propData.dataSource[0]?.id,{
        moduleObject: this.moduleObject
      },(res) => {
          const result = res
          this.infoList = result;
      })
      this.isLoading = false;
      this.showStatusHandle();

    },
    /**
     * 适配页面
     */
    getScale(pageWidth) {
      const base = this.propData.baseValue || 414;
      const ratio = this.propData.adaptationRatio || 1.2;
      const width =
        this.moduleObject.env === "production"
          ? window.innerWidth
          : pageWidth || 414;
      return (width / base - 1) * (ratio - 1) + 1;
    },
    /**
     * 提供父级组件调用的刷新prop数据组件
     */
    propDataWatchHandle(propData) {
      this.propData = propData.compositeAttr || {};
      this.convertAttrToStyleObject();
      this.showStatusHandle();
    },
    /**
     * tab是否现在判断
     */
    showStatusHandle(){
      let that = this;
      that.propData.tabList &&
        that.propData.tabList.forEach(item => {
          if (item.showType == 'default') {
            item.showStatus = true
            return;
          }
          switch (item.showType) {
            case 'toggle':
              //用当前选中的页签对象去执行表达式
              if (item.dataFiled && item.tabKey && this.infoList[item.tabKey] && this.infoList[item.tabKey][item.dataFiled]) {
                item.showStatus = true;
              } else {
                item.showStatus = false;
              }
              break;
            case 'custom':
              item.showStatus =
                window[item.dataFunction[0].name] &&
                window[item.dataFunction[0].name].call(this, {
                  ...that.commonParam(),
                  customParam: item.dataFunction[0].param,
                  _this: that,
                  curTab: item
                });
              break;
          }
        });
    },
    /**
     * 把属性转换成样式对象
     */
    convertAttrToStyleObject(pageSize = {}) {
      var styleObject = {};

      const scale = this.getScale(pageSize.width);
      styleObject["--i-my-list-scale"] = scale;

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
                styleObject["background-color"] = IDM.hex8ToRgbaString(
                  element.hex8
                );
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
                  styleObject["border-top-color"] = IDM.hex8ToRgbaString(
                    element.border.top.colors.hex8
                  );
                }
              }
              if (element.border.right.width > 0) {
                styleObject["border-right-width"] =
                  element.border.right.width + element.border.right.widthUnit;
                styleObject["border-right-style"] = element.border.right.style;
                if (element.border.right.colors.hex8) {
                  styleObject["border-right-color"] = IDM.hex8ToRgbaString(
                    element.border.right.colors.hex8
                  );
                }
              }
              if (element.border.bottom.width > 0) {
                styleObject["border-bottom-width"] =
                  element.border.bottom.width + element.border.bottom.widthUnit;
                styleObject["border-bottom-style"] =
                  element.border.bottom.style;
                if (element.border.bottom.colors.hex8) {
                  styleObject["border-bottom-color"] = IDM.hex8ToRgbaString(
                    element.border.bottom.colors.hex8
                  );
                }
              }
              if (element.border.left.width > 0) {
                styleObject["border-left-width"] =
                  element.border.left.width + element.border.left.widthUnit;
                styleObject["border-left-style"] = element.border.left.style;
                if (element.border.left.colors.hex8) {
                  styleObject["border-left-color"] = IDM.hex8ToRgbaString(
                    element.border.left.colors.hex8
                  );
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
                styleObject["color"] = IDM.hex8ToRgbaString(
                  element.fontColors.hex8
                );
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
      switch (messageObject.type) {
        case "websocket":
          if (this.propData.messageRefreshKey && messageObject.message) {
            const messageData =
              (typeof messageObject.message === "string" &&
                JSON.parse(messageObject.message)) ||
              messageObject.message;
            const arr = Array.isArray(this.propData.messageRefreshKey)
              ? this.propData.messageRefreshKey
              : [this.propData.messageRefreshKey];
            if (messageData.badgeType && arr.includes(messageData.badgeType)) {
              this.reload()
            }
          }
          break;
        case "linkageReload":
          this.reload()
          break;
        case "pageResize":
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
    },
  },
};
</script>

<style lang="scss" scoped>
$scale: var(--i-my-list-scale);

.i-my-list-outer {
  position: relative;
  width: auto;
  background-color: #fff;
  margin: calc($scale * 10px);
  box-shadow: 0px 2px 4px 4px rgba(238,238,238,0.5);
  border-radius: calc($scale * 8px);
  font-size: calc($scale * 16px);
  color: #333333;
  font-weight: 400;

  ul{
    padding: 0 calc($scale * 16px);
    li {
      display: flex;
      height: calc($scale * 50px);
      border-bottom: 1px solid rgba(225,225,225,1);
      align-items: center;

      &:last-child {
        border: none;
      }

      &.hidden-splitline {
        border-bottom: none;
      }

      .idm_filed_svg_icon {
        font-size: 1em;
        width: 1em;
        height: 1em;
        fill: currentColor;
        vertical-align: -0.15em;
        outline: none;
      }
      
      .list-text {
        width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .list-right-num {
        margin-right: calc($scale * 10px);
      }

      .list-left-icon img{
        width: calc($scale * 18px);
        height: calc($scale * 18px);
        vertical-align: text-bottom;
        margin-right: calc($scale * 16px);
      }
    }
  }

  .i-my-list-mask {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
    background: rgba(0,0,0,.3);
    display: flex;
    justify-content: center;
    align-items: center;
    span {
      padding: calc(6px * #{ $scale }) calc(20px * #{ $scale });;
      color: #e6a23c;
      background: #fdf6ec;
      border:calc(1px * #{ $scale }) solid #f5dab1;
      border-radius: calc(4px * #{ $scale });;
    }
  }
}
</style>
