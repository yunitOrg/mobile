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
    <div class="idm-iranking">
      <div class="irank-img" :style="`width:${propData.imgWidth};height:${propData.imgHeight}`" v-if="propData.showImg">
        <img :src="propData.topImgUrl || topimgUrl" alt="">
      </div>
      <div class="irank-ul">
        <div class="irank-self" v-if="propData.selfShow">
          <div class="irank-index">
          {{currentObj.index}}
          </div>
          <div class="irank-center">
            <div class="irank-icon">
              <img :src="currentObj[propData.ImgInterface] || currentObj.headImg" alt="">
            </div>
            <div class="irank-desc">
              <div class="irank-title">{{currentObj[propData.titleInterface] || currentObj.title}}</div>
              <div class="irank-tip">{{currentObj[propData.descInterface] || currentObj.desc}}</div>
            </div>
          </div>
          <div class="irank-right">{{currentObj[propData.moneyInterface] || currentObj.money}}</div>
        </div>
        <div class="irank-content">
          <li v-for="(item, index) in pageDataList.length > 0 ? pageDataList : list" :key="index">
            <div class="irank-index">
              <img :src="rankObj.rank1" alt="" v-if="index===0">
              <img :src="rankObj.rank2" alt="" v-else-if="index===1">
              <img :src="rankObj.rank3" alt="" v-else-if="index===2">
              <template v-else>{{index+1}}</template>
            </div>
            <div class="irank-center">
              <div class="irank-icon">
                <img :src="item[propData.ImgInterface] || item.headImg" alt="">
              </div>
              <div class="irank-desc">
                <div class="irank-title">{{item[propData.titleInterface] || item.title}}</div>
                <div class="irank-tip">{{item[propData.descInterface] || item.desc}}</div>
              </div>
            </div>
            <div class="irank-right">{{item[propData.moneyInterface] || item.money}}</div>
          </li>
        </div>
      </div>
    </div>
    <div class="idm-message-list-parent-box-mask" v-if="moduleObject.env === 'develop' && !propData.dataSource">
      <span>！未绑定数据源</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'IRanking',
  data () {
    return {
      topimgUrl: 'http://116.236.111.158:8086/DreamWeb/resource/img/body-bg-shanghai.png',
      rankObj: {
        rank1: IDM.url.getModuleAssetsWebPath(require("../assets/rank1.png"), this.moduleObject),
        rank2: IDM.url.getModuleAssetsWebPath(require("../assets/rank2.png"), this.moduleObject),
        rank3: IDM.url.getModuleAssetsWebPath(require("../assets/rank3.png"), this.moduleObject)
      },
      currentObj: {
        index: 1,
        headImg: 'http://116.236.111.158:8086/DreamWeb/resource/img/body-bg-shanghai.png',
        title: 'The shy',
        desc: '河南省办公厅党支部',
        money: 10000
      },
      pageDataList: [],
      list: [
        {
          headImg: 'http://116.236.111.158:8086/DreamWeb/resource/img/body-bg-shanghai.png',
          title: 'The shy',
          desc: '河南省办公厅党支部',
          money: 10000
        },
        {
          headImg: 'http://116.236.111.158:8086/DreamWeb/resource/img/body-bg-shanghai.png',
          title: 'The shy',
          desc: '河南省办公厅党支部',
          money: 10000
        },
        {
          headImg: 'http://116.236.111.158:8086/DreamWeb/resource/img/body-bg-shanghai.png',
          title: 'The shy',
          desc: '河南省办公厅党支部',
          money: 10000
        },
        {
          headImg: 'http://116.236.111.158:8086/DreamWeb/resource/img/body-bg-shanghai.png',
          title: 'The shy',
          desc: '河南省办公厅党支部',
          money: 10000
        }
      ],
      moduleObject:{},
      propData:this.$root.propData.compositeAttr||{
          showImg: true,
          selfShow: true,
          imgWidth: '100%',
          imgHeight: '200px',
          selfSlice: '10px',
          ulbox: {
            marginTopVal: "-20px",
            marginRightVal: "10px",
            marginBottomVal: "",
            marginLeftVal: "10px",
            paddingTopVal: "",
            paddingRightVal: "",
            paddingBottomVal: "",
            paddingLeftVal: ""
          },
          libox: {
            marginTopVal: "",
            marginRightVal: "20px",
            marginBottomVal: "",
            marginLeftVal: "20px",
            paddingTopVal: "10px",
            paddingRightVal: "",
            paddingBottomVal: "10px",
            paddingLeftVal: ""
          }
      }
    }
  },
  created () {
    this.moduleObject = this.$root.moduleObject
    this.init();
  },
  methods: {
    propDataWatchHandle (propData) {
      this.propData = propData.compositeAttr||{};
      this.init();
    },
    initData () {
      let that = this;
      const customInterfaceUrl = '/ctrl/dataSource/getDatas';
      if (this.moduleObject.env == "production") {
        this.propData.dataSource &&
          IDM.http
            .post(
              customInterfaceUrl,
              {
                id: this.propData.dataSource && this.propData.dataSource.value,
              },
              {
                headers: {
                  "Content-Type": "application/json;charset=UTF-8",
                },
              }
            )
            .done((res) => {
              if (res.type === "success") {
                that.pageDataList = res.data || [];
                that.currentObj = res.data.find(item => item.id === that.propData.selfInterface)
              } else {
                IDM.message.error(res.message);
              }
            });
      }
    },
    init () {
      this.initData();
      this.convertAttrToStyleObject();
      this.convertTitleStyleObject();
      this.convertMoneyStyleObject();
      this.convertDescStyleObject();
      this.converSplitStyleObject();
    },
    convertAttrToStyleObject () {
      console.log(this.propData, '数据源')
      let styleObject = {};
      if (this.propData.ulbox) {
        let ulbox = this.propData.ulbox || {};
        if (ulbox.marginTopVal) {
          styleObject["margin-top"] = `${ulbox.marginTopVal}`;
        }
        if (ulbox.marginRightVal) {
          styleObject["margin-right"] = `${ulbox.marginRightVal}`;
        }
        if (ulbox.marginBottomVal) {
          styleObject["margin-bottom"] = `${ulbox.marginBottomVal}`;
        }
        if (ulbox.marginLeftVal) {
          styleObject["margin-left"] = `${ulbox.marginLeftVal}`;
        }
        if (ulbox.paddingTopVal) {
          styleObject["padding-top"] = `${ulbox.paddingTopVal}`;
        }
        if (ulbox.paddingRightVal) {
          styleObject["padding-right"] = `${ulbox.paddingRightVal}`;
        }
        if (ulbox.paddingBottomVal) {
          styleObject["padding-bottom"] = `${ulbox.paddingBottomVal}`;
        }
        if (ulbox.paddingLeftVal) {
          styleObject["padding-left"] = `${ulbox.paddingLeftVal}`;
        }
      }
      let listyleObject = {}, selfObject = {};
      if (this.propData.libox) {
        let ulbox = this.propData.libox || {};
        if (ulbox.marginTopVal) {
          listyleObject["margin-top"] = `${ulbox.marginTopVal}`;
        }
        if (ulbox.marginRightVal) {
          listyleObject["margin-right"] = `${ulbox.marginRightVal}`;
          selfObject["padding-right"] = `${ulbox.marginRightVal}`;
        }
        if (ulbox.marginBottomVal) {
          listyleObject["margin-bottom"] = `${ulbox.marginBottomVal}`;
        }
        if (ulbox.marginLeftVal) {
          listyleObject["margin-left"] = `${ulbox.marginLeftVal}`;
          selfObject["padding-left"] = `${ulbox.marginLeftVal}`;
        }
        if (ulbox.paddingTopVal) {
          listyleObject["padding-top"] = `${ulbox.paddingTopVal}`;
          selfObject['padding-top'] = `${ulbox.paddingTopVal}`;
        }
        if (ulbox.paddingRightVal) {
          listyleObject["padding-right"] = `${ulbox.paddingRightVal}`;
        }
        if (ulbox.paddingBottomVal) {
          listyleObject["padding-bottom"] = `${ulbox.paddingBottomVal}`;
          selfObject["padding-bottom"] = `${ulbox.paddingBottomVal}`;
        }
        if (ulbox.paddingLeftVal) {
          listyleObject["padding-left"] = `${ulbox.paddingLeftVal}`;
        }
      }
      if (this.propData.selfSlice) {
        selfObject['margin-bottom'] = this.propData.selfSlice
      }
      window.IDM.setStyleToPageHead(this.moduleObject.id + " .irank-content li", listyleObject);
      window.IDM.setStyleToPageHead(this.moduleObject.id + " .irank-self", selfObject);
      window.IDM.setStyleToPageHead(this.moduleObject.id + " .irank-ul", styleObject);
    },
    convertTitleStyleObject () {
      let styleObject = {};
      if (this.propData.itemFontStyle) {
        let item = this.propData.itemFontStyle || {};
        if (item.fontColors) {
          styleObject["color"] = item.fontColors.hex;
        }
        if (item.fontDecoration) {
          styleObject["text-decoration"] = item.fontDecoration;
        }
        if (item.fontFamily) {
          styleObject['font-family'] = item.fontFamily;
        }
        if (item.fontLetterSpacing) {
          styleObject["word-spacing"] = item.fontLetterSpacing + item.fontLetterSpacingUnit;
        }
        if (item.fontLineHeight) {
          styleObject['line-height'] = item.fontLineHeight + (item.fontLineHeightUnit == "-" ? "" : item.fontLineHeightUnit);
        }
        if (item.fontSize) {
          styleObject['font-size'] = item.fontSize + item.fontSizeUnit
        }
        if (item.fontStyle) {
          styleObject['font-style'] = item.fontStyle
        }
        if (item.fontTextAlign) {
          styleObject['text-align'] = item.fontTextAlign
        }
        if (item.fontWeight) {
          styleObject['font-weight'] = item.fontWeight.split(" ")[0]
        }
      }
      window.IDM.setStyleToPageHead(this.moduleObject.id + " .irank-title", styleObject);
    },
    convertMoneyStyleObject () {
      let styleObject = {};
      if (this.propData.moneyFontStyle) {
        let item = this.propData.moneyFontStyle || {};
        if (item.fontColors) {
          styleObject["color"] = item.fontColors.hex;
        }
        if (item.fontDecoration) {
          styleObject["text-decoration"] = item.fontDecoration;
        }
        if (item.fontFamily) {
          styleObject['font-family'] = item.fontFamily;
        }
        if (item.fontLetterSpacing) {
          styleObject["word-spacing"] = item.fontLetterSpacing + item.fontLetterSpacingUnit;
        }
        if (item.fontLineHeight) {
          styleObject['line-height'] = item.fontLineHeight + (item.fontLineHeightUnit == "-" ? "" : item.fontLineHeightUnit);
        }
        if (item.fontSize) {
          styleObject['font-size'] = item.fontSize + item.fontSizeUnit
        }
        if (item.fontStyle) {
          styleObject['font-style'] = item.fontStyle
        }
        if (item.fontTextAlign) {
          styleObject['text-align'] = item.fontTextAlign
        }
        if (item.fontWeight) {
          styleObject['font-weight'] = item.fontWeight.split(" ")[0]
        }
      }
      window.IDM.setStyleToPageHead(this.moduleObject.id + " .irank-right", styleObject);
    },
    convertDescStyleObject () {
      let styleObject = {};
      if (this.propData.descFontStyle) {
        let item = this.propData.descFontStyle || {};
        if (item.fontColors) {
          styleObject["color"] = item.fontColors.hex;
        }
        if (item.fontDecoration) {
          styleObject["text-decoration"] = item.fontDecoration;
        }
        if (item.fontFamily) {
          styleObject['font-family'] = item.fontFamily;
        }
        if (item.fontLetterSpacing) {
          styleObject["word-spacing"] = item.fontLetterSpacing + item.fontLetterSpacingUnit;
        }
        if (item.fontLineHeight) {
          styleObject['line-height'] = item.fontLineHeight + (item.fontLineHeightUnit == "-" ? "" : item.fontLineHeightUnit);
        }
        if (item.fontSize) {
          styleObject['font-size'] = item.fontSize + item.fontSizeUnit
        }
        if (item.fontStyle) {
          styleObject['font-style'] = item.fontStyle
        }
        if (item.fontTextAlign) {
          styleObject['text-align'] = item.fontTextAlign
        }
        if (item.fontWeight) {
          styleObject['font-weight'] = item.fontWeight.split(" ")[0]
        }
      }
      window.IDM.setStyleToPageHead(this.moduleObject.id + " .irank-tip", styleObject);
    },
    converSplitStyleObject () {
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
      window.IDM.setStyleToPageHead(this.moduleObject.id + " .irank-ul li", styleObject);
    }
  }
}
</script>

