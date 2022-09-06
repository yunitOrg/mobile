<template>
  <!--
    根目录规范(必须不能为空)：
    idm-ctrl：控件类型 drag_container：容器，drag_container_inlieblock：行内容器，idm_module：非容器的组件
    id：使用moduleObject.id，如果id不使用这个将会被idm-ctrl-id属性替换
    idm-ctrl-id：组件的id，这个必须不能为空
  -->
  <div idm-ctrl="idm_module"
  :id="moduleObject.id" 
  :idm-ctrl-id="moduleObject.id" >
    <div class="idm-signin">
      <div class="signin-top">
        <div class="signin-title">打卡天数</div>
        <div class="signin-img">1</div>
        <div class="signin-btn">签到</div> 
      </div>
      <div class="signin-bottom">
        <van-calendar
          class="signin-calendar"
          title=""
          :poppable="false"
          :show-confirm="false"
          :style="{ height: '500px' }"
          />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      moduleObject: {},
      propData: this.$root.propData.compositeAttr||{
        labelShow: true,
        styleModel: 'mobile'
      }
    }
  },
  created () {
    this.moduleObject = this.$root.moduleObject;
    this.init();
  },
  methods: {
    propDataWatchHandle (propData) {
      this.propData = propData.compositeAttr||{};
      this.init();
    },
    init () {
      // this.converStyle()
    },
    converStyle () {
      let styleObject = {},
          styleWrapObject = {};
      for (const key in this.propData) {
        if (this.propData.hasOwnProperty.call(this.propData, key)) {
          const element = this.propData[key]
          if (!element && element !== false && element != 0) {
            continue
          }
          switch (key) {
            case 'labelFont':
              IDM.style.setFontStyle(styleObject, element)
              break
            case 'labelBox':
              IDM.style.setBoxStyle(styleObject, element)
              break
            case 'box':
              IDM.style.setBoxStyle(styleWrapObject, element)
              break
          }
        }
      }
      window.IDM.setStyleToPageHead(this.moduleObject.id + " .time-label", styleObject);
      window.IDM.setStyleToPageHead(this.moduleObject.id + " .idm-time", styleWrapObject);
    }
  }
}
</script>

<style lang="scss" scoped>
.idm-signin{
  .signin-top{
    margin: 10px;
    padding: 10px 20px;
    box-shadow: 0px  0px 20px 0px #ccc;
    position: relative;
    .signin-title{
      text-align: center;
    }
    .signin-img{
      text-align: center;
      font-size: 24px;
    }
    .signin-btn{
      position: absolute;
      top: 10px;
      right: 20px;
      padding: 5px 10px;
      color: #fff;
      background-color: #f00;
      border-radius: 5px;
      user-select: none;
    }
  }
  .signin-bottom{
    margin: 10px;
    box-shadow: 0px  0px 20px 0px #ccc;
    .signin-calendar{
      margin: 20px;
    }
  }
}
</style>