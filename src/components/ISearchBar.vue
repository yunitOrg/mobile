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
    class="i-searchBar-outer"
  >
    <van-search
      class="i-searchBar-search"
      v-model="searchValue"
      :maxlength="propData.searchMaxlength"
      :show-action="showAction && propData.showAction"
      :autofocus="propData.autofocus"
      :placeholder="propData.placeholder"
      @search="onSearch"
      @focus="onFocus"
    >
      <template #action>
        <div @click="onCancel">取消</div>
      </template>
    </van-search>
    <div
      v-show="showAction && (propData.showPopular || propData.showRecord)"
      class="i-searchBar-panel"
    >
      <div
        v-if="propData.showPopular && popularData && popularData.length > 0"
        class="i-searchBar-popular"
      >
        <div class="i-searchBar-popular-header" v-if="propData.isShowPopularTitleBar">
          <div class="i-searchBar-popular-header-main">
            <div class="i-searchBar-popular-header-tit">
              <div class="i-searchBar-popular-header-tit-icon" v-if="propData.showPopularIcon">
                <svg
                  v-if="propData.popularTitleIcon && propData.popularTitleIcon.length > 0"
                  class="idm_filed_svg_icon"
                  aria-hidden="true"
                >
                  <use
                    :xlink:href="`#${propData.popularTitleIcon && propData.popularTitleIcon[0]}`"
                  />
                </svg>
                <svg-icon v-else icon-class="application-icon" />
              </div>
              <span>{{ propData.popularTitle }}</span>
            </div>
          </div>
        </div>
        <div class="i-searchBar-popular-content">
          <van-tag
            v-for="(item, index) in popularData"
            :key="index"
            size="medium"
            :style="{
              'margin-right': tagsMarginRight + 'px',
              'margin-top': tagsMarginTop + 'px'
            }"
            @click="onTagClick(item)"
          >
            {{ item }}
          </van-tag>
        </div>
      </div>
      <div
        v-if="propData.showRecord && recordData && recordData.length > 0"
        class="i-searchBar-record"
      >
        <div class="i-searchBar-record-header" v-if="propData.isShowRecordTitleBar">
          <div class="i-searchBar-record-header-main">
            <div class="i-searchBar-record-header-tit">
              <div class="i-searchBar-record-header-tit-icon" v-if="propData.showRecordIcon">
                <svg
                  v-if="propData.recordTitleIcon && propData.recordTitleIcon.length > 0"
                  class="idm_filed_svg_icon"
                  aria-hidden="true"
                >
                  <use
                    :xlink:href="`#${propData.recordTitleIcon && propData.recordTitleIcon[0]}`"
                  />
                </svg>
                <svg-icon v-else icon-class="application-icon" />
              </div>
              <span>{{ propData.recordTitle }}</span>
            </div>
          </div>
        </div>
        <div class="i-searchBar-record-content">
          <van-cell
            clickable
            v-for="(item, index) in recordData"
            :key="index"
            :title="item"
            icon="clock-o"
            :title-style="{ 'margin-left': getScale() * 10 + 'px' }"
            @click="onCellClick(item)"
          >
            <template #right-icon>
              <van-icon
                name="cross"
                style="line-height: inherit"
                @click.stop="onCellRemove(item)"
              />
            </template>
          </van-cell>
        </div>
      </div>
    </div>
    <div
      v-show="!showAction && (propData.showPopular || propData.showRecord)"
      class="drag_container i-searchBar-container"
      idm-ctrl-inner
      :idm-ctrl-id="moduleObject.id"
      idm-container-index="1"
    ></div>
    <div
      class="i-searchBar-mask"
      v-if="
        moduleObject.env !== 'production' &&
        ((propData.showRecord &&
          propData.recordType == 'dataSource' &&
          (!propData.recordDataSource ||
            !propData.recordAdddataSource ||
            !propData.recordRemoveDataSource)) ||
          (propData.showPopular &&
            propData.popularType == 'dataSource' &&
            !propData.popularDataSource))
      "
    >
      <span>！未绑定数据源</span>
    </div>
  </div>
</template>