<style lang="scss" scoped>
.idm-message-list-parent-box-mask {
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
    padding: 6px 20px;
    color: #e6a23c;
    background: #fdf6ec;
    border:1px solid #f5dab1;
    border-radius: 4px;
  }
}
.idm-iranking{
  .irank-img{
    width: 100%;
    height: 200px;
    img{
      width: 100%;
      height: 100%;
    }
  }
  .irank-ul{
    position: relative;
    width: auto;
    // margin: -20px 20px 0;
    // border-radius: 10px;
    // background: #fff;
    // box-shadow: 0px  0px 20px 0px #ccc;
    .irank-li{
      display: flex;
      flex-direction: initial;
      align-items: center;
      box-shadow: 0px  0px 20px 0px #ccc;
      // margin-bottom: 10px;
      border-radius: 10px;
      background: #fff;
    }
    .irank-self{
      // padding: 10px 20px;
      // margin: 0 10px;
      display: flex;
      flex-direction: initial;
      align-items: center;
      box-shadow: 0px  0px 20px 0px #ccc;
      // margin-bottom: 10px;
      border-radius: 10px;
      background: #fff;
    }
    .irank-content{
      border-radius: 10px;
      background: #fff;
      box-shadow: 0px  0px 20px 0px #ccc;
    }
    li{
      // margin: 0 10px;
      padding: 10px 0;
      border-bottom: 1px solid #ccc;
      display: flex;
      flex-direction: initial;
      align-items: center;
    }
    li:last-child{
      border: 0 !important;
    }
    .irank-index{
      width: 10%;
      font-size: 30px;
      font-weight: 600;
      img{
        width: 20px;
        height: 34px;
      }
    }
    .irank-center{
      width: 70%;
      display: flex;
      flex-direction: initial;
      align-items: center;
      overflow: hidden;
      .irank-icon{
        width: 40px;
        height: 40px;
        img{
          border-radius: 50%;
          width: 100%;
          height: 100%;
        }
      }
      .irank-desc{
        padding-left: 10px;
        width: calc(100% - 40px);
        .irank-title{
          font-size: 20px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .irank-tip{
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          font-size: 16px;
        }
      }
    }
    .irank-right{
      width: 20%;
      font-size: 20px;
      color: #f00;
      text-align: right;
    }
  }
}
</style>
