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
    <div class="idm-iranking">
      <div class="irank-img">
        <img src="http://116.236.111.158:8086/DreamWeb/resource/img/body-bg-shanghai.png" alt="">
      </div>
      <div class="irank-ul">
        <div class="irank-self">
          <div class="irank-index">
            {{1}}
          </div>
          <div class="irank-center">
            <div class="irank-icon">
              <img :src="currentObj.headImg" alt="">
            </div>
            <div class="irank-desc">
              <div class="irank-title">{{currentObj.title}}</div>
              <span>{{currentObj.desc}}</span>
            </div>
          </div>
          <div class="irank-right">{{currentObj.money}}</div>
        </div>
        <div class="irank-content">
          <li v-for="(item, index) in list" :key="index">
            <div class="irank-index">
              {{index+1}}
            </div>
            <div class="irank-center">
              <div class="irank-icon">
                <img :src="item.headImg" alt="">
              </div>
              <div class="irank-desc">
                <div class="irank-title">{{item.title}}</div>
                <span>{{item.desc}}</span>
              </div>
            </div>
            <div class="irank-right">{{item.money}}</div>
          </li>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'IRanking',
  data () {
    return {
      currentObj: {
        headImg: 'http://116.236.111.158:8086/DreamWeb/resource/img/body-bg-shanghai.png',
        title: 'The shy',
        desc: '河南省办公厅党支部',
        money: 10000
      },
      list: [
        {
          headImg: 'http://116.236.111.158:8086/DreamWeb/resource/img/body-bg-shanghai.png',
          title: 'The shy',
          desc: '河南省办公厅党支部',
          money: 10000
        },
        {
          headImg: 'http://116.236.111.158:8086/DreamWeb/resource/img/body-bg-shanghai.png',
          title: 'The shy',
          desc: '河南省办公厅党支部',
          money: 10000
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
.idm-iranking{
  .irank-img{
    width: 100%;
    height: 200px;
    img{
      width: 100%;
      height: 100%;
    }
  }
  .irank-ul{
    position: relative;
    width: auto;
    margin: -20px 20px 0;
    // border-radius: 10px;
    // background: #fff;
    // box-shadow: 0px  0px 20px 0px #ccc;
    .irank-self{
      padding: 10px 20px;
      // margin: 0 10px;
      display: flex;
      flex-direction: initial;
      align-items: center;
      box-shadow: 0px  0px 20px 0px #ccc;
      margin-bottom: 10px;
      border-radius: 10px;
      background: #fff;
    }
    .irank-content{
      padding: 0px 20px;
      border-radius: 10px;
      background: #fff;
      box-shadow: 0px  0px 20px 0px #ccc;
    }
    li{
      // margin: 0 10px;
      padding: 10px 0;
      border-bottom: 1px solid #ccc;
      display: flex;
      flex-direction: initial;
      align-items: center;
    }
    li:last-child{
      border: 0;
    }
    .irank-index{
      width: 10%;
      font-size: 30px;
      font-weight: 600;
    }
    .irank-center{
      width: 70%;
      display: flex;
      flex-direction: initial;
      .irank-icon{
        width: 40px;
        height: 40px;
        img{
          border-radius: 50%;
          width: 100%;
          height: 100%;
        }
      }
      .irank-desc{
        padding-left: 10px;
        .irank-title{
          font-size: 20px;
        }
        span{
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          font-size: 16px;
        }
      }
    }
    .irank-right{
      width: 20%;
      font-size: 20px;
      color: #f00;
      text-align: right;
    }
  }
}
</style>