<script>
const devPopularResult = ['党费缴纳', '主题教育', '学习', '积分', '学时', '党费缴纳', '主题教育'];
import { Empty, Loading, Image as VanImage, Search, Tag, Cell } from 'vant';
import 'vant/lib/empty/style';
import 'vant/lib/loading/style';
import 'vant/lib/image/style';
import 'vant/lib/search/style';
import 'vant/lib/tag/style';
import 'vant/lib/cell/style';
export default {
  name: 'ISearchBar',
  components: {
    [Empty.name]: Empty,
    [Loading.name]: Loading,
    [VanImage.name]: VanImage,
    [Search.name]: Search,
    [Tag.name]: Tag,
    [Cell.name]: Cell
  },
  data() {
    // showAction: true,
    // autofocus: false,
    // isShowRecordTitleBar: true,
    // isShowPopularTitleBar: true,
    // showRecordIcon: true,
    // showPopularIcon: true,
    // tagsPlain: false,
    // tagsSize: 'medium',
    // popularTitle: '热门搜索',
    // recordTitle: '搜索历史',
    // recordType: 'local',
    // recordDataSource: '1',
    // recordAdddataSource: '1',
    // recordRemoveDataSource: '',
    // recordLocalDisplayMode: 'time',
    // showRecord: false,
    // showPopular: true,
    // popularType: 'static',
    // popularDataSource: '1',
    // placeholder: '请输入搜索关键词',
    // popularStaticSet: [
    //   { text: '党费缴纳' },
    //   { text: '主题教育' },
    //   { text: '学习' },
    //   { text: '积分' }
    // ]

    return {
      moduleObject: {},
      propData: this.$root.propData.compositeAttr || {},
      searchValue: '',
      preSearchValue: '',
      showAction: false,
      popularData: [],
      recordData: []
    };
  },
  computed: {
    tagsMarginRight() {
      return this.getScale() * (this.propData.tagsMarginRight || 24);
    },
    tagsMarginTop() {
      return this.getScale() * (this.propData.tagsMarginTop || 10);
    }
  },
  created() {
    this.moduleObject = this.$root.moduleObject;
    this.convertAttrToStyleObject();
    this.convertThemeListAttrToStyleObject();
  },
  methods: {
    /**
     * 提供父级组件调用的刷新prop数据组件
     */
    propDataWatchHandle(propData) {
      this.propData = propData.compositeAttr || {};
      this.convertAttrToStyleObject();
      this.convertThemeListAttrToStyleObject();
      this.getPopular();
    },
    sendBroadcastMessage(object) {
      window.IDM.broadcast && window.IDM.broadcast.send(object);
    },
    /**
     * 组件通信：接收消息的方法
     */
    receiveBroadcastMessage(messageObject) {
      switch (messageObject.type) {
        // case 'websocket':
        //   if (this.propData.messageRefreshKey && messageObject.message) {
        //     const messageData =
        //       (typeof messageObject.message === 'string' && JSON.parse(messageObject.message)) ||
        //       messageObject.message;
        //     const arr = Array.isArray(this.propData.messageRefreshKey)
        //       ? this.propData.messageRefreshKey
        //       : [this.propData.messageRefreshKey];
        //     if (messageData.badgeType && arr.includes(messageData.badgeType)) {
        //       this.propData.showRecord && this.getRecord();
        //       this.propData.showPopular && this.getPopular();
        //     }
        //   }
        //   break;
        case 'linkageReload':
          this.propData.showRecord && this.getRecord();
          this.propData.showPopular && this.getPopular();
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
    /**
     * 把属性转换成样式对象
     */
    convertAttrToStyleObject(pageSize = {}) {
      const styleObject = {};
      const panelStyleObject = {};
      const searchOutsideStyleObject = {};
      const searchStyleObject = {};
      const searchIconStyleObject = {};
      const searchInputStyleObject = {};
      const searchCancelStyleObject = {};
      const popularTitleIconStyleObject = {};
      const popularTitleStyleObject = {};
      const popularStyleObject = {};
      const popularContentStyleObject = {};
      const tagsStyleObject = {};
      const recordTitleIconStyleObject = {};
      const recordTitleStyleObject = {};
      const recordStyleObject = {};
      const recordContentStyleObject = {};
      const cellStyleObject = {};
      const cellTitleStyleObject = {};
      const cellIconStyleObject = {};

      const scale = this.getScale(pageSize.width);
      styleObject['--i-searchBar-scale'] = scale;

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

      if (this.propData.panelBgSize && this.propData.panelBgSize == 'custom') {
        panelStyleObject['background-size'] =
          (this.propData.panelBgSizeWidth
            ? this.propData.panelBgSizeWidth.inputVal + this.propData.panelBgSizeWidth.selectVal
            : 'auto') +
          ' ' +
          (this.propData.panelBgSizeHeight
            ? this.propData.panelBgSizeHeight.inputVal + this.propData.panelBgSizeHeight.selectVal
            : 'auto');
      } else if (this.propData.panelBgSize) {
        panelStyleObject['background-size'] = this.propData.panelBgSize;
      }
      if (this.propData.panelPositionX && this.propData.panelPositionX.inputVal) {
        panelStyleObject['background-position-x'] =
          this.propData.panelPositionX.inputVal + this.propData.panelPositionX.selectVal;
      }
      if (this.propData.panelPositionY && this.propData.panelPositionY.inputVal) {
        panelStyleObject['background-position-y'] =
          this.propData.panelPositionY.inputVal + this.propData.panelPositionY.selectVal;
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
            case 'panelBgColor':
              if (element && element.hex8) {
                panelStyleObject['background-color'] = IDM.hex8ToRgbaString(element.hex8);
              }
              break;
            case 'searchOutsideBgColor':
              if (element && element.hex8) {
                searchOutsideStyleObject['background-color'] = IDM.hex8ToRgbaString(element.hex8);
              }
              break;
            case 'searchBgColor':
              if (element && element.hex8) {
                searchStyleObject['background-color'] = IDM.hex8ToRgbaString(element.hex8);
              }
              break;
            case 'popularBgColor':
              if (element && element.hex8) {
                popularStyleObject['background-color'] = IDM.hex8ToRgbaString(element.hex8);
              }
              break;
            case 'recordBgColor':
              if (element && element.hex8) {
                recordStyleObject['background-color'] = IDM.hex8ToRgbaString(element.hex8);
              }
              break;
            case 'boxShadow':
              styleObject['box-shadow'] = element;
              break;
            case 'panelBoxShadow':
              panelStyleObject['box-shadow'] = element;
              break;
            case 'popularboxShadow':
              popularStyleObject['box-shadow'] = element;
              break;
            case 'recordboxShadow':
              recordStyleObject['box-shadow'] = element;
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
            case 'panelBox':
              if (element.marginTopVal) {
                panelStyleObject['margin-top'] = `${element.marginTopVal}`;
              }
              if (element.marginRightVal) {
                panelStyleObject['margin-right'] = `${element.marginRightVal}`;
              }
              if (element.marginBottomVal) {
                panelStyleObject['margin-bottom'] = `${element.marginBottomVal}`;
              }
              if (element.marginLeftVal) {
                panelStyleObject['margin-left'] = `${element.marginLeftVal}`;
              }
              if (element.paddingTopVal) {
                panelStyleObject['padding-top'] = `${element.paddingTopVal}`;
              }
              if (element.paddingRightVal) {
                panelStyleObject['padding-right'] = `${element.paddingRightVal}`;
              }
              if (element.paddingBottomVal) {
                panelStyleObject['padding-bottom'] = `${element.paddingBottomVal}`;
              }
              if (element.paddingLeftVal) {
                panelStyleObject['padding-left'] = `${element.paddingLeftVal}`;
              }
              break;
            case 'searchOutsideBox':
              if (element.marginTopVal) {
                searchOutsideStyleObject['margin-top'] = `${element.marginTopVal}`;
              }
              if (element.marginRightVal) {
                searchOutsideStyleObject['margin-right'] = `${element.marginRightVal}`;
              }
              if (element.marginBottomVal) {
                searchOutsideStyleObject['margin-bottom'] = `${element.marginBottomVal}`;
              }
              if (element.marginLeftVal) {
                searchOutsideStyleObject['margin-left'] = `${element.marginLeftVal}`;
              }
              if (element.paddingTopVal) {
                searchOutsideStyleObject['padding-top'] = `${element.paddingTopVal}`;
              }
              if (element.paddingRightVal) {
                searchOutsideStyleObject['padding-right'] = `${element.paddingRightVal}`;
              }
              if (element.paddingBottomVal) {
                searchOutsideStyleObject['padding-bottom'] = `${element.paddingBottomVal}`;
              }
              if (element.paddingLeftVal) {
                searchOutsideStyleObject['padding-left'] = `${element.paddingLeftVal}`;
              }
              break;
            case 'popularBox':
              if (element.marginTopVal) {
                popularStyleObject['margin-top'] = `${element.marginTopVal}`;
              }
              if (element.marginRightVal) {
                popularStyleObject['margin-right'] = `${element.marginRightVal}`;
              }
              if (element.marginBottomVal) {
                popularStyleObject['margin-bottom'] = `${element.marginBottomVal}`;
              }
              if (element.marginLeftVal) {
                popularStyleObject['margin-left'] = `${element.marginLeftVal}`;
              }
              if (element.paddingTopVal) {
                popularStyleObject['padding-top'] = `${element.paddingTopVal}`;
              }
              if (element.paddingRightVal) {
                popularStyleObject['padding-right'] = `${element.paddingRightVal}`;
              }
              if (element.paddingBottomVal) {
                popularStyleObject['padding-bottom'] = `${element.paddingBottomVal}`;
              }
              if (element.paddingLeftVal) {
                popularStyleObject['padding-left'] = `${element.paddingLeftVal}`;
              }
              break;
            case 'recordBox':
              if (element.marginTopVal) {
                recordStyleObject['margin-top'] = `${element.marginTopVal}`;
              }
              if (element.marginRightVal) {
                recordStyleObject['margin-right'] = `${element.marginRightVal}`;
              }
              if (element.marginBottomVal) {
                recordStyleObject['margin-bottom'] = `${element.marginBottomVal}`;
              }
              if (element.marginLeftVal) {
                recordStyleObject['margin-left'] = `${element.marginLeftVal}`;
              }
              if (element.paddingTopVal) {
                recordStyleObject['padding-top'] = `${element.paddingTopVal}`;
              }
              if (element.paddingRightVal) {
                recordStyleObject['padding-right'] = `${element.paddingRightVal}`;
              }
              if (element.paddingBottomVal) {
                recordStyleObject['padding-bottom'] = `${element.paddingBottomVal}`;
              }
              if (element.paddingLeftVal) {
                recordStyleObject['padding-left'] = `${element.paddingLeftVal}`;
              }
              break;
            case 'popularContentBox':
              if (element.marginTopVal) {
                popularContentStyleObject['margin-top'] = `${element.marginTopVal}`;
              }
              if (element.marginRightVal) {
                popularContentStyleObject['margin-right'] = `${element.marginRightVal}`;
              }
              if (element.marginBottomVal) {
                popularContentStyleObject['margin-bottom'] = `${element.marginBottomVal}`;
              }
              if (element.marginLeftVal) {
                popularContentStyleObject['margin-left'] = `${element.marginLeftVal}`;
              }
              if (element.paddingTopVal) {
                popularContentStyleObject['padding-top'] = `${element.paddingTopVal}`;
              }
              if (element.paddingRightVal) {
                popularContentStyleObject['padding-right'] = `${element.paddingRightVal}`;
              }
              if (element.paddingBottomVal) {
                popularContentStyleObject['padding-bottom'] = `${element.paddingBottomVal}`;
              }
              if (element.paddingLeftVal) {
                popularContentStyleObject['padding-left'] = `${element.paddingLeftVal}`;
              }
              break;
            case 'recordContentBox':
              if (element.marginTopVal) {
                recordContentStyleObject['margin-top'] = `${element.marginTopVal}`;
              }
              if (element.marginRightVal) {
                recordContentStyleObject['margin-right'] = `${element.marginRightVal}`;
              }
              if (element.marginBottomVal) {
                recordContentStyleObject['margin-bottom'] = `${element.marginBottomVal}`;
              }
              if (element.marginLeftVal) {
                recordContentStyleObject['margin-left'] = `${element.marginLeftVal}`;
              }
              if (element.paddingTopVal) {
                recordContentStyleObject['padding-top'] = `${element.paddingTopVal}`;
              }
              if (element.paddingRightVal) {
                recordContentStyleObject['padding-right'] = `${element.paddingRightVal}`;
              }
              if (element.paddingBottomVal) {
                recordContentStyleObject['padding-bottom'] = `${element.paddingBottomVal}`;
              }
              if (element.paddingLeftVal) {
                recordContentStyleObject['padding-left'] = `${element.paddingLeftVal}`;
              }
              break;
            case 'positionX':
              //背景横向偏移

              break;
            case 'positionY':
              //背景纵向偏移

              break;
            case 'panelPositionX':
              //背景横向偏移

              break;
            case 'panelPositionY':
              //背景纵向偏移

              break;
            case 'bgImgUrl':
              styleObject['background-image'] = `url(${window.IDM.url.getWebPath(element)})`;
              break;
            case 'panelBgImgUrl':
              panelStyleObject['background-image'] = `url(${window.IDM.url.getWebPath(element)})`;
              break;
            case 'bgRepeat':
              //平铺模式
              styleObject['background-repeat'] = element;
              break;
            case 'panelBgRepeat':
              //平铺模式
              panelStyleObject['background-repeat'] = element;
              break;
            case 'bgAttachment':
              //背景模式
              styleObject['background-attachment'] = element;
              break;
            case 'panelBgAttachment':
              //背景模式
              panelStyleObject['background-attachment'] = element;
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
            case 'panelBorder':
              if (element.border.top.width > 0) {
                panelStyleObject['border-top-width'] =
                  element.border.top.width + element.border.top.widthUnit;
                panelStyleObject['border-top-style'] = element.border.top.style;
                if (element.border.top.colors.hex8) {
                  panelStyleObject['border-top-color'] = IDM.hex8ToRgbaString(
                    element.border.top.colors.hex8
                  );
                }
              }
              if (element.border.right.width > 0) {
                panelStyleObject['border-right-width'] =
                  element.border.right.width + element.border.right.widthUnit;
                panelStyleObject['border-right-style'] = element.border.right.style;
                if (element.border.right.colors.hex8) {
                  panelStyleObject['border-right-color'] = IDM.hex8ToRgbaString(
                    element.border.right.colors.hex8
                  );
                }
              }
              if (element.border.bottom.width > 0) {
                panelStyleObject['border-bottom-width'] =
                  element.border.bottom.width + element.border.bottom.widthUnit;
                panelStyleObject['border-bottom-style'] = element.border.bottom.style;
                if (element.border.bottom.colors.hex8) {
                  panelStyleObject['border-bottom-color'] = IDM.hex8ToRgbaString(
                    element.border.bottom.colors.hex8
                  );
                }
              }
              if (element.border.left.width > 0) {
                panelStyleObject['border-left-width'] =
                  element.border.left.width + element.border.left.widthUnit;
                panelStyleObject['border-left-style'] = element.border.left.style;
                if (element.border.left.colors.hex8) {
                  panelStyleObject['border-left-color'] = IDM.hex8ToRgbaString(
                    element.border.left.colors.hex8
                  );
                }
              }

              panelStyleObject['border-top-left-radius'] =
                element.radius.leftTop.radius + element.radius.leftTop.radiusUnit;
              panelStyleObject['border-top-right-radius'] =
                element.radius.rightTop.radius + element.radius.rightTop.radiusUnit;
              panelStyleObject['border-bottom-left-radius'] =
                element.radius.leftBottom.radius + element.radius.leftBottom.radiusUnit;
              panelStyleObject['border-bottom-right-radius'] =
                element.radius.rightBottom.radius + element.radius.rightBottom.radiusUnit;
              break;
            case 'searchBorder':
              if (element.border.top.width > 0) {
                searchStyleObject['border-top-width'] =
                  element.border.top.width + element.border.top.widthUnit;
                searchStyleObject['border-top-style'] = element.border.top.style;
                if (element.border.top.colors.hex8) {
                  searchStyleObject['border-top-color'] = IDM.hex8ToRgbaString(
                    element.border.top.colors.hex8
                  );
                }
              }
              if (element.border.right.width > 0) {
                searchStyleObject['border-right-width'] =
                  element.border.right.width + element.border.right.widthUnit;
                searchStyleObject['border-right-style'] = element.border.right.style;
                if (element.border.right.colors.hex8) {
                  searchStyleObject['border-right-color'] = IDM.hex8ToRgbaString(
                    element.border.right.colors.hex8
                  );
                }
              }
              if (element.border.bottom.width > 0) {
                searchStyleObject['border-bottom-width'] =
                  element.border.bottom.width + element.border.bottom.widthUnit;
                searchStyleObject['border-bottom-style'] = element.border.bottom.style;
                if (element.border.bottom.colors.hex8) {
                  searchStyleObject['border-bottom-color'] = IDM.hex8ToRgbaString(
                    element.border.bottom.colors.hex8
                  );
                }
              }
              if (element.border.left.width > 0) {
                searchStyleObject['border-left-width'] =
                  element.border.left.width + element.border.left.widthUnit;
                searchStyleObject['border-left-style'] = element.border.left.style;
                if (element.border.left.colors.hex8) {
                  searchStyleObject['border-left-color'] = IDM.hex8ToRgbaString(
                    element.border.left.colors.hex8
                  );
                }
              }

              searchStyleObject['border-top-left-radius'] =
                element.radius.leftTop.radius + element.radius.leftTop.radiusUnit;
              searchStyleObject['border-top-right-radius'] =
                element.radius.rightTop.radius + element.radius.rightTop.radiusUnit;
              searchStyleObject['border-bottom-left-radius'] =
                element.radius.leftBottom.radius + element.radius.leftBottom.radiusUnit;
              searchStyleObject['border-bottom-right-radius'] =
                element.radius.rightBottom.radius + element.radius.rightBottom.radiusUnit;
              break;
            case 'popularBorder':
              if (element.border.top.width > 0) {
                popularStyleObject['border-top-width'] =
                  element.border.top.width + element.border.top.widthUnit;
                popularStyleObject['border-top-style'] = element.border.top.style;
                if (element.border.top.colors.hex8) {
                  popularStyleObject['border-top-color'] = IDM.hex8ToRgbaString(
                    element.border.top.colors.hex8
                  );
                }
              }
              if (element.border.right.width > 0) {
                popularStyleObject['border-right-width'] =
                  element.border.right.width + element.border.right.widthUnit;
                popularStyleObject['border-right-style'] = element.border.right.style;
                if (element.border.right.colors.hex8) {
                  popularStyleObject['border-right-color'] = IDM.hex8ToRgbaString(
                    element.border.right.colors.hex8
                  );
                }
              }
              if (element.border.bottom.width > 0) {
                popularStyleObject['border-bottom-width'] =
                  element.border.bottom.width + element.border.bottom.widthUnit;
                popularStyleObject['border-bottom-style'] = element.border.bottom.style;
                if (element.border.bottom.colors.hex8) {
                  popularStyleObject['border-bottom-color'] = IDM.hex8ToRgbaString(
                    element.border.bottom.colors.hex8
                  );
                }
              }
              if (element.border.left.width > 0) {
                popularStyleObject['border-left-width'] =
                  element.border.left.width + element.border.left.widthUnit;
                popularStyleObject['border-left-style'] = element.border.left.style;
                if (element.border.left.colors.hex8) {
                  popularStyleObject['border-left-color'] = IDM.hex8ToRgbaString(
                    element.border.left.colors.hex8
                  );
                }
              }

              popularStyleObject['border-top-left-radius'] =
                element.radius.leftTop.radius + element.radius.leftTop.radiusUnit;
              popularStyleObject['border-top-right-radius'] =
                element.radius.rightTop.radius + element.radius.rightTop.radiusUnit;
              popularStyleObject['border-bottom-left-radius'] =
                element.radius.leftBottom.radius + element.radius.leftBottom.radiusUnit;
              popularStyleObject['border-bottom-right-radius'] =
                element.radius.rightBottom.radius + element.radius.rightBottom.radiusUnit;
              break;
            case 'recordBorder':
              if (element.border.top.width > 0) {
                recordStyleObject['border-top-width'] =
                  element.border.top.width + element.border.top.widthUnit;
                recordStyleObject['border-top-style'] = element.border.top.style;
                if (element.border.top.colors.hex8) {
                  recordStyleObject['border-top-color'] = IDM.hex8ToRgbaString(
                    element.border.top.colors.hex8
                  );
                }
              }
              if (element.border.right.width > 0) {
                recordStyleObject['border-right-width'] =
                  element.border.right.width + element.border.right.widthUnit;
                recordStyleObject['border-right-style'] = element.border.right.style;
                if (element.border.right.colors.hex8) {
                  recordStyleObject['border-right-color'] = IDM.hex8ToRgbaString(
                    element.border.right.colors.hex8
                  );
                }
              }
              if (element.border.bottom.width > 0) {
                recordStyleObject['border-bottom-width'] =
                  element.border.bottom.width + element.border.bottom.widthUnit;
                recordStyleObject['border-bottom-style'] = element.border.bottom.style;
                if (element.border.bottom.colors.hex8) {
                  recordStyleObject['border-bottom-color'] = IDM.hex8ToRgbaString(
                    element.border.bottom.colors.hex8
                  );
                }
              }
              if (element.border.left.width > 0) {
                recordStyleObject['border-left-width'] =
                  element.border.left.width + element.border.left.widthUnit;
                recordStyleObject['border-left-style'] = element.border.left.style;
                if (element.border.left.colors.hex8) {
                  recordStyleObject['border-left-color'] = IDM.hex8ToRgbaString(
                    element.border.left.colors.hex8
                  );
                }
              }

              recordStyleObject['border-top-left-radius'] =
                element.radius.leftTop.radius + element.radius.leftTop.radiusUnit;
              recordStyleObject['border-top-right-radius'] =
                element.radius.rightTop.radius + element.radius.rightTop.radiusUnit;
              recordStyleObject['border-bottom-left-radius'] =
                element.radius.leftBottom.radius + element.radius.leftBottom.radiusUnit;
              recordStyleObject['border-bottom-right-radius'] =
                element.radius.rightBottom.radius + element.radius.rightBottom.radiusUnit;
              break;
            case 'searchIconColor':
              if (element && element.hex8) {
                searchIconStyleObject['color'] = IDM.hex8ToRgbaString(element.hex8);
              }
              break;
            case 'popularTitleIconColor':
              if (element && element.hex8) {
                popularTitleIconStyleObject['color'] = IDM.hex8ToRgbaString(element.hex8);
              }
              break;
            case 'tagsBgColor':
              if (element && element.hex8) {
                tagsStyleObject['background-color'] = IDM.hex8ToRgbaString(element.hex8);
              }
              break;
            case 'recordTitleIconColor':
              if (element && element.hex8) {
                recordTitleIconStyleObject['color'] = IDM.hex8ToRgbaString(element.hex8);
              }
              break;
            case 'cellIconColor':
              if (element && element.hex8) {
                cellIconStyleObject['color'] = IDM.hex8ToRgbaString(element.hex8);
              }
              break;
            case 'popularTitleIconSize':
              popularTitleIconStyleObject['font-size'] = scale * element + 'px';
              break;
            case 'recordTitleIconSize':
              recordTitleIconStyleObject['font-size'] = scale * element + 'px';
              break;
            case 'cellIconSize':
              cellIconStyleObject['font-size'] = scale * element + 'px';
              break;
            case 'cellPadding':
              cellStyleObject['padding-top'] = scale * (element / 2) + 'px';
              cellStyleObject['padding-bottom'] = scale * (element / 2) + 'px';
              break;
            case 'searchInputFont':
              searchInputStyleObject['font-family'] = element.fontFamily;
              if (element.fontColors.hex8) {
                searchInputStyleObject['color'] = IDM.hex8ToRgbaString(element.fontColors.hex8);
              }
              searchInputStyleObject['font-weight'] =
                element.fontWeight && element.fontWeight.split(' ')[0];
              searchInputStyleObject['font-style'] = element.fontStyle;
              searchInputStyleObject['font-size'] =
                element.fontSizeUnit === 'px'
                  ? scale * element.fontSize + element.fontSizeUnit
                  : element.fontSize + element.fontSizeUnit;
              searchInputStyleObject['line-height'] =
                element.fontLineHeight +
                (element.fontLineHeightUnit == '-' ? '' : element.fontLineHeightUnit);
              searchInputStyleObject['text-align'] = element.fontTextAlign;
              searchInputStyleObject['text-decoration'] = element.fontDecoration;
              break;
            case 'searchCancelFont':
              searchCancelStyleObject['font-family'] = element.fontFamily;
              if (element.fontColors.hex8) {
                searchCancelStyleObject['color'] = IDM.hex8ToRgbaString(element.fontColors.hex8);
              }
              searchCancelStyleObject['font-weight'] =
                element.fontWeight && element.fontWeight.split(' ')[0];
              searchCancelStyleObject['font-style'] = element.fontStyle;
              searchCancelStyleObject['font-size'] =
                element.fontSizeUnit === 'px'
                  ? scale * element.fontSize + element.fontSizeUnit
                  : element.fontSize + element.fontSizeUnit;
              searchCancelStyleObject['line-height'] =
                element.fontLineHeight +
                (element.fontLineHeightUnit == '-' ? '' : element.fontLineHeightUnit);
              searchCancelStyleObject['text-align'] = element.fontTextAlign;
              searchCancelStyleObject['text-decoration'] = element.fontDecoration;
              break;
            case 'popularTitleFont':
              popularTitleStyleObject['font-family'] = element.fontFamily;
              if (element.fontColors.hex8) {
                popularTitleStyleObject['color'] = IDM.hex8ToRgbaString(element.fontColors.hex8);
              }
              popularTitleStyleObject['font-weight'] =
                element.fontWeight && element.fontWeight.split(' ')[0];
              popularTitleStyleObject['font-style'] = element.fontStyle;
              popularTitleStyleObject['font-size'] =
                element.fontSizeUnit === 'px'
                  ? scale * element.fontSize + element.fontSizeUnit
                  : element.fontSize + element.fontSizeUnit;
              popularTitleStyleObject['line-height'] =
                element.fontLineHeight +
                (element.fontLineHeightUnit == '-' ? '' : element.fontLineHeightUnit);
              popularTitleStyleObject['text-align'] = element.fontTextAlign;
              popularTitleStyleObject['text-decoration'] = element.fontDecoration;
              break;
            case 'recordTitleFont':
              recordTitleStyleObject['font-family'] = element.fontFamily;
              if (element.fontColors.hex8) {
                recordTitleStyleObject['color'] = IDM.hex8ToRgbaString(element.fontColors.hex8);
              }
              recordTitleStyleObject['font-weight'] =
                element.fontWeight && element.fontWeight.split(' ')[0];
              recordTitleStyleObject['font-style'] = element.fontStyle;
              recordTitleStyleObject['font-size'] =
                element.fontSizeUnit === 'px'
                  ? scale * element.fontSize + element.fontSizeUnit
                  : element.fontSize + element.fontSizeUnit;
              recordTitleStyleObject['line-height'] =
                element.fontLineHeight +
                (element.fontLineHeightUnit == '-' ? '' : element.fontLineHeightUnit);
              recordTitleStyleObject['text-align'] = element.fontTextAlign;
              recordTitleStyleObject['text-decoration'] = element.fontDecoration;
              break;
            case 'tagsFont':
              tagsStyleObject['font-family'] = element.fontFamily;
              if (element.fontColors.hex8) {
                tagsStyleObject['color'] = IDM.hex8ToRgbaString(element.fontColors.hex8);
              }
              tagsStyleObject['font-weight'] =
                element.fontWeight && element.fontWeight.split(' ')[0];
              tagsStyleObject['font-style'] = element.fontStyle;
              tagsStyleObject['font-size'] =
                element.fontSizeUnit === 'px'
                  ? scale * element.fontSize + element.fontSizeUnit
                  : element.fontSize + element.fontSizeUnit;
              tagsStyleObject['line-height'] =
                element.fontLineHeight +
                (element.fontLineHeightUnit == '-' ? '' : element.fontLineHeightUnit);
              tagsStyleObject['text-align'] = element.fontTextAlign;
              tagsStyleObject['text-decoration'] = element.fontDecoration;
              break;
            case 'cellTitleFont':
              cellTitleStyleObject['font-family'] = element.fontFamily;
              if (element.fontColors.hex8) {
                cellTitleStyleObject['color'] = IDM.hex8ToRgbaString(element.fontColors.hex8);
              }
              cellTitleStyleObject['font-weight'] =
                element.fontWeight && element.fontWeight.split(' ')[0];
              cellTitleStyleObject['font-style'] = element.fontStyle;
              cellTitleStyleObject['font-size'] =
                element.fontSizeUnit === 'px'
                  ? scale * element.fontSize + element.fontSizeUnit
                  : element.fontSize + element.fontSizeUnit;
              cellTitleStyleObject['line-height'] =
                element.fontLineHeight +
                (element.fontLineHeightUnit == '-' ? '' : element.fontLineHeightUnit);
              cellTitleStyleObject['text-align'] = element.fontTextAlign;
              cellTitleStyleObject['text-decoration'] = element.fontDecoration;
              break;
          }
        }
      }
      window.IDM.setStyleToPageHead(this.moduleObject.id, styleObject);
      window.IDM.setStyleToPageHead(this.moduleObject.id + ' .i-searchBar-panel', panelStyleObject);

      window.IDM.setStyleToPageHead(
        this.moduleObject.id + ' .i-searchBar-search',
        searchOutsideStyleObject
      );
      window.IDM.setStyleToPageHead(
        this.moduleObject.id + ' .i-searchBar-search .van-search__content',
        searchStyleObject
      );
      window.IDM.setStyleToPageHead(
        this.moduleObject.id + ' .i-searchBar-search .van-field__left-icon',
        searchIconStyleObject
      );
      window.IDM.setStyleToPageHead(
        this.moduleObject.id + ' .i-searchBar-search .van-field__control',
        searchInputStyleObject
      );
      window.IDM.setStyleToPageHead(
        this.moduleObject.packageid +
          ' #' +
          this.moduleObject.id +
          ' .i-searchBar-search .van-search__action',
        searchCancelStyleObject
      );
      window.IDM.setStyleToPageHead(
        this.moduleObject.packageid +
          ' #' +
          this.moduleObject.id +
          ' .i-searchBar-popular-header-tit .i-searchBar-popular-header-tit-icon',
        popularTitleIconStyleObject
      );
      window.IDM.setStyleToPageHead(
        this.moduleObject.id + ' .i-searchBar-popular-header-tit span',
        popularTitleStyleObject
      );
      window.IDM.setStyleToPageHead(
        this.moduleObject.id + ' .i-searchBar-popular',
        popularStyleObject
      );
      window.IDM.setStyleToPageHead(
        this.moduleObject.id + ' .i-searchBar-popular-content',
        popularContentStyleObject
      );
      window.IDM.setStyleToPageHead(
        this.moduleObject.packageid +
          ' #' +
          this.moduleObject.id +
          ' .i-searchBar-record-header-tit .i-searchBar-record-header-tit-icon',
        recordTitleIconStyleObject
      );
      window.IDM.setStyleToPageHead(
        this.moduleObject.id + ' .i-searchBar-record-header-tit span',
        recordTitleStyleObject
      );
      window.IDM.setStyleToPageHead(
        this.moduleObject.id + ' .i-searchBar-record',
        recordStyleObject
      );
      window.IDM.setStyleToPageHead(
        this.moduleObject.id + ' .i-searchBar-record-content',
        recordContentStyleObject
      );
      window.IDM.setStyleToPageHead(
        this.moduleObject.id + ' .i-searchBar-record .van-cell',
        cellStyleObject
      );
      window.IDM.setStyleToPageHead(
        this.moduleObject.id + ' .i-searchBar-record .van-cell .van-cell__title',
        cellTitleStyleObject
      );
      window.IDM.setStyleToPageHead(
        this.moduleObject.id + ' .i-searchBar-record .van-cell .van-icon',
        cellIconStyleObject
      );
      window.IDM.setStyleToPageHead(
        this.moduleObject.packageid +
          ' #' +
          this.moduleObject.id +
          ' .i-searchBar-popular .van-tag',
        tagsStyleObject
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

        const mainColor = {
          color: item.mainColor ? IDM.hex8ToRgbaString(item.mainColor.hex8) : ''
        };
        const minorBgColor = {
          'background-color': item.minorColor ? IDM.hex8ToRgbaString(item.minorColor.hex8) : ''
        };

        IDM.setStyleToPageHead(
          '.' +
            themeNamePrefix +
            item.key +
            ' #' +
            (this.moduleObject.packageid || 'module_demo') +
            ' .i-searchBar-search .van-search__action',
          mainColor
        );
        IDM.setStyleToPageHead(
          '.' +
            themeNamePrefix +
            item.key +
            ' #' +
            (this.moduleObject.packageid || 'module_demo') +
            ' .i-searchBar-popular-header-tit .i-searchBar-popular-header-tit-icon',
          mainColor
        );
        IDM.setStyleToPageHead(
          '.' +
            themeNamePrefix +
            item.key +
            ' #' +
            (this.moduleObject.packageid || 'module_demo') +
            ' .i-searchBar-record-header-tit .i-searchBar-record-header-tit-icon',
          mainColor
        );
        IDM.setStyleToPageHead(
          '.' +
            themeNamePrefix +
            item.key +
            ' #' +
            (this.moduleObject.packageid || 'module_demo') +
            ' .i-searchBar-popular .van-tag',
          { ...mainColor, ...minorBgColor }
        );
      }
    },
    sendSearchValue(text, type) {
      this.sendBroadcastMessage({
        type: 'linkageResult',
        rangeModule:
          this.propData.triggerComponents && this.propData.triggerComponents.map(el => el.moduleId),
        message: { text, type }
      });
    },
    onSearch(val) {
      this.preSearchValue = val;
      this.propData.showRecord && this.setRecord();
      this.sendSearchValue(this.searchValue, 'search');
      this.showAction = false;
    },
    onCancel() {
      this.searchValue = this.preSearchValue;
      this.showAction = false;
    },
    onFocus() {
      this.propData.showRecord && this.getRecord();
      this.propData.showPopular && this.getPopular();
      this.showAction = true;
    },
    onTagClick(item) {
      this.searchValue = item;
      this.sendSearchValue(this.searchValue, 'popular');
      this.showAction = false;
    },
    onCellClick(item) {
      this.searchValue = item;
      this.propData.showRecord && this.setRecord();
      this.sendSearchValue(this.searchValue, 'record');
      this.showAction = false;
    },
    onCellRemove(item) {
      if (this.propData.recordType == 'local' && item) {
        const storage = `local_record_${this.moduleObject.id}`;
        const record = localStorage.getItem(storage)
          ? JSON.parse(localStorage.getItem(storage))
          : [];
        const currentIndex = record.findIndex(v => v.value == item);
        currentIndex != -1 && record.splice(currentIndex, 1);
        localStorage.setItem(storage, JSON.stringify([...record]));
        this.getRecord();
      } else if (this.propData.recordRemoveDataSource && item) {
        const dataSource = this.propData.recordRemoveDataSource;
        const url = `ctrl/dataSource/getDatas`;
        IDM.http
          .post(
            url,
            {
              id: dataSource.value,
              text: item
            },
            {
              headers: {
                'Content-Type': 'application/json;charset=UTF-8'
              }
            }
          )
          .done(res => {
            if (res.type === 'success') {
              this.getRecord();
            }
          })
          .error(err => {
            console.log(err);
          });
      }
    },
    getPopular() {
      if (this.propData.popularType == 'static' && this.propData.popularStaticSet) {
        if (this.propData.popularStaticSet[0] && !this.propData.popularStaticSet[0].text) {
          this.popularData = devPopularResult;
        } else {
          this.popularData = this.propData.popularStaticSet.map(item => item.text);
        }
      } else if (this.propData.popularDataSource) {
        if (!this.moduleObject.env || this.moduleObject.env == 'develop') {
          this.popularData = devPopularResult;
          return;
        }
        const dataSource = this.propData.popularDataSource;
        const url = `ctrl/dataSource/getDatas`;
        const urlObject = IDM.url.queryObject();
        const routerParams = this.moduleObject.routerId
          ? IDM.router.getParam(this.moduleObject.routerId)
          : {};
        IDM.http
          .post(
            url,
            {
              pageId:
                window.IDM.broadcast && window.IDM.broadcast.pageModule
                  ? window.IDM.broadcast.pageModule.id
                  : '',
              ...urlObject,
              ...routerParams,
              id: dataSource.value
            },
            {
              headers: {
                'Content-Type': 'application/json;charset=UTF-8'
              }
            }
          )
          .done(res => {
            if (res.type === 'success') {
              const resultData = this.customFormat(this.propData.customPopularFunction, res.data);
              this.popularData = resultData;
            }
          })
          .error(err => {
            console.log(err);
          });
      }
    },
    getRecord() {
      if (this.propData.recordType == 'local') {
        const storage = `local_record_${this.moduleObject.id}`;
        const record = localStorage.getItem(storage)
          ? JSON.parse(localStorage.getItem(storage))
          : [];
        if (this.propData.recordLocalDisplayMode == 'freq') {
          let i = record.length,
            j;
          let tempExchangVal;
          while (i > 0) {
            for (j = 0; j < i - 1; j++) {
              if (record[j].freq <= record[j + 1].freq) {
                tempExchangVal = record[j];
                record[j] = record[j + 1];
                record[j + 1] = tempExchangVal;
              }
            }
            i--;
          }
          this.recordData = record.map(item => item.value);
        } else {
          this.recordData = record.map(item => item.value).reverse();
        }
      } else if (this.propData.recordDataSource) {
        const dataSource = this.propData.recordDataSource;
        const url = `ctrl/dataSource/getDatas`;
        const urlObject = IDM.url.queryObject();
        const routerParams = this.moduleObject.routerId
          ? IDM.router.getParam(this.moduleObject.routerId)
          : {};
        IDM.http
          .post(
            url,
            {
              pageId:
                window.IDM.broadcast && window.IDM.broadcast.pageModule
                  ? window.IDM.broadcast.pageModule.id
                  : '',
              ...urlObject,
              ...routerParams,
              id: dataSource.value,
              type: this.propData.recordLocalDisplayMode
            },
            {
              headers: {
                'Content-Type': 'application/json;charset=UTF-8'
              }
            }
          )
          .done(res => {
            if (res.type === 'success') {
              const resultData = this.customFormat(this.propData.customRecordFunction, res.data);
              this.recordData = resultData;
            }
          })
          .error(err => {
            console.log(err);
          });
      }
    },
    setRecord() {
      if (this.propData.recordType == 'local' && this.searchValue) {
        const storage = `local_record_${this.moduleObject.id}`;
        const record = localStorage.getItem(storage)
          ? JSON.parse(localStorage.getItem(storage))
          : [];
        const currentIndex = record.findIndex(item => item.value == this.searchValue);
        const currentItem = {
          value: this.searchValue,
          freq: currentIndex == -1 ? 1 : record[currentIndex].freq + 1
        };
        currentIndex != -1 && record.splice(currentIndex, 1);
        localStorage.setItem(storage, JSON.stringify([...record, currentItem]));
      } else if (this.propData.recordAdddataSource && this.searchValue) {
        const dataSource = this.propData.recordAdddataSource;
        const url = `ctrl/dataSource/getDatas`;
        IDM.http
          .post(
            url,
            {
              id: dataSource.value,
              text: this.searchValue
            },
            {
              headers: {
                'Content-Type': 'application/json;charset=UTF-8'
              }
            }
          )
          .done(res => {})
          .error(err => {
            console.log(err);
          });
      }
    }
  }
};
</script>

