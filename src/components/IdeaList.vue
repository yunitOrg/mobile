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
    <div class="idm-idealist">
      <div class="idealist-ul">
        <li v-for="(item, index) in list" :key="index">
          <div class="idealist-img">
            <img src="http://116.236.111.158:8086/DreamWeb/resource/img/body-bg-shanghai.png" alt="">
          </div>
          <div class="idealist-content">
            <div class="idealist-title">
              <b>{{item.title}}</b>
              <span>{{item.time}}</span>
            </div>
            <span>{{item.desc}}</span>
          </div>
          <div class="idealist-right">{{item.type === 1 ? '待回复' : '已回复'}}</div>
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
          headImg: 'http://116.236.111.158:8086/DreamWeb/resource/img/body-bg-shanghai.png',
          title: '白继伟',
          desc: "书记，我的思想汇报有误",
          time: '2021-08-25',
          type: 1
        },
        {
          headImg: 'http://116.236.111.158:8086/DreamWeb/resource/img/body-bg-shanghai.png',
          title: '白继伟',
          desc: "书记，我的思想汇报有误",
          time: '2021-08-25',
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
.idm-idealist{
  .idealist-ul{
    padding: 0 10px;
    li{
      list-style: none;
      display: flex;
      padding: 20px;
      align-items: center;
      border-radius: 5px;
      box-shadow: 0px  0px 20px 0px #ccc;
      .idealist-img{
        width: 40px;
        height: 40px;
        margin-right: 10px;
        img{
          width: 100%;
          height: 100%;
          border-radius: 50%;
        }
      }
      .idealist-content{
        flex: 1;
        .idealist-title{
          padding-bottom: 5px;
        }
        b{
          font-size: 16px;
          padding-right: 30px;
        }
      }
    }
    li+li{
      margin-top: 20px;
    }
  }
}
</style>
