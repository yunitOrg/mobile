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
    class="i-barChart-outer"
  >
    <div key="i-barChart-header" class="i-barChart-header" v-if="propData.isShowTitleBar">
      <div class="i-barChart-header-main">
        <div class="i-barChart-header-tit">
          <span v-if="propData.titleIconPosition === 'right'">{{ propData.title }}</span>
          <div class="i-barChart-header-tit-icon" v-if="propData.showIcon">
            <svg
              v-if="propData.titleIcon && propData.titleIcon.length > 0"
              class="idm_filed_svg_icon"
              aria-hidden="true"
            >
              <use :xlink:href="`#${propData.titleIcon && propData.titleIcon[0]}`" />
            </svg>
            <svg-icon class="idm_filed_svg_icon" v-else icon-class="shu" />
          </div>
          <span v-if="propData.titleIconPosition === 'left'">{{ propData.title }}</span>
        </div>
      </div>
    </div>
    <div key="i-barChart-content" class="i-barChart-content">
      <van-loading v-show="isLoading" :size="loadingSize" vertical>{{
        propData.loadingDescription || '加载中...'
      }}</van-loading>
      <div
        v-show="!isLoading && chartData && Object.keys(chartData).length > 0"
        key="i-barChart-content-chart"
        :ref="`charts_container_${moduleObject.id}`"
        class="i-barChart-content-chart"
      />
      <van-empty
        v-show="!isLoading && (!chartData || Object.keys(chartData).length == 0)"
        :image-size="emptyImageSize"
        :description="propData.emptyDescription || '暂无数据'"
      >
        <template #image>
          <van-image
            :src="
              IDM.url.getModuleAssetsWebPath(require('../assets/empty-default.png'), moduleObject)
            "
          />
        </template>
      </van-empty>
    </div>
    <div
      class="i-barChart-mask"
      v-if="
        moduleObject.env !== 'production' && !propData.chartDataSource
      "
    >
      <span>！未绑定数据源</span>
    </div>
  </div>
</template>

