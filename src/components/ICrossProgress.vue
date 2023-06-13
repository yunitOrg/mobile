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
    <!--暂时搁浅-->
    <div class="crossProgress-wrap">
      <div class="li" v-for="(item, index) in options.yAxis" :key="index">
        <span class="li-title">{{item}}</span>
        <div class="li-progress">
          <template v-for="(k, i) in options.series.length" >
            <div class="li-line" :key="i" :style="setStyleObject(options.series[i], index, i)">
              {{options.series[i].data[index]}}
            </div>
          </template>
        </div>
        <span class="li-total">{{total[index]}}</span>
      </div>
      <div class="li-legend">
        <div class="liegn-li" v-for="(item, index) in options.series" :key="index">
          <span class="li-legend-ico" :style="handleSetColor(item)"></span>
          <span class="li-lengend-title">{{item.name}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
let saveLeft = 0;
export default {
  name: 'ICrossProgress',
  data () {
    return {
      moduleObject:{},
      propData:this.$root.propData.compositeAttr||{
        minHeight: '100px',
        maxHeight: '400px',
        progressHeight: '25px'
      },
      options: {
        yAxis: ['办公室', '人事处', '财务处', '调研室', '保密处'],
        series: [
          {
            name: '发起会议',
            color: '#2BCECB',
            data: ['137', '51', '40', '20', '34']
          },
          {
            name: '受邀会议',
            color: '#2D8ED8',
            data: ['158', '16', '28', '180', '76']
          }
        ],
      },
    }
  },
  computed: {
    total() {
      if (this.options.series && this.options.series.length) {
        let datamap = this.options.series.map((item) => item.data.map(k => Number(k)))
        let result = window._.zipWith(...datamap, function (a, b) {
          return a + b;
        })
        return result
      } else {
        return []
      }
    },
    widthUnit() {
      let ary = [];
      this.options.series.forEach(item => {
        item.data && item.data.forEach(k => ary.push(Number(k)))
      })
      let maxNum = Math.max.apply(null, ary);
      let minNum = Math.min.apply(null, ary);
      console.log(maxNum, minNum)
      return {
        maxNum: maxNum,
        minNum: minNum
      }
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    handleSetColor(row) {
      let obj = {}
      obj.backgroundColor = row.color;
      return obj
    },
    setStyleObject(row, index, cur) {
      let obj = {}, spli = this.options.series.length - 1;
      obj.backgroundColor = row.color
      obj.width = row.data[index] + 'px'
     
      let minnum = this.widthUnit.minNum;
      let num = minnum<5 ? minnum : 5;
      obj.marginLeft = cur >0 && (-num + 'px')
      // obj.left = cur >0 && (saveLeft - num + 'px')
      // saveLeft = cur<spli && row.data[index];
      return obj
    },
    propDataWatchHandle(propData) {
      this.propData = propData.compositeAttr || {};
      this.init();
    },
    getMockData() {
      this.list = [
        {
          name: '办公室',
          
        }
      ]
    },
    initData() {
      if (this.moduleObject.env !== 'production') {
        this.getMockData();
        return
      }
    },
    handleStyle() {
      let styleObject = {},
        liObject = {};
      for (const key in this.propData) {
        if (this.propData.hasOwnProperty.call(this.propData, key)) {
          const element = this.propData[key]
          if (!element && element !== false && element != 0) {
            continue
          }
          switch (key) {
            case 'minHeight':
              styleObject['min-height'] = element
              break
            case 'maxHeight':
              styleObject['max-height'] = element
              break
            case 'progressHeight':
              liObject['height'] = element
              break
          }
        }
      }
      window.IDM.setStyleToPageHead(".crossProgress-wrap", styleObject);
      window.IDM.setStyleToPageHead(".crossProgress-wrap .li", liObject);
    },
    init() {
      this.initData()
      this.handleStyle();
    }
  }
}
</script>

<style lang="scss" scoped>
.crossProgress-wrap{
  .li{
    display: flex;
    align-items: center;
  }
  .li+.li{
    margin-top: 20px;
  }
  .li-title{
    color: #666666;
    font-size: 16px;
    width: 68px;
  }
  .li-progress{
    display: flex;
    margin-left: 10px;
    height: 20px;
    // position: relative;
    .li-line:nth-child(1){
      z-index: 1;
      // left: 0 !important;
    }
    .li-line{
      // position: absolute;
      color: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50px;
    }
  }
  .li-total{
    margin-left: 10px;
  }
  .li-legend{
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 10px;
    .liegn-li{
      display: flex;
      align-items: center;
    }
    .liegn-li+.liegn-li{
      margin-left: 10px;
    }
    span{
      display: inline-block;
    }
    .li-legend-ico{
      width: 10px;
      height: 5px;
      border-radius: 5px;
      margin-right: 10px;
    }
  }
}
</style>
