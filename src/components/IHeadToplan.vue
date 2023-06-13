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
    <div class="iheadtoplan-wrap">
      <div class="iheadplan-bg"></div>
      <div class="plan-top">
        <div @click="goback">
          <svg-icon icon-class="arrowLeft" class-name="plan-svg"></svg-icon>
        </div>
        <span>{{propData.navTitle}}</span>
      </div>
      <div class="ihead-title">
        <img :src="getImageUrl()" class="common-svgimg" alt="">
        <span class="pro-title">{{ propData.title }}</span>
      </div>
      <div class="ihead-cen">
        <div class="ihead-line">
          <div class="ihead-san" >
            <div>
              <img src="../assets/icon1.png" alt="">
              <span class="ihead-ti">{{(pageobj['obj1'] || {}).name}}</span>
            </div>
            <span class="ihead-num">{{(pageobj['obj1'] || {}).num}} <i> {{(pageobj['obj1'] || {}).unit}}</i></span>
          </div>
          <div class="ihead-san">
            <div>
              <img src="../assets/icon2.png" alt="">
              <span class="ihead-ti">{{(pageobj['obj2'] || {}).name}}</span>
            </div>
            <span class="ihead-num">{{(pageobj['obj2'] || {}).num}} <i> {{(pageobj['obj2'] || {}).unit}}</i></span>
          </div>
        </div>
        <div class="ihead-line">
          <div class="ihead-san">
            <div>
              <img src="../assets/icon3.png" alt="">
              <span class="ihead-ti">{{(pageobj['obj3'] || {}).name}}</span>
            </div>
            <span class="ihead-num">{{(pageobj['obj3'] || {}).num}} <i> {{(pageobj['obj3'] || {}).unit}}</i></span>
          </div>
          <div class="ihead-san">
            <div>
              <img src="../assets/icon4.png" alt="">
              <span class="ihead-ti">{{(pageobj['obj4'] || {}).name}}</span>
            </div>
            <span class="ihead-num">{{(pageobj['obj4'] || {}).num}} <i> {{(pageobj['obj4'] || {}).unit}}</i></span>
          </div>
        </div>
      </div> 
      <div class="ihead-fot">
        <div class="iheadtop-hei">
          <div class="ihead-left">
            <img src="../assets/icon5.png" alt="">
            <span>{{propData.tipTitle}}</span>
          </div>
          <div class="ihead-right">
            <van-circle
              class="ihead-circle"
              v-model="currentRate"
              :rate="pageobj.rate"
              :color="(propData.proColor||{}).hex8"
              :layer-color="(propData.layerColor||{}).hex8"
              :stroke-width="propData.proWidth"
              :speed="100"
              :text="text"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'IHeadToplan',
  data () {
    return {
      pageobj: {},
      currentRate: 0,
      moduleObject:{},
      propData:this.$root.propData.compositeAttr||{
        navTitle: '会议统计',
        title: '会议概况',
        tipTitle: '会议室使用率',
        rate: '30',
        layerColor: {
          hex8: '#ffffff'
        },
        proColor: {
          hex8: '#3086FB'
        },
        proWidth: '80',
        width: '100%',
        height: '357px'
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
    // 返回
    goback() {
      if (this.propData.customBack && this.propData.customBack.length > 0) {
        const funcName = this.propData.customBack[0].name
        window[funcName].call(this, {
          _this: this
        }) || {}
      }
    },
    getImageUrl() {
      return IDM.url.getModuleAssetsWebPath(require(`../assets/rect.png`), this.moduleObject)
    },
    propDataWatchHandle(propData) {
      this.propData = propData.compositeAttr || {};
      this.init();
    },
    handleStyle() {
      let styleObject = {};
      for (const key in this.propData) {
        if (this.propData.hasOwnProperty.call(this.propData, key)) {
          const element = this.propData[key]
          if (!element && element !== false && element != 0) {
            continue
          }
          switch (key) {
            case 'width':
              styleObject['width'] = element
              break
            case 'height':
              styleObject['height'] = element
              break
          }
        }
      }
      window.IDM.setStyleToPageHead(".iheadtoplan-wrap", styleObject);
    },
    getMockData() {
      this.pageobj = {
        obj1: {
          name: '会议总数',
          num: '234',
          unit: '个'
        },
        obj2: {
          name: '会议人次',
          num: '948',
          unit: '人次'
        },
        obj3: {
          name: '会议时长',
          num: '767',
          unit: '小时'
        },
        obj4: {
          name: '会议室总数',
          num: '22',
          unit: '个'
        },
        rate: '40'
      }
    },
    initData() {
      if (this.moduleObject.env !== 'production') {
        this.getMockData();
        return
      }
      let params = {}
      if (this.propData.paramsFunc && this.propData.paramsFunc.length > 0) {
        const funcName = this.propData.paramsFunc[0].name
        params = window[funcName].call(this, {
          params: this.propData.paramsFunc[0].param,
          _this: this
        }) || {}
      }
      if (this.propData.dataSource && this.propData.dataSource[0]) {
        IDM.datasource.request(
          this.propData.dataSource[0]?.id,
          {
            moduleObject: this.moduleObject,
            param: {
              ...params
            }
          },
          (data) => {
            this.pageobj = data;
          }
        )
      }
    },
    init() {
      this.initData()
      this.handleStyle();
    }
  }
}
</script>

<style lang="scss">
.ihead-circle{
  .van-circle__text{
    color: #fff;
    font-size: 12px;
  }
}
</style>

<style scoped lang="scss">
.iheadtoplan-wrap{
  position: relative;
  .iheadplan-bg{
    width: 100%;
    height: 100%;
    background-image: url('../assets/bgbg.png');
    background-repeat: no-repeat;
    background-size: 100% 100%;
  }
  .plan-svg{
    position: absolute;
    left: 15px;
    top: 50%;
    transform: translateY(-50%);
    font-size: 20px;
    color: #000000;
  }
  .plan-top{
    position: absolute;
    top: 0;
    width: 100%;
    height: 46px;
    line-height: 46px;
    text-align: center;
    span{
      font-size: 16px;
      color: #333333;
    }
  }
  .ihead-title{
    position: absolute;
    top: 63px;
    width: 100%;
    padding: 0 20px;
    display: flex;
    align-items: center;
    img{
      display: inline-block;
      width: 5px;
      height: 20px;
      margin-right: 10px;
    }
    .pro-title{
      font-size: 16px;
      color: #2B5288;
      font-weight: 600;
    }
  }
  .ihead-cen{
    width: 100%;
    position: absolute;
    left: 0;
    top: 100px;
    padding: 10px 20px;
    display: flex;
    flex-direction: column;
    .ihead-line:nth-child(1){
      border-bottom: 1px solid rgba(198,220,233,0.7);
     .ihead-san{
      margin-top:10px;padding-bottom:10px
     }  
    }
    .ihead-line:nth-child(2){
      .ihead-san{
        padding-top:10px;
      }
    }
    .ihead-line{
      width: 100%;
      display: flex;
      .ihead-san:nth-child(1){
        border-right: 1px solid rgba(198,220,233,0.7);
      }
      .ihead-san:nth-child(3){
        border-right: 1px solid rgba(198,220,233,0.7);
      }
      .ihead-san{
        width: 50%;
        margin-left: 8%;
        img{
          width: 28px;
          height: 28px;
        }
      }
      .ihead-ti{
        font-size: 16px;
        color: #5B6879;
        margin-left: 8px;
      }
      .ihead-num{
        display: inline-block;
        font-size: 26px;
        color: #333333;
        margin-top: 4px;
        font-weight: 600;
        i{
          font-weight: 400;
          font-size: 16px;
          font-style: normal;
        }
      }
    }
  }
  .ihead-fot{
    width: 100%;
    height: 80px;
    position: absolute;
    bottom: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    .iheadtop-hei{
      width: 80%;
      height: 66%;
      background-color: #9CC3F8;
      border-radius: 5px;
      padding: 10px 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }
  .ihead-left{
    img{
      width: 30px;
      height: 30px;
    }
    span{
      font-size: 16px;
      color: #fff;
      margin-left: 20px;
    }
  }
  .ihead-right{
    display: flex;
  }
  .ihead-circle{
    color: #fff;
    width: 38px;
  }
}
</style>
