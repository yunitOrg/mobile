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
    <div class="idm-showform">
      <div class="form-top">
        <div class="form-title">
          <svg class="form-icon" aria-hidden="true">
            <use :xlink:href="`#icon-commentStar`"></use>
          </svg>
          第一次党员大会
        </div>
        <div class="form-ul">
          <li v-for="(item, index) in list" :key="index">
            <span>{{item.num}}</span>
            <div>{{item.label}}</div>
          </li>
        </div>
      </div>
      <div class="form-tip">基本信息</div>
      <div class="form-detail">
        <div class="form-label form-column">
          <div class="form-label-title pd-t10">详细地址</div>
          <div class="form-label-desc">上海市虹桥机场精武门组织部</div>
        </div>
        <div class="form-label">
          <div class="form-label-title">时间</div>
          <div class="form-label-desc">2021-08-20 08:55-23</div>
        </div>
        <div class="form-label">
          <div class="form-label-title">联系人</div>
          <div class="form-label-desc">蔡瑞轩</div>
        </div>
        <div class="form-label form-column">
          <div class="form-label-title pd-t10">活动内容</div>
          <div class="form-label-desc">活动简介活动简介活动简介活动简介活动简介活动简介活动简介活动简介活动简介活动简介活动简介活动简介</div>
        </div>
        <div class="form-label form-column">
          <div class="form-label-title pd-t10">相关资料</div>
          <div class="form-label-desc">
            <div class="form-upload-li" v-for="(item, index) in uploaddesc" :key="index">{{item.name}}</div>
          </div>
        </div>
        <div class="form-label form-column">
          <div class="form-label-title pd-t10">活动总结</div>
          <div class="form-label-desc">活动简介活动简介活动简介活动简介活动简介活动简介活动简介活动简介活动简介活动简介活动简介活动简介</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      uploaddesc: [
        {
          name: 'bbaa.txt'
        },
        {
          name: 'test.pdf'
        }
      ],
      list: [
        {
          num: 11,
          label: '应到'
        },
        {
          num: 5,
          label: '实到'
        },
        {
          num: 2,
          label: '请假'
        },
        {
          num: 4,
          label: '缺席'
        }
      ],
      moduleObject: {},
      propData: this.$root.propData.compositeAttr||{
        labelShow: true,
        styleModel: 'mobile'
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
      // this.converStyle()
    },
    converStyle () {
      let styleObject = {},
          styleWrapObject = {};
      for (const key in this.propData) {
        if (this.propData.hasOwnProperty.call(this.propData, key)) {
          const element = this.propData[key]
          if (!element && element !== false && element != 0) {
            continue
          }
          switch (key) {
            case 'labelFont':
              IDM.style.setFontStyle(styleObject, element)
              break
            case 'labelBox':
              IDM.style.setBoxStyle(styleObject, element)
              break
            case 'box':
              IDM.style.setBoxStyle(styleWrapObject, element)
              break
          }
        }
      }
      window.IDM.setStyleToPageHead(this.moduleObject.id + " .time-label", styleObject);
      window.IDM.setStyleToPageHead(this.moduleObject.id + " .idm-time", styleWrapObject);
    }
  }
}
</script>

<style lang="scss" scoped>
.pd-t10{
  padding-bottom: 10px;
}
.idm-showform{
  padding: 10px;
  background-color: #fff;
  .form-top{
    border-radius: 5px;
    box-shadow: 0px  0px 20px 0px #ccc;
    .form-icon{
      width: 20px;
      height: 20px;
      margin-right: 10px;
    }
    .form-title{
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 20px;
      padding: 20px 0;
      border-bottom: 1px solid #ccc;
    }
    .form-ul{
      display: flex;
      padding: 20px 0;
      justify-content: center;
      align-items: center;
      span{
        font-size: 26px;
        color: #f00;
        padding-bottom: 5px;
        display: inline-block;
      }
      li{
        color: #999;
        list-style: none;
        flex: 1;
        text-align: center;
      }
    }
  }
  .form-tip{
    padding: 10px 0;
    font-size: 18px;
  }
  .form-detail{
    padding: 0 20px 20px 20px;
    border-radius: 5px;
    box-shadow: 0px  0px 20px 0px #ccc;
    .form-column{
      flex-direction: column;
    }
    .form-label{
      border-bottom: 1px solid #ccc;
      padding: 20px 0;
      display: flex;
      justify-content: space-between;
    }
    .form-label-title{
      color: #333;
    }
    .form-upload-li{
      color: blue;
    }
  }
}
</style>