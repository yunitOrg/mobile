<template>
   <!--
    根目录规范(必须不能为空)：
    idm-ctrl：控件类型 drag_container：容器，drag_container_inlieblock：行内容器，idm_module：非容器的组件
    id：使用moduleObject.id，如果id不使用这个将会被idm-ctrl-id属性替换
    idm-ctrl-id：组件的id，这个必须不能为空
  -->
  <div idm-ctrl="idm_module" :id="moduleObject.id" :idm-ctrl-id="moduleObject.id">
    <div class="previewfile-wrap">
      <iframe v-if="propData.renderStyle == 'iframe'" class="preview-iframe" :src="iframeUrl" frameborder="0" name="ipreviewFile"></iframe>
      <template v-if="propData.renderStyle == 'interfaceImg'">
        <div v-if="imgUrl" class="previewimg">
          <img :src="imgUrl" alt="" >
        </div>
        <template v-else>
          <div v-for="(item, index) in list" :key="index" class="preview-li">
            <span v-show="imgLoadFlag" class="preview-num">{{index+1}}/{{list.length}}</span>
            <img ref="imgRef" :src="handleImgUrl(item.url)" alt="">
          </div>
        </template>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  name: 'IpreviewFile',
  data() {
    return {
      iframeUrl: '',
      list: [],
      num: 0,
      imgLoadFlag: false,
      timer: null,
      imgUrl: '',
      moduleObject: {},
      propData: this.$root.propData.compositeAttr || {
        renderStyle: 'interfaceImg',
        iframeWidth: "100%",
        iframeHeight: "100vh"
      }
    }
  },
  mounted() {
    this.moduleObject = this.$root.moduleObject;
    this.init()
  },
  watch: {
    list(val) {
      this.$nextTick(function () {
        let list = this.$refs.imgRef;
        for (let i in list) {
          this.imgLoad(list[i], () => {
            if (this.num == list.length-1) {
              console.log("图片加载完成")
              this.imgLoadFlag = true
            }
          })
        }
      })
    }
  },
  methods: {
    imgLoad(img, callback) {
      let _this = this;
      var timer = setInterval(() => {
        if (img.complete) {
          _this.num++;
          callback(img);
          clearInterval(timer);
        }
      }, 100)
    },
    propDataWatchHandle(propData) {
      this.propData = propData.compositeAttr || {};
      this.init();
    },
    handleImgUrl (url) {
      try {
        return IDM.url.getWebPath(url)
      } catch (e) {
        return url
      }
    },
    handleStyle() {
      let styleObject = {},
        iframeObject = {},
        titlebox = {},
        imgObject = {},
        imgboxobject = {},
        titleStyle = {};
      for (const key in this.propData) {
        if (this.propData.hasOwnProperty.call(this.propData, key)) {
          const element = this.propData[key]
          if (!element && element !== false && element != 0) {
            continue
          }
          switch (key) {
            case 'width':
              styleObject['width'] = element;
              break;
            case 'height':
              styleObject['height'] = element;
              break;
            case 'ulbox':
              IDM.style.setBoxStyle(styleObject, element)
              break
            case 'bgColor':
              styleObject['background-color'] = element && element.hex8;
              break
            case 'bglinear':
              styleObject['background-image'] = element;
              break
            case 'boxShadow':
              styleObject['box-shadow'] = element;
              break
            case 'boxborder':
              IDM.style.setBorderStyle(styleObject, element);
              break
            case 'iframeWidth':
              iframeObject['width'] = element;
              break
            case 'iframeHeight':
              iframeObject['height'] = element;
              break
          }
        }
      }
      window.IDM.setStyleToPageHead(this.moduleObject.id + " .previewfile-wrap", styleObject);
      window.IDM.setStyleToPageHead(this.moduleObject.id + " .preview-iframe", iframeObject);
      if (this.moduleObject.env == 'develop') {
        let styleobj = {}, styleimg = {};
        styleobj['width'] = '100%';
        styleobj['margin-left'] = 0;
        styleobj['padding'] = 0;
        styleimg['height'] = '100%';
        window.IDM.setStyleToPageHead(this.moduleObject.id + " .preview-li", styleobj);
        window.IDM.setStyleToPageHead(this.moduleObject.id + " .preview-li img", styleimg);
      }
    },
    getMockData() {
      this.list = [
        {"page":1,"url": IDM.url.getModuleAssetsWebPath(require("../assets/banner1.jpg"), this.moduleObject) },
        {"page":2,"url": IDM.url.getModuleAssetsWebPath(require("../assets/banner2.jpg"), this.moduleObject)}
      ]
    },
    initData() {
      if (this.propData.renderStyle == 'iframe') {
        if (this.moduleObject.env !== 'production') {
          this.iframeUrl = ''
          return
        }
        if (this.propData.handleIframeUrl && this.propData.handleIframeUrl.length > 0) {
          const funcName = this.propData.handleIframeUrl[0].name
          this.iframeUrl = window[funcName].call(this, {
            url: this.propData.iframeUrl,
            router: IDM.router.getParam(this.moduleObject.routerId)
          }) || {}
        }
        this.iframeUrl = this.propData.iframeUrl
      } else if (this.propData.renderStyle == 'interfaceImg') {
        if (this.moduleObject.env !== 'production') {
          // this.imgUrl = IDM.url.getModuleAssetsWebPath(require("../assets/banner1.jpg"), this.moduleObject);
          this.getMockData();
          return
        }
        if (this.propData.isBefore) { // 校验文件格式
          if (this.propData.hanldeCheck && this.propData.hanldeCheck.length > 0) {
            const funcName = this.propData.hanldeCheck[0].name;
            this.imgUrl = window[funcName].call(this, {
              router: IDM.router.getParam(this.moduleObject.routerId)
            })
            if (this.imgUrl) {
              return
            }
          }
        }
        let params = {}
        if (this.propData.handleResult && this.propData.handleResult.length > 0) {
          const funcName = this.propData.handleResult[0].name
          params = window[funcName].call(this, {
            router: IDM.router.getParam(this.moduleObject.routerId)
          }) || {}
        }
        if (this.propData.dataSource && this.propData.dataSource[0]) {
          IDM.datasource.request(
            this.propData.dataSource[0]?.id,
            {
              moduleObject: this.moduleObject,
              param: {
                ...params
              }
            },
            (data) => {
              this.list = data;
            }
          )
        } else {
          this.getMockData()
        }
      }
    },
    init() {
      this.handleStyle()
      this.initData()
    }
  }
}
</script>

<style lang="scss" scoped>
.previewfile-wrap{
  .previewimg{
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px;
    height: 100%;
    position: fixed;
    img{
      width: 100%;
      box-shadow: 0 1px 3px 0 #a9a9a9;
    }
  }
  .preview-li{
    position: relative;
    display: flex;
    justify-content: center;
    margin-left: 5vw;
    padding: 5vw 0 0;
    width: 90vw;
    &::before{
      content: "";
      border: 1px solid #ebebeb;
      bottom: 0;
      box-sizing: border-box;
      left: 0;
      right: 0;
      position: absolute;
      top: 5vw;
      z-index: 0;
    }
    .preview-num{
      display: inline-block;
      width: 60px;
      height: 24px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #fff;
      border-radius: 12px;
      font-size: 14px;
      color: #999;
      position: absolute;
      bottom: 1px;
      left: 50%;
      transform: translateX(-50%);
      box-shadow: 0 0 10px #ccc;
    }
    img{
      -webkit-user-drag: none;
      vertical-align: middle;
      border: 0;
      box-shadow: 0 1px 3px 0 #a9a9a9;
      width: 100%;
      height: 100%;
      box-sizing: border-box;
    }
  }
}
</style>
