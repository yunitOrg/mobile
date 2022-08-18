<template>
  <div idm-ctrl="idm_module"
       :id="moduleObject.id"
       :idm-ctrl-id="moduleObject.id"
       class="IStudy-Card">
    <div class="container">
      <div class="study-card">
        <div class="study-card-header">
          <div class="left-text">学习精选</div>
          <div class="right">
            <div class="right-text">
              更多
            </div>
            <a-space class="icon">
              <svg-icon icon-class="rightCircleOutLined"/>
            </a-space>
          </div>
        </div>
        <div class="video-list">
          <div class="video-card" v-for="item in mockData" :key="item.index">
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
      mockData: [
        {
          index: 1,
          image: "url",
          amountOfPlay: 1200,
          releaseDate: "2022-8-7",
          videoIntroduction: "我们一起参加党课开讲拉，当时我来讲直播课程"
        },
        {
          index: 2,
          image: "url",
          amountOfPlay: 1200,
          releaseDate: "2022-8-7",
          videoIntroduction: "123456789"
        },
        {
          index: 3,
          image: "url",
          amountOfPlay: 1200,
          releaseDate: "2022-8-7",
          videoIntroduction: "123456789"
        },
        {
          index: 4,
          image: "url",
          amountOfPlay: 1200,
          releaseDate: "2022-8-7",
          videoIntroduction: "123456789"
        }
      ]
    }
  },
  computed:{
    loadingSize() {
      return this.getScale() * (this.propData.loadingSize || 24);
    },
  },
  created() {
    this.moduleObject = this.$root.moduleObject
    this.convertAttrToStyleObject();
  },
  methods: {
    /**
     * 提供父级组件调用的刷新prop数据组件
     */
    propDataWatchHandle(propData) {
      this.propData = propData.compositeAttr || {};
      this.convertAttrToStyleObject();
    },
    /**
     * 重新加载
     */
    reload() {
      //请求数据源
      this.initData();
    },
    initData() {
      let that = this;
      console.log("接口url是",this.propData.dataSource)
      this.propData.dataSource && window.IDM.http.get(this.propData.dataSource)
          .then((res) => {
            //res.data
            console.log(res)
            // that.mockData = res.data;
          })
          .catch(function (error) {

          });
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
            case "VideoWidth":
              styleVideo["width"] = element;
              break;
            case "VideoHeight":
              styleVideo["height"] = element;
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
            case "videoDataFont":
              videoDataText["font-family"] = element.fontFamily;
              if (element.fontColors.hex8) {
                videoDataText["color"] = element.fontColors.hex8;
              }
              videoDataText["font-weight"] = element.fontWeight && element.fontWeight.split(" ")[0];
              videoDataText["font-style"] = element.fontStyle;
              videoDataText["font-size"] = element.fontSize + element.fontSizeUnit;
              videoDataText["line-height"] = element.fontLineHeight + (element.fontLineHeightUnit == "-" ? "" : element.fontLineHeightUnit);
              videoDataText["text-align"] = element.fontTextAlign;
              videoDataText["text-decoration"] = element.fontDecoration;
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
            case "videoBox":
              if (element.marginTopVal) {
                styleVideo["margin-top"] = `${element.marginTopVal}`;
              }
              if (element.marginRightVal) {
                styleVideo["margin-right"] = `${element.marginRightVal}`;
              }
              if (element.marginBottomVal) {
                styleVideo["margin-bottom"] = `${element.marginBottomVal}`;
              }
              if (element.marginLeftVal) {
                styleVideo["margin-left"] = `${element.marginLeftVal}`;
              }
              if (element.paddingTopVal) {
                styleVideo["padding-top"] = `${element.paddingTopVal}`;
              }
              if (element.paddingRightVal) {
                styleVideo["padding-right"] = `${element.paddingRightVal}`;
              }
              if (element.paddingBottomVal) {
                styleVideo["padding-bottom"] = `${element.paddingBottomVal}`;
              }
              if (element.paddingLeftVal) {
                styleVideo["padding-left"] = `${element.paddingLeftVal}`;
              }
              break;
            case "videoBorder":
              if (element.border.top.width > 0) {
                styleVideo["border-top-width"] = element.border.top.width + element.border.top.widthUnit;
                styleVideo["border-top-style"] = element.border.top.style;
                if (element.border.top.colors.hex8) {
                  styleVideo["border-top-color"] = element.border.top.colors.hex8;
                }
              }
              if (element.border.right.width > 0) {
                styleVideo["border-right-width"] = element.border.right.width + element.border.right.widthUnit;
                styleVideo["border-right-style"] = element.border.right.style;
                if (element.border.right.colors.hex8) {
                  styleVideo["border-right-color"] = element.border.right.colors.hex8;
                }
              }
              if (element.border.bottom.width > 0) {
                styleVideo["border-bottom-width"] = element.border.bottom.width + element.border.bottom.widthUnit;
                styleVideo["border-bottom-style"] = element.border.bottom.style;
                if (element.border.bottom.colors.hex8) {
                  styleVideo["border-bottom-color"] = element.border.bottom.colors.hex8;
                }
              }
              if (element.border.left.width > 0) {
                styleVideo["border-left-width"] = element.border.left.width + element.border.left.widthUnit;
                styleVideo["border-left-style"] = element.border.left.style;
                if (element.border.left.colors.hex8) {
                  styleVideo["border-left-color"] = element.border.left.colors.hex8;
                }
              }
              styleVideo["border-top-left-radius"] = element.radius.leftTop.radius + element.radius.leftTop.radiusUnit;
              styleVideo["border-top-right-radius"] = element.radius.rightTop.radius + element.radius.rightTop.radiusUnit;
              styleVideo["border-bottom-left-radius"] = element.radius.leftBottom.radius + element.radius.leftBottom.radiusUnit;
              styleVideo["border-bottom-right-radius"] = element.radius.rightBottom.radius + element.radius.rightBottom.radiusUnit;
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
  }
}
</script>

