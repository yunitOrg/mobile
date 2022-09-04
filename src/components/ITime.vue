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
    <div class="idm-time">
      <span class="time-label" v-if="propData.labelShow">时间范围</span>
      <div class="time-block">
        <div class="flex">
          <van-field
            readonly
            v-model="timeStart"
            placeholder="点击选择开始日期"
            @click="handleShow(1)"
          />
          <svg class="button-svg-icon" aria-hidden="true">
            <use :xlink:href="`#icon-arrowRight`"></use>
          </svg>
        </div>
        <span class="time-split">至</span>
        <div class="flex">
          <van-field
            readonly
            v-model="timeEnd"
            placeholder="点击选择结束日期"
            @click="handleShow(2)"
          />
          <svg class="button-svg-icon" aria-hidden="true">
            <use :xlink:href="`#icon-arrowRight`"></use>
          </svg>
        </div>
      </div>
      <van-calendar v-model="show" @confirm="onConfirm" :min-date="minDate" :max-date="maxDate" :default-date="currentDate"  />
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      show: false,
      timeStart: '',
      timeEnd: '',
      current: 1,
      currentDate: null,
      minDate: new Date(2021, 0, 1),
      maxDate: new Date(2025, 0, 1),
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
      this.converStyle()
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
    },
    handleShow (val) {
      if (this.timeStart) {
        console.log(this.timeStart)
        this.currentDate = new Date(this.timeStart)
      }
      if (this.timeEnd) {
        this.currentDate = new Date(this.timeEnd)
      }
      console.log(this.currentDate)
      this.current = val
      this.show = true
    },
    onConfirm (value) {
      this.show = false;
      const formatDate = (date) => `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
      let data = formatDate(value);
      console.log(this.current, data)
      this.current === 1 ? (this.timeStart = data) : (this.timeEnd = data)
    }
  }
}
</script>

<style lang="scss">
.time-block{
  .van-cell{
    padding: 0;
  }
}
</style>
<style lang="scss" scoped>
.idm-time{
  .time-label{
    width: 100%;
    display: inline-block;
  }
  .time-block{
    display: flex;
    align-items: center;
    padding: 10px;
    .flex{
      display: flex;
      align-items: center;
      border: 1px solid #ccc;
      border-radius: 5px;
      padding: 10px;
    }
    .time-split{
      padding: 0 10px;
    }
  }
  .button-svg-icon{
    width: 30px;
    height: 30px;
  }
}
</style>