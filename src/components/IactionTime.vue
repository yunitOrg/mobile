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
    <div class="actiontime-wrap">
      <div class="action actionbox" @click="handleShow(1)">
        <span>活动类型：</span>
        <div>{{form.active['name']}}</div>
      </div>
      <div class="action timebox" @click="handleShow(2)">
        <span>召开时间：</span>
        <div>{{form.time}}</div>
      </div>
      <van-action-sheet v-model="showactive" :actions="actions" @select="onSelect" cancel-text="取消" />
      <van-calendar v-model="showtime" :show-confirm="false" @confirm="onConfirm" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'IactionTime',
  data () {
    return {
      moduleObject: {},
      propData: this.$root.propData.compositeAttr || {
        height: '45px'
      },
      form: {
        active: {name: ''},
        time: ''
      },
      showactive: false,
      showtime: false,
      actions: [],
    }
  },
  created() {
    this.moduleObject = this.$root.moduleObject
    this.init();
  },
  methods: {
    propDataWatchHandle (propData) {
      this.propData = propData.compositeAttr || {};
      this.init();
    },
    handleStyle() {
      let styleObject = {},
        leftStyle = {},
        rightStyle = {},
        tipsStyleObj = {};
      for (const key in this.propData) {
        if (this.propData.hasOwnProperty.call(this.propData, key)) {
          const element = this.propData[key]
          if (!element && element !== false && element != 0) {
            continue
          }
          switch (key) {
            case 'width':
              styleObject['width'] = element;
              break
            case 'height':
              styleObject['height'] = element;
              break
            case 'ulbox':
              IDM.style.setBoxStyle(styleObject, element, true)
              break
            case 'bgColor':
              styleObject['background-color'] = element && element.hex8;
              break
            case 'boxShadow':
              styleObject['box-shadow'] = element;
              break
            case 'boxborder':
              IDM.style.setBorderStyle(styleObject, element, true);
              break
          }
        }
      }
      window.IDM.setStyleToPageHead(this.moduleObject.id + " .actiontime-wrap", styleObject);
    },
    // 过滤接口参数
    fileterParams() {
      let obj = {};
      if (this.propData.customFunc && this.propData.customFunc.length > 0) {
        let name = this.propData.customFunc[0].name
        obj = window[name] && window[name].call(this);
      }
      return obj
    },
    initData () {
      if (this.moduleObject.env == "production") {
        if (this.propData.dataSource) {
          const routerParams = this.fileterParams();
          IDM.datasource.request(this.propData.dataSource[0]?.id, {
            moduleObject: this.moduleObject,
            param: { ...routerParams }
          }, (data) => {
            if (data) {
              this.actions = data;
            }
          })
        }
      } else {
        this.actions = [
          { name: '选项一', value: 1 },
          { name: '选项二', value: 2 },
          { name: '选项三', value: 3 },
        ]
      }
    },
    init () {
      console.log(this.propData, '数据');
      this.handleStyle();
      this.initData();
    },
    handleShow (type) {
      switch (type) {
        case 1:
          this.showactive = true;
          break
        case 2:
          this.showtime = true;
          break
      }
    },
    onSelect (item) {
      this.showactive = false;
      this.form.active = item;
      this.handleSendMsg();
    },
    onConfirm (item) {
      let month = item.getMonth() + 1;
      const formatDate = (date) => `${date.getFullYear()}-${month<10?'0'+month:month}-${date.getDate()}`;
      this.form.time = formatDate(item);
      this.showtime = false;
      this.handleSendMsg();
    },
    handleSendMsg () {
      if (this.propData.triggerComponents && this.propData.triggerComponents.length > 0) {
        this.sendBroadcastMessage({
          type: this.propData.sendKey,
          rangeModule: this.propData.triggerComponents && this.propData.triggerComponents.map(el => el.moduleId),
          message: this.form
        })
      }
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
  }
}
</script>

<style lang="scss" scoped>
.actiontime-wrap{
  display: flex;
  justify-content: center;
  align-items: center;
  .action{
    flex: 1;
    display: flex;
    justify-content: center;
  }
}
</style>
