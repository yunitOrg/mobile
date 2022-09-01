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
        :type="item.type"
        :label="item.label"
        :field="item.field"
        :options="item.options"
        :formData="formData"
        :params="item"
      ></InputFactory>
    </div>
    <button @click="getParams">获取数据</button>
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
      propData: this.$root.propData.compositeAttr||{
        tableComponent: [
          {
            key: '1',
            type: 'input',
            labelShow: true,
            field: 'input',
            label: '文本',
            disabled: true,
            placeholder: '请输入用户名',
            labelWidth: '100px',
            labelHeight: 'auto',
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
            disabled: true,
            label: '旧密码',
            placeholder: '请输入旧密码',
            labelWidth: '100px',
            labelHeight: 'auto',
          },
          {
            key: '3',
            type: 'switch',
            field: 'switch',
            labelShow: true,
            label: '开关',
            disabled: true
          },
          {
            key: '4',
            type: 'checkbox',
            labelShow: true,
            label: '复选框',
            field: 'checkbox',
          },
          {
            key: '5',
            type: 'textarea',
            labelShow: true,
            label: '意见建议',
            field: 'textarea',
            autosize: true,
            labelWidth: '150px',
            labelHeight: 'auto',
            rows: 3,
            maxlength: 50,
            showWordLimit: true
          },
          {
            key: '6',
            type: 'sendPws',
            labelShow: true,
            label: '发送验证码',
            maxTime: 60,
            placeholder: '请输入手机号'
          }
        ]
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
      console.log(this.propData, '数据源')
    },
    getParams () {
      console.log(this.formData, '数据')
    }
  }
}
</script>