<style scoped lang="scss">
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;

  .study-card {
    border: 1px solid rgba(243, 243, 243, 1);
    height: auto;
    width: 90%;
    background-color: #ffffff;
    box-shadow: 0 0 5px #8d8d8d;
    border-radius: 0.5rem;
    margin: 1rem 0;

    &-header {
      margin: 0.4rem 0.5rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      align-content: center;

      .left-text {
        color: rgb(50, 50, 50);
        border-left: 0.5rem #c90000 solid;
        padding-left: 0.5rem;
        font-size: 1.5rem;
        line-height: 1.5rem;
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
          padding-right: 0.3rem;
          font-size: 1.2rem;
          font-weight: 500;
        }

        .icon {
          display: flex;
          justify-content: center;
          align-items: center;

          svg {
            width: 1.5rem;
            height: 1.5rem;
          }
        }
      }
    }

    .video-list {
      display: flex;
      padding: 0 0.5rem;
      align-items: center;
      flex-wrap: wrap;
      align-content: space-around;
      justify-content: space-between;
      flex-direction: row;
      height: 90%;

      .video-card {
        position: relative;
        width: 48%;;
        height: auto;
        margin: 0.5rem 0;
        border: 1px solid rgba(200, 200, 200, 1);
        border-radius: 0.5rem;
        overflow: hidden;

        .videoImg {
          width: auto;
          height: 6rem;
          display: flex;
          flex-direction: column-reverse;
          align-items: center;
          img{
            width: auto;
            height: 6rem;
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
          padding: 0.1rem 0.5rem;
          align-items: center;
          font-size: 0.8rem;
          line-height: 0.8rem;
          font-weight: 600;

          .left-data {
            width: 50%;
            height: 100%;
            display: flex;
            align-items: center;

            svg {
              width: 2rem;
              height: 2rem;
              padding-right: 0.1rem;
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
          height: 2.5rem;
          margin: 0.5rem 0.5rem;
          font-size: 0.9rem;
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