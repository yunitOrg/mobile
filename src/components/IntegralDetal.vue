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
  <div class="integralDetal-box">
    <div class="detail-top">
      <div class="detail-p">已获得积分</div>
      <div class="detail-score">
        <span>4651</span>
        <b>积分</b>
      </div>
    </div>
    <div class="detail-bottom">
      <div class="detail-title">获得积分记录</div>
      <div class="detail-li">
        <div class="detail-left">
          <span>阅读文章</span>
          <b>2022-06-30 23:59:59</b>
        </div>
        <div class="detail-right">+1</div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default{
  data () {
    return {
      moduleObject:{},
      propData:this.$root.propData.compositeAttr||{
        boxtopbg: {
          hex: "#FFFFFF",
          hex8: "#FFFFFFFF"
        },
        boxtopShadow: "0px 0px 10px 0px #e3dede",

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
      console.log(this.propData, '数据')
      this.converStyleObj()
    },
    converStyleObj () {
      let styleObject = {};
      for (const key in this.propData) {
        if (this.propData.hasOwnProperty.call(this.propData, key)) {
          const element = this.propData[key]
          if (!element && element !== false && element != 0) {
              continue
          }
          switch (key) {
            case 'boxtopWidth':
              styleObject['width'] = element
              break
            case 'boxtopHeight':
              styleObject['height'] = element
              break
            case 'boxtopbg':
              styleObject['background-color'] = element && element.hex8
              break
            case 'boxtopShadow':
              styleObject['box-shadow'] = element
              break
            case '':
              break
          }
        }
      }
      window.IDM.setStyleToPageHead(this.moduleObject.id + " .detail-top", styleObject);
    }
  }
}
</script>

<style lang="scss" scoped>
.detail-top{
  .detail-p, .detail-score{
    text-align: center;
  }
}
</style>
