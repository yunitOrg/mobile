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
    <div class="idm-iheadlist">
      <div class="iheadlist-ul">
        <li v-for="(item, index) in list" :key="index">
          <div class="iheadlist-img">
            <img :src="item.img" alt="">
          </div>
          <div class="iheadlist-right">
            <div class="iheadlist-center">
              <div class="iheadlist-line">
                <span class="iheadlist-author">{{item.author}}</span>
                <svg
                  class="idm_button_svg_icon idm-icon-settingOutline"
                  aria-hidden="true"
                >
                  <use :xlink:href="`#icon-settingOutline`"></use>
                </svg>
                <span class="color">{{item.tip1}}</span>
                <span class="color">{{item.tip2}}</span>
                <span class="color1">{{item.type === 1 && '已激活'}}</span>
              </div>
              <span>{{item.desc}}</span>
            </div>
            <div class="iheadlist-icon">
              <svg
                class="idm_button_svg_icon idm-icon-settingOutline"
                aria-hidden="true"
              >
                <use :xlink:href="`#icon-settingOutline`"></use>
              </svg>
            </div>
          </div>
        </li>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'IHeadList',
  data () {
    return {
      list: [
        {
          author: '宋尚朴',
          img: 'http://116.236.111.158:8086/DreamWeb/resource/img/body-bg-shanghai.png',
          desc: '中共上海市测试三支部',
          tip1: '书记',
          tip2: '组织部',
          type: 1
        },
        {
          author: '宋尚朴',
          img: 'http://116.236.111.158:8086/DreamWeb/resource/img/body-bg-shanghai.png',
          desc: '中共上海市测试三支部',
          tip1: '书记',
          tip2: '组织部',
          type: 1
        }
      ],
      moduleObject:{},
      propData:this.$root.propData.compositeAttr||{
          fontContent:"Hello Word"
      }
    }
  },
  created () {
    this.moduleObject = this.$root.moduleObject
    this.convertAttrToStyleObject()
  },
  methods: {
    propDataWatchHandle (propData) {
      this.propData = propData.compositeAttr||{};
      this.convertAttrToStyleObject();
    },
    convertAttrToStyleObject () {

    }
  }
}
</script>

<style lang="scss">
.idm-iheadlist{
  .iheadlist-ul{
    margin: 0 10px;
    border-radius: 10px;
    background: #fff;
    box-shadow: 0px  0px 20px 0px #ccc;
    li{
      list-style: none;
      padding: 0 20px;
      display: flex;
      align-items: center;
    }
    li:last-child .iheadlist-right{
      border: 0;
    }
    .idm_button_svg_icon{
      width: 20px;
      height: 20px;
      vertical-align: middle;
      margin-right: 5px;
    }
    .iheadlist-img{
      width: 40px;
      height: 40px;
      margin-right: 10px;
      img{
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
    }
    .iheadlist-right{
      padding: 20px 0;
      width: calc(100% - 50px);
      display: flex;
      align-items: center;
      border-bottom: 1px solid #ccc;
      .iheadlist-center{
        display: flex;
        flex-wrap: wrap;
        .iheadlist-line{
          padding-bottom: 5px;
          span{
            margin-right: 5px;
          }
        }
        .color{
          padding: 3px 5px;
          border-radius: 3px;
          color: #fff;
          background: #F7B503;
        }
        .color1{
          padding: 3px 5px;
          border-radius: 3px;
          color: #fff;
          background: #44D7B6;
        }
      }
    }
  }
}
</style>

