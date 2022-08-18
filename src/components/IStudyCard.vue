<template>
  <div idm-ctrl="idm_module"
       :id="moduleObject.id"
       :idm-ctrl-id="moduleObject.id"
       class="IStudy-Card">
    <div class="container">
      <div class="study-card">
        <div class="study-card-header">
          <div class="left-text">{{ propData.headText }}</div>
          <div class="right" @click="showMoreData">
            <div class="right-text">
              更多
            </div>
            <a-space class="icon">
              <svg-icon icon-class="rightCircleOutLined"/>
            </a-space>
          </div>
        </div>
        <div class="video-list">
          <div class="video-card" v-for="item in videoData" :key="item.index" @click=toVideo(item)>
            <div class="videoImg">
              <img :src="item.image">
              <div class="videoData">
                <div class="left-data">
                  <svg-icon icon-class="youtube" color="white"/>
                  <p class="video-data-text">{{ item.amountOfPlay }}</p>
                </div>
                <p class="video-data-text"> {{ item.releaseDate }}</p></div>
            </div>
            <p class="videoDetail">{{ item.videoIntroduction }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "IStudyCard",
  data() {
    return {
      moduleObject: {},
      propData: this.$root.propData.compositeAttr || {
        fontContent: "Hello Word"
      },
      videoData: [
        {
          index: 1,
          image: "url",
          amountOfPlay: 1200,
          releaseDate: "2022-8-7",
          videoIntroduction: "我们一起参加党课开讲拉，当时我来讲直播课程",
          videoUrl:"#"
        },
        {
          index: 2,
          image: "url",
          amountOfPlay: 1200,
          releaseDate: "2022-8-7",
          videoIntroduction: "123456789",
          videoUrl:"#"
        },
        {
          index: 3,
          image: "url",
          amountOfPlay: 1200,
          releaseDate: "2022-8-7",
          videoIntroduction: "123456789",
          videoUrl:"#"
        },
        {
          index: 4,
          image: "url",
          amountOfPlay: 1200,
          releaseDate: "2022-8-7",
          videoIntroduction: "123456789",
          videoUrl:"#"
        }
      ]
    }
  },
  computed: {},
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
    },
    initData() {
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
          this.videoData = this.propData.dataFiled
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
      let styleHeaderLeft = {};
      let styleHeaderRight = {};
      let styleVideo = {};
      let videoDataText = {};
      let videoDetailText = {};

      const scale = this.getScale(pageSize.width);
      styleObject['--i-schedule-scale'] = scale;
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
            case "headerLeftFont":
              styleHeaderLeft["font-family"] = element.fontFamily;
              if (element.fontColors.hex8) {
                styleHeaderLeft["color"] = element.fontColors.hex8;
              }
              styleHeaderLeft["font-weight"] = element.fontWeight && element.fontWeight.split(" ")[0];
              styleHeaderLeft["font-style"] = element.fontStyle;
              styleHeaderLeft["font-size"] = element.fontSize + element.fontSizeUnit;
              styleHeaderLeft["line-height"] = element.fontLineHeight + (element.fontLineHeightUnit == "-" ? "" : element.fontLineHeightUnit);
              styleHeaderLeft["text-align"] = element.fontTextAlign;
              styleHeaderLeft["text-decoration"] = element.fontDecoration;
              break;
            case "headerRightFont":
              styleHeaderRight["font-family"] = element.fontFamily;
              if (element.fontColors.hex8) {
                styleHeaderRight["color"] = element.fontColors.hex8;
              }
              styleHeaderRight["font-weight"] = element.fontWeight && element.fontWeight.split(" ")[0];
              styleHeaderRight["font-style"] = element.fontStyle;
              styleHeaderRight["font-size"] = element.fontSize + element.fontSizeUnit;
              styleHeaderRight["line-height"] = element.fontLineHeight + (element.fontLineHeightUnit == "-" ? "" : element.fontLineHeightUnit);
              styleHeaderRight["text-align"] = element.fontTextAlign;
              styleHeaderRight["text-decoration"] = element.fontDecoration;
              break;
            case "videoBottomFont":
              videoDetailText["font-family"] = element.fontFamily;
              if (element.fontColors.hex8) {
                videoDetailText["color"] = element.fontColors.hex8;
              }
              videoDetailText["font-weight"] = element.fontWeight && element.fontWeight.split(" ")[0];
              videoDetailText["font-style"] = element.fontStyle;
              videoDetailText["font-size"] = element.fontSize + element.fontSizeUnit;
              videoDetailText["line-height"] = element.fontLineHeight + (element.fontLineHeightUnit == "-" ? "" : element.fontLineHeightUnit);
              videoDetailText["text-align"] = element.fontTextAlign;
              videoDetailText["text-decoration"] = element.fontDecoration;

              break;
          }
        }
      }
      window.IDM.setStyleToPageHead(
          this.moduleObject.id + ' .study-card',
          styleObject);
      window.IDM.setStyleToPageHead(
          this.moduleObject.id + ' .left-text',
          styleHeaderLeft);
      window.IDM.setStyleToPageHead(
          this.moduleObject.id + ' .right-text',
          styleHeaderRight);
      window.IDM.setStyleToPageHead(
          this.moduleObject.id + ' .video-card',
          styleVideo);
      window.IDM.setStyleToPageHead(
          this.moduleObject.id + ' .video-data-text',
          videoDataText);
      window.IDM.setStyleToPageHead(
          this.moduleObject.id + ' .videoDetail',
          videoDetailText);
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
            " .left-text",
            {
              "border-color": item.mainColor ? IDM.hex8ToRgbaString(item.mainColor.hex8) : "",
            }
        );

        IDM.setStyleToPageHead(
            "." +
            themeNamePrefix +
            item.key +
            " #" +
            (this.moduleObject.packageid || "module_demo") +
            " .right",
            {
              "color": item.mainColor ? IDM.hex8ToRgbaString(item.mainColor.hex8) : "",
            }
        );
      }
    },

    //点击更多的回调函数
    showMoreData() {
      console.log(this.propData.showMoreUrl)
      if(this.propData.showMoreUrl !== ''){
        IDM.router.push(this.moduleObject.routerId, this.propData.showMoreUrl, {
          keep: true
        });
      }
    },

    //点击视频卡片后跳转函数
    toVideo(video){
      if(video.videoUrl !== ''){
        IDM.router.push(this.moduleObject.routerId, video.videoUrl, {
          keep: true
        });
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
  }
}
</script>

