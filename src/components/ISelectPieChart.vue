<template>
  <!--
    根目录规范(必须不能为空)：
    idm-ctrl：控件类型 drag_container：容器，drag_container_inlieblock：行内容器，idm_module：非容器的组件
    id：使用moduleObject.id，如果id不使用这个将会被idm-ctrl-id属性替换
    idm-ctrl-id：组件的id，这个必须不能为空
  -->
  <div
    idm-ctrl="idm_module"
    :id="moduleObject.id"
    :idm-ctrl-id="moduleObject.id"
    :title="propData.htmlTitle"
    class="i-selectPieChart-outer"
  >
    <div class="i-selectPieChart-header" v-if="propData.isShowTitleBar">
      <div class="i-selectPieChart-header-main">
        <div class="i-selectPieChart-header-tit">
          <span v-if="propData.titleIconPosition === 'right'">{{ propData.title }}</span>
          <div class="i-selectPieChart-header-tit-icon" v-if="propData.showIcon">
            <svg
              v-if="propData.titleIcon && propData.titleIcon.length > 0"
              class="idm_filed_svg_icon"
              aria-hidden="true"
            >
              <use :xlink:href="`#${propData.titleIcon && propData.titleIcon[0]}`" />
            </svg>
            <svg-icon v-else icon-class="application-icon" />
          </div>
          <span v-if="propData.titleIconPosition === 'left'">{{ propData.title }}</span>
        </div>
      </div>
      <div
        :class="
          showPicker ? 'i-selectPieChart-header-select-active' : 'i-selectPieChart-header-select'
        "
        v-if="propData.selectBtn"
        @click="showPicker = true"
      >
        {{ pickerSelectText }}
      </div>
      <div class="i-selectPieChart-header-more" v-if="propData.moreBtn" @click="moreClick">
        更多>
      </div>
    </div>
    <div class="i-selectPieChart-content">
      <van-loading v-show="isLoading" size="24px" vertical>加载中...</van-loading>
      <div
        v-show="!isLoading && chartData"
        class="i-selectPieChart-content-chart"
        :id="`charts_container_${moduleObject.id}`"
      />
      <div v-show="!isLoading && chartData" class="i-selectPieChart-content-table">
        <div
          class="i-selectPieChart-content-table-row"
          v-for="(item, index) in chartData"
          :key="index"
        >
          <div class="col-box" v-for="(field, i) in propData.tableFields" :key="i">
            <div
              class="col-box-legend"
              v-if="field.showLegend"
              :style="{ 'background-color': colors[index] }"
            />
            <div>{{ getExpressData('data', field.name, item) }}</div>
          </div>
        </div>
      </div>
      <van-empty
        v-show="!isLoading && !chartData"
        :image-size="emptyImageSize"
        :description="propData.emptyDescription || '暂无数据'"
      >
        <!-- <template #image>
                <van-image :src="IDM.url.getModuleAssetsWebPath(require('../assets/empty-default.png'), moduleObject)" />
              </template> -->
      </van-empty>
    </div>
    <div
      class="i-selectPieChart-mask"
      v-if="moduleObject.env !== 'production' && !propData.dataSource"
    >
      <span>！未绑定数据源</span>
    </div>
    <van-popup v-model="showPicker" round position="bottom">
      <van-picker
        show-toolbar
        :title="propData.pickerTitle"
        :columns="columnsText"
        :default-index="pickerSelectIndex"
        @cancel="showPicker = false"
        @confirm="onConfirm"
      />
    </van-popup>
  </div>
</template>

