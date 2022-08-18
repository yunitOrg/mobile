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
    <div class="idm-iheadlist">
      <div class="iheadlist-ul">
        <li v-for="(item, index) in list" :key="index">
          <div class="iheadlist-img">
            <img :src="item.img" alt="">
          </div>
          <div class="iheadlist-right">
            <div class="iheadlist-center">
              <div class="iheadlist-line">
                <span class="iheadlist-author">{{item.author}}</span>
                <template v-if="propData.authorshowIcon">
                  <svg
                    v-if="item.man===1"
                    class="idm_svg_author_icon icon_author1"
                    aria-hidden="true"
                  >
                    <use :xlink:href="`#${propData.authorIconmaxClass}`"></use>
                  </svg>
                  <svg
                    v-else
                    class="idm_svg_author_icon icon_author2"
                    aria-hidden="true"
                  >
                    <use :xlink:href="`#${propData.authorIcongirlClass}`"></use>
                  </svg>
                </template>
                <span class="color">{{item.tip1}}</span>
                <span class="color">{{item.tip2}}</span>
                <span class="color1">{{item.type === 1 && '已激活'}}</span>
              </div>
              <span class="iheadlist-desc">{{item.desc}}</span>
            </div>
            <div class="iheadlist-icon" v-if="propData.showIcon" @click="handleClick(item)">
              <svg
                class="idm_svg_author_icon idm_button_svg_icon"
                aria-hidden="true"
              >
                <use :xlink:href="`#${propData.titleIconClass}`"></use>
              </svg>
            </div>
          </div>
        </li>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'IHeadList',
  data () {
    return {
      list: [
        {
          man: 1,
          author: '宋尚朴',
          img: 'http://116.236.111.158:8086/DreamWeb/resource/img/body-bg-shanghai.png',
          desc: '中共上海市测试三支部',
          tip1: '书记',
          tip2: '组织部',
          type: 1
        },
        {
          man: 2,
          author: '宋尚朴',
          img: 'http://116.236.111.158:8086/DreamWeb/resource/img/body-bg-shanghai.png',
          desc: '中共上海市测试三支部',
          tip1: '书记',
          tip2: '组织部',
          type: 1
        }
      ],
      moduleObject:{},
      propData:this.$root.propData.compositeAttr||{
        showIcon: true,
        authorshowIcon: true,
        authorIconmaxClass: 'icon-settingOutline',
        authorIcongirlClass: 'icon-settingOutline',
        titleIconClass: 'icon-settingOutline',
        titleIconFontSize: 20,
        authorIconFontSize: 18,
        bgColor: {
        },
        authorIconmaxColor: {
          hex: '#f00'
        },
        authorIcongirlColor: {
          hex: '#f00'
        },
        box: {
          marginTopVal: "",
          marginRightVal: "10px",
          marginBottomVal: "",
          marginLeftVal: "10px",
          paddingTopVal: "",
          paddingRightVal: "",
          paddingBottomVal: "",
          paddingLeftVal: ""
        },
        lipadding: {
          marginTopVal: "",
          marginRightVal: "",
          marginBottomVal: "",
          marginLeftVal: "",
          paddingTopVal: "20px",
          paddingRightVal: "",
          paddingBottomVal: "20px",
          paddingLeftVal: ""
        },
        liBox: {
          marginTopVal: "",
          marginRightVal: "",
          marginBottomVal: "",
          marginLeftVal: "",
          paddingTopVal: "",
          paddingRightVal: "20px",
          paddingBottomVal: "",
          paddingLeftVal: "20px"
        },
        titleStyle: {
          fontColors: {
              hex: "#000000"
          },
          fontSize: 14,
          fontSizeUnit: "px"
        },
        descStyle: {
          fontColors: {
              hex: "#000000"
          },
          fontSize: 14,
          fontSizeUnit: "px"
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
      this.convertAttrToStyleObject();
      this.converPaddingObject();
      this.converTitleStyleObject();
      this.converDescStyleObject();
    },
    convertAttrToStyleObject () {
      let iconStyle = {}
      if (this.propData.titleIconFontColor) {
        let item = this.propData.titleIconFontColor || {};
        if (item.hex) {
          iconStyle["color"] = item.hex;
          iconStyle["fill"] = item.hex;
        }
      }
      if (this.propData.titleIconFontSize) {
        iconStyle['font-size'] = this.propData.titleIconFontSize + 'px';
        iconStyle['width'] = this.propData.titleIconFontSize + 'px';
        iconStyle['height'] = this.propData.titleIconFontSize + 'px';
      }
      let authoriconStyle = {}, authorColor1 = {}, authorColor2 = {};
      if (this.propData.authorIconmaxColor) {
        let item = this.propData.authorIconmaxColor || {};
        if (item.hex) {
          authorColor1["color"] = item.hex;
          authorColor1["fill"] = item.hex;
        }
      }
      if (this.propData.authorIcongirlColor) {
        let item = this.propData.authorIcongirlColor || {};
        if (item.hex) {
          authorColor2["color"] = item.hex;
          authorColor2["fill"] = item.hex;
        }
      }
      if (this.propData.authorIconFontSize) {
        authoriconStyle['font-size'] = this.propData.authorIconFontSize + 'px';
        authoriconStyle['width'] = this.propData.authorIconFontSize + 'px';
        authoriconStyle['height'] = this.propData.authorIconFontSize + 'px';
      }
      window.IDM.setStyleToPageHead(this.moduleObject.id + " .idm_button_svg_icon", iconStyle);
      window.IDM.setStyleToPageHead(this.moduleObject.id + " .icon_author1, .icon_author2", authoriconStyle);
      window.IDM.setStyleToPageHead(this.moduleObject.id + " .icon_author1", authorColor1);
      window.IDM.setStyleToPageHead(this.moduleObject.id + " .icon_author2", authorColor2);
    },
    converPaddingObject () {
      let styleUlObject = {};
      if (this.propData.box) {
        let item = this.propData.box || {};
        if (item.marginTopVal) {
          styleUlObject["margin-top"] = `${item.marginTopVal}`;
        }
        if (item.marginRightVal) {
          styleUlObject["margin-right"] = `${item.marginRightVal}`;
        }
        if (item.marginBottomVal) {
          styleUlObject["margin-bottom"] = `${item.marginBottomVal}`;
        }
        if (item.marginLeftVal) {
          styleUlObject["margin-left"] = `${item.marginLeftVal}`;
        }
        if (item.paddingTopVal) {
          styleUlObject["padding-top"] = `${item.paddingTopVal}`;
        }
        if (item.paddingRightVal) {
          styleUlObject["padding-right"] = `${item.paddingRightVal}`;
        }
        if (item.paddingBottomVal) {
          styleUlObject["padding-bottom"] = `${item.paddingBottomVal}`;
        }
        if (item.paddingLeftVal) {
          styleUlObject["padding-left"] = `${item.paddingLeftVal}`;
        }
      }
      if (this.propData.bgColor) {
        styleUlObject['background-color'] = (this.propData.bgColor || {}).hex
      } else {
        styleUlObject['background-color'] = '#ffffff'
      }
      let listyleObject = {};
      if (this.propData.liBox) {
        let listyle = this.propData.liBox || {};
        if (listyle.marginTopVal) {
          listyleObject["margin-top"] = `${listyle.marginTopVal}`;
        }
        if (listyle.marginRightVal) {
          listyleObject["margin-right"] = `${listyle.marginRightVal}`;
        }
        if (listyle.marginBottomVal) {
          listyleObject["margin-bottom"] = `${listyle.marginBottomVal}`;
        }
        if (listyle.marginLeftVal) {
          listyleObject["margin-left"] = `${listyle.marginLeftVal}`;
        }
        if (listyle.paddingTopVal) {
          listyleObject["padding-top"] = `${listyle.paddingTopVal}`;
        }
        if (listyle.paddingRightVal) {
          listyleObject["padding-right"] = `${listyle.paddingRightVal}`;
        }
        if (listyle.paddingBottomVal) {
          listyleObject["padding-bottom"] = `${listyle.paddingBottomVal}`;
        }
        if (listyle.paddingLeftVal) {
          listyleObject["padding-left"] = `${listyle.paddingLeftVal}`;
        }
      }
      let lipadding = {};
      if (this.propData.lipadding) {
        let listyle = this.propData.lipadding || {};
        if (listyle.marginTopVal) {
          lipadding["margin-top"] = `${listyle.marginTopVal}`;
        }
        if (listyle.marginRightVal) {
          lipadding["margin-right"] = `${listyle.marginRightVal}`;
        }
        if (listyle.marginBottomVal) {
          lipadding["margin-bottom"] = `${listyle.marginBottomVal}`;
        }
        if (listyle.marginLeftVal) {
          lipadding["margin-left"] = `${listyle.marginLeftVal}`;
        }
        if (listyle.paddingTopVal) {
          lipadding["padding-top"] = `${listyle.paddingTopVal}`;
        }
        if (listyle.paddingRightVal) {
          lipadding["padding-right"] = `${listyle.paddingRightVal}`;
        }
        if (listyle.paddingBottomVal) {
          lipadding["padding-bottom"] = `${listyle.paddingBottomVal}`;
        }
        if (listyle.paddingLeftVal) {
          lipadding["padding-left"] = `${listyle.paddingLeftVal}`;
        }
      }
      if (this.propData.border) {
        let element = this.propData.border;
        if (element.border.top.width > 0) {
          lipadding["border-top-width"] =
            element.border.top.width + element.border.top.widthUnit;
          lipadding["border-top-style"] = element.border.top.style;
          if (element.border.top.colors.hex) {
            lipadding["border-top-color"] =
              element.border.top.colors.hex;
          }
        }
        if (element.border.right.width > 0) {
          lipadding["border-right-width"] =
            element.border.right.width + element.border.right.widthUnit;
          lipadding["border-right-style"] = element.border.right.style;
          if (element.border.right.colors.hex) {
            lipadding["border-right-color"] =
              element.border.right.colors.hex;
          }
        }
        if (element.border.bottom.width > 0) {
          lipadding["border-bottom-width"] =
            element.border.bottom.width + element.border.bottom.widthUnit;
          lipadding["border-bottom-style"] =
            element.border.bottom.style;
          if (element.border.bottom.colors.hex) {
            lipadding["border-bottom-color"] =
              element.border.bottom.colors.hex;
          }
        }
        if (element.border.left.width > 0) {
          lipadding["border-left-width"] =
            element.border.left.width + element.border.left.widthUnit;
          lipadding["border-left-style"] = element.border.left.style;
          if (element.border.left.colors.hex) {
            lipadding["border-left-color"] =
              element.border.left.colors.hex;
          }
        }

        lipadding["border-top-left-radius"] =
          element.radius.leftTop.radius +
          element.radius.leftTop.radiusUnit;
        lipadding["border-top-right-radius"] =
          element.radius.rightTop.radius +
          element.radius.rightTop.radiusUnit;
        lipadding["border-bottom-left-radius"] =
          element.radius.leftBottom.radius +
          element.radius.leftBottom.radiusUnit;
        lipadding["border-bottom-right-radius"] =
          element.radius.rightBottom.radius +
          element.radius.rightBottom.radiusUnit;
      }
      window.IDM.setStyleToPageHead(this.moduleObject.id + " .iheadlist-ul", styleUlObject);
      window.IDM.setStyleToPageHead(this.moduleObject.id + " .iheadlist-ul li", listyleObject);
      window.IDM.setStyleToPageHead(this.moduleObject.id + " .iheadlist-right", lipadding);
    },
    converTitleStyleObject () {
      let styleObject = {};
      if (this.propData.titleStyle) {
        let item = this.propData.titleStyle || {};
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
      window.IDM.setStyleToPageHead(this.moduleObject.id + " .iheadlist-author", styleObject);
    },
    converDescStyleObject () {
      let styleObject = {};
      if (this.propData.descStyle) {
        let item = this.propData.descStyle || {};
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
      window.IDM.setStyleToPageHead(this.moduleObject.id + " .iheadlist-desc", styleObject);
    },
    handleClick (row) {
      this.changeEventFunHandle("clickFunction", "", { current: row });
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
      console.log(object, '接收')
      switch (object.type) {
        // tab消息
        case 'chooseTab':
          console.log('接收消息', object)
          break;
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
          customParam: item.param,
          _that: that,
          ...params
        });
      });
    }
  }
}
</script>

<style lang="scss">
.idm-iheadlist{
  background-color: #fff;
  .iheadlist-ul{
    // margin: 0 10px;
    border-radius: 10px;
    background: #fff;
    box-shadow: 0px 0px 10px 0px #e3dede;
    li{
      list-style: none;
      // padding: 0 20px;
      display: flex;
      align-items: center;
    }
    li:last-child .iheadlist-right{
      border: 0 !important;
    }
    .idm_svg_author_icon{
      vertical-align: middle;
      margin-right: 5px;
    }
    .iheadlist-img{
      width: 40px;
      height: 40px;
      margin-right: 10px;
      img{
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
    }
    .iheadlist-right{
      // padding: 20px 0;
      width: calc(100% - 50px);
      display: flex;
      align-items: center;
      border-bottom: 1px solid #ccc;
      .iheadlist-center{
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        flex-direction: column;
        .iheadlist-line{
          padding-bottom: 5px;
          span{
            margin-right: 5px;
          }
        }
        .color{
          padding: 3px 5px;
          border-radius: 3px;
          color: #fff;
          background: #F7B503;
        }
        .color1{
          padding: 3px 5px;
          border-radius: 3px;
          color: #fff;
          background: #44D7B6;
        }
      }
    }
  }
}
</style>

