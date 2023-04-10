<template>
  <!--
    根目录规范(必须不能为空)：
    idm-ctrl：控件类型 drag_container：容器，drag_container_inlieblock：行内容器，idm_module：非容器的组件
    id：使用moduleObject.id，如果id不使用这个将会被idm-ctrl-id属性替换
    idm-ctrl-id：组件的id，这个必须不能为空
  -->
  <div idm-ctrl="idm_module" :id="moduleObject.id" :idm-ctrl-id="moduleObject.id">
    <div class="dialog-data">
      <van-popup
        v-model="show"
        position="bottom"
        :style="{ height: '50%' }"
      >
      <van-datetime-picker
        v-model="currentDate"
        :type="propData.type"
        :title="propData.title"
        :min-date="minDate"
        :max-date="maxDate"
        @cancel="handlecancel"
        @confirm="handleconfirm"
      />
      </van-popup>
    </div>
  </div>
</template>

<script>
export default{
  name: 'IDialogDate',
  data () {
    return {
      show: false,
      moduleObject: {},
      propData: this.$root.propData.compositeAttr || {
        title: '选择年月日',
        type: 'date',
        currentDate: "new Date(2021, 0, 17)",
        minDate: "new Date(2020, 0, 1)",
        maxDate: "new Date(2025, 5, 1)"
      }
    }
  },
  computed: {
    minDate () {
      let time = eval(this.propData.minDate)
      return time
    },
    maxDate () {
      let time = eval(this.propData.maxDate);
      return time
    },
    currentDate () {
      let time = eval(this.propData.currentDate);
      return time
    }
  },
  mounted() {
    this.moduleObject = this.$root.moduleObject;
    this.init()
  },
  methods: {
    handlecancel () {
      this.show = false;
    },
    handleconfirm (val) {
      // 发送消息给组件
      this.sendBroadcastMessage({
        type: this.propData.receiveKey,
        rangeModule: this.propData.triggerComponents && this.propData.triggerComponents.map(el => el.moduleId),
        message: val
      })
      this.show = false;
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
    receiveBroadcastMessage(object) {
      console.log(object, 'IDialogDate测试消息');
      switch (object.type) {
        case this.propData.sendKey:
          console.log('IDialogDate接收消息格式', object.message);
          this.show = object.message;
          break;
      }
    },
    init () {

    }
  }
}
</script>