<script>
import { Empty, Loading, Image as VanImage, Popup, Picker } from 'vant';
import 'vant/lib/empty/style';
import 'vant/lib/loading/style';
import 'vant/lib/image/style';
import 'vant/lib/popup/style';
import 'vant/lib/picker/style';
const devChartResult = [
  {
    name: '会议',
    value: 946
  },
  {
    name: '请假',
    value: 972
  },
  {
    name: '其他',
    value: 617
  },
  {
    name: '收文',
    value: 21
  },
  {
    name: '发文',
    value: 700
  },
  {
    name: '签报',
    value: 200
  }
];
export default {
  name: 'ISelectPieChart',
  components: {
    [Empty.name]: Empty,
    [Loading.name]: Loading,
    [VanImage.name]: VanImage,
    [Popup.name]: Popup,
    [Picker.name]: Picker
  },
  data() {
    return {
      moduleObject: {},
      propData: this.$root.propData.compositeAttr || {
        dataSource: '1',
        showIcon: true,
        title: '年度学时',
        titleIconPosition: 'left',
        isShowTitleBar: true,
        selectBtn: true,
        moreBtn: false,
        pickerTitle: '选择年份',
        showChartTip: true,
        itemBorderWidth: 0,
        tableFields: [{ name: 'name', showLegend: true }, { name: 'value' }]
      },
      isLoading: false,
      showPicker: false,
      columns: [
        { text: '2015年', vlaue: '2015' },
        { text: '2016年', vlaue: '2016' },
        { text: '2017年', vlaue: '2017' },
        { text: '2018年', vlaue: '2018' },
        { text: '2019年', vlaue: '2019' },
        { text: '2020年', vlaue: '2020' },
        { text: '2021年', vlaue: '2021' },
        { text: '2022年', vlaue: '2022' }
      ],
      pickerSelect: null,
      chartData: devChartResult,
      chart: null
    };
  },
  props: {},
  computed: {
    emptyImageSize() {
      return this.getScale() * (this.propData.emptyImageSize || 70);
    },
    pickerSelectText() {
      if (!this.pickerSelect) return this.propData.selectBtnPlaceholder || '请选择';
      return this.pickerSelect.text;
    },
    columnsText() {
      if (!this.columns) return [];
      return this.columns.map(item => item.text);
    },
    colors() {
      const defaultColors = [
        '#FFBA00',
        '#FF8500',
        '#3296FA',
        '#0071C1',
        '#67C23B',
        '#2495C7',
        '#5B8FF9',
        '#FF8F00'
      ];
      const chartColors =
        this.propData.chartColors?.map(item => item.color?.hex8).filter(item => !!item) || [];
      return [...chartColors, ...defaultColors];
    }
  },
  created() {
    this.moduleObject = this.$root.moduleObject;
  },
  mounted() {
    this.chart = this.$echarts.init(
      document.getElementById(`charts_container_${this.moduleObject.id}`),
      null,
      {
        width: document.querySelector(`#charts_container_${this.moduleObject.id}`).offsetWidth,
        height: document.querySelector(`#charts_container_${this.moduleObject.id}`).offsetHeight
      }
    );
    // this.chart.resize();
    console.log(this.chart);
    // this.drawChart();
  },
  destroyed() {},
  methods: {
    /**
     * 适配页面
     */
    getScale(pageWidth) {
      const base = this.propData.baseValue || 414;
      const ratio = this.propData.adaptationRatio || 1.2;
      const width = this.moduleObject.env === 'production' ? window.innerWidth : pageWidth || 414;
      return (width / base - 1) * (ratio - 1) + 1;
    },
    onConfirm(value, index) {
      this.pickerSelect = this.columns && this.columns[index];
      this.showPicker = false;
    },
    drawChart() {
      const legendData = this.chartData?.map(item => item.name);
      const option = {
        color: this.colors,
        series: [
          {
            type: 'pie',
            radius: ['40%', '70%'],
            itemStyle: {
              borderColor: '#fff',
              borderWidth: this.propData.itemBorderWidth
            },
            label: { show: false },
            labelLine: { show: false },
            emphasis: { disabled: true },
            data: this.chartData
          }
        ]
      };
      this.chart.setOption(option);
    },
    /**
     * 通用的获取表达式匹配后的结果
     */
    getExpressData(dataName, dataFiled, resultData) {
      //给defaultValue设置dataFiled的值
      var _defaultVal = undefined;
      if (dataFiled) {
        var filedExp = dataFiled;
        filedExp = dataName + (filedExp.startsWiths('[') ? '' : '.') + filedExp;
        var dataObject = { IDM: window.IDM };
        dataObject[dataName] = resultData;
        _defaultVal = window.IDM.express.replace.call(this, '@[' + filedExp + ']', dataObject);
      }
      return _defaultVal;
    }
  }
};
</script>

