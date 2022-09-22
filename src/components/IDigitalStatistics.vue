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
    class="i-digitalStatistics-outer"
  >
    <div key="i-digitalStatistics-content" class="i-digitalStatistics-content">
      <van-loading v-show="isLoading" :size="loadingSize" vertical>{{
        propData.loadingDescription || '加载中...'
      }}</van-loading>
      <div
        v-show="!isLoading && data && data.length > 0"
        class="i-digitalStatistics-content-wapper"
      >
        <div
          class="i-digitalStatistics-content-item"
          v-for="(item, index) in data"
          :key="index"
          @click.stop="itemClick(item)"
        >
          <div
            :class="`option option${option.key}`"
            v-for="option in optionList"
            :key="option.key"
            @click.stop="optionClick(option, item)"
          >
            {{
              option.type == 'feild'
                ? option.feild && getExpressData('data', option.feild, item)
                : option.name
            }}
          </div>
        </div>
      </div>
      <van-empty
        v-show="!isLoading && (!data || data.length == 0)"
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
      class="i-digitalStatistics-mask"
      v-if="
        moduleObject.env !== 'production' &&
        ((propData.isShowTitleBar &&
          propData.columnsType == 'dataSource' &&
          !propData.columnsDataSource) ||
          !propData.dataSource)
      "
    >
      <span>！未绑定数据源</span>
    </div>
    <van-popup
      v-if="propData.isShowTitleBar && propData.columnsType != 'none'"
      v-model="showPicker"
      round
      position="bottom"
    >
      <van-picker
        show-toolbar
        :title="propData.selectBtnPlaceholder || '请选择'"
        :columns="columnsText"
        @cancel="showPicker = false"
        @confirm="onConfirm"
      />
    </van-popup>
  </div>
</template>

