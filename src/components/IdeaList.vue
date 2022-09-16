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
    <div class="idm-idealist">
      <div class="idealist-ul">
        <li v-for="(item, index) in pageDataList.length > 0 ? pageDataList : list" :key="index" @click="handleJump(item)">
          <div class="idealist-img" v-if="propData.headImg">
            <img :src="item[propData.ImgInterface] || item.headImg" alt="">
          </div>
          <div class="idealist-content">
            <div class="idealist-title">
              <b>{{item[propData.titleInterface] || item.title}}</b>
              <span v-if="propData.isDate">{{item[propData.TimeInterface] || item.time}}</span>
            </div>
            <span class="idealist-desc" v-if="propData.isDesc">{{item[propData.descInterface] || item.desc}}</span>
          </div>
          <div class="idealist-right"  v-if="propData.isType" :class="hadnleActive(item, propData.activeInterface) ? 'waitStyle' : 'yetStyle'">
            {{hadnleActive(item, propData.activeInterface) ? propData.waitTitle : propData.yetTitle}}
          </div>
        </li>
      </div>
    </div>
    <div class="idm-message-list-parent-box-mask" v-if="moduleObject.env === 'develop' && !propData.dataSource">
      <span>！未绑定数据源</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'IdeaList',
  data () {
    return {
      pageDataList: [],
      list: [
        {
          headImg: 'http://116.236.111.158:8086/DreamWeb/resource/img/body-bg-shanghai.png',
          title: '白继伟',
          desc: "书记，我的思想汇报有误",
          time: '2021-08-25',
          type: 1
        },
        {
          headImg: 'http://116.236.111.158:8086/DreamWeb/resource/img/body-bg-shanghai.png',
          title: '白继伟',
          desc: "书记，我的思想汇报有误",
          time: '2021-08-25',
          type: 1
        },
        {
          headImg: 'http://116.236.111.158:8086/DreamWeb/resource/img/body-bg-shanghai.png',
          title: '白继伟',
          desc: "书记，我的思想汇报有误",
          time: '2021-08-25',
          type: 2
        }
      ],
      moduleObject:{},
      propData:this.$root.propData.compositeAttr||{
        waitTitle: "待回复",
        yetTitle: "已回复",
        headImg: true,
        isDesc: true,
        isDate: true,
        isType: true,
        liBoxShadow: "0px  0px 20px 0px #ccc",
        activeInterface: "type == '1'",
        box:{
          marginTopVal: "0",
          marginRightVal: "",
          marginBottomVal: "",
          marginLeftVal: "",
          paddingTopVal: "",
          paddingRightVal: "10px",
          paddingBottomVal: "",
          paddingLeftVal: "10px"
        },
        liBox: {
          marginTopVal: "",
          marginRightVal: "",
          marginBottomVal: "",
          marginLeftVal: "",
          paddingTopVal: "20px",
          paddingRightVal: "20px",
          paddingBottomVal: "20px",
          paddingLeftVal: "20px"
        },
        waitStyle: {
            fontColors: {
                hex: "#f00"
            },
            fontSize: 14,
            fontSizeUnit: "px"
        },
        yetStyle: {
            fontColors: {
                hex: "#000000"
            },
            fontSize: 14,
            fontSizeUnit: "px"
        },
        liSplitHeight: "10px",
        titleStyle: {
          fontColors: {
              hex: "#000000"
          },
          fontSize: 14,
          fontSizeUnit: "px"
        },
        timeStyle: {
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
    hadnleActive (row, key) {
      let str = `function test(res){return res.${key}}`
      let result = this.handleFunc(str)
      return result(row)
    },
    handleFunc(strFun) {
      return new Function(`return ${strFun}`)();
    },
    getDataField (field, dataObject) {
      if (!dataObject || !field) return ''
      
    },
    handleJump (row) {
      if (this.moduleObject.env === 'develop') {
          return
      }
      let url = null
      switch (this.propData.jumpStyle) {
        case '_link':
          url = row[this.propData.jumpField]
          if (!url) return
          window.open(IDM.url.getWebPath(url))
          break
        case '_child':
          if (this.propData.morePageList && this.propData.morePageList.length > 0) {
                IDM.router.push(
                    this.moduleObject.pageid,
                    this.propData.morePageList[0].id,
                    this.propData.isPageKeep,
                    row,
                    '',
                    ''
                )
            } else {
                IDM.message.warning('请选择要跳转的子页面')
            }
          break
        case '_custom_link':
          url = this.propData.customLink;
          window.open(IDM.url.getWebPath(url))
          break
        case 'jumpCustomFunc':
          if (this.propData.jumpCustomFunc && this.propData.jumpCustomFunc.length > 0) {
            const funcName = this.propData.jumpCustomFunc[0].name
            window[funcName] && window[funcName].call(this, row)
          }
          break
      }
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
              } else {
                IDM.message.error(res.message);
              }
            });
      }
    },
    init () {
      this.initData();
      this.convertAttrToStyleObject();
      this.convertTipsStyleObject();
      this.converTitleStyleObject();
      this.converTimeStyleObject();
      this.converDescStyleObject();
    },
    convertAttrToStyleObject () {
      console.log(this.propData, '数据源')
      let styleObject = {};
      if (this.propData.box) {
        let ulbox = this.propData.box || {};
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
      let listyleObject = {};
      if (this.propData.liBox) {
        let libox = this.propData.liBox || {};
        if (libox.marginTopVal) {
          listyleObject["margin-top"] = `${libox.marginTopVal}`;
        }
        if (libox.marginRightVal) {
          listyleObject["margin-right"] = `${libox.marginRightVal}`;
        }
        if (libox.marginBottomVal) {
          listyleObject["margin-bottom"] = `${libox.marginBottomVal}`;
        }
        if (libox.marginLeftVal) {
          listyleObject["margin-left"] = `${libox.marginLeftVal}`;
        }
        if (libox.paddingTopVal) {
          listyleObject["padding-top"] = `${libox.paddingTopVal}`;
        }
        if (libox.paddingRightVal) {
          listyleObject["padding-right"] = `${libox.paddingRightVal}`;
        }
        if (libox.paddingBottomVal) {
          listyleObject["padding-bottom"] = `${libox.paddingBottomVal}`;
        }
        if (libox.paddingLeftVal) {
          listyleObject["padding-left"] = `${libox.paddingLeftVal}`;
        }
      }
      if (this.propData.liBoxShadow) {
        listyleObject['box-shadow'] = this.propData.liBoxShadow
      }
      if (this.propData.border) {
        IDM.style.setBorderStyle(listyleObject, this.propData.border)
      }
      
      window.IDM.setStyleToPageHead(this.moduleObject.id + " .idealist-ul", styleObject);
      window.IDM.setStyleToPageHead(this.moduleObject.id + " .idealist-ul li", listyleObject);
      window.IDM.setStyleToPageHead(this.moduleObject.id + " .idealist-ul li+li", {"margin-top": this.propData.liSplitHeight});
    },
    convertTipsStyleObject () {
      let styleObject = {};
      if (this.propData.waitStyle) {
        let item = this.propData.waitStyle || {};
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
      window.IDM.setStyleToPageHead(this.moduleObject.id + " .waitStyle", styleObject);
      let yetStyleObject = {}
      if (this.propData.yetStyle) {
        let item = this.propData.yetStyle || {};
        if (item.fontColors) {
          yetStyleObject["color"] = item.fontColors.hex;
        }
        if (item.fontDecoration) {
          yetStyleObject["text-decoration"] = item.fontDecoration;
        }
        if (item.fontFamily) {
          yetStyleObject['font-family'] = item.fontFamily;
        }
        if (item.fontLetterSpacing) {
          yetStyleObject["word-spacing"] = item.fontLetterSpacing + item.fontLetterSpacingUnit;
        }
        if (item.fontLineHeight) {
          yetStyleObject['line-height'] = item.fontLineHeight + (item.fontLineHeightUnit == "-" ? "" : item.fontLineHeightUnit);
        }
        if (item.fontSize) {
          yetStyleObject['font-size'] = item.fontSize + item.fontSizeUnit
        }
        if (item.fontStyle) {
          yetStyleObject['font-style'] = item.fontStyle
        }
        if (item.fontTextAlign) {
          yetStyleObject['text-align'] = item.fontTextAlign
        }
        if (item.fontWeight) {
          yetStyleObject['font-weight'] = item.fontWeight.split(" ")[0]
        }
      }
      window.IDM.setStyleToPageHead(this.moduleObject.id + " .yetStyle", yetStyleObject);
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
      window.IDM.setStyleToPageHead(this.moduleObject.id + " .idealist-title b", styleObject);
    },
    converTimeStyleObject () {
      let styleObject = {};
      if (this.propData.timeStyle) {
        let item = this.propData.timeStyle || {};
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
      window.IDM.setStyleToPageHead(this.moduleObject.id + " .idealist-title span", styleObject);
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
      window.IDM.setStyleToPageHead(this.moduleObject.id + " .idealist-desc", styleObject);
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
          console.log('接收消息', object.message)
          break;
      }
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
.idm-idealist{
  .idealist-ul{
    li{
      list-style: none;
      display: flex;
      align-items: center;
      .idealist-img{
        width: 40px;
        height: 40px;
        margin-right: 10px;
        img{
          width: 100%;
          height: 100%;
          border-radius: 50%;
        }
      }
      .idealist-content{
        flex: 1;
        .idealist-title{
          display: flex;
          justify-content: space-between;
          padding-bottom: 5px;
          span{
            padding-right: 20px;
          }
        }
        b{
          font-size: 16px;
          padding-right: 30px;
        }
      }
    }
    // li+li{
    //   margin-top: 20px;
    // }
  }
}
</style>
