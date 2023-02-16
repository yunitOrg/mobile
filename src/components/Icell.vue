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
    <div class="icell-wrap">
      <van-cell :title="propData.titleFont" :value="inforobj.value" @click="handleClick">
        <!-- 使用 right-icon 插槽来自定义右侧图标 -->
        <template #right-icon>
          <svg v-if="propData.titleIcon && propData.titleIcon.length"
              class="icell-icon" aria-hidden="true">
              <use :xlink:href="`#${propData.titleIcon[0]}`"></use>
          </svg>
          <svg-icon v-else icon-class="arrowRight2" className="icell-icon">
          </svg-icon>
        </template>
      </van-cell>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Icell',
  data () {
    return {
      moduleObject: {},
      propData: this.$root.propData.compositeAttr || {
        titleFont: '单元格'
      },
      inforobj: {}
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
            case 'leftFont':
              IDM.style.setFontStyle(leftStyle, element, true);
              break
            case 'rightFont':
              IDM.style.setFontStyle(rightStyle, element, true);
              break
          }
        }
      }
      window.IDM.setStyleToPageHead(this.moduleObject.id + " .icell-wrap .van-cell", styleObject);
      window.IDM.setStyleToPageHead(this.moduleObject.id + " .icell-wrap .van-cell__title span", leftStyle);
      window.IDM.setStyleToPageHead(this.moduleObject.id + " .icell-wrap .van-cell__value span", rightStyle);
      window.IDM.setStyleToPageHead(this.moduleObject.id + " .icell-wrap .icell-icon", tipsStyleObj);
    },
    handleClick () {
      if (this.propData.customFunc && this.propData.customFunc.length > 0) {
        let name = this.propData.customFunc[0].name;
        window[name] && window[name].call(this);
      }
    },
    // 过滤接口参数
    fileterParams(message) {
      let obj = {};
      if (this.propData.paramsMsgFun && this.propData.paramsMsgFun.length > 0) {
        let name = this.propData.paramsMsgFun[0].name
        obj = window[name] && window[name].call(this, {msg: message});
      }
      return obj
    },
    // 接收消息后执行函数
    handleMsgFun () {
      if (this.propData.getMsgHandle && this.propData.getMsgHandle.length > 0) {
        let name = this.propData.getMsgHandle[0].name;
        window[name] && window[name].call(this);
      }
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
      switch (object.type) {
        case this.propData.messageKey:
          console.log('Icell接收消息: ', object.message);
          this.inforobj = this.fileterParams(object.message);
          this.handleMsgFun();
          break;
      }
    },
    init () {
      console.log(this.propData, '数据');
      this.handleStyle();
    }
  }
}
</script>

<style lang="scss" scoped>
.icell-wrap{
  .van-cell{
    align-items: center;
  }
}
</style>

