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
    <div class="infolist-wrap">
      <div class="info-title" v-if="propData.isTitleShow">
        <div>
          <svg v-if="propData.titleIcon && propData.titleIcon.length"
            class="info-icon" aria-hidden="true">
            <use :xlink:href="`#${propData.titleIcon[0]}`"></use>
          </svg>
          <svg-icon v-else icon-class="shu" className="info-icon">
          </svg-icon>
          <span class="infolist-title">{{ propData.title }}</span>
        </div>
        <div class="infolist-right-font">
          <span class="infolist-arc"></span>
          <span class="infolist-tips">类别：{{componentData[propData.styleField] || componentData.style}}</span>
        </div>
      </div>
      <div class="infolist-image" v-if="propData.isimageShow">
        <img :src="getImageUrl('uploadImage')" alt="">
      </div>
      <div class="infolist-fonttitle" v-html="textFilter(propData.contentFontTitle)" @click="handleClickTitle"></div>
      <div class="idm-text-info-content" v-html="textFilter(propData.contextText)"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'IinfoList',
  data () {
    return {
      moduleObject: {},
      propData: this.$root.propData.compositeAttr || {
        // isimageShow: true,
        // isTitleShow: true,
        // title: '支部信息',
        // contentTitle: '名称：',
        // ulbox: {
        //   marginTopVal: "",
        //   marginRightVal: "10px",
        //   marginBottomVal: "0px",
        //   marginLeftVal: "10px",
        //   paddingTopVal: "20px",
        //   paddingRightVal: "20px",
        //   paddingBottomVal: "20px",
        //   paddingLeftVal: "20px"
        // },
        // boxShadow: "0 0 10px 0 #C2C2C2",
        // imageWidth: '100px',
        // imageHeight: '100px',
        // imageTop: '0',
        // imageRight: '0',
        // imageBottom: '20px',
        // imageLeft: '20px',
        // arcWidth: '10px',
        // arcHeight: '10px',
        // arcRadius: '10px',
        // arcLeft: '5px',
        // arcFontColor: {
        //   "hex": "#f00"
        // },
        // bglinear: 'linear-gradient(180deg, #FFEDED 0%, #FFFFFF 50%)',
        // contentFontTitle: "<div>名称：@[name]</div>",
        // contextText: '<div>类别：@[category]</div><div>领导班子当选日期：@[getTime]</div><div>本届截止日期：@[cutTime]</div><div>换届提议日期：@[changeTime]</div><div>批准建立党组织日期：@[joinTime]</div><div>党组织联系人：@[contactPeople]</div><div>党组织书记：@[secretaryPeople]</div>'
      },
      componentData: {}
    }
  },
  created() {
    this.moduleObject = this.$root.moduleObject
    this.init();
  },
  methods: {
    propDataWatchHandle(propData) {
      this.propData = propData.compositeAttr || {};
      this.init();
    },
    getImageUrl(key) {
      if ( this.propData[key] ) {
          return IDM.url.getWebPath(this.propData[key])
      } else {
          return IDM.url.getModuleAssetsWebPath(require(`../assets/${key}.png`),this.moduleObject)
      }
    },
    handleClickTitle () {
      if (this.propData.handleComstomClick && this.propData.handleComstomClick.length > 0) {
        let name = this.propData.handleComstomClick[0].name
        window[name] && window[name].call(this);
      }
    },
    textFilter(text) {
      if (!text) return ''
      console.log(text, this.componentData)
      text = text.replace(/\r/gi, '').replace(/\n/gi, '<br/>')
      text = text.replace(/@\[.*\]/gi, (str) => {
          if (str.length < 4) return str
          return IDM.express.replace(str, this.componentData, true)
      })
      return text
    },
    handleStyle() {
      let styleObject = {},
        titleStyle = {},
        imageStyle = {},
        contentStyle = {},
        arcStyle = {},
        tipsStyle = {},
        tipsStyleObj = {};
      for (const key in this.propData) {
        if (this.propData.hasOwnProperty.call(this.propData, key)) {
          const element = this.propData[key]
          if (!element && element !== false && element != 0) {
            continue
          }
          switch (key) {
            case 'width':
              styleObject['width'] = element + ' !important';
              break
            case 'height':
              styleObject['height'] = element + ' !important';
              break
            case 'ulbox':
              IDM.style.setBoxStyle(styleObject, element, true)
              break
            case 'bgColor':
              styleObject['background-color'] = element && element.hex8 + ' !important';
              break
            case 'bglinear':
              styleObject['background-image'] = element;
              break
            case 'boxShadow':
              styleObject['box-shadow'] = element + ' !important';
              break
            case 'uploadImage':
              styleObject['background-image'] = `url(${element})`;
              styleObject['background-repeat'] = 'no-repeat';
              styleObject['background-size'] = '100px 100px';
              break
            case 'boxborder':
              IDM.style.setBorderStyle(styleObject, element, true);
              break
            case 'titleFont':
              IDM.style.setFontStyle(titleStyle, element)
              break
            case 'imageWidth':
              imageStyle['width'] = element;
              break
            case 'imageHeight':
              imageStyle['height'] = element;
              break
            case 'imageTop':
              imageStyle['top'] = element;
              break
            case 'imageRight':
              imageStyle['right'] = element;
              break
            case 'imageBottom':
              imageStyle['bottom'] = element;
              break
            case 'imageLeft':
              imageStyle['left'] = element;
              break
            case 'arcWidth':
              arcStyle['width'] = element;
              break
            case 'arcHeight':
              arcStyle['height'] = element;
              break
            case 'arcFontColor':
              arcStyle['background-color'] = element.hex;
              break
            case 'arcRadius':
              arcStyle['border-radius'] = element;
              break
            case 'arcLeft':
              arcStyle['margin-right'] = element;
              break
            case 'tipsFont':
              IDM.style.setFontStyle(tipsStyle, element)
              break
            case 'titleIconFontColor':
              tipsStyleObj['color'] = element.hex;
              tipsStyleObj["fill"] = element.hex;
              break
            case 'titleIconFontSize':
              tipsStyleObj['font-size'] = element + 'px';
              tipsStyleObj['width'] = element + 'px';
              tipsStyleObj['height'] = element + 'px';
              break
            case 'leftIconBox':
              IDM.style.setBoxStyle(tipsStyleObj, element);
              break
            case 'contentLeft':
              contentStyle['left'] = element;
              break
            case 'contentRight':
              contentStyle['right'] = element;
              break
          }
        }
      }
      window.IDM.setStyleToPageHead(this.moduleObject.id + " .infolist-wrap", styleObject);
      window.IDM.setStyleToPageHead(this.moduleObject.id + " .infolist-wrap .info-icon", tipsStyleObj);
      window.IDM.setStyleToPageHead(this.moduleObject.id + " .infolist-wrap .infolist-title", titleStyle);
      window.IDM.setStyleToPageHead(this.moduleObject.id + " .infolist-wrap .infolist-image", imageStyle);
      window.IDM.setStyleToPageHead(this.moduleObject.id + " .infolist-wrap .idm-text-info-content", contentStyle);
      window.IDM.setStyleToPageHead(this.moduleObject.id + " .infolist-wrap .infolist-arc", arcStyle);
      window.IDM.setStyleToPageHead(this.moduleObject.id + " .infolist-wrap .infolist-tips", tipsStyle);
    },
    getMockData() {
        this.componentData = {
            name: '中共中粮贸易有限公司委员会',
            category: '中共中粮贸易有限公司委员会',
            getTime: '2021-06-30',
            cutTime: '2024-06-30',
            changeTime: '2020-12-30',
            joinTime: '2020-12-30',
            contactPeople: 'XXX',
            secretaryPeople: 'XXX',
            style: '党支部'
        }
    },
    /**
     * 组件通信：接收消息的方法
     */
    receiveBroadcastMessage(messageObject) {
      console.log('IinfoList接收消息: ', messageObject);
      switch (messageObject.type) {
        case 'linkageReload':
          this.initData();
          break;
        case this.propData.messageKey:
          this.inforobj = messageObject.message;
          this.initData();
          break;
      }
    },
    initData () {
      console.log(this.propData, this.moduleObject, '数据');
      if (this.moduleObject.env !== 'production') {
          this.getMockData();
          return
      }
      this.componentData = {};
      let params = {}
      if(this.propData.paramsFunc && this.propData.paramsFunc.length > 0) {
          const funcName = this.propData.paramsFunc[0].name
          params = window[funcName].call(this, {
              ...this.propData.paramsFunc[0].param,
              ...this.inforobj
          }) || {}
      }
      if ( this.propData.dataSource && this.propData.dataSource[0] ) {
          IDM.datasource.request(
              this.propData.dataSource[0]?.id,
              {
                  moduleObject: this.moduleObject,
                  param: {
                      ...params,
                      ...IDM.router.getParam(this.moduleObject.routerId),
                  }
              },
              (data) => {
                  this.componentData = data
              }
          )
      } else {
          this.getMockData()
      }
    },
    init () {
      this.handleStyle();
      this.initData();
    }
  }
}
</script>

<style lang="scss" scoped>
.infolist-wrap{
  position: relative;
  .infolist-arc{
    display: inline-block;
  }
  .info-title{
    display: flex;
    justify-content: space-between;
  }
  .infolist-image{
    position: absolute;
    img{
      width: 100%;
      height: 100%;
    }
  }
  .idm-text-info-content{
    position: absolute;
  }
}
</style>
