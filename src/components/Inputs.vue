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
    <div class="idm-form">
      <InputFactory
        v-for="item in propData.tableComponent"
        :key="item.key"
        :id="moduleObject.id"
        :type="item.type"
        :label="item.label"
        :field="item.field"
        :options="item.options"
        :formData="formData"
        :params="item"
      ></InputFactory>
      <button @click="getParams">获取数据</button>
    </div>
  </div>
</template>

<script type="text/jsx">
import InputFactory from '../commonComponents/form/InputFactory.vue';
export default {
  name: 'idm-form',
  components: {
    InputFactory
  },
  data () {
    return {
      formData: {}, // 表单数据
      moduleObject: {},
      propData: this.$root.propData.compositeAttr||{
        boxWidth: '100%',
        boxHeight: 'auto',
        box: {
          marginTopVal: "",
          marginRightVal: "",
          marginBottomVal: "",
          marginLeftVal: "",
          paddingTopVal: "",
          paddingRightVal: "20px",
          paddingBottomVal: "",
          paddingLeftVal: "20px"
        },
        tableComponent: [
          {
            key: '1',
            type: 'input',
            labelShow: true,
            field: 'input',
            label: '文本',
            disabled: false,
            placeholder: '请输入用户名',
            checkField: [{name: 'search'}],
            labelWidth: '100px',
            labelHeight: 'auto',
            labelBlock: false,
            inputAlign: 'right',
            required: true,
            labelFont: {
              fontColors: {
                  hex: "#000000"
              },
              fontSize: 14,
              fontSizeUnit: "px"
            },
            labelBox: {
              marginTopVal: "",
              marginRightVal: "",
              marginBottomVal: "",
              marginLeftVal: "",
              paddingTopVal: "",
              paddingRightVal: "0",
              paddingBottomVal: "",
              paddingLeftVal: "0"
            }
          },
          {
            key: '2',
            type: 'password',
            field: 'password',
            labelShow: true,
            disabled: false,
            labelBlock: true,
            label: '旧密码',
            placeholder: '请输入旧密码',
            labelWidth: '100px',
            inputAlign: 'right',
            labelHeight: 'auto',
          },
          {
            key: '3',
            type: 'switch',
            field: 'switch',
            labelShow: true,
            label: '开关',
            disabled: false
          },
          {
            key: '4',
            type: 'checkbox',
            labelShow: true,
            label: '复选框',
            field: 'checkbox',
            disabled: false,
            labelBlock: true
          },
          {
            key: '5',
            type: 'textarea',
            labelShow: true,
            label: '意见建议',
            field: 'textarea',
            autosize: true,
            inputAlign: 'right',
            labelWidth: '150px',
            labelHeight: 'auto',
            rows: 3,
            maxlength: 50,
            showWordLimit: true,
            disabled: false
          },
          {
            key: '6',
            type: 'sendPws',
            labelShow: true,
            label: '发送验证码',
            maxTime: 60,
            placeholder: '请输入手机号',
            disabled: false,
            pwdWidth: '35%',
            pwdHeight: '30px'
          }
        ]
      }
    }
  },
  provide () {
    return {
      propData: this.propData
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
      console.log(this.propData, '数据源')
      let styleObject = {};
      for (const key in this.propData) {
        if (this.propData.hasOwnProperty.call(this.propData, key)) {
          const element = this.propData[key]
          if (!element && element !== false && element != 0) {
            continue
          }
          switch (key) {
            case 'boxWidth':
              styleObject['width'] = element;
              break
            case 'boxHeight':
              styleObject['height'] = element;
              break
            case 'box':
              IDM.style.setBoxStyle(styleObject, element)
              break
            case 'boxBg':
              if (element) {
                styleObject['background-color'] = element.hex
              }
            break
          }
        }
      }
      window.IDM.setStyleToPageHead(this.moduleObject.id + " .idm-form", styleObject);
      this.sendBroadcastMessage({
        type: 'sendFormData',
        rangeModule: this.propData.triggerComponents && this.propData.triggerComponents.map(el => el.moduleId),
        message: this.formData
      })
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
    getParams () {
      console.log(this.formData, '数据')
    }
  }
}
</script>