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
    <van-tabs v-model="active" animated>
      <van-tab title="标签 1"></van-tab>
      <van-tab title="标签 2"></van-tab>
      <van-tab title="标签 3"></van-tab>
      <van-tab title="标签 4"></van-tab>
    </van-tabs>
    <div v-if="active===0">
      内容0
    </div>
    <div v-if="active===1">
      内容1
    </div>
    <div v-if="active===2">
      内容2
    </div>
    <div v-if="active===3">
      内容3
    </div>
  </div>
</template>

<script>
export default{
  name: 'ITab',
  data () {
    return {
      active: 1,
      moduleObject:{},
      propData:this.$root.propData.compositeAttr||{
          fontContent:"Hello Word"
      }
    }
  },
  created () {
    this.moduleObject = this.$root.moduleObject
    this.convertAttrToStyleObject()
  },
  methods: {
    propDataWatchHandle (propData) {
      this.propData = propData.compositeAttr||{};
      this.convertAttrToStyleObject();
    },
    convertAttrToStyleObject () {

    }
  }
}
</script>
