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
      <div class="form-title" v-if="propData.boxTitleShow">
        <svg class="form-icon" aria-hidden="true" v-if="propData.boxtitleIcon && propData.boxtitleIcon.length">
          <use :xlink:href="`#${propData.boxtitleIcon[0]}`"></use>
        </svg>
        <svg-icon v-else icon-class="redFlag" className="form-icon"></svg-icon>
        {{showTitle}}
      </div> 
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
        :moduleObject="moduleObject"
        @callFunc="handleClickCall"
      ></InputFactory>
    </div>
    <div class="form-btn-box" v-if="propData.btnFootShow">
      <div class="form-btn" v-for="(item, index) in showBtnData" :key="index" :style="computedStyle(item)" @click="handleSubmit(item)">{{item.tab}}</div>
    </div>
    <div class="d-flex just-c" v-if="isLoading">
      <van-loading size="24px" vertical>加载中...</van-loading>
    </div>
  </div>
</template>

<script type="text/jsx">
import { getDatasInterfaceUrl } from '@/api/config'
import InputFactory from '../commonComponents/form/InputFactory.vue';
export default {
  name: 'idm-form',
  components: {
    InputFactory
  },
  data () {
    return {
      isLoading: false,
      formData: {}, // 表单数据
      moduleObject: {},
      propData: this.$root.propData.compositeAttr||{
        boxWidth: '100%',
        boxHeight: 'auto',
        boxTitleShow: true,
        btnFootShow: true,
        boxIconShow: true,
        titleWidth: 'auto',
        titleHeight: '40px',
        boxTitle: '第一次党员大会',
        btnTable: [
          {
            key: '1',
            tab: '请假',
            itemWidth: '100px',
            itemHeight: '40px'
          },
          {
            key: '1',
            tab: '立即报名',
            itemWidth: '100px',
            itemHeight: '40px'
          }
        ],
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
            field: 'name',
            showAlign: 'left',
            label: '文本',
            disabled: false,
            placeholder: '请输入用户名',
            checkField: [{name: 'search'}],
            labelWidth: '100px',
            labelHeight: 'auto',
            imgWidth: '30px',
            imgHeight: '30px',
            imgRadius: true,
            isImg: true,
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
            showAlign: 'left',
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
            showAlign: 'left',
            disabled: false,
            labelWidth: '100px',
            labelBlock: true,
          },
          {
            key: '4',
            type: 'checkbox',
            labelShow: true,
            labelWidth: '100px',
            inputAlign: 'right',
            showAlign: 'left',
            label: '复选框',
            field: 'checkbox',
            disabled: false
          },
          {
            key: '5',
            type: 'textarea',
            labelShow: true,
            label: '意见建议',
            showAlign: 'left',
            field: 'textarea',
            autosize: true,
            inputAlign: 'left',
            labelBlock: true,
            labelWidth: '150px',
            labelHeight: 'auto',
            required: true,
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
            required: true,
            maxTime: 60,
            placeholder: '请输入手机号',
            disabled: false,
            pwdWidth: '35%',
            pwdHeight: '30px'
          },
          {
            key: '7',
            type: 'calendar',
            labelShow: true,
            labelWidth: '100px',
            field: 'calendar',
            label: '时间范围',
            showAlign: 'left',
            required: true,
            inputAlign: 'right',
            labelBlock: true,
            placeholder: '请输入日期',
            disabled: false,
            dateType: "range",
            dateRangeStart: 'new Date(2010, 0, 1)',
            dateRangeEnd: 'new Date(2033, 0, 31)',
            datePosition: "bottom"
          },
          {
            key: '8',
            type: 'actionSheet',
            labelShow: true,
            labelWidth: '100px',
            field: 'sssshh',
            selectType: 'static',
            selectOptions: "[{ name: '全部', value: 0 }, { name: '新款商品', value: 1 }, { name: '活动商品', value: 2 }]",
            label: '意见类型',
            inputAlign: 'right',
            disabled: true,
            showAlign: 'left',
            placeholder: '请选择类型',
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
    this.init()
    this.getPrevPageRouterParams();
  },
  computed: {
    showTitle () {
      let tem = this.propData.titleFile,
        str = '';
      if (this.formData[tem]) {
        str = this.formData[tem]
      } else {
        str = this.propData.boxTitle
      }
      return str
    },
    showBtnData () {
      let result = [];
      if (this.propData.customBtnShow && this.propData.customBtnShow.length > 0) {
        const name = this.propData.customBtnShow[0].name
        result = window[name] && window[name].call(this, this.formData, this.propData.btnTable);
      } else {
        result = this.propData.btnTable
      }
      return result
    }
  },
  methods: {
    propDataWatchHandle (propData) {
      this.propData = propData.compositeAttr||{};
      this.init();
    },
    computedStyle (item) {
      let obj = {}
      for (const key in item) {
        if (item.hasOwnProperty.call(item, key)) {
          const element = item[key]
          if (!element && element !== false && element != 0) {
              continue
          }
          switch (key) {
            case 'itemWidth':
              obj['width'] = element
              break
            case 'itemHeight':
              obj['height'] = element;
              obj['line-height'] = element;
              break
            case 'itemFontStyle':
              IDM.style.setFontStyle(obj, element)
              break
            case 'itemBg':
              obj['background-color'] = element && element.hex8
              break
            case 'itemBorder':
              IDM.style.setBorderStyle(obj, element)
              break
            case 'btnSplit':
              obj['margin-right'] = element
          }
        }
      }
      return obj
    },
    footBtnStyle () {
      let styleObject = {};
      for (const key in this.propData) {
        if (this.propData.hasOwnProperty.call(this.propData, key)) {
          const element = this.propData[key]
          if (!element && element !== false && element != 0) {
            continue
          }
          switch (key) {
            case 'btnFootBoxWidth':
              styleObject['width'] = element;
              break
            case 'btnFootBoxHeight':
              styleObject['height'] = element;
              break
            case 'btnFootBox':
              IDM.style.setBoxStyle(styleObject, element);
              break
            case 'btnFootBoxColor':
              styleObject['background-color'] = element && element.hex8;
              break
            case 'btnFootBoxShadown':
              styleObject['box-shadow'] = element;
              break
            case 'btnFootBoxBorder':
              IDM.style.setBorderStyle(styleObject, element);
              break
            case 'btnTop':
              styleObject['top'] = element;
              break
            case 'btnRight':
              styleObject['right'] = element;
              break
            case 'btnBottom':
              styleObject['bottom'] = element;
              break
            case 'btnLeft':
              styleObject['left'] = element;
              break
          }
        }
      }
      window.IDM.setStyleToPageHead(this.moduleObject.id + " .form-btn-box", styleObject);
    },
    init () {
      this.footBtnStyle();
      console.log(this.propData, this.formData, '数据源')
      let styleObject = {};
      let styleTitleObj = {};
      let styleIconObj = {};
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
            case 'boxShadow':
              styleObject['box-shadow'] = element
              break
            case 'boxBorder':
              IDM.style.setBorderStyle(styleObject, element)
              break
            case 'componentBox':
              IDM.style.setBoxStyle(styleTitleObj, element)
              break
            case 'componentBorder':
              IDM.style.setBorderStyle(styleTitleObj, element)
              break
            case 'titleWidth':
              styleTitleObj['width'] = element;
              break
            case 'titleHeight':
              styleTitleObj['height'] = element;
              break
            case 'titleFont':
              IDM.style.setFontStyle(styleTitleObj, element)
              break
            case 'titleIconColor':
              styleIconObj['color'] = element && element.hex + ' !important'
              styleIconObj['fill'] = element && element.hex + ' !important'
              break
            case 'titleIconSize':
              styleIconObj['width'] = element + 'px'
              styleIconObj['height'] = element + 'px'
              break
          }
        }
      }
      window.IDM.setStyleToPageHead(this.moduleObject.id + " .idm-form", styleObject);
      window.IDM.setStyleToPageHead(this.moduleObject.id + " .form-title", styleTitleObj);
      window.IDM.setStyleToPageHead(this.moduleObject.id + " .form-icon", styleIconObj);
      // 组件传递数据给其他组件方法、1：消息 sendBroadcastMessage   2：传递到上下文 getContextValue
      this.sendBroadcastMessage({
        type: 'sendFormData',
        rangeModule: this.propData.triggerComponents && this.propData.triggerComponents.map(el => el.moduleId),
        message: this.formData
      })
      
      this.handleBackData();
      if (!this.propData.labelBorderShow) {
        window.IDM.setStyleToPageHead(this.moduleObject.id + " .idm-form .input-component:last-child", {
          "border": 0
        });
      }
    },
    // 获取router的数据
    getRouterParams () {
      return this.moduleObject.routerId ? IDM.router.getParam(this.moduleObject.routerId): {};
    },
    // 回填从router获取到的数据
    getPrevPageRouterParams () {
      const obj = this.getRouterParams();
      if (!obj.$el) {
        this.formData = obj
      }
    },
    // 回填数据
    handleBackData () {
      if (this.moduleObject.env == "production") {
        const obj = this.getRouterParams();
        const routerParams = !obj.$el ? obj : {};
        this.isLoading = true;
        this.propData.dataSource &&
          IDM.http
            .post(
              getDatasInterfaceUrl,
              {
                id: this.propData.dataSource && this.propData.dataSource.value,
                ...routerParams
              },
              {
                headers: {
                  "Content-Type": "application/json;charset=UTF-8",
                },
              }
            )
            .then((res) => {
              if (res.status == 200 && res.data.code == 200) {
                  this.formData = res.data.data;
              } else {
                  IDM.message.error(res.data.message)
              }
            })
      }
    },
    /**
     * 交互功能：获取需要返回的值，返回格式如下
     * @return {
     *    type:"success",
     *    message:"type为失败的时候原因",
     *    key:"定义的key标识，一般组件定义了一个属性，然后获取指定属性填写的值，这样返回后就能识别对应的字段或者元数据",
     *    data:{要返回的值，内容为：字符串 or 数组 or 对象},
     * }
     */
    getContextValue ()  {
      // 接收到跳转页面的router参数
      const routerParams = this.getRouterParams(),
        resultData = Object.assign(routerParams, this.formData);
      let result = {
        type: "success",
        message: '',
        key: this.propData.formFiledKey || this.propData.ctrlId,
        data: resultData
      };
      return result;
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
    * 通过自定义函数
    * name：属性名 会根据此属性名去propData中获取
    * customFunctionList: 忽略name直接传自定义函数集合
    */
     changeEventFunHandle (name, customFunctionList, params) {
      let that = this;
      let customHandle = customFunctionList || that.propData[name];
      customHandle && customHandle.forEach(item => {
        window[item.name] && window[item.name].call(that, {
          _that: that,
          ...params
        });
      });
    },
    handleClickCall (val) {
      switch (val) {
        case 'VantsendPws':
          this.changeEventFunHandle("sendBtnClick", "", {data: val});
          break
      }
    },
    // 按钮
    handleSubmit (row) {
      let that = this;
      let { customClickFunc, key } = row;
      if (customClickFunc && customClickFunc.length > 0 ) {
        customClickFunc.forEach(item => {
          window[item.name] && window[item.name].call(that, {
            form: this.formData,
            router: this.getRouterParams(),
            value: key
          });
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.form-icon{
  margin-right: 10px;
}
.form-btn-box{
  position: fixed;
  display: flex;
  .form-btn{
    cursor: pointer;
  }
}
</style>
