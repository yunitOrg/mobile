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
        <svg v-if="propData.titleIcon && propData.titleIcon.length"
            class="icell-icon" aria-hidden="true">
          <use :xlink:href="`#${propData.titleIcon[0]}`"></use>
        </svg>
        <svg-icon v-else icon-class="shu" className="icell-icon">
        </svg-icon>
        <span>{{ propData.title }}</span>
      </div>
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
        isTitleShow: true,
        title: '支部信息'
      }
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
    handleStyle() {
      let styleObject = {},
        leftStyle = {},
        rightStyle = {},
        cellStyle = {},
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
            case 'boxShadow':
              styleObject['box-shadow'] = element + ' !important';
              break
            case 'boxborder':
              IDM.style.setBorderStyle(styleObject, element, true);
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
          }
        }
      }
      window.IDM.setStyleToPageHead(this.moduleObject.id + " .icell-wrap .van-cell", styleObject);
      window.IDM.setStyleToPageHead(this.moduleObject.id + " .icell-wrap .van-cell__title span", leftStyle);
      window.IDM.setStyleToPageHead(this.moduleObject.id + " .icell-wrap .van-cell__value span", rightStyle);
      window.IDM.setStyleToPageHead(this.moduleObject.id + " .icell-wrap .van-cell__value", cellStyle);
      window.IDM.setStyleToPageHead(this.moduleObject.id + " .icell-wrap .icell-icon", tipsStyleObj);
    },
    init () {
      this.handleStyle();
    }
  }
}
</script>

<style lang="scss" scoped>
.infolist-wrap{

}
</style>