<script>
import * as echarts from 'echarts';
import { Empty, Loading, Image as VanImage, Popup, Picker } from 'vant';
import 'vant/lib/empty/style';
import 'vant/lib/loading/style';
import 'vant/lib/image/style';
import 'vant/lib/popup/style';
import 'vant/lib/picker/style';
const devChartResult = {
  nameList: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  valueList: [10, 52, 200, 334, 390, 330, 220]
};
export default {
  name: 'IBarChart',
  components: {
    [Empty.name]: Empty,
    [Loading.name]: Loading,
    [VanImage.name]: VanImage,
    [Popup.name]: Popup,
    [Picker.name]: Picker
  },
  // colorType: 'field',
  // chartColorField: '',
  // chartType: 'hollow',
  // columnsType: 'none',
  // showTable: true,
  // showLegend: true,
  // showLabel: true,
  // chartDataSource: '1',
  // showIcon: true,
  // title: '年度学时',
  // titleIconPosition: 'left',
  // isShowTitleBar: false,
  // moreBtn: false,
  // pickerTitle: '选择年份',
  // showChartTip: true,
  // itemBorderWidth: 0,
  // chartTitle: '标题',
  // // colorList: [{ offset: 0, color: {hex8: '#83bff6'} }],
  // gridTop: 45,
  // gridRight: 0,
  // barWidth: '20%',
  // borderRadiusTopLeft: 0,
  // borderRadiusTopRight: 20,
  // borderRadiusBottomLeft: 20,
  // borderRadiusBottomRight: 0,
  // showYAxisLabel: true,
  // showYAxis: true,
  // showExtraXAxis: true,
  // showXAxisLine: false,
  // chartLayout: 'vertical',
  // nameField: 'nameList',
  // valueField: 'valueList',
  data() {
    return {
      moduleObject: {},
      propData: this.$root.propData.compositeAttr || {},
      isLoading: false,
      chartData: {},
      chart: null,
      addParams: {}
    };
  },
  props: {},
  computed: {
    emptyImageSize() {
      return this.getScale() * (this.propData.emptyImageSize || 70);
    },
    loadingSize() {
      return this.getScale() * (this.propData.loadingSize || 24);
    }
  },
  created() {
    this.moduleObject = this.$root.moduleObject;
    this.convertAttrToStyleObject();
    this.convertThemeListAttrToStyleObject();
  },
  mounted() {
    this.chart = this.$echarts.init(this.$refs[`charts_container_${this.moduleObject.id}`]);
    this.initData();
  },
  destroyed() {
    this.chart.dispose();
  },
  methods: {
    /**
     * 提供父级组件调用的刷新prop数据组件
     */
    propDataWatchHandle(propData) {
      this.propData = propData.compositeAttr || {};
      this.convertAttrToStyleObject();
      this.convertThemeListAttrToStyleObject();
      this.drawChart();
      this.$nextTick(() => {
        this.chart.resize();
      });
    },
    /**
     * 组件通信：接收消息的方法
     */
    receiveBroadcastMessage(messageObject) {
      switch (messageObject.type) {
        case 'websocket':
          if (this.propData.messageRefreshKey && messageObject.message) {
            const messageData =
              (typeof messageObject.message === 'string' && JSON.parse(messageObject.message)) ||
              messageObject.message;
            const arr = Array.isArray(this.propData.messageRefreshKey)
              ? this.propData.messageRefreshKey
              : [this.propData.messageRefreshKey];
            if (messageData.badgeType && arr.includes(messageData.badgeType)) {
              this.initData();
            }
          }
          break;
        case this.propData.reloadKey:
          this.addParams = messageObject.message || {};
          this.initData();
          break;
        case 'pageResize':
          this.convertAttrToStyleObject(messageObject.message);
          this.$nextTick(() => {
            this.chart.resize();
          });
          break;
      }
    },
    /**
     * 适配页面
     */
    getScale(pageWidth) {
      const base = this.propData.baseValue || 414;
      const ratio = this.propData.adaptationRatio || 1.2;
      const width = this.moduleObject.env === 'production' ? window.innerWidth : pageWidth || 414;
      return (width / base - 1) * (ratio - 1) + 1;
    },
    drawChart() {
      this.chart.clear();
      const nameList = this.getExpressData('data', this.propData.nameField, this.chartData);
      const valueList = this.getExpressData('data', this.propData.valueField, this.chartData);
      const colorList =
        this.propData.colorList &&
        this.propData.colorList.length > 0 &&
        this.propData.colorList[0].color &&
        this.propData.colorList[0].color.hex8
          ? this.propData.colorList.map(item => ({
              offset: item.offset && item.offset >= 0 && item.offset <= 1 ? item.offset : 0,
              color: item.color && item.color.hex8 ? IDM.hex8ToRgbaString(item.color.hex8) : '#188df0'
            }))
          : [
              { offset: 0, color: '#188df0' },
              { offset: 1, color: '#83bff6' }
            ];
      const xAxis = [
        {
          type: 'category',
          data: nameList,
          axisTick: {
            show: false,
            alignWithLabel: true
          },
          axisLine: {
            show: false
          },
          axisLabel: {
            fontSize: this.getScale() * (this.propData.xAxisLabelFontSize || 12),
            color:
              this.propData.xAxisLabelFontColor && this.propData.xAxisLabelFontColor.hex8
                ? IDM.hex8ToRgbaString(this.propData.xAxisLabelFontColor.hex8)
                : '#666666',
            fontWeight: this.propData.xAxisLabelFontWeight || 'normal'
          }
        },
        {
          type: 'category',
          data: valueList,
          show: this.propData.showExtraXAxis,
          axisTick: {
            show: false,
            alignWithLabel: true
          },
          axisLine: {
            show: false
          },
          axisLabel: {
            fontSize: this.getScale() * (this.propData.extraXAxisLabelFontSize || 12),
            color:
              this.propData.extraXAxisLabelFontColor && this.propData.extraXAxisLabelFontColor.hex8
                ? IDM.hex8ToRgbaString(this.propData.extraXAxisLabelFontColor.hex8)
                : '#666666'
          }
        }
      ];
      const yAxis = [
        {
          type: 'value',
          show: this.propData.showYAxis,
          axisLabel: {
            show: this.propData.showYAxisLabel,
            fontSize: this.getScale() * (this.propData.yAxisLabelFontSize || 12),
            color:
              this.propData.yAxisLabelFontColor && this.propData.yAxisLabelFontColor.hex8
                ? IDM.hex8ToRgbaString(this.propData.yAxisLabelFontColor.hex8)
                : '#666666'
          },
          splitLine: {
            lineStyle: {
              color:
                this.propData.yAxisSplitLineColor && this.propData.yAxisSplitLineColor.hex8
                  ? IDM.hex8ToRgbaString(this.propData.yAxisSplitLineColor.hex8)
                  : '#cccccc'
            }
          }
        }
      ];
      let option = {
        title: {
          show: !!this.propData.chartTitle,
          text: this.propData.chartTitle,
          left: 'center',
          top: 0,
          textStyle: {
            color:
              this.propData.chartTitleFontColor && this.propData.chartTitleFontColor.hex8
                ? IDM.hex8ToRgbaString(this.propData.chartTitleFontColor.hex8)
                : '#666666',
            fontSize: this.getScale() * (this.propData.chartTitleFontSize || 16),
            fontWeight: this.propData.chartTitleFontWeight || 'bolder'
          }
        },
        emphasis: { disabled: true },
        grid: {
          left: 0,
          right: this.propData.gridRight,
          bottom: 0,
          top: this.propData.gridTop,
          containLabel: true
        },
        xAxis: this.propData.chartLayout == 'vertical' ? xAxis : yAxis,
        yAxis: this.propData.chartLayout == 'vertical' ? yAxis : xAxis,
        series: [
          {
            type: 'bar',
            barWidth: this.propData.barWidth,
            showBackground: this.propData.showBackground,
            backgroundStyle: {
              borderRadius: [
                this.propData.barborderRadiusTopLeft || 0,
                this.propData.barborderRadiusTopRight || 0,
                this.propData.barborderRadiusBottomLeft || 0,
                this.propData.barborderRadiusBottomRight || 0
              ],
              color:
                this.propData.barBgColor && this.propData.barBgColor.hex8
                  ? IDM.hex8ToRgbaString(this.propData.barBgColor.hex8)
                  : '#ffffff'
            },
            label: {
              show: this.propData.showLabel,
              position: this.propData.chartLayout == 'vertical' ? 'top' : 'right',
              fontSize: this.getScale() * (this.propData.chartLabelFontSize || 12),
              color:
                this.propData.chartLabelFontColor && this.propData.chartLabelFontColor.hex8
                  ? IDM.hex8ToRgbaString(this.propData.chartLabelFontColor.hex8)
                  : '#666666'
            },
            itemStyle: {
              color: new echarts.graphic.LinearGradient(
                0,
                this.propData.chartLayout == 'vertical' ? 1 : 0,
                this.propData.chartLayout != 'vertical' ? 1 : 0,
                0,
                colorList
              ),
              borderRadius: [
                this.propData.barborderRadiusTopLeft || 0,
                this.propData.barborderRadiusTopRight || 0,
                this.propData.barborderRadiusBottomLeft || 0,
                this.propData.barborderRadiusBottomRight || 0
              ]
            },
            data: valueList
          }
        ]
      };
      option = this.customFunctionHandle(this.propData.customChartOptionFunction, {option, chartData: this.chartData}) || option;
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
    },
    customFormat(customFunction, resultData) {
      if (customFunction && customFunction[0] && customFunction[0].name) {
        resultData =
          window[customFunction[0].name] &&
          window[customFunction[0].name].call(this, {
            customParam: customFunction[0].param,
            moduleObject: this.moduleObject,
            resultData: resultData,
            urlObject: IDM.url.queryObject(),
            pageId:
              window.IDM.broadcast && window.IDM.broadcast.pageModule
                ? window.IDM.broadcast.pageModule.id
                : ''
          });
      }
      return resultData;
    },
    customFunctionHandle(customFunction, param = {}) {
      if (customFunction && customFunction[0] && customFunction[0].name) {
        return window[customFunction[0].name] &&
          window[customFunction[0].name].call(this, {
            customParam: customFunction[0].param,
            moduleObject: this.moduleObject,
            urlObject: IDM.url.queryObject(),
            pageId:
              window.IDM.broadcast && window.IDM.broadcast.pageModule
                ? window.IDM.broadcast.pageModule.id
                : '',
            ...param
          });
      }
    },
    /**
     * 请求数据
     */
    initData() {
      if (!this.moduleObject.env || this.moduleObject.env == 'develop') {
        this.chartData = devChartResult;
        this.drawChart();
        this.$nextTick(() => {
          this.chart.resize();
        });
        return;
      }
      this.getChartData();
    },
    getChartData() {
      if (
        !this.moduleObject.env ||
        this.moduleObject.env == 'develop' ||
        !this.propData.chartDataSource
      ) {
        return false;
      }
      // const urlObject = IDM.url.queryObject();
      // const routerParams = this.moduleObject.routerId
      //   ? IDM.router.getParam(this.moduleObject.routerId)
      //   : {};
      this.isLoading = true;
      IDM.datasource.request(this.propData.chartDataSource[0]?.id, {
        moduleObject: this.moduleObject,
        param: {
          ...this.addParams
        }
      }, (data) => {
        this.isLoading = false;
        if(data) {
          const resultData = this.customFormat(this.propData.chartDataCustomFunction, data);
          this.chartData = resultData;
          this.drawChart();
          this.$nextTick(() => {
            this.chart.resize();
          });
        }
      })
    },
    /**
     * 把属性转换成样式对象
     */
    convertAttrToStyleObject(pageSize = {}) {
      const styleObject = {};
      const titleStyleObject = {};
      const innerCardStyleObject = {};
      const iconStyleObject = {};
      const emptyStyleObject = {};
      const loadingStyleObject = {};

      const scale = this.getScale(pageSize.width);
      styleObject['--i-barChart-scale'] = scale;

      if (this.propData.bgSize && this.propData.bgSize == 'custom') {
        styleObject['background-size'] =
          (this.propData.bgSizeWidth
            ? this.propData.bgSizeWidth.inputVal + this.propData.bgSizeWidth.selectVal
            : 'auto') +
          ' ' +
          (this.propData.bgSizeHeight
            ? this.propData.bgSizeHeight.inputVal + this.propData.bgSizeHeight.selectVal
            : 'auto');
      } else if (this.propData.bgSize) {
        styleObject['background-size'] = this.propData.bgSize;
      }
      if (this.propData.innerBgSize && this.propData.innerBgSize == 'custom') {
        innerCardStyleObject['background-size'] =
          (this.propData.innerBgSizeWidth
            ? this.propData.innerBgSizeWidth.inputVal + this.propData.innerBgSizeWidth.selectVal
            : 'auto') +
          ' ' +
          (this.propData.innerBgSizeHeight
            ? this.propData.innerBgSizeHeight.inputVal + this.propData.innerBgSizeHeight.selectVal
            : 'auto');
      } else if (this.propData.innerBgSize) {
        innerCardStyleObject['background-size'] = this.propData.innerBgSize;
      }

      if (this.propData.positionX && this.propData.positionX.inputVal) {
        styleObject['background-position-x'] =
          this.propData.positionX.inputVal + this.propData.positionX.selectVal;
      }
      if (this.propData.innerPositionX && this.propData.innerPositionX.inputVal) {
        innerCardStyleObject['background-position-x'] =
          this.propData.innerPositionX.inputVal + this.propData.innerPositionX.selectVal;
      }

      if (this.propData.positionY && this.propData.positionY.inputVal) {
        styleObject['background-position-y'] =
          this.propData.positionY.inputVal + this.propData.positionY.selectVal;
      }
      if (this.propData.innerPositionY && this.propData.innerPositionY.inputVal) {
        innerCardStyleObject['background-position-y'] =
          this.propData.innerPositionY.inputVal + this.propData.innerPositionY.selectVal;
      }
      for (const key in this.propData) {
        if (this.propData.hasOwnProperty.call(this.propData, key)) {
          const element = this.propData[key];
          if (!element && element !== false && element != 0) {
            continue;
          }
          switch (key) {
            case 'width':
            case 'height':
              styleObject[key] = element;
              break;
            case 'bgColor':
              if (element && element.hex8) {
                styleObject['background-color'] = IDM.hex8ToRgbaString(element.hex8);
              }
              break;
            case 'innerBgColor':
              if (element && element.hex8) {
                innerCardStyleObject['background-color'] = IDM.hex8ToRgbaString(element.hex8);
              }
              break;
            case 'boxShadow':
              styleObject['box-shadow'] = element;
              break;
            case 'box':
              if (element.marginTopVal) {
                styleObject['margin-top'] = `${element.marginTopVal}`;
              }
              if (element.marginRightVal) {
                styleObject['margin-right'] = `${element.marginRightVal}`;
              }
              if (element.marginBottomVal) {
                styleObject['margin-bottom'] = `${element.marginBottomVal}`;
              }
              if (element.marginLeftVal) {
                styleObject['margin-left'] = `${element.marginLeftVal}`;
              }
              if (element.paddingTopVal) {
                styleObject['padding-top'] = `${element.paddingTopVal}`;
              }
              if (element.paddingRightVal) {
                styleObject['padding-right'] = `${element.paddingRightVal}`;
              }
              if (element.paddingBottomVal) {
                styleObject['padding-bottom'] = `${element.paddingBottomVal}`;
              }
              if (element.paddingLeftVal) {
                styleObject['padding-left'] = `${element.paddingLeftVal}`;
              }
              break;
            case 'innerBox':
              if (element.marginTopVal) {
                innerCardStyleObject['margin-top'] = `${element.marginTopVal}`;
              }
              if (element.marginRightVal) {
                innerCardStyleObject['margin-right'] = `${element.marginRightVal}`;
              }
              if (element.marginBottomVal) {
                innerCardStyleObject['margin-bottom'] = `${element.marginBottomVal}`;
              }
              if (element.marginLeftVal) {
                innerCardStyleObject['margin-left'] = `${element.marginLeftVal}`;
              }
              if (element.paddingTopVal) {
                innerCardStyleObject['padding-top'] = `${element.paddingTopVal}`;
              }
              if (element.paddingRightVal) {
                innerCardStyleObject['padding-right'] = `${element.paddingRightVal}`;
              }
              if (element.paddingBottomVal) {
                innerCardStyleObject['padding-bottom'] = `${element.paddingBottomVal}`;
              }
              if (element.paddingLeftVal) {
                innerCardStyleObject['padding-left'] = `${element.paddingLeftVal}`;
              }
              break;
            case 'bgImgUrl':
              styleObject['background-image'] = `url(${window.IDM.url.getWebPath(element)})`;
              break;
            case 'innerBgImgUrl':
              innerCardStyleObject['background-image'] = `url(${window.IDM.url.getWebPath(
                element
              )})`;
              break;
            case 'positionX':
              //背景横向偏移
              break;
            case 'innerPositionX':
              //背景横向偏移
              break;
            case 'positionY':
              //背景纵向偏移
              break;
            case 'innerPositionY':
              //背景纵向偏移
              break;
            case 'bgRepeat':
              //平铺模式
              styleObject['background-repeat'] = element;
              break;
            case 'innerBgRepeat':
              //平铺模式
              innerCardStyleObject['background-repeat'] = element;
              break;
            case 'bgAttachment':
              //背景模式
              styleObject['background-attachment'] = element;
              break;
            case 'innerBgAttachment':
              //背景模式
              innerCardStyleObject['background-attachment'] = element;
              break;
            case 'border':
              if (element.border.top.width > 0) {
                styleObject['border-top-width'] =
                  element.border.top.width + element.border.top.widthUnit;
                styleObject['border-top-style'] = element.border.top.style;
                if (element.border.top.colors.hex8) {
                  styleObject['border-top-color'] = IDM.hex8ToRgbaString(
                    element.border.top.colors.hex8
                  );
                }
              }
              if (element.border.right.width > 0) {
                styleObject['border-right-width'] =
                  element.border.right.width + element.border.right.widthUnit;
                styleObject['border-right-style'] = element.border.right.style;
                if (element.border.right.colors.hex8) {
                  styleObject['border-right-color'] = IDM.hex8ToRgbaString(
                    element.border.right.colors.hex8
                  );
                }
              }
              if (element.border.bottom.width > 0) {
                styleObject['border-bottom-width'] =
                  element.border.bottom.width + element.border.bottom.widthUnit;
                styleObject['border-bottom-style'] = element.border.bottom.style;
                if (element.border.bottom.colors.hex8) {
                  styleObject['border-bottom-color'] = IDM.hex8ToRgbaString(
                    element.border.bottom.colors.hex8
                  );
                }
              }
              if (element.border.left.width > 0) {
                styleObject['border-left-width'] =
                  element.border.left.width + element.border.left.widthUnit;
                styleObject['border-left-style'] = element.border.left.style;
                if (element.border.left.colors.hex8) {
                  styleObject['border-left-color'] = IDM.hex8ToRgbaString(
                    element.border.left.colors.hex8
                  );
                }
              }

              styleObject['border-top-left-radius'] =
                element.radius.leftTop.radius + element.radius.leftTop.radiusUnit;
              styleObject['border-top-right-radius'] =
                element.radius.rightTop.radius + element.radius.rightTop.radiusUnit;
              styleObject['border-bottom-left-radius'] =
                element.radius.leftBottom.radius + element.radius.leftBottom.radiusUnit;
              styleObject['border-bottom-right-radius'] =
                element.radius.rightBottom.radius + element.radius.rightBottom.radiusUnit;
              break;
            case 'innerBorder':
              if (element.border.top.width > 0) {
                innerCardStyleObject['border-top-width'] =
                  element.border.top.width + element.border.top.widthUnit;
                innerCardStyleObject['border-top-style'] = element.border.top.style;
                if (element.border.top.colors.hex8) {
                  innerCardStyleObject['border-top-color'] = IDM.hex8ToRgbaString(
                    element.border.top.colors.hex8
                  );
                }
              }
              if (element.border.right.width > 0) {
                innerCardStyleObject['border-right-width'] =
                  element.border.right.width + element.border.right.widthUnit;
                innerCardStyleObject['border-right-style'] = element.border.right.style;
                if (element.border.right.colors.hex8) {
                  innerCardStyleObject['border-right-color'] = IDM.hex8ToRgbaString(
                    element.border.right.colors.hex8
                  );
                }
              }
              if (element.border.bottom.width > 0) {
                innerCardStyleObject['border-bottom-width'] =
                  element.border.bottom.width + element.border.bottom.widthUnit;
                innerCardStyleObject['border-bottom-style'] = element.border.bottom.style;
                if (element.border.bottom.colors.hex8) {
                  innerCardStyleObject['border-bottom-color'] = IDM.hex8ToRgbaString(
                    element.border.bottom.colors.hex8
                  );
                }
              }
              if (element.border.left.width > 0) {
                innerCardStyleObject['border-left-width'] =
                  element.border.left.width + element.border.left.widthUnit;
                innerCardStyleObject['border-left-style'] = element.border.left.style;
                if (element.border.left.colors.hex8) {
                  innerCardStyleObject['border-left-color'] = IDM.hex8ToRgbaString(
                    element.border.left.colors.hex8
                  );
                }
              }
              innerCardStyleObject['border-top-left-radius'] =
                element.radius.leftTop.radius + element.radius.leftTop.radiusUnit;
              innerCardStyleObject['border-top-right-radius'] =
                element.radius.rightTop.radius + element.radius.rightTop.radiusUnit;
              innerCardStyleObject['border-bottom-left-radius'] =
                element.radius.leftBottom.radius + element.radius.leftBottom.radiusUnit;
              innerCardStyleObject['border-bottom-right-radius'] =
                element.radius.rightBottom.radius + element.radius.rightBottom.radiusUnit;
              break;
            case 'titleFont':
              titleStyleObject['font-family'] = element.fontFamily;
              if (element.fontColors.hex8) {
                titleStyleObject['color'] = IDM.hex8ToRgbaString(element.fontColors.hex8);
              }
              titleStyleObject['font-weight'] =
                element.fontWeight && element.fontWeight.split(' ')[0];
              titleStyleObject['font-style'] = element.fontStyle;
              titleStyleObject['font-size'] =
                element.fontSizeUnit === 'px'
                  ? scale * element.fontSize + element.fontSizeUnit
                  : element.fontSize + element.fontSizeUnit;
              titleStyleObject['line-height'] =
                element.fontLineHeight +
                (element.fontLineHeightUnit == '-' ? '' : element.fontLineHeightUnit);
              titleStyleObject['text-align'] = element.fontTextAlign;
              titleStyleObject['text-decoration'] = element.fontDecoration;
              break;
            case 'titleIconColor':
              iconStyleObject['color'] = IDM.hex8ToRgbaString(element.hex8);
              break;
            case 'titleIconSize':
              iconStyleObject['font-size'] = scale * element + 'px';
              break;
            case 'loadingFont':
              loadingStyleObject['font-family'] = element.fontFamily;
              if (element.fontColors.hex8) {
                loadingStyleObject['color'] = IDM.hex8ToRgbaString(element.fontColors.hex8);
              }
              loadingStyleObject['font-weight'] =
                element.fontWeight && element.fontWeight.split(' ')[0];
              loadingStyleObject['font-style'] = element.fontStyle;
              loadingStyleObject['font-size'] =
                element.fontSizeUnit === 'px'
                  ? scale * element.fontSize + element.fontSizeUnit
                  : element.fontSize + element.fontSizeUnit;
              loadingStyleObject['line-height'] =
                element.fontLineHeight +
                (element.fontLineHeightUnit == '-' ? '' : element.fontLineHeightUnit);
              loadingStyleObject['text-align'] = element.fontTextAlign;
              loadingStyleObject['text-decoration'] = element.fontDecoration;
              break;
            case 'emptyFont':
              emptyStyleObject['font-family'] = element.fontFamily;
              if (element.fontColors.hex8) {
                emptyStyleObject['color'] = IDM.hex8ToRgbaString(element.fontColors.hex8);
              }
              emptyStyleObject['font-weight'] =
                element.fontWeight && element.fontWeight.split(' ')[0];
              emptyStyleObject['font-style'] = element.fontStyle;
              emptyStyleObject['font-size'] =
                element.fontSizeUnit === 'px'
                  ? scale * element.fontSize + element.fontSizeUnit
                  : element.fontSize + element.fontSizeUnit;
              emptyStyleObject['line-height'] =
                element.fontLineHeight +
                (element.fontLineHeightUnit == '-' ? '' : element.fontLineHeightUnit);
              emptyStyleObject['text-align'] = element.fontTextAlign;
              emptyStyleObject['text-decoration'] = element.fontDecoration;
              break;
          }
        }
      }
      // 内层容器高度适配，若外层有高度，则内层随外层缩放。若外层没有高度，则由内层容器的子元素撑起。前提设置的有外层容器高度属性，若无此值不走此逻辑，取下面style中的预设
      // if (styleObject.height && styleObject.height != 'auto') {
      //   innerCardStyleObject.height = 0;
      // } else if (styleObject.height && styleObject.height == 'auto') {
      //   innerCardStyleObject.height = 'auto';
      // }
      window.IDM.setStyleToPageHead(this.moduleObject.id, styleObject);
      window.IDM.setStyleToPageHead(
        this.moduleObject.id + ' .i-barChart-content',
        innerCardStyleObject
      );
      window.IDM.setStyleToPageHead(
        this.moduleObject.id + ' .i-barChart-header-tit span',
        titleStyleObject
      );
      window.IDM.setStyleToPageHead(
        this.moduleObject.packageid +
          ' #' +
          this.moduleObject.id +
          ' .i-barChart-header-tit .i-barChart-header-tit-icon',
        iconStyleObject
      );
      window.IDM.setStyleToPageHead(this.moduleObject.id + ' .van-empty', emptyStyleObject);
      window.IDM.setStyleToPageHead(this.moduleObject.id + ' .van-loading', loadingStyleObject);
    },
    /**
     * 主题颜色
     */
    convertThemeListAttrToStyleObject() {
      const themeList = this.propData.themeList;
      if (!themeList) {
        return;
      }
      const themeNamePrefix =
        IDM.setting && IDM.setting.applications && IDM.setting.applications.themeNamePrefix
          ? IDM.setting.applications.themeNamePrefix
          : 'idm-theme-';
      for (var i = 0; i < themeList.length; i++) {
        const item = themeList[i];

        const titleSvgStyleObject = {
          color: item.mainColor ? IDM.hex8ToRgbaString(item.mainColor.hex8) : ''
        };

        IDM.setStyleToPageHead(
          '.' +
            themeNamePrefix +
            item.key +
            ' #' +
            (this.moduleObject.packageid || 'module_demo') +
            ' .i-barChart-header-tit .i-barChart-header-tit-icon',
          titleSvgStyleObject
        );
      }
    }
  }
};
</script>

