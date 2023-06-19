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
    <div class="crossProgress-wrap">
      <div class="crossProgress-box">
        <div class="li" v-for="(item, index) in options.yAxis" :key="index">
          <span class="li-title">{{item}}</span>
          <div class="li-progress">
            <template v-for="(k, i) in options.series.length">
              <div class="li-line" :key="i"  :style="setStyleObject(options.series[i], index, i)" v-if="Number(options.series[i].data[index])">
                {{options.series[i].data[index]}}
              </div>
            </template>
            <span class="li-total">{{total[index]}}</span>
          </div>
        </div>
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
        maxHeight: '200px',
        progressHeight: '20px',
        legendWidth: '24px',
        legendHeight: '14px',
        inwidth: 5,
        titleWidth: '70px',
        legendRadui: '10px',
        proMarTop: '10px',
        libox: {
          marginTopVal: "",
          marginRightVal: "",
          marginBottomVal: "",
          marginLeftVal: "",
          paddingTopVal: "5px",
          paddingRightVal: "5px",
          paddingBottomVal: "5px",
          paddingLeftVal: "5px"
        }
      },
      options: {},
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
      let screenWidth = document.documentElement.clientWidth - 70;
      let px = Number(row.data[index]);
      let pren = px / (screenWidth/100)
      obj.width =  pren + '%'
     
      obj.marginLeft = cur >0 && (-this.propData.inwidth + 'px')
      // obj.left = cur >0 && (saveLeft - num + 'px')
      // saveLeft = cur<spli && row.data[index];
      return obj
    },
    propDataWatchHandle(propData) {
      this.propData = propData.compositeAttr || {};
      this.init();
    },
    getMockData() {
      this.options = {
        yAxis: ['办公室', '人事处', '财务处', '调研室', '保密处', '财务处', '调研室', '保密处'],
        series: [
          {
            name: '发起会议',
            color: '#2BCECB',
            data: ['0', '51', '40', '20', '34', '40', '20', '34']
          },
          {
            name: '受邀会议',
            color: '#2D8ED8',
            data: ['158', '16', '28', '180', '76', '28', '180', '76']
          }
        ],
      }
    },
    initData() {
      if (this.moduleObject.env !== 'production') {
        this.getMockData();
        return
      }
      let params = {}
      if (this.propData.paramsFunc && this.propData.paramsFunc.length > 0) {
        let name = this.propData.paramsFunc[0].name;
        params = window[name] && window[name].call(this, {
          _this: this
        });
      }
      if ( this.propData.dataSource && this.propData.dataSource[0] ) {
          IDM.datasource.request(
            this.propData.dataSource[0]?.id,
            {
                moduleObject: this.moduleObject,
                param: {
                    ...params
                }
            },
            (data) => {
              if (this.propData.handleParams && this.propData.handleParams.length > 0) {
                let result = {}
                let name = this.propData.handleParams[0].name;
                result = window[name] && window[name].call(this, {
                  _this: this,
                  params: data
                });
                this.options = result
              } else {
                this.options = data
              }
            }
        )
      }
    },
    handleStyle() {
      let styleObject = {},
        legendObject = {},
        libox = {},
        titleObject = {},
        totalFont = {},
        agendFont = {},
        litop = {},
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
              styleObject['overflow-y'] = 'scroll'
              break
            case 'progressHeight':
              liObject['height'] = element
              break
            case 'legendWidth':
              legendObject['width'] = element
              break
            case 'legendHeight':
              legendObject['height'] = element
              break
            case 'legendRadui':
              legendObject['border-radius'] = element
              break
            case 'titleFont':
              IDM.style.setFontStyle(titleObject, element)
              break
            case 'titleWidth':
              titleObject['width'] = element
              break
            case 'proMarTop':
              litop['margin-top'] = element
              break
            case 'libox':
              IDM.style.setBoxStyle(libox, element);
              break
            case 'totalFont':
              IDM.style.setFontStyle(totalFont, element)
              break
            case 'agendFont':
              IDM.style.setFontStyle(agendFont, element)
              break
          }
        }
      }
      window.IDM.setStyleToPageHead(".crossProgress-wrap .crossProgress-box", styleObject);
      window.IDM.setStyleToPageHead(".crossProgress-wrap .li", libox);
      window.IDM.setStyleToPageHead(".crossProgress-wrap .li .li-total", totalFont);
      window.IDM.setStyleToPageHead(".crossProgress-wrap .li+.li", litop);
      window.IDM.setStyleToPageHead(".crossProgress-wrap .li .li-line", liObject);
      window.IDM.setStyleToPageHead(".crossProgress-wrap .li .li-title", titleObject);
      window.IDM.setStyleToPageHead(".crossProgress-wrap .li .li-title", titleObject);
      window.IDM.setStyleToPageHead(".crossProgress-wrap .li-legend .li-legend-ico", legendObject);
      window.IDM.setStyleToPageHead(".crossProgress-wrap .li-legend .li-lengend-title", agendFont);
      
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
  .li-title{
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
  .li-progress{
    width: 100%;
    display: flex;
    align-items: center;
    margin-left: 10px;
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
      margin-right: 10px;
    }
  }
}
</style>
