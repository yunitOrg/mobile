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
  <div class="integralDetal-box">
    <div class="detail-top" v-if="propData.scoreTopBox">
      <div class="detail-p" v-if="propData.scoreShow">{{propData.scoreAllTitle}}</div>
      <div class="detail-score">
        <span>{{pageData[propData.allField] || pageData.scoreAll}}</span>
        <b>积分</b>
      </div>
    </div>
    <div class="detail-bottom">
      <div class="detail-title" v-if="propData.scoreTitleShow">{{propData.scoreTitleFont}}</div>
      <div class="detail-li" v-for="(item, index) in list" :key="index">
        <div class="detail-left">
          <div class="detail-desc">{{item[propData.titleField] || item.title}}</div>
          <b>{{item[propData.timeField] || item.time}}</b>
        </div>
        <div class="detail-right">+{{item[propData.onlineField] || item.score}}</div>
      </div>
      <ICommonEmpty
          v-if="!isLoading && list.length === 0"
          :moduleObject="moduleObject"
          :propData="propData"
        ></ICommonEmpty>
      <div class="d-flex just-c" v-if="isLoading">
        <van-loading size="24px" vertical>加载中...</van-loading>
      </div>
    </div>
  </div>
  <div class="i-articleDetails-mask" v-if="moduleObject.env === 'develop' && !propData.dataSource" >
    <span>！未绑定数据源</span>
  </div>
</div>
</template>