<style scoped lang="scss">
$scale: var(--i-selectPieChart-scale);
.i-selectPieChart-outer {
  width: auto;
  box-sizing: content-box;
  padding: 10px;
  font-family: PingFangSC-Regular;
  color: #333333;
  background-color: #fff;
  position: relative;
  font-size: calc(14px * #{$scale});
  display: flex;
  flex-direction: column;
  height: 200px;

  .i-selectPieChart-header {
    display: flex;
    // height: calc(40px * #{ $scale });
    // line-height: calc(40px * #{ $scale });
    justify-content: space-between;
    align-items: center;

    .i-selectPieChart-header-main {
      // width: 86%;
      flex-grow: 1;
      display: flex;
      align-items: center;

      .i-selectPieChart-header-tit {
        font-family: PingFangSC-Regular;
        color: #333333;
        font-style: normal;
        text-decoration: none;
        font-size: calc(16px * #{$scale});
        max-width: 60%;
        display: flex;
        align-items: center;

        .i-selectPieChart-header-tit-icon {
          display: inline-block;
          flex: 1;
        }

        span {
          margin: 0 5px;
          width: 90%;
          overflow: hidden;
          flex: 8;
        }

        transform: translateX(-5px);

        .idm_filed_svg_icon {
          font-size: 1em;
          width: 1em;
          height: 1em;
          fill: currentColor;
          vertical-align: -0.15em;
          outline: none;
        }
      }
    }

    .i-selectPieChart-header-more,
    .i-selectPieChart-header-select,
    .i-selectPieChart-header-select-active {
      // opacity: 0.5;
      margin: 0 5px;
      position: relative;
    }

    .i-selectPieChart-header-select,
    .i-selectPieChart-header-select-active {
      padding-right: 13px;
    }
    .i-selectPieChart-header-select-active {
      color: red;
    }
    .i-selectPieChart-header-select::after {
      position: absolute;
      top: 50%;
      right: 0px;
      margin-top: -5px;
      border: 3px solid;
      border-color: transparent transparent currentColor currentColor;
      -webkit-transform: rotate(-45deg);
      transform: rotate(-45deg);
      opacity: 1;
      content: '';
    }
    .i-selectPieChart-header-select-active::after {
      position: absolute;
      top: 50%;
      right: 0px;
      margin-top: -1px;
      -webkit-transform: rotate(135deg);
      transform: rotate(135deg);
      border: 3px solid;
      border-color: transparent transparent currentColor currentColor;
      opacity: 1;
      content: '';
    }
  }

  .i-selectPieChart-content {
    background-color: #fff;
    border-radius: calc(10px * #{$scale});
    padding: calc(10px * #{$scale}) calc(14px * #{$scale});
    flex-grow: 1;
    flex-shrink: 0;
    // display: flex;
    // flex-direction: column;
    box-sizing: content-box;

    ::v-deep .van-loading {
      min-height: calc(130px * #{$scale});
      justify-content: center;
    }

    .i-selectPieChart-content-chart {
      box-sizing: content-box;
      height: 50% !important;
      // flex-grow: 1;
    }

    .i-selectPieChart-content-table {
      box-sizing: content-box;
      height: 50% !important;
      // flex-grow: 1;
      overflow: scroll;
      // padding: 0 20px;
      .i-selectPieChart-content-table-row {
        display: flex;
        justify-content: space-around;
        align-items: center;
        padding: 8px 0;
        line-height: 1;
        .col-box {
          display: flex;
          align-items: center;
          .col-box-legend {
            // width: calc(14px * #{$scale});
            // height: calc(14px * #{$scale});
            width: 14px;
            height: 14px;
            margin-right: 10px;
          }
        }
      }
    }
  }

  .i-selectPieChart-mask {
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
      padding: calc(6px * #{$scale}) calc(20px * #{$scale});
      color: #e6a23c;
      background: #fdf6ec;
      border: calc(1px * #{$scale}) solid #f5dab1;
      border-radius: calc(4px * #{$scale});
    }
  }

  ::v-deep .van-empty {
    padding: 0;
  }

  ::v-deep .van-empty__description {
    font-size: inherit;
  }
}
</style>
