<template>
  <!--
    根目录规范(必须不能为空)：
    idm-ctrl：控件类型 drag_container：容器，drag_container_inlieblock：行内容器，idm_module：非容器的组件
    id：使用moduleObject.id，如果id不使用这个将会被idm-ctrl-id属性替换
    idm-ctrl-id：组件的id，这个必须不能为空
  -->
  <div
    class="i-time-axis-outer"
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
    <van-loading v-if="isLoading" size="24px" vertical>加载中...</van-loading>
    <template v-else>
      <template v-if="infoList.length > 0">
        <div
          class="i-time-axis-item"
          v-for="(item, index) in infoList"
          :key="index"
          :class="`${item.level === 1?'active':''} ${propData.circlePostion}`"
        >
          <div class="item-label">
            <span>{{ item.label }}</span>
          </div>
          <div class="item-style" >
            <div class="item-style-line"></div>
            <div
              class="item-style-circle"
              :class="{ hollow: propData.circleStyle === 'hollow' }"
            >
              <div class="circle-inner"></div>
            </div>
            <div class="item-style-line"></div>
          </div>
          <div class="item-desc" v-if="item.title">
            <div class="item-desc-left">
              <span class="left-title">{{ item.title }}</span>
              <span class="left-time">{{ item.desc }}</span>
            </div>
            <div class="item-desc-right" v-if="item.iconText">
              <span class="right-icon">
                <svg-icon icon-class="partyCost" />
              </span>
              <span>{{ item.iconText }}</span>
            </div>
          </div>
        </div>
      </template>
      <van-empty
        v-else
        :description="propData.emptyDescription"
      >
        <template #image>
            <van-image :src="IDM.url.getModuleAssetsWebPath(require('../assets/empty-default.png'), moduleObject)" />
        </template>
      </van-empty>
    </template>
  </div>
</template>

<script>
import { Empty, Loading, Image as VanImage } from "vant";
import "vant/lib/empty/style";
import "vant/lib/loading/style";
import 'vant/lib/image/style';
import { set } from 'vue';
export default {
  name: "ITimeAxis",
  components: {
    [Empty.name]: Empty,
    [Loading.name]: Loading,
    [VanImage.name]: VanImage
  },
  data() {
    return {
      moduleObject: {},
      propData: this.$root.propData.compositeAttr || {
        connectLine: "dashed",
        circleStyle: "hollow",
        circlePostion: "center",
        emptyDescription:'暂无数据'
      },
      isLoading: true,
      infoList: [],
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
      var styleObject = {},
        connectLineObject = {},
        cardStyleObject = {};

      const scale  = this.getScale(pageSize.width);
      styleObject['--i-schedule-scale'] = scale;

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
            case "connectLine":
              connectLineObject["border-left-style"] = element;
              break;
            case "cardbgColor":
              if (element && element.hex8) {
                cardStyleObject["background-color"] = IDM.hex8ToRgbaString(element.hex8);
              }
              break;
          }
        }
      }
      window.IDM.setStyleToPageHead(this.moduleObject.id, styleObject);
      window.IDM.setStyleToPageHead(
        this.moduleObject.id + ` .i-time-axis-item .item-style-line`,
        connectLineObject
      );
      window.IDM.setStyleToPageHead(
        this.moduleObject.id + ` .i-time-axis-item .item-desc`,
        cardStyleObject
      );
      this.initData();
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
            " .i-time-axis-item .item-style .item-style-circle",
          {
            "border-color" : item.mainColor ? IDM.hex8ToRgbaString(item.mainColor.hex8) : "",
          }
        );

        IDM.setStyleToPageHead(
          "." +
            themeNamePrefix +
            item.key +
            " #" +
            (this.moduleObject.packageid || "module_demo") +
            " .i-time-axis-item.active .item-style-circle",
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
            " .i-time-axis-item .item-style .item-style-circle .circle-inner",
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
            " .i-time-axis-item .item-desc .item-desc-right",
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
     * 加载动态数据
     */
    initData() {
      if (!this.moduleObject.env || this.moduleObject.env == "develop") {
        // mock数据
        setTimeout(()=>{
          this.infoList = [];
          const res = [
            {
              label: "2021",
              children: [
                {
                  label: "11-3",
                  title:
                    "参加了《12》参加了《12》参加了《12》参加了《12》参加了《12》参加了《12》参加了《12》参加了《12》",
                  desc: "2021-12-11 12:33:33",
                  icon: "",
                  iconText: "组织生活",
                },
                {
                  label: "12-2",
                  title: "参加了《12》",
                  desc: "2021-12-11 12:33:33",
                  icon: "",
                  iconText: "组织生活",
                },
              ],
            },
            {
              label: "2021",
              children: [
                {
                  label: "11-3",
                  title: "参加了《12》",
                  desc: "2021-12-11 12:33:33",
                  icon: "",
                  iconText: "组织生活",
                },
                {
                  label: "12-2",
                  title: "参加了《12》",
                  desc: "2021-12-11 12:33:33",
                  icon: "",
                  iconText: "组织生活",
                },
              ],
            },
            // {
            //   label: "1937年7月7日",
            //   title:
            //     "日本帝国主义者以制造卢沟桥事变为七点，发动全面侵华战争",
            //   desc: "1937年7月7日 日本帝国主义者以制造卢沟桥事变为七点，发动全面侵华战争。1937年7月7日 日本帝国主义者以制造卢沟桥事变为七点，发动全面侵华战争。1937年7月7日 日本帝国主义者以制造卢沟桥事变为七点，发动全面侵华战争。1937年7月7日 日本帝国主义者以制造卢沟桥事变为七点，发动全面侵华战争。",
            // },
            // {
            //   label: "1937年7月7日",
            //   title:
            //     "日本帝国主义者以制造卢沟桥事变为七点，发动全面侵华战争",
            //   desc: "1937年7月7日 日本帝国主义者以制造卢沟桥事变为七点，发动全面侵华战争。1937年7月7日 日本帝国主义者以制造卢沟桥事变为七点，发动全面侵华战争。1937年7月7日 日本帝国主义者以制造卢沟桥事变为七点，发动全面侵华战争。1937年7月7日 日本帝国主义者以制造卢沟桥事变为七点，发动全面侵华战争。",
            // },
            // {
            //   label: "1937年7月7日",
            //   title:
            //     "日本帝国主义者以制造卢沟桥事变为七点，发动全面侵华战争",
            //   desc: "1937年7月7日 日本帝国主义者以制造卢沟桥事变为七点，发动全面侵华战争。1937年7月7日 日本帝国主义者以制造卢沟桥事变为七点，发动全面侵华战争。1937年7月7日 日本帝国主义者以制造卢沟桥事变为七点，发动全面侵华战争。1937年7月7日 日本帝国主义者以制造卢沟桥事变为七点，发动全面侵华战争。",
            // },
          ];
          res.forEach((item) => {
            item.level = 1;
            this.infoList.push(item);
            if (item.children) {
              item.children.forEach((c) => {
                c.level = 2;
                this.infoList.push(c);
              });
            }
          });
          this.isLoading = false;
        },2000)
        
        return;
      }
      let dataSource = this.propData.dataSource;
      if (!dataSource) {
        this.isLoading = false;
        return;
      }
      let url = `ctrl/dataSource/getDatas`;
      IDM.http
        .post(
          url,
          {
            id: dataSource.value,
          },
          {
            headers: {
              "Content-Type": "application/json;charset=UTF-8",
            },
          }
        )
        .done((res) => {
          console.log(res, "接口数据");
          if (res.code === "200") {
            this.infoList = this.propData.dataFiled
              ? this.getExpressData("dataName", this.propData.dataFiled, res)
              : res;
          } else {
            console.log(url + "请求失败");
          }
        })
        .error((response) => {
          console.log(url + "请求失败");
        })
        .always((res) => {
          this.isLoading = false;
        });
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
              this.isLoading = true;
              this.initData();
            }
          }
          break;
        case 'linkageReload':
          this.isLoading = true;
          this.initData()
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
$scale: var(--i-schedule-scale);

