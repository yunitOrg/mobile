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
    handleStyle () {
      let styleObject = {};
      for (const key in this.propData) {
        if (this.propData.hasOwnProperty.call(this.propData, key)) {
          const element = this.propData[key]
          if (!element && element !== false && element != 0) {
            continue
          }
          switch (key) {
            case 'popHeight':
              styleObject['height'] = element +' !important';
              break
          }
        }
      }
      window.IDM.setStyleToPageHead(this.moduleObject.id + " .dialog-data .van-popup", styleObject);
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
     * 组件通信：发送消息的方法
     * @param {
     *  type:"自己定义的，统一规定的type：linkageResult（组件联动传结果值）、linkageDemand（组件联动传需求值）、linkageReload（联动组件重新加载）
     * 、linkageOpenDialog（打开弹窗）、linkageCloseDialog（关闭弹窗）、linkageShowModule（显示组件）、linkageHideModule（隐藏组件）、linkageResetDefaultValue（重置默认值）",
     *  message:{实际的消息对象},
     *  rangeModule:"为空发送给全部，根据配置的属性中设定的值（值的内容是组件的packageid数组），不取子表的，比如直接 this.$root.propData.compositeAttr["attrKey"]（注意attrKey是属性中定义的bindKey）,这里的格式为：['1','2']"",
     *  className:"指定的组件类型，比如只给待办组件发送，然后再去过滤上面的值"
     *  globalSend:如果为true则全站发送消息，注意全站rangeModule是无效的，只有className才有效，默认为false
     * } object 
     */
    sendBroadcastMessage(object) {
        window.IDM.broadcast && window.IDM.broadcast.send(object);
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
      this.handleStyle();
    }
  }
}
</script>