<style scoped lang="scss">
$scale: var(--i-searchBar-scale);
.i-searchBar-outer {
  height: auto;
  width: auto;
  box-sizing: border-box;
  // padding: 10px;
  font-family: PingFangSC-Regular;
  color: #333333;
  position: relative;
  font-size: calc(14px * #{$scale});
  display: flex;
  flex-direction: column;
  .i-searchBar-search {
    padding: 10px 12px;
    ::v-deep .van-search__action {
      padding-right: 0;
      &:active {
        background-color: unset;
        opacity: 0.7;
      }
    }
    ::v-deep .van-search__content {
      border-radius: 14px;
    }
  }
  .i-searchBar-panel {
    flex-grow: 1;
    flex-shrink: 1;
    height: auto;
    overflow-y: auto;
    overflow-x: hidden;
    background-color: #f7f8fa;
    .i-searchBar-popular {
      height: auto;
      padding: 10px 12px;
      margin: 10px;
      background-color: #fff;
      box-shadow: 0px 2px 12px 0px rgba(0, 0, 0, 0.07);
      border-radius: 5px;
      .i-searchBar-popular-header {
        display: flex;
        justify-content: space-between;
        align-items: center;

        .i-searchBar-popular-header-main {
          // width: 86%;
          flex-grow: 1;
          display: flex;
          align-items: center;

          .i-searchBar-popular-header-tit {
            font-family: PingFangSC-Regular;
            color: #333333;
            font-style: normal;
            text-decoration: none;
            font-size: calc(16px * #{$scale});
            max-width: 60%;
            display: flex;
            align-items: center;

            .i-searchBar-popular-header-tit-icon {
              display: inline-block;
              flex: 1;
              margin-right: 5px;
            }

            span {
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
      }

      .i-searchBar-popular-content {
        height: auto;
        padding: 0 10px 10px 10px;
        .van-tag {
          background-color: #ffe1e1;
          color: #ad0000;
        }
      }
    }
    .i-searchBar-record {
      height: auto;
      padding: 10px 12px;
      margin: 10px;
      background-color: #fff;
      box-shadow: 0px 2px 12px 0px rgba(0, 0, 0, 0.07);
      border-radius: 5px;
      .i-searchBar-record-header {
        display: flex;
        justify-content: space-between;
        align-items: center;

        .i-searchBar-record-header-main {
          // width: 86%;
          flex-grow: 1;
          display: flex;
          align-items: center;

          .i-searchBar-record-header-tit {
            font-family: PingFangSC-Regular;
            color: #333333;
            font-style: normal;
            text-decoration: none;
            font-size: calc(16px * #{$scale});
            max-width: 60%;
            display: flex;
            align-items: center;

            .i-searchBar-record-header-tit-icon {
              display: inline-block;
              flex: 1;
              margin-right: 5px;
            }

            span {
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
      }

      .i-searchBar-record-content {
        height: auto;
        padding: 0 10px;
        ::v-deep .van-cell {
          padding: 8px 0;
          &::after {
            right: 0;
            left: 0;
          }
          .van-cell__title {
            width: 0;
            span {
              display: block;
              width: 100%;
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
            }
          }
        }
      }
    }
  }
  .i-searchBar-container {
    flex-grow: 1;
    flex-shrink: 1;
  }
  .i-searchBar-mask {
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
