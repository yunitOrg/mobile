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
    <van-circle
      class="iCircleProgress-wrap"
      v-model="currentRate"
      :rate="rate"
      :fill="propData.fillColor"
      :size="propData.width"
      :color="(propData.proColor||{}).hex8"
      :layer-color="(propData.layerColor||{}).hex8"
      :stroke-width="propData.proWidth"
      :speed="100"
      :clockwise="propData.clockwise"
      :text="text"
    />
  </div>
</template>

<script>
export default {
  name: 'ICircleProgress',
  data () {
    return {
      rate: '30',
      currentRate: 0,
      moduleObject:{},
      propData:this.$root.propData.compositeAttr||{
        proWidth: '80',
        rate: '30',
        width: '70px',
        proColor: {
          hex8: '#3086FB'
        },
        clockwise: true,
        layerColor: {
          hex8: '#f5f5f5'
        },
      }
    }
  },
  computed: {
    text() {
      return this.currentRate.toFixed(0) + '%';
    }
  },
  mounted() {
    this.moduleObject = this.$root.moduleObject;
    this.init()
  },
  methods: {
    propDataWatchHandle(propData) {
      this.propData = propData.compositeAttr || {};
      this.init();
    },
    handleStyle() {
      let styleObject = {},
        navObject = {};
      for (const key in this.propData) {
        if (this.propData.hasOwnProperty.call(this.propData, key)) {
          const element = this.propData[key]
          if (!element && element !== false && element != 0) {
            continue
          }
          switch (key) {
            case 'titleFont':
              IDM.style.setFontStyle(styleObject, element)
              break
          }
        }
      }
      window.IDM.setStyleToPageHead(this.moduleObject.id + " .iCircleProgress-wrap .van-circle__text", styleObject);
    },
    handleSource() {
      if ( this.propData.dataSource && this.propData.dataSource[0] ) {
          IDM.datasource.request(
            this.propData.dataSource[0]?.id,
            {
              moduleObject: this.moduleObject
            },
            (data) => {
             this.rate = data[this.propData.progress]
            }
        )
      } else {
        this.rate = this.propData.rate
      }
    },
    /**
     * 通用的获取表达式匹配后的结果
     */
    getExpressData(dataName,dataFiled,resultData){
      //给defaultValue设置dataFiled的值
      var _defaultVal = undefined;
      if(dataFiled){
        var filedExp = dataFiled;
        filedExp =
          dataName +
          (filedExp.startsWiths("[") ? "" : ".") +
          filedExp;
        var dataObject = { IDM: window.IDM };
        dataObject[dataName] = resultData;
        _defaultVal = window.IDM.express.replace.call(
          this,
          "@[" + filedExp + "]",
          dataObject
        );
      }
      return _defaultVal;
    },
    /**
     * 交互功能：设置组件的上下文内容值
     * @param {
     *  type:"定义的类型，已知类型：pageCommonInterface（页面统一接口返回值）、"
     *  key:"数据key标识，页面每个接口设置的数据集名称，方便识别获取自己需要的数据"
     *  data:"数据集，内容为：字符串 or 数组 or 对象"
     * }
     */
    setContextValue(object) {
      if (object.type != "pageCommonInterface") {
        return;
      }
      //这里使用的是子表，所以要循环匹配所有子表的属性然后再去设置修改默认值
      if (object.key == this.propData.dataName) {
        this.rate = this.getExpressData(this.propData.dataName,this.propData.dataFiled,object.data);
      }
    },
    initData() {
      switch (this.propData.dataSourceType) {
        case 'dataSource':
          this.handleSource()
          break
        case 'pageInterface':
          // 在setContextValue执行
          break
      }
    },
    init() {
      this.initData()
      this.handleStyle()
    }
  }
}
</script>