<script>
import { Empty, Loading, Image as VanImage } from 'vant';
import 'vant/lib/empty/style';
import 'vant/lib/loading/style';
import 'vant/lib/image/style';
const devResult = [
  { value: '100分钟', name: '今日学习时长', text: '学习记录' },
  { value: '100分钟', name: '今日学习时长', text: '排行榜' },
  { value: '100分钟', name: '今日学习时长', text: '查看详情' }
];
const devOptionList = [
  { key: '1', feild: 'value', type: 'feild' },
  { key: '2', feild: 'name', type: 'feild' },
  { key: '3', feild: 'text', type: 'feild' }
];
export default {
  name: 'IDigitalStatistics',
  components: {
    [Empty.name]: Empty,
    [Loading.name]: Loading,
    [VanImage.name]: VanImage
  },
  // dataSource: '1',
  // optionList: [{ key: '1' }]
  data() {
    return {
      moduleObject: {},
      propData: this.$root.propData.compositeAttr || {},
      isLoading: false,
      data: []
    };
  },
  props: {},
  computed: {
    emptyImageSize() {
      return this.getScale() * (this.propData.emptyImageSize || 70);
    },
    loadingSize() {
      return this.getScale() * (this.propData.loadingSize || 24);
    },
    optionList() {
      if (
        this.propData.optionList &&
        this.propData.optionList[0] &&
        this.propData.optionList[0].key
      ) {
        return this.propData.optionList;
      }
      return devOptionList;
    }
  },
  created() {
    this.moduleObject = this.$root.moduleObject;
    this.convertAttrToStyleObject();
    this.convertThemeListAttrToStyleObject();
    this.initData();
  },
  methods: {
    /**
     * 提供父级组件调用的刷新prop数据组件
     */
    propDataWatchHandle(propData) {
      this.propData = propData.compositeAttr || {};
      this.convertAttrToStyleObject();
      this.convertThemeListAttrToStyleObject();
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
        case 'linkageReload':
          this.initData();
          break;
        case 'pageResize':
          this.convertAttrToStyleObject(messageObject.message);
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
        window[customFunction[0].name] &&
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
        this.data = devResult;
        return;
      }
      this.getData();
    },
    getData() {
      if (
        !this.moduleObject.env ||
        this.moduleObject.env == 'develop' ||
        !this.propData.dataSource
      ) {
        return false;
      }
      const url = `ctrl/dataSource/getDatas`;
      // const urlObject = IDM.url.queryObject();
      // const routerParams = this.moduleObject.routerId
      //   ? IDM.router.getParam(this.moduleObject.routerId)
      //   : {};
      this.isLoading = true;
      IDM.http
        .post(
          url,
          {
            // ...urlObject,
            // ...routerParams,
            id: this.propData.dataSource.value
          },
          {
            headers: {
              'Content-Type': 'application/json;charset=UTF-8'
            }
          }
        )
        .done(res => {
          if (res.type === 'success') {
            const resultData = this.customFormat(this.propData.customFunction, res.data);
            this.data = resultData;
          }
          this.isLoading = false;
        })
        .error(err => {
          console.log(err);
          this.isLoading = false;
        });
    },
    itemClick(item) {
      if (
        !this.moduleObject.env ||
        this.moduleObject.env == 'develop' ||
        this.propData.itemJumpTarget == 'none' ||
        !item
      ) {
        return;
      }
      if (this.propData.itemJumpTarget && this.propData.itemJumpTarget === 'custom') {
        this.customFunctionHandle(this.propData.customItemJumpFunction, { item });
      } else if (
        this.propData.itemJumpTarget &&
        (this.propData.itemJumpTarget === 'router' || this.propData.itemJumpTarget === 'feild')
      ) {
        let itemJumpPageId = null;
        if (this.propData.itemJumpTarget === 'router') {
          itemJumpPageId = this.propData.itemJumpPageId && this.propData.itemJumpPageId[0]?.id;
        } else if (this.propData.itemJumpTarget === 'feild') {
          itemJumpPageId =
            this.propData.itemJumpPageFeild &&
            this.getExpressData('data', this.propData.itemJumpPageFeild, item);
        }
        itemJumpPageId &&
          IDM.router.push(this.moduleObject.pageid, itemJumpPageId, {
            keep: true,
            params: item,
            enterAnim: '',
            quitAnim: ''
          });
      } else if (this.propData.itemJumpUrl) {
        const url = IDM.url.getWebPath(IDM.express.replace(this.propData.itemJumpUrl, item));
        window.open(url, this.propData.itemJumpTarget || '_self');
      }
    },
    optionClick(option, item) {
      if (
        !this.moduleObject.env ||
        this.moduleObject.env == 'develop' ||
        option.jumpTarget == 'none' ||
        !item
      ) {
        return;
      }
      if (option.jumpTarget && option.jumpTarget === 'custom') {
        this.customFunctionHandle(option.customJumpFunction, { item });
      } else if (
        option.jumpTarget &&
        (option.jumpTarget === 'router' || option.jumpTarget === 'feild')
      ) {
        let jumpPageId = null;
        if (option.jumpTarget === 'router') {
          jumpPageId = option.jumpPageId && option.jumpPageId[0]?.id;
        } else if (option.jumpTarget === 'feild') {
          jumpPageId =
            option.jumpPageFeild && this.getExpressData('data', option.jumpPageFeild, item);
        }
        jumpPageId &&
          IDM.router.push(this.moduleObject.pageid, jumpPageId, {
            keep: true,
            params: item,
            enterAnim: '',
            quitAnim: ''
          });
      } else if (option.itemJumpUrl) {
        const url = IDM.url.getWebPath(IDM.express.replace(option.jumpUrl, item));
        window.open(url, option.jumpTarget || '_self');
      }
    },
    /**
     * 把属性转换成样式对象
     */
    convertAttrToStyleObject(pageSize = {}) {
      const styleObject = {};
      const emptyStyleObject = {};
      const loadingStyleObject = {};
      const itemStyleObject = {};
      const itemActiveStyleObject = {};
      const splitLineStyleObject = {};

      const scale = this.getScale(pageSize.width);
      styleObject['--i-digitalStatistics-scale'] = scale;

      this.propData.optionList &&
        this.propData.optionList.forEach(option => {
          const optionStyleObject = {};
          const optionActiveStyleObject = {};
          let element = option.optionFont;
          if (element && Object.keys(element).length > 0) {
            optionStyleObject['font-family'] = element.fontFamily;
            if (element.fontColors.hex8) {
              optionStyleObject['color'] = IDM.hex8ToRgbaString(element.fontColors.hex8);
            }
            optionStyleObject['font-weight'] =
              element.fontWeight && element.fontWeight.split(' ')[0];
            optionStyleObject['font-style'] = element.fontStyle;
            optionStyleObject['font-size'] =
              element.fontSizeUnit === 'px'
                ? scale * element.fontSize + element.fontSizeUnit
                : element.fontSize + element.fontSizeUnit;
            optionStyleObject['line-height'] =
              element.fontLineHeight +
              (element.fontLineHeightUnit == '-' ? '' : element.fontLineHeightUnit);
            optionStyleObject['text-align'] = element.fontTextAlign;
            optionStyleObject['text-decoration'] = element.fontDecoration;
            window.IDM.setStyleToPageHead(
              this.moduleObject.id +
                ` .i-digitalStatistics-content .i-digitalStatistics-content-item .option${option.key}`,
              optionStyleObject
            );
          }

          element = option.optionActiveFont;
          if (element && Object.keys(element).length > 0) {
            optionActiveStyleObject['font-family'] = element.fontFamily;
            if (element.fontColors.hex8) {
              optionActiveStyleObject['color'] = IDM.hex8ToRgbaString(element.fontColors.hex8);
            }
            optionActiveStyleObject['font-weight'] =
              element.fontWeight && element.fontWeight.split(' ')[0];
            optionActiveStyleObject['font-style'] = element.fontStyle;
            optionActiveStyleObject['font-size'] =
              element.fontSizeUnit === 'px'
                ? scale * element.fontSize + element.fontSizeUnit
                : element.fontSize + element.fontSizeUnit;
            optionActiveStyleObject['line-height'] =
              element.fontLineHeight +
              (element.fontLineHeightUnit == '-' ? '' : element.fontLineHeightUnit);
            optionActiveStyleObject['text-align'] = element.fontTextAlign;
            optionActiveStyleObject['text-decoration'] = element.fontDecoration;
            window.IDM.setStyleToPageHead(
              this.moduleObject.id +
                ` .i-digitalStatistics-content .i-digitalStatistics-content-item .option${option.key}:active`,
              optionActiveStyleObject
            );
          }
        });

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
      if (this.propData.positionX && this.propData.positionX.inputVal) {
        styleObject['background-position-x'] =
          this.propData.positionX.inputVal + this.propData.positionX.selectVal;
      }
      if (this.propData.positionY && this.propData.positionY.inputVal) {
        styleObject['background-position-y'] =
          this.propData.positionY.inputVal + this.propData.positionY.selectVal;
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
            case 'itemBgColor':
              if (element && element.hex8) {
                itemStyleObject['background-color'] = IDM.hex8ToRgbaString(element.hex8);
              }
              break;
            case 'itemActiveBgColor':
              if (element && element.hex8) {
                itemActiveStyleObject['background-color'] = IDM.hex8ToRgbaString(element.hex8);
              }
              break;
            case 'splitLineColor':
              if (element && element.hex8) {
                splitLineStyleObject['background'] = `linear-gradient(to bottom, transparent, ${IDM.hex8ToRgbaString(element.hex8)}, transparent)`;
              }
              break;
            case 'boxShadow':
              styleObject['box-shadow'] = element;
              break;
            case 'itemBoxShadow':
              itemStyleObject['box-shadow'] = element;
              break;
            case 'itemActiveBoxShadow':
              itemActiveStyleObject['box-shadow'] = element;
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
            case 'itemBox':
              if (element.marginTopVal) {
                itemStyleObject['margin-top'] = `${element.marginTopVal}`;
              }
              if (element.marginRightVal) {
                itemStyleObject['margin-right'] = `${element.marginRightVal}`;
              }
              if (element.marginBottomVal) {
                itemStyleObject['margin-bottom'] = `${element.marginBottomVal}`;
              }
              if (element.marginLeftVal) {
                itemStyleObject['margin-left'] = `${element.marginLeftVal}`;
              }
              if (element.paddingTopVal) {
                itemStyleObject['padding-top'] = `${element.paddingTopVal}`;
              }
              if (element.paddingRightVal) {
                itemStyleObject['padding-right'] = `${element.paddingRightVal}`;
              }
              if (element.paddingBottomVal) {
                itemStyleObject['padding-bottom'] = `${element.paddingBottomVal}`;
              }
              if (element.paddingLeftVal) {
                itemStyleObject['padding-left'] = `${element.paddingLeftVal}`;
              }
              break;
            case 'itemActiveBox':
              if (element.marginTopVal) {
                itemActiveStyleObject['margin-top'] = `${element.marginTopVal}`;
              }
              if (element.marginRightVal) {
                itemActiveStyleObject['margin-right'] = `${element.marginRightVal}`;
              }
              if (element.marginBottomVal) {
                itemActiveStyleObject['margin-bottom'] = `${element.marginBottomVal}`;
              }
              if (element.marginLeftVal) {
                itemActiveStyleObject['margin-left'] = `${element.marginLeftVal}`;
              }
              if (element.paddingTopVal) {
                itemActiveStyleObject['padding-top'] = `${element.paddingTopVal}`;
              }
              if (element.paddingRightVal) {
                itemActiveStyleObject['padding-right'] = `${element.paddingRightVal}`;
              }
              if (element.paddingBottomVal) {
                itemActiveStyleObject['padding-bottom'] = `${element.paddingBottomVal}`;
              }
              if (element.paddingLeftVal) {
                itemActiveStyleObject['padding-left'] = `${element.paddingLeftVal}`;
              }
              break;
            case 'bgImgUrl':
              styleObject['background-image'] = `url(${window.IDM.url.getWebPath(element)})`;
              break;
            case 'positionX':
              //背景横向偏移
              break;
            case 'positionY':
              //背景纵向偏移
              break;
            case 'bgRepeat':
              //平铺模式
              styleObject['background-repeat'] = element;
              break;
            case 'bgAttachment':
              //背景模式
              styleObject['background-attachment'] = element;
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
            case 'itemBorder':
              if (element.border.top.width > 0) {
                itemStyleObject['border-top-width'] =
                  element.border.top.width + element.border.top.widthUnit;
                itemStyleObject['border-top-style'] = element.border.top.style;
                if (element.border.top.colors.hex8) {
                  itemStyleObject['border-top-color'] = IDM.hex8ToRgbaString(
                    element.border.top.colors.hex8
                  );
                }
              }
              if (element.border.right.width > 0) {
                itemStyleObject['border-right-width'] =
                  element.border.right.width + element.border.right.widthUnit;
                itemStyleObject['border-right-style'] = element.border.right.style;
                if (element.border.right.colors.hex8) {
                  itemStyleObject['border-right-color'] = IDM.hex8ToRgbaString(
                    element.border.right.colors.hex8
                  );
                }
              }
              if (element.border.bottom.width > 0) {
                itemStyleObject['border-bottom-width'] =
                  element.border.bottom.width + element.border.bottom.widthUnit;
                itemStyleObject['border-bottom-style'] = element.border.bottom.style;
                if (element.border.bottom.colors.hex8) {
                  itemStyleObject['border-bottom-color'] = IDM.hex8ToRgbaString(
                    element.border.bottom.colors.hex8
                  );
                }
              }
              if (element.border.left.width > 0) {
                itemStyleObject['border-left-width'] =
                  element.border.left.width + element.border.left.widthUnit;
                itemStyleObject['border-left-style'] = element.border.left.style;
                if (element.border.left.colors.hex8) {
                  itemStyleObject['border-left-color'] = IDM.hex8ToRgbaString(
                    element.border.left.colors.hex8
                  );
                }
              }

              itemStyleObject['border-top-left-radius'] =
                element.radius.leftTop.radius + element.radius.leftTop.radiusUnit;
              itemStyleObject['border-top-right-radius'] =
                element.radius.rightTop.radius + element.radius.rightTop.radiusUnit;
              itemStyleObject['border-bottom-left-radius'] =
                element.radius.leftBottom.radius + element.radius.leftBottom.radiusUnit;
              itemStyleObject['border-bottom-right-radius'] =
                element.radius.rightBottom.radius + element.radius.rightBottom.radiusUnit;
              break;
            case 'itemActiveBorder':
              if (element.border.top.width > 0) {
                itemActiveStyleObject['border-top-width'] =
                  element.border.top.width + element.border.top.widthUnit;
                itemActiveStyleObject['border-top-style'] = element.border.top.style;
                if (element.border.top.colors.hex8) {
                  itemActiveStyleObject['border-top-color'] = IDM.hex8ToRgbaString(
                    element.border.top.colors.hex8
                  );
                }
              }
              if (element.border.right.width > 0) {
                itemActiveStyleObject['border-right-width'] =
                  element.border.right.width + element.border.right.widthUnit;
                itemActiveStyleObject['border-right-style'] = element.border.right.style;
                if (element.border.right.colors.hex8) {
                  itemActiveStyleObject['border-right-color'] = IDM.hex8ToRgbaString(
                    element.border.right.colors.hex8
                  );
                }
              }
              if (element.border.bottom.width > 0) {
                itemActiveStyleObject['border-bottom-width'] =
                  element.border.bottom.width + element.border.bottom.widthUnit;
                itemActiveStyleObject['border-bottom-style'] = element.border.bottom.style;
                if (element.border.bottom.colors.hex8) {
                  itemActiveStyleObject['border-bottom-color'] = IDM.hex8ToRgbaString(
                    element.border.bottom.colors.hex8
                  );
                }
              }
              if (element.border.left.width > 0) {
                itemActiveStyleObject['border-left-width'] =
                  element.border.left.width + element.border.left.widthUnit;
                itemActiveStyleObject['border-left-style'] = element.border.left.style;
                if (element.border.left.colors.hex8) {
                  itemActiveStyleObject['border-left-color'] = IDM.hex8ToRgbaString(
                    element.border.left.colors.hex8
                  );
                }
              }

              itemActiveStyleObject['border-top-left-radius'] =
                element.radius.leftTop.radius + element.radius.leftTop.radiusUnit;
              itemActiveStyleObject['border-top-right-radius'] =
                element.radius.rightTop.radius + element.radius.rightTop.radiusUnit;
              itemActiveStyleObject['border-bottom-left-radius'] =
                element.radius.leftBottom.radius + element.radius.leftBottom.radiusUnit;
              itemActiveStyleObject['border-bottom-right-radius'] =
                element.radius.rightBottom.radius + element.radius.rightBottom.radiusUnit;
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
      window.IDM.setStyleToPageHead(this.moduleObject.id + ' .van-empty', emptyStyleObject);
      window.IDM.setStyleToPageHead(this.moduleObject.id + ' .van-loading', loadingStyleObject);
      window.IDM.setStyleToPageHead(
        this.moduleObject.id + ' .i-digitalStatistics-content .i-digitalStatistics-content-item',
        itemStyleObject
      );
      window.IDM.setStyleToPageHead(
        this.moduleObject.id +
          ' .i-digitalStatistics-content .i-digitalStatistics-content-item:active',
        itemActiveStyleObject
      );
      window.IDM.setStyleToPageHead(
        this.moduleObject.id +
          ' .i-digitalStatistics-content .i-digitalStatistics-content-item:not(:last-child):after',
        { ...splitLineStyleObject, display: this.propData.isSplitLine ? 'block' : 'none'}
      );
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

        const colorObj = {
          color: item.mainColor ? IDM.hex8ToRgbaString(item.mainColor.hex8) : ''
        };

        this.propData.optionList &&
          this.propData.optionList.forEach(option => {
            if (option.isThemeColor) {
              IDM.setStyleToPageHead(
                '.' +
                  themeNamePrefix +
                  item.key +
                  ' #' +
                  (this.moduleObject.packageid || 'module_demo') +
                  ` .i-digitalStatistics-content .i-digitalStatistics-content-item .option${option.key}`,
                colorObj
              );
            } else {
              IDM.setStyleToPageHead(
                '.' +
                  themeNamePrefix +
                  item.key +
                  ' #' +
                  (this.moduleObject.packageid || 'module_demo') +
                  ` .i-digitalStatistics-content .i-digitalStatistics-content-item .option${option.key}`,
                { color: '' }
              );
            }
            // if (option.isActiveThemeColor) {
            //   IDM.setStyleToPageHead(
            //     '.' +
            //       themeNamePrefix +
            //       item.key +
            //       ' #' +
            //       (this.moduleObject.packageid || 'module_demo') +
            //       ` .i-digitalStatistics-content .i-digitalStatistics-content-item .option${option.key}:active`,
            //     colorObj
            //   );
            // } else {
            //   IDM.setStyleToPageHead(
            //     '.' +
            //       themeNamePrefix +
            //       item.key +
            //       ' #' +
            //       (this.moduleObject.packageid || 'module_demo') +
            //       ` .i-digitalStatistics-content .i-digitalStatistics-content-item .option${option.key}:active`,
            //     { color: '' }
            //   );
            // }
          });
      }
    }
  }
};
</script>

<style scoped lang="scss">
$scale: var(--i-digitalStatistics-scale);
.i-digitalStatistics-outer {
  width: auto;
  box-sizing: border-box;
  padding: 10px;
  font-family: PingFangSC-Regular;
  color: #333333;
  background-color: #fff;
  position: relative;
  font-size: calc(14px * #{$scale});
  height: 300px;
  overflow: hidden;

  .i-digitalStatistics-content {
    height: 100%;
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

    .i-digitalStatistics-content-wapper {
      height: 100%;
      width: 100%;
      display: flex;
      flex-direction: row;
      align-items: stretch;
      flex-wrap: nowrap;
      justify-content: space-between;
      .i-digitalStatistics-content-item {
        flex-grow: 1;
        flex-shrink: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        position: relative;
        &:not(:last-child):after{
          content: '';
          right: 0;
          top: 0;
          bottom: 0;
          position: absolute;
          border: 0;
          padding-right: 1px;
          background: linear-gradient(to bottom, transparent, #d0d0d5, transparent);
        }
        .option {
          width: 100%;
          text-align: center;
          font-size: calc(14px * #{$scale});
        }
      }
    }
  }

  .i-digitalStatistics-mask {
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
