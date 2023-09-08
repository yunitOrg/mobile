<template>
  <div idm-ctrl="idm_module" :id="moduleObject.id" :idm-ctrl-id="moduleObject.id" class="ISignInForm_app">
    <div v-if="status == 1" class="form">
      <div v-if="propData.formTitle" class="form_title">{{ propData.formTitle }}</div>
      <van-cell-group>
        <van-field v-for="(item,index) in propData.formList" :key="index" v-model="formData[item.key]" :label="item.label" :input-align="propData.inputAlign" :label-width="item.labelWidth" />
      </van-cell-group>
      <div v-if="propData.submitText" class="button_block">
        <van-button @click="save()" type="primary" block>{{ propData.submitText }}</van-button>
      </div>
    </div>
    <div v-else class="result">
      <div class="icon_block">
        <SvgIcon icon-class="signIn"></SvgIcon>
      </div>
      <div v-if="propData.signInSuccessText" class="text">{{ propData.signInSuccessText }}</div>
    </div>
  </div>
</template>

<script>
import signInForm from '@/mixins/signInForm.js'
import SvgIcon from '../icons/SvgIcon.vue';

export default {
  name: 'ISignInForm',
  mixins: [signInForm],
  components: {
    SvgIcon
  },
  data(){
    return {
      moduleObject:{},
      propData:this.$root.propData.compositeAttr||{
        formTitle: '签到表单',
        formList: [
          {
            key: 'userName',
            label: '姓名'
          },
          {
            key: 'unitName',
            label: '单位'
          }
        ],
        signInSuccessText: '签到成功'
      },
      status: 1,//1-表示表单状态；2-表示签到结果状态
      formData: {

      }
    }
  },
  props: {
  },
  created() {
    this.moduleObject = this.$root.moduleObject
    this.convertAttrToStyleObject();
    this.initCustomFunction()
  },
  mounted() {
    this.$nextTick(function(params) {
      
    });
  },
  destroyed() {},
  methods:{
    initCustomFunction() {
      let that = this;
      if(this.moduleObject.env=="develop"){
        return;
      }
      let urlObject = window.IDM.url.queryObject(),
      pageId = window.IDM.broadcast&&window.IDM.broadcast.pageModule?window.IDM.broadcast.pageModule.id:"";
      var clickFunction = this.propData.clickFunctionCreated;
      clickFunction&&clickFunction.forEach(item=>{
        window[item.name]&&window[item.name].call(this,{
          urlData:urlObject,
          pageId,
          customParam:item.param,
          _this:this,
        });
      })
    },
    save() {
      let that = this;
      if(this.moduleObject.env=="develop"){
        return;
      }
      let urlObject = window.IDM.url.queryObject(),
      pageId = window.IDM.broadcast&&window.IDM.broadcast.pageModule?window.IDM.broadcast.pageModule.id:"";
      var clickFunction = this.propData.clickFunction;
      clickFunction&&clickFunction.forEach(item=>{
        window[item.name]&&window[item.name].call(this,{
          urlData:urlObject,
          pageId,
          customParam:item.param,
          _this:this,
          formData: this.formData
        });
      })
    },
    /**
     * 提供父级组件调用的刷新prop数据组件
     */
    propDataWatchHandle(propData){
      this.propData = propData.compositeAttr||{};
      this.convertAttrToStyleObject();
    },
    /**
     * 把属性转换成样式对象
     */
    
    /**
     * 重新加载
     */
    reload(){
      //请求数据源
      this.initData();
    },
    /**
     * 加载动态数据
     */
    initData(){
      let that = this;
      //所有地址的url参数转换
      var params = that.commonParam();
      switch (this.propData.dataSourceType) {
        case "customInterface":
          this.propData.customInterfaceUrl&&window.IDM.http.get(this.propData.customInterfaceUrl,params)
          .then((res) => {
            //res.data
            that.$set(that.propData,"fontContent",that.getExpressData("resultData",that.propData.dataFiled,res.data));
            // that.propData.fontContent = ;
          })
          .catch(function (error) {
            
          });
          break;
        case "pageCommonInterface":
          //使用通用接口直接跳过，在setContextValue执行
          break;
        case "customFunction":
          if(this.propData.customFunction&&this.propData.customFunction.length>0){
            var resValue = "";
            try {
              resValue = window[this.propData.customFunction[0].name]&&window[this.propData.customFunction[0].name].call(this,{...params,...this.propData.customFunction[0].param,moduleObject:this.moduleObject});
            } catch (error) {
            }
            that.propData.fontContent = resValue;
          }
          break;
      }
    },
    /**
     * 通用的获取表达式匹配后的结果
     */
    
    /**
     * 文本点击事件
     */
    textClickHandle(){
      let that = this;
      if(this.moduleObject.env=="develop"){
        return;
      }
      let urlObject = window.IDM.url.queryObject(),
      pageId = window.IDM.broadcast&&window.IDM.broadcast.pageModule?window.IDM.broadcast.pageModule.id:"";
      var clickFunction = this.propData.clickFunction;
      clickFunction&&clickFunction.forEach(item=>{
        window[item.name]&&window[item.name].call(this,{
          urlData:urlObject,
          pageId,
          customParam:item.param,
          _this:this
        });
      })
    },
    receiveBroadcastMessage(object){
      console.log("组件收到消息",object)
    },
    sendBroadcastMessage(object){
        window.IDM.broadcast&&window.IDM.broadcast.send(object);
    },
    setContextValue(object) {
      console.log("统一接口设置的值", object);
    }
  }
}
</script>
<style lang="scss" scoped>
.ISignInForm_app{
  padding-top: 50px;
  .form{
    .form_title{
      margin-bottom: 40px;
      padding: 12px;
      font-size: 16px;
      color: #333;
      text-align: center;
    }
    .button_block{
      margin-top: 40px;
      padding: 0 20px;
    }
  }
  .result{
    padding-top: 50px;
    text-align: center;
    .icon_block{
      .svg-icon{
        color: #07c160;
        font-size: 140px;
        fill: currentColor;
      }
    }
    .text{
      margin-top: 10px;
    }
  }
}
</style>