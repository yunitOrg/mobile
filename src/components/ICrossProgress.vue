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
    <div class="crossProgress-wrap">
      123
    </div>
  </div>
</template>

<script>
export default {
  name: 'ICrossProgress',
  data () {
    return {
      moduleObject:{},
      propData:this.$root.propData.compositeAttr||{},
      option: {
        xAxis: ['办公室', '人事处', '财务处', '调研室', '保密处'],
        series: [
          {
            data: ['137', '51', '40', '20', '34']
          },
          {
            data: ['158', '16', '28', '180', '76']
          }
        ],
        total: ['295', '67', '68', '200', '110']
      },

    }
  },
  mounted() {
    this.init()
  },
  methods: {
    propDataWatchHandle(propData) {
      this.propData = propData.compositeAttr || {};
      this.init();
    },
    getMockData() {
      this.list = [
        {
          name: '办公室',
          
        }
      ]
    },
    initData() {
      if (this.moduleObject.env !== 'production') {
        this.getMockData();
        return
      }
    },
    handleStyle() {

    },
    init() {
      this.initData()
      this.handleStyle();
    }
  }
}
</script>
