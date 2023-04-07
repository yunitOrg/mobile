<template>
  <!--
    根目录规范(必须不能为空)：
    idm-ctrl：控件类型 drag_container：容器，drag_container_inlieblock：行内容器，idm_module：非容器的组件
    id：使用moduleObject.id，如果id不使用这个将会被idm-ctrl-id属性替换
    idm-ctrl-id：组件的id，这个必须不能为空
  -->
  <div idm-ctrl="idm_module" :id="moduleObject.id" :idm-ctrl-id="moduleObject.id">
    <div class="commontitle-wrap">
      <div class="common-title">
        <svg v-if="propData.titleIcon && propData.titleIcon.length"
          class="info-icon" aria-hidden="true">
          <use :xlink:href="`#${propData.titleIcon[0]}`"></use>
        </svg>
        <svg-icon v-else icon-class="shuact" className="info-icon">
        </svg-icon>
        <span class="pro-title">{{ propData.title }}</span>
      </div>
      <div>
        <div class="drag_container idm-dragbox"
        v-if="propData.isDrag === 'container'"
        :idm-ctrl-id="moduleObject.id"
        idm-container-index="1" >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default{
  name: 'IcommonTitle',
  data() {
    return {
      moduleObject: {},
      propData: this.$root.propData.compositeAttr || {}
    }
  },
  mounted() {
    this.moduleObject = this.$root.moduleObject;
    this.init()
  },
  methods: {
    propDataWatchHandle(propData) {
      this.propData = propData.compositeAttr || {};
      this.init();
    },
    handleStyle () {
      let styleObject = {},
        tipsStyleObj = {},
        titlebox = {},
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
            case 'titleBox':
              IDM.style.setBoxStyle(titlebox, element);
              break
            case 'titleFont':
              IDM.style.setFontStyle(titleStyle, element)
              break
          }
        }
      }
      window.IDM.setStyleToPageHead(this.moduleObject.id + " .commontitle-wrap", styleObject);
      window.IDM.setStyleToPageHead(this.moduleObject.id + " .commontitle-wrap .info-icon", tipsStyleObj);
      window.IDM.setStyleToPageHead(this.moduleObject.id + " .commontitle-wrap .common-title", titlebox);
      window.IDM.setStyleToPageHead(this.moduleObject.id + " .commontitle-wrap .pro-title", titleStyle);
    },
    init () {
      console.log(this.propData, '数据');
      this.handleStyle();
    }
  }
}
</script>

<style lang="scss" scoped>
.commontitle-wrap{
  .idm-dragbox{
    min-height: 100px;
  }
}
</style>