<style scoped lang="scss">
$scale: var(--i-schedule-scale);

.container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;

  .study-card {
    border: calc(1px * #{ $scale }) solid rgba(243, 243, 243, 1);
    height: auto;
    width: 90%;
    background-color: #ffffff;
    border-radius: calc(10px * #{ $scale });
    margin: calc(16px * #{ $scale }) 0;

    &-header {
      margin: calc(7px * #{ $scale }) calc(8px * #{ $scale });
      display: flex;
      justify-content: space-between;
      align-items: center;
      align-content: center;

      .left-text {
        color: rgb(50, 50, 50);
        border-left: calc(8px * #{ $scale }) #c90000 solid;
        padding-left: calc(8px * #{ $scale });
        font-size: calc(24px * #{ $scale });
        line-height: calc(24px * #{ $scale });
        font-weight: 700;
      }

      .right {
        display: flex;
        justify-content: center;
        flex-wrap: nowrap;
        flex-direction: row;
        align-items: center;
        color: rgb(205, 6, 3);

        .right-text {
          padding-right: calc(5px * #{ $scale });
          font-size: calc(19px * #{ $scale });
          font-weight: 500;
        }

        .icon {
          display: flex;
          justify-content: center;
          align-items: center;

          svg {
            width: calc(24px * #{ $scale });
            height: calc(24px * #{ $scale });
          }
        }
      }
    }

    .video-list {
      display: flex;
      padding: 0 calc(8px * #{ $scale });
      align-items: center;
      flex-wrap: wrap;
      align-content: space-around;
      justify-content: space-between;
      flex-direction: row;
      height: 100%;

      .video-card {
        position: relative;
        width: 48%;;
        height: auto;
        margin: calc(8px * #{ $scale }) 0;
        border: calc(1px * #{ $scale }) solid rgba(200, 200, 200, 1);
        border-radius: calc(8px * #{ $scale });
        overflow: hidden;

        .videoImg {
          width: auto;
          height: calc(96px * #{ $scale });
          display: flex;
          flex-direction: column-reverse;
          align-items: center;

          img {
            width: auto;
            height: calc(96px * #{ $scale });
            position: absolute;
            background-size: 100% 100%;
            background-repeat: no-repeat;
          }
        }

        .videoData {
          width: 100%;
          height: auto;
          display: flex;
          justify-content: space-between;
          padding: calc(2px * #{ $scale }) calc(8px * #{ $scale });
          align-items: center;
          font-size: calc(12px * #{ $scale });
          line-height: calc(12px * #{ $scale });
          font-weight: 600;

          .left-data {
            width: 50%;
            height: 100%;
            display: flex;
            align-items: center;

            svg {
              width: calc(32px * #{ $scale });
              height: calc(32px * #{ $scale });
              padding-right: calc(2px * #{ $scale });
            }
          }

          p {
            display: inline;
            color: #ffffff;
          }
        }

        p {
          margin: 0;
          padding: 0;
        }

        .videoDetail {
          width: auto;
          height: calc(40px * #{ $scale });
          margin: calc(8px * #{ $scale }) calc(8px * #{ $scale });
          font-size: calc(14px * #{ $scale });
          color: rgb(50, 50, 50);
          font-weight: 600;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          overflow: hidden;
        }
      }
    }
  }
}
</style>