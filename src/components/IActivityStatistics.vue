<template>
  <div idm-ctrl="idm_module"
       :id="moduleObject.id"
       :idm-ctrl-id="moduleObject.id"
       class="IActivity-Statistics">
    <div class="container">
      <div class="container-card">
        <van-loading v-if="isLoading" size="24px" vertical>加载中...</van-loading>
        <template v-else>
          <div class="list">
            <div class="list-item" v-for="(acitivity,index) in activityList"
                 :key="index"
            >
              <div class="activity-icon">
                <img :src="acitivity.icon">
              </div>
              <div class="center-text">
                <div class="activity-name">
                  {{ acitivity.name }}
                </div>
                <div class="activity-personNum">
                  累计{{ acitivity.personNum }}人次
                </div>
              </div>
              <div class="right-text">
                <div class="activity-convene">
                  召开{{ acitivity.convene }}次
                </div>
                <div class="activity-attendance">
                  平均出席率{{ acitivity.attendance }}
                </div>
              </div>
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "IActivityStatistics",
  data() {
    return {
      moduleObject: {},
      isLoading: true,
      activityList: [
        {
          icon: "",
          name: "党员大会",
          convene: 15,
          personNum: 33,
          attendance: "25%",
        },
        {
          icon: "",
          name: "支委会",
          convene: 15,
          personNum: 33,
          attendance: "25%",
        },
        {
          icon: "",
          name: "党小组会",
          convene: 15,
          personNum: 33,
          attendance: "25%",
        },
        {
          icon: "",
          name: "党课",
          convene: 15,
          personNum: 33,
          attendance: "25%",
        },
        {
          icon: "",
          name: "主题党日",
          convene: 15,
          personNum: 33,
          attendance: "25%",
        },
      ],
      propData: this.$root.propData.compositeAttr || {
        isShowLine: false,
        themeList: [
          {
            "key": "blue",
            "mainColor": {
              "hex": "#0073CA",
              "hex8": "#0073CAFF"
            }
          },
        ]
      },
    }
  },
  created() {
    this.moduleObject = this.$root.moduleObject
    this.convertAttrToStyleObject();
    this.convertThemeListAttrToStyleObject();
  },
  methods: {
    /**
     * 适配页面
     */
    getScale(pageWidth) {
      const base = this.propData.baseValue || 414
      const ratio = this.propData.adaptationRatio || 1.2
      const width = this.moduleObject.env === "production" ? window.innerWidth : pageWidth || 414
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
     * 重新加载
     */
    reload() {
      //请求数据源
      this.initData();

      let styleObject = {};
      const imgScale = this.getImgScale()
      styleObject['--i-activitystatistics-imgScale'] = imgScale;
      window.IDM.setStyleToPageHead(
          this.moduleObject.id + ' .study-card',
          styleObject);
    },

    /**
     * 加载动态数据
     */
    initData() {
      if (!this.moduleObject.env || this.moduleObject.env == "develop") {
        // mock数据
        setTimeout(() => {
          this.activityList = [];
          const res = {
            data: [
              {
                icon: "",
                name: "党员大会",
                convene: 15,
                personNum: 33,
                attendance: "25%",
              },
              {
                icon: "",
                name: "支委会",
                convene: 15,
                personNum: 33,
                attendance: "25%",
              },
              {
                icon: "",
                name: "党小组会",
                convene: 15,
                personNum: 33,
                attendance: "25%",
              },
              {
                icon: "",
                name: "党课",
                convene: 15,
                personNum: 33,
                attendance: "25%",
              },
              {
                icon: "",
                name: "主题党日",
                convene: 15,
                personNum: 33,
                attendance: "25%",
              },
            ]
          };
          this.activityList = res.data
          this.isLoading = false;
        }, 1000)

        return;
      }
      this.getDataSourceData()
      let dataSource = this.propData.dataSource;
      if (!dataSource) {
        this.isLoading = false;
        return;
      }
      let url = `ctrl/dataSource/getDatas`;
      IDM.http.post(url, {
            id: dataSource.value,
          }, {
            headers: {
              "Content-Type": "application/json;charset=UTF-8",
            },
          }
      ).done((res) => {
        console.log(res, "接口数据");
        if (res.code === "200") {
          this.activityList = this.propData.dataFiled
              ? this.getExpressData("dataName", this.propData.dataFiled, res)
              : res;
        } else {
          console.log(url + "请求失败");
        }
      }).error((response) => {
        console.log(url + "请求失败");
      }).always((res) => {
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
        var dataObject = {IDM: window.IDM};
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
        } catch (error) {
        }
        _defaultVal = resValue;
      }

      return _defaultVal;
    },
    /**
     * 把属性转换成样式对象
     */
    convertAttrToStyleObject(pageSize = {}) {
      let styleObject = {};
      let styleListItem = {};
      let styleActivityName = {};
      let styleActivityConvene = {};
      let styleBottom = {};

      const scale = this.getScale(pageSize.width);
      styleObject['--i-activitystatistics-scale'] = scale;
      for (const key in this.propData) {
        if (this.propData.hasOwnProperty.call(this.propData, key)) {
          const element = this.propData[key];
          if (!element && element !== false && element !== 0) {
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
            case "isShowLine":
              if (this.propData.isShowLine) {
                styleListItem["border-bottom"] = "calc(1px * #{ $scale }) solid #E5E5E5"
                window.IDM.setStyleToPageHead(
                    this.moduleObject.id + ' .list-item',
                    styleListItem);
                styleListItem["border-bottom"] = "none"
                window.IDM.setStyleToPageHead(
                    this.moduleObject.id + ' .list-item:last-child',
                    styleListItem);
              } else {
                styleListItem["border-bottom"] = "none"
                window.IDM.setStyleToPageHead(
                    this.moduleObject.id + ' .list-item',
                    styleListItem);
              }
              break;
            case "bgImgUrl":
              styleObject[
                  "background-image"
                  ] = `url(${window.IDM.url.getWebPath(element)})`;
              break;
            case "bgRepeat":
              //平铺模式
              styleObject["background-repeat"] = element;
              break;
            case "bgAttachment":
              //背景模式
              styleObject["background-attachment"] = element;
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
            case "border":
              if (element.border.top.width > 0) {
                styleObject["border-top-width"] = element.border.top.width + element.border.top.widthUnit;
                styleObject["border-top-style"] = element.border.top.style;
                if (element.border.top.colors.hex8) {
                  styleObject["border-top-color"] = element.border.top.colors.hex8;
                }
              }
              if (element.border.right.width > 0) {
                styleObject["border-right-width"] = element.border.right.width + element.border.right.widthUnit;
                styleObject["border-right-style"] = element.border.right.style;
                if (element.border.right.colors.hex8) {
                  styleObject["border-right-color"] = element.border.right.colors.hex8;
                }
              }
              if (element.border.bottom.width > 0) {
                styleObject["border-bottom-width"] = element.border.bottom.width + element.border.bottom.widthUnit;
                styleObject["border-bottom-style"] = element.border.bottom.style;
                if (element.border.bottom.colors.hex8) {
                  styleObject["border-bottom-color"] = element.border.bottom.colors.hex8;
                }
              }
              if (element.border.left.width > 0) {
                styleObject["border-left-width"] = element.border.left.width + element.border.left.widthUnit;
                styleObject["border-left-style"] = element.border.left.style;
                if (element.border.left.colors.hex8) {
                  styleObject["border-left-color"] = element.border.left.colors.hex8;
                }
              }
              styleObject["border-top-left-radius"] = element.radius.leftTop.radius + element.radius.leftTop.radiusUnit;
              styleObject["border-top-right-radius"] = element.radius.rightTop.radius + element.radius.rightTop.radiusUnit;
              styleObject["border-bottom-left-radius"] = element.radius.leftBottom.radius + element.radius.leftBottom.radiusUnit;
              styleObject["border-bottom-right-radius"] = element.radius.rightBottom.radius + element.radius.rightBottom.radiusUnit;
              break;
            case "boxShadow":
              styleObject["box-shadow"] = element;
              break;
            case "activityNameFont":
              styleActivityName["font-family"] = element.fontFamily;
              if (element.fontColors.hex8) {
                styleActivityName["color"] = element.fontColors.hex8;
              }
              styleActivityName["font-weight"] = element.fontWeight && element.fontWeight.split(" ")[0];
              styleActivityName["font-style"] = element.fontStyle;
              styleActivityName["font-size"] = element.fontSize + element.fontSizeUnit;
              styleActivityName["line-height"] = element.fontLineHeight + (element.fontLineHeightUnit == "-" ? "" : element.fontLineHeightUnit);
              styleActivityName["text-align"] = element.fontTextAlign;
              styleActivityName["text-decoration"] = element.fontDecoration;
              break;
            case "activityConveneFont":
              styleActivityConvene["font-family"] = element.fontFamily;
              if (element.fontColors.hex8) {
                styleActivityConvene["color"] = element.fontColors.hex8;
              }
              styleActivityConvene["font-weight"] = element.fontWeight && element.fontWeight.split(" ")[0];
              styleActivityConvene["font-style"] = element.fontStyle;
              styleActivityConvene["font-size"] = element.fontSize + element.fontSizeUnit;
              styleActivityConvene["line-height"] = element.fontLineHeight + (element.fontLineHeightUnit == "-" ? "" : element.fontLineHeightUnit);
              styleActivityConvene["text-align"] = element.fontTextAlign;
              styleActivityConvene["text-decoration"] = element.fontDecoration;
              break;
            case "bottomFont":
              styleBottom["font-family"] = element.fontFamily;
              if (element.fontColors.hex8) {
                styleBottom["color"] = element.fontColors.hex8;
              }
              styleBottom["font-weight"] = element.fontWeight && element.fontWeight.split(" ")[0];
              styleBottom["font-style"] = element.fontStyle;
              styleBottom["font-size"] = element.fontSize + element.fontSizeUnit;
              styleBottom["line-height"] = element.fontLineHeight + (element.fontLineHeightUnit == "-" ? "" : element.fontLineHeightUnit);
              styleBottom["text-align"] = element.fontTextAlign;
              styleBottom["text-decoration"] = element.fontDecoration;
              break;
          }
        }
      }
      window.IDM.setStyleToPageHead(
          this.moduleObject.id + ' .container-card',
          styleObject);
      window.IDM.setStyleToPageHead(
          this.moduleObject.id + ' .activity-name',
          styleActivityName);
      window.IDM.setStyleToPageHead(
          this.moduleObject.id + ' .activity-convene',
          styleActivityConvene);
      window.IDM.setStyleToPageHead(
          this.moduleObject.id + ' .activity-personNum,.activity-attendance',
          styleBottom);
      this.initData()
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
            " .activity-convene",
            {
              "color": item.mainColor ? IDM.hex8ToRgbaString(item.mainColor.hex8) : "",
            }
        );
      }
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
      switch (messageObject.type) {
        case 'websocket':
          if (this.propData.messageRefreshKey && messageObject.message) {
            const messageData = typeof messageObject.message === 'string' && JSON.parse(messageObject.message) || messageObject.message
            const arr = Array.isArray(this.propData.messageRefreshKey) ? this.propData.messageRefreshKey : [this.propData.messageRefreshKey]
            if (messageData.badgeType && arr.includes(messageData.badgeType)) {
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
  }
}
</script>

<style scoped lang="scss">
//$scale: var(--i-activitystatistics-scale);
$scale: 1;

.container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: auto;

  &-card {
    width: calc(383px * #{ $scale });
    height: auto;
    border: calc(1px * #{ $scale }) solid rgba(243, 243, 243, 1);
    background-color: #ffffff;
    border-radius: calc(6px * #{ $scale });
    margin: calc(16px * #{ $scale }) calc(10px * #{ $scale });
    padding: 0 calc(12px * #{ $scale });

    .list {
      .list-item {
        display: flex;
        flex-direction: row;
        align-items: center;
        padding-top: calc(17px * #{ $scale });
        padding-bottom: calc(20px * #{ $scale });
        border-bottom: calc(1px * #{ $scale }) solid #E5E5E5;

        .activity-icon {
          padding-right: calc(17px * #{ $scale });

          svg {
            width: calc(44px * #{ $scale });
            height: calc(44px * #{ $scale });
          }

          img {
            width: calc(44px * #{ $scale });
            height: calc(44px * #{ $scale });
          }
        }

        .center-text {
          width: calc(100px * #{ $scale });
          margin-right: calc(85px * #{ $scale });

          .activity-name {
            font-family: PingFangSC-Regular, serif;
            font-size: calc(17px * #{ $scale });
            line-height: calc(17px * #{ $scale });
            color: #333333;
            font-weight: 400;
            margin-bottom: calc(6px * #{ $scale });
          }

          .activity-personNum {
            font-family: PingFangSC-Regular, serif;
            font-size: calc(13px * #{ $scale });
            color: #666666;
            font-weight: 400;
          }
        }

        .right-text {
          width: calc(100px * #{ $scale });
          display: flex;
          flex-direction: column;
          align-items: flex-end;

          .activity-convene {
            margin-bottom: calc(6px * #{ $scale });
            font-family: PingFangSC-Regular, serif;
            font-size: calc(13px * #{ $scale });
            line-height: calc(17px * #{ $scale });
            color: #E02020;
            text-align: right;
            font-weight: 400;
          }

          .activity-attendance {
            font-family: PingFangSC-Regular, serif;
            font-size: calc(13px * #{ $scale });
            color: #666666;
            font-weight: 400;
          }
        }
      }

      .list-item:last-child {
        border-bottom: none;
      }
    }
  }
}

</style>