<style scoped lang="scss">
$scale: var(--i-barChart-scale);
.i-barChart-outer {
  width: auto;
  box-sizing: border-box;
  padding: 10px;
  font-family: PingFangSC-Regular;
  color: #333333;
  background-color: #fff;
  position: relative;
  font-size: calc(14px * #{$scale});
  display: flex;
  flex-direction: column;
  align-items: stretch;
  height: 300px;
  overflow: hidden;

  .i-barChart-header {
    display: flex;
    // height: calc(40px * #{ $scale });
    // line-height: calc(40px * #{ $scale });
    justify-content: space-between;
    align-items: center;

    .i-barChart-header-main {
      // width: 86%;
      flex-grow: 1;
      display: flex;
      align-items: center;

      .i-barChart-header-tit {
        font-family: PingFangSC-Regular;
        color: #333333;
        font-style: normal;
        text-decoration: none;
        font-size: calc(16px * #{$scale});
        max-width: 60%;
        display: flex;
        align-items: center;

        .i-barChart-header-tit-icon {
          margin-right: 5px;
          display: inline-block;
          flex: 1;
        }

        span {
          margin-right: 5px;
          width: 90%;
          overflow: hidden;
          flex: 8;
        }

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

    .i-barChart-header-more {
      // opacity: 0.5;
      margin: 0 5px;
      position: relative;
    }
  }

  .i-barChart-content {
    /* border-radius: calc(10px * #{$scale});
    padding: calc(10px * #{$scale}) calc(14px * #{$scale}); */
    flex-grow: 1;
    flex-shrink: 1;
    height: 0;
    width: 100%;

    ::v-deep .van-loading {
      height: 100%;
      justify-content: center;
    }

    ::v-deep .van-empty {
      padding: 0;
      height: 100%;
    }

    ::v-deep .van-empty__description {
      font-size: inherit;
    }
    .i-barChart-content-chart {
      width: 100%;
      height: 100%;
    }
  }

  .i-barChart-mask {
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
}
</style>