<script>
import { integralDetailData } from '@/mock/mockData.js';
import ICommonEmpty from '../commonComponents/ICommonEmpty'
export default{
  name: 'IntegralDetal',
  components: {
    ICommonEmpty
  },
  data () {
    return {
      pageData: {},
      list: [],
      isLoading: false,
      moduleObject:{},
      propData:this.$root.propData.compositeAttr||{
        boxtopbg: {
          hex: "#FFFFFF",
          hex8: "#FFFFFFFF"
        },
        scoreTitleShow: true,
        scoreTopBox: true,
        scoreShow: true,
        scoreAllTitle: "已获得积分",
        scoreTitleFont: '获得积分记录',
        topDescStyle: '10px',
        topbox:{
          marginTopVal: "",
          marginRightVal: "",
          marginBottomVal: "",
          marginLeftVal: "",
          paddingTopVal: "20px",
          paddingRightVal: "",
          paddingBottomVal: "40px",
          paddingLeftVal: ""
        },
        liShadown: "0px 0px 10px 0px #e3dede",
        scoreTiBtom: '10px',
        liBox: {
          marginTopVal: "10px",
          marginRightVal: "",
          marginBottomVal: "",
          marginLeftVal: "",
          paddingTopVal: "10px",
          paddingRightVal: "10px",
          paddingBottomVal: "10px",
          paddingLeftVal: "10px"
        },
        liTimeMar: '10px',
        box: {
          marginTopVal: "",
          marginRightVal: "",
          marginBottomVal: "",
          marginLeftVal: "",
          paddingTopVal: "15px",
          paddingRightVal: "10px",
          paddingBottomVal: "",
          paddingLeftVal: "10px"
        },
        boxtopShadow: "0px 0px 10px 0px #e3dede",

      }
    }
  },
  created () {
    this.moduleObject = this.$root.moduleObject
    this.init()
  },
  methods: {
    propDataWatchHandle (propData) {
      this.propData = propData.compositeAttr||{};
      this.init();
    },
    init () {
      console.log(this.propData, '数据')
      if (this.moduleObject.env == "production") {
        this.initData()
      } else {
        this.pageData = integralDetailData
        this.list = integralDetailData.list
      }
      this.converStyleObj()
    },
    initData () {
      let that = this;
      if (this.moduleObject.env == "production") {
        this.isLoading = true;
        if (this.propData.dataSource) {
          IDM.datasource.request(this.propData.dataSource[0]?.id, {
            moduleObject: this.moduleObject
          }, (data) => {
            this.isLoading = false;
            if (data) {
              that.pageData = data;
              let tem = that.propData.liField;
              that.list = data[tem]
            }
          })
        }
      }
    },
    converStyleObj () {
      let styleObject = {},
        topDescStyle = {},
        topStyleScore = {},
        topStyleTips = {},
        bottomStyle = {},
        liBoxStyle = {},
        scoreFont = {},
        liTitleFont = {},
        liTimeFont = {},
        liScoreFont = {},
        topstyleObject={};
      for (const key in this.propData) {
        if (this.propData.hasOwnProperty.call(this.propData, key)) {
          const element = this.propData[key]
          if (!element && element !== false && element != 0) {
              continue
          }
          switch (key) {
            case 'topbox':
              IDM.style.setBoxStyle(styleObject, element)
              break
            case 'boxtopbg':
              styleObject['background-color'] = element && element.hex8
              break
            case 'boxtopShadow':
              styleObject['box-shadow'] = element
              break
            case 'topTitleStyle':
              IDM.style.setFontStyle(topstyleObject, element)
              break
            case 'topDescStyle':
              topDescStyle['padding-top'] = element
              break
            case 'topScoreStyle':
              IDM.style.setFontStyle(topStyleScore, element)
              break
            case 'topScoreTips':
              IDM.style.setFontStyle(topStyleTips, element)
              break
            case 'box':
              IDM.style.setBoxStyle(bottomStyle, element)
              break
            case 'scoreTitle':
              IDM.style.setFontStyle(scoreFont, element)
              break
            case 'scoreTiBtom':
              scoreFont['padding-bottom'] = element
              break
            case 'liShadown':
              liBoxStyle['box-shadow'] = element
              break
            case 'liBox':
              IDM.style.setBoxStyle(liBoxStyle, element)
              break
            case 'liTitleFont':
              IDM.style.setFontStyle(liTitleFont, element)
              break
            case 'liTimeFont':
              IDM.style.setFontStyle(liTimeFont, element)
              break
            case 'liScoreFont':
              IDM.style.setFontStyle(liScoreFont, element)
              break
            case 'liTimeMar':
              liTimeFont['padding-top'] = element
              break
          }
        }
      }
      window.IDM.setStyleToPageHead(this.moduleObject.id + " .detail-top", styleObject);
      window.IDM.setStyleToPageHead(this.moduleObject.id + " .detail-p", topstyleObject);
      window.IDM.setStyleToPageHead(this.moduleObject.id + " .detail-score", topDescStyle);
      window.IDM.setStyleToPageHead(this.moduleObject.id + " .detail-score span", topStyleScore);
      window.IDM.setStyleToPageHead(this.moduleObject.id + " .detail-score b", topStyleTips);
      window.IDM.setStyleToPageHead(this.moduleObject.id + " .detail-bottom", bottomStyle);
      window.IDM.setStyleToPageHead(this.moduleObject.id + " .detail-title", scoreFont);
      window.IDM.setStyleToPageHead(this.moduleObject.id + " .detail-li", liBoxStyle);
      window.IDM.setStyleToPageHead(this.moduleObject.id + " .detail-li .detail-desc", liTitleFont);
      window.IDM.setStyleToPageHead(this.moduleObject.id + " .detail-li b", liTimeFont);
      window.IDM.setStyleToPageHead(this.moduleObject.id + " .detail-li .detail-right", liScoreFont);
    }
  }
}
</script>

<style lang="scss" scoped>
.i-articleDetails-mask {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  span {
    padding: 6px 20px;
    color: #e6a23c;
    background: #fdf6ec;
    border: 1px solid #f5dab1;
    border-radius: 4px;
  }
}
.detail-top{
  .detail-p, .detail-score{
    text-align: center;
  }
  .detail-score b{
    font-weight: normal;
    padding-left: 5px;
  }
}
.detail-li{
  display: flex;
  justify-content: space-between;
  align-items: center;
  .b{
    display: inline-block;
  }
}
</style>