.i-time-axis-outer {
  margin: calc(8px * #{ $scale });
  padding: calc(16px * #{ $scale });
  background-color: #fff;
  box-shadow: 0 calc(2px * #{ $scale }) calc(12px * #{ $scale }) 0 rgba(0, 0, 0, 0.07);
  border-radius: calc(6px * #{ $scale });

  .i-time-axis-item {
    display: flex;

    .item-label {
      width: 14%;
      text-align: right;
      display: flex;
      align-items: center;
      padding-right: calc(6px * #{ $scale });
      font-size: calc(12px * #{ $scale });
      color: rgb(153, 153, 153);

      span {
        width: 100%;
      }
    }

    .item-style {
      display: flex;
      flex-direction: column;
      align-items: center;

      .item-style-line {
        flex: 1;
        border-left: 1px solid rgb(229, 229, 229);
      }
      .item-style-circle {
        width: calc(12px * #{ $scale });
        height: calc(12px * #{ $scale });
        border: 1px solid rgb(214, 27, 22);
        // border: 1px solid rgb(231,231,231);
        border-radius: 50%;
        margin: calc(4px * #{ $scale }) 0;
        display: flex;
        justify-content: center;
        align-items: center;

        .circle-inner {
          width: calc(6px * #{ $scale });
          height: calc(6px * #{ $scale });
          background-color: rgb(214, 27, 22);
          border-radius: 50%;
        }
      }
    }

    .item-desc {
      background-color: rgb(248, 248, 248);
      margin: calc(6px * #{ $scale }) calc(16px * #{ $scale });
      padding: calc(10px * #{ $scale });
      border-radius: calc(4px * #{ $scale });
      flex: 1;
      display: flex;

      .item-desc-left {
        display: flex;
        flex-direction: column;
        
        flex: 1;

        .left-title {
          color: #000;
          font-size: calc(14px * #{ $scale });
          margin-bottom: calc(8px * #{ $scale });
        }

        .left-time {
          color: rgb(153, 153, 153);
          font-size: calc(12px * #{ $scale });
        }
      }

      .item-desc-right {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        color: rgb(214, 27, 22);
        font-size: 13px;
        margin-left: 24px;

        .right-icon {
          font-size: calc(24px * #{ $scale });
          max-height: calc(24px * #{ $scale });
          margin-bottom: calc(2px * #{ $scale });

          .svg-icon {
            vertical-align: baseline;
          }
        }
      }
    }

    &.active {
      .item-label {
        font-size: calc(14px * #{ $scale });
        color: #000;
      }

      .item-style-circle {
        background-color: rgb(214, 27, 22);

        &.hollow {
          background-color: transparent !important;
          .circle-inner {
            display: none;
          }
        }
      }
    }

    &:first-child {
      .item-style-line:first-child {
        opacity: 0;
      }
    }

    &:last-child {
      .item-style-line:last-child {
        opacity: 0;
      }
    }

    &.top {
      .item-label {
        align-items: flex-start;
      }
      
      .item-style-line:first-child {
        display: none;
      }

      .item-desc {
        margin-top: 0;
        margin-bottom: calc(12px * #{ $scale });
      }
    }

    &.bottom {
      .item-label {
        align-items: flex-end;
      }
      
      .item-style-line:last-child {
        display: none;
      }

      .item-desc {
        margin-top: calc(12px * #{ $scale });
        margin-bottom: 0;
      }
    }
  }
}
</style>
