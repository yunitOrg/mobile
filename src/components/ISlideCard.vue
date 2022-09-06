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
    class="i-slideCard-outer"
  >
    <div class="i-slideCard-header" v-if="propData.isShowTitleBar">
      <div class="i-slideCard-header-main">
        <div class="i-slideCard-header-tit">
          <span v-if="propData.titleIconPosition === 'right'">{{ propData.title }}</span>
          <div class="i-slideCard-header-tit-icon" v-if="propData.showIcon">
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
      <div class="i-slideCard-header-more" v-if="propData.moreBtn" @click="moreClick">
        更多<svg-icon iconClass="arrowRight" className="idm_filed_svg_icon"></svg-icon>
      </div>
    </div>
    <div class="i-slideCard-content">
      <van-loading v-if="isLoading" :size="loadingSize" vertical>{{
        propData.loadingDescription || '加载中...'
      }}</van-loading>
      <div
        v-else-if="data && data.length > 0"
        class="i-slideCard-content-wapper"
        :style="{
          'justify-content':
            propData.layoutType != 'scroll' && propData.rowMarginType == 'static'
              ? 'flex-start'
              : 'space-between',
          'overflow-x': propData.layoutType == 'scroll' ? 'auto' : 'hidden',
          'overflow-y': propData.layoutType == 'scroll' ? 'hidden' : 'auto',
          'flex-direction': propData.layoutType == 'scroll' ? 'row' : 'column'
        }"
      >
        <div
          class="i-slideCard-content-row"
          v-for="(record, i) in data"
          :key="i"
          :style="{
            'margin-top': i != 0 && propData.rowMarginType == 'static' ? rowMargin + 'px' : '',
            width: propData.layoutType == 'scroll' && propData.columNum == 0 ? 'auto' : '100%',
            'justify-content':
              propData.layoutType == 'scroll' && propData.columNum != 0
                ? 'space-around'
                : 'space-bettween'
          }"
        >
          <div
            v-for="(item, index) in record"
            :key="index"
            :class="
              item
                ? 'i-slideCard-content-item'
                : 'i-slideCard-content-item i-slideCard-content-empty'
            "
            :style="{
              'margin-left':
                index != 0 && propData.layoutType == 'scroll' && propData.columNum == 0
                  ? itemMargin + 'px'
                  : '',
              'flex-shrink': propData.layoutType == 'scroll' && propData.columNum == 0 ? 0 : 1
            }"
            @click.stop="itemClick(item)"
          >
            <div v-if="item" class="item-img">
              <van-image
                v-if="propData.displayType == 'img'"
                width="100%"
                height="100%"
                :src="
                  IDM.url.getWebPath(
                    propData.dataType == 'dataSource'
                      ? getExpressData('data', propData.imageField || 'imgUrl', item)
                      : item.imgUrl
                  )
                "
              />
              <i
                v-else-if="propData.dataType == 'dataSource'"
                :class="getClassStr(getExpressData('data', propData.iconField || 'iconFont', item))"
              />
              <svg v-else class="idm_filed_svg_icon" aria-hidden="true">
                <use :xlink:href="`#${item.iconFont && item.iconFont[0]}`" />
              </svg>
            </div>
            <div class="item-text" v-if="item && propData.showText">
              <div v-if="propData.mainTextField" class="item-text-main">
                {{
                  propData.dataType == 'dataSource'
                    ? getExpressData('data', propData.mainTextField || 'name', item)
                    : item.name
                }}
              </div>
              <div
                class="item-text-extra"
                v-if="
                  propData.dataType == 'dataSource' &&
                  propData.extraFields &&
                  propData.extraFields.length > 0
                "
              >
                <div
                  class="item-text-extra-col"
                  v-for="(field, i) in propData.extraFields"
                  :key="i"
                  :style="{
                    'text-align': field.textAlign
                      ? field.textAlign
                      : i == 0
                      ? 'left'
                      : i == propData.extraFields.length - 1
                      ? 'right'
                      : 'center',
                    width: field.widthRatio ? `${field.widthRatio}%` : 'auto'
                  }"
                >
                  {{ getExpressData('data', field.name || 'name', item) }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <van-empty
        v-else
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
    <div class="i-slideCard-mask" v-if="moduleObject.env !== 'production' && !propData.dataSource">
      <span>！未绑定数据源</span>
    </div>
  </div>
</template>

<script>
import { Empty, Loading, Image as VanImage } from 'vant';
import 'vant/lib/empty/style';
import 'vant/lib/loading/style';
import 'vant/lib/image/style';
const devResult = [
  {
    name: '学习强国',
    text1: '15篇文章',
    text2: '3.5w人已学习'
  },
  {
    name: '学习强国',
    text1: '15篇文章',
    text2: '3.5w人已学习'
  },
  {
    name: '学习强国',
    text1: '15篇文章',
    text2: '3.5w人已学习'
  },
  {
    name: '学习强国',
    text1: '15篇文章',
    text2: '3.5w人已学习'
  },
  {
    name: '学习强国',
    text1: '15篇文章',
    text2: '3.5w人已学习'
  }
];
export default {
  name: 'ISlideCard',
  components: {
    [Empty.name]: Empty,
    [Loading.name]: Loading,
    [VanImage.name]: VanImage
  },
  // dataType: 'dataSource',
  // displayType: 'icon',
  // dataSource: '1',
  // layoutType: 'scroll',
  // isShowTitleBar: true,
  // rowMarginType: 'ad',
  // columNum: 3,
  // moreBtn: true,
  // showIcon: true,
  // showText: true,
  // titleIconPosition: 'left',
  // title: '主题教育',
  // imageField: 'img',
  // mainTextField: 'name',
  // imageWidth: 50,
  // imageHeight: 50,
  // itemJumpTarget: 'router',
  // itemMargin: 10,
  // rowMargin: 10,
  // itemJumpPageParams: [{ key: 'itemName', field: 'name' }]
  // // extraFields: [{ name: 'text1' }, { name: 'text2' }]
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
    rowMargin() {
      return this.getScale() * (this.propData.rowMargin || 0);
    },
    itemMargin() {
      return this.getScale() * (this.propData.itemMargin || 0);
    },
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
    this.loadIconFile();
    this.initData();
  },
  methods: {
    // 加载css
    loadIconFile() {
      if (this.propData.iconfontUrl && this.propData.dataType == 'dataSource') {
        let baseUrl =
          this.propData.iconfontUrl +
          (this.propData.iconfontUrl.substring(
            this.propData.iconfontUrl.length - 1,
            this.propData.iconfontUrl.length
          ) == '/'
            ? ''
            : '/');
        IDM.http
          .get(baseUrl + 'iconfont.json', {})
          .then(res => {
            if (!res.data) {
              return;
            }
            //存在，加载css
            IDM.module.loadCss(IDM.url.getWebPath(baseUrl + 'iconfont.css'), true);
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    },
    getClassStr(icon) {
      // 自定义
      const isCustom = this.propData.iconfontUrl ? true : false;
      // 取自定义字段 默认 iconfont
      let fontFamily = isCustom && this.propData.iconFontFamily ? this.propData.iconFontFamily : '';
      // 取自定义前缀 默认icon-
      let prefix = isCustom && this.propData.iconPrefix ? this.propData.iconPrefix : '';
      let familyStr = `${fontFamily} ${prefix}`;
      return familyStr + icon;
    },
    /**
     * 提供父级组件调用的刷新prop数据组件
     */
    propDataWatchHandle(propData) {
      this.propData = propData.compositeAttr || {};
      this.convertAttrToStyleObject();
      this.convertThemeListAttrToStyleObject();
      this.initData();
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
      if (this.propData.dataType == 'dataSource' && this.propData.dataSource) {
        if (!this.moduleObject.env || this.moduleObject.env == 'develop') {
          this.setRows(devResult);
          return;
        }
        const dataSource = this.propData.dataSource;
        const url = `ctrl/dataSource/getDatas`;
        const urlObject = IDM.url.queryObject();
        this.isLoading = true;
        IDM.http
          .post(
            url,
            {
              id: dataSource.value,
              pageId:
                window.IDM.broadcast && window.IDM.broadcast.pageModule
                  ? window.IDM.broadcast.pageModule.id
                  : '',
              ...urlObject
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
              this.setRows(resultData);
            }
            this.isLoading = false;
          })
          .error(err => {
            console.log(err);
            this.isLoading = false;
          });
      } else if (this.propData.dataType == 'static' && this.propData.dataStaticSet) {
        if (this.propData.dataStaticSet[0] && !this.propData.dataStaticSet[0].name) {
          this.setRows(devResult);
        } else {
          this.setRows(this.propData.dataStaticSet);
        }
      }
    },
    setRows(orignData) {
      const data = [];
      if (this.propData.layoutType == 'scroll' && this.propData.columNum == 0) {
        data[0] = orignData;
      } else {
        const columNum = this.propData.columNum || 3;
        orignData.forEach((item, index) => {
          if (data[parseInt(index / columNum)]) {
            data[parseInt(index / columNum)].push(item);
          } else {
            data[parseInt(index / columNum)] = [item];
          }
        });
        if (data[data.length - 1].length < columNum) {
          for (let i = 0; i < columNum; i++) {
            if (!data[data.length - 1][i]) {
              data[data.length - 1][i] = null;
            }
          }
        }
      }
      this.data = data;
      console.log(this.data);
    },
    moreClick() {
      if (!this.moduleObject.env || this.moduleObject.env == 'develop') {
        return;
      }
      if (this.propData.moreTarget && this.propData.moreTarget === 'custom') {
        this.customFunctionHandle(this.propData.customMoreBtnFunction);
      } else if (this.propData.moreTarget && this.propData.moreTarget === 'router') {
        const pageId =
          window.IDM.broadcast && window.IDM.broadcast.pageModule
            ? window.IDM.broadcast.pageModule.id
            : '';
        IDM.router.push(
          pageId,
          this.propData.moreBtnToPageId && this.propData.moreBtnToPageId[0]?.id,
          {
            keep: true,
            params: {},
            enterAnim: '',
            quitAnim: ''
          }
        );
      } else {
        const url = IDM.url.getWebPath(this.propData.moreUrl);
        window.open(url, this.propData.moreTarget || '_self');
      }
    },
    itemClick(item) {
      if (!this.moduleObject.env || this.moduleObject.env == 'develop' || !item) {
        return;
      }
      if (this.propData.itemJumpTarget && this.propData.itemJumpTarget === 'custom') {
        this.customFunctionHandle(this.propData.customItemJumpFunction, { item });
      } else if (this.propData.itemJumpTarget && this.propData.itemJumpTarget === 'router') {
        const pageId =
          window.IDM.broadcast && window.IDM.broadcast.pageModule
            ? window.IDM.broadcast.pageModule.id
            : '';
        const params = {};
        this.propData.itemJumpPageParams?.forEach(param => {
          params[param.key] = this.getExpressData('data', param.field, item);
        });
        IDM.router.push(
          pageId,
          this.propData.itemJumpPageId && this.propData.itemJumpPageId[0]?.id,
          {
            keep: true,
            params,
            enterAnim: '',
            quitAnim: ''
          }
        );
      } else if (this.propData.itemJumpUrl) {
        const url = IDM.url.getWebPath(IDM.express.replace(this.propData.itemJumpUrl, item));
        window.open(url, this.propData.itemJumpTarget || '_self');
      }
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
      const itemStyleObject = {};
      const itemActiveStyleObject = {};
      const itemImgStyleObject = {};
      const moreBtnStyleObject = {};
      const mainTextStyleObject = {};
      const extraTextStyleObject = {};

      const scale = this.getScale(pageSize.width);
      styleObject['--i-slideCard-scale'] = scale;

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
            // case 'innerWidth':
            //   innerCardStyleObject['width'] = element;
            //   break;
            // case 'innerHeight':
            //   innerCardStyleObject['height'] = element;
            //   break;
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
            case 'boxShadow':
              styleObject['box-shadow'] = element;
              break;
            case 'itemShadow':
              itemStyleObject['box-shadow'] = element;
              break;
            case 'itemActiveShadow':
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
            case 'itembox':
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
            case 'font':
              styleObject['font-family'] = element.fontFamily;
              if (element.fontColors.hex8) {
                styleObject['color'] = IDM.hex8ToRgbaString(element.fontColors.hex8);
              }
              styleObject['font-weight'] = element.fontWeight && element.fontWeight.split(' ')[0];
              styleObject['font-style'] = element.fontStyle;
              styleObject['font-size'] =
                element.fontSizeUnit === 'px'
                  ? scale * element.fontSize + element.fontSizeUnit
                  : element.fontSize + element.fontSizeUnit;
              styleObject['line-height'] =
                element.fontLineHeight +
                (element.fontLineHeightUnit == '-' ? '' : element.fontLineHeightUnit);
              styleObject['text-align'] = element.fontTextAlign;
              styleObject['text-decoration'] = element.fontDecoration;
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
            case 'moreFont':
              moreBtnStyleObject['font-family'] = element.fontFamily;
              if (element.fontColors.hex8) {
                moreBtnStyleObject['color'] = IDM.hex8ToRgbaString(element.fontColors.hex8);
              }
              moreBtnStyleObject['font-weight'] =
                element.fontWeight && element.fontWeight.split(' ')[0];
              moreBtnStyleObject['font-style'] = element.fontStyle;
              moreBtnStyleObject['font-size'] =
                element.fontSizeUnit === 'px'
                  ? scale * element.fontSize + element.fontSizeUnit
                  : element.fontSize + element.fontSizeUnit;
              moreBtnStyleObject['line-height'] =
                element.fontLineHeight +
                (element.fontLineHeightUnit == '-' ? '' : element.fontLineHeightUnit);
              moreBtnStyleObject['text-align'] = element.fontTextAlign;
              moreBtnStyleObject['text-decoration'] = element.fontDecoration;
              break;
            case 'mainFont':
              mainTextStyleObject['font-family'] = element.fontFamily;
              if (element.fontColors.hex8) {
                mainTextStyleObject['color'] = IDM.hex8ToRgbaString(element.fontColors.hex8);
              }
              mainTextStyleObject['font-weight'] =
                element.fontWeight && element.fontWeight.split(' ')[0];
              mainTextStyleObject['font-style'] = element.fontStyle;
              mainTextStyleObject['font-size'] =
                element.fontSizeUnit === 'px'
                  ? scale * element.fontSize + element.fontSizeUnit
                  : element.fontSize + element.fontSizeUnit;
              mainTextStyleObject['line-height'] =
                element.fontLineHeight +
                (element.fontLineHeightUnit == '-' ? '' : element.fontLineHeightUnit);
              mainTextStyleObject['text-align'] = element.fontTextAlign;
              mainTextStyleObject['text-decoration'] = element.fontDecoration;
              break;
            case 'extraFont':
              extraTextStyleObject['font-family'] = element.fontFamily;
              if (element.fontColors.hex8) {
                extraTextStyleObject['color'] = IDM.hex8ToRgbaString(element.fontColors.hex8);
              }
              extraTextStyleObject['font-weight'] =
                element.fontWeight && element.fontWeight.split(' ')[0];
              extraTextStyleObject['font-style'] = element.fontStyle;
              extraTextStyleObject['font-size'] =
                element.fontSizeUnit === 'px'
                  ? scale * element.fontSize + element.fontSizeUnit
                  : element.fontSize + element.fontSizeUnit;
              extraTextStyleObject['line-height'] =
                element.fontLineHeight +
                (element.fontLineHeightUnit == '-' ? '' : element.fontLineHeightUnit);
              extraTextStyleObject['text-align'] = element.fontTextAlign;
              extraTextStyleObject['text-decoration'] = element.fontDecoration;
              break;
            case 'itemImgRadius':
              itemImgStyleObject['border-radius'] = `${element}px`;
              break;
            case 'itemImgWidth':
              itemImgStyleObject['width'] = `${element}px`;
              break;
            case 'itemImgHeight':
              itemImgStyleObject['height'] = `${element}px`;
              break;
            case 'itemIconSize':
              itemImgStyleObject['font-size'] = `${element}px`;
              break;
            case 'itemIconColor':
              if (element && element.hex8) {
                styleObject['color'] = IDM.hex8ToRgbaString(element.hex8);
              }
              break;
            case 'itemBoxWidth':
              itemStyleObject['width'] = `${element}px`;
              break;
            case 'itemBoxHeight':
              itemStyleObject['height'] = `${element}px`;
              break;
          }
        }
      }
      // 内层容器高度适配，若外层有高度，则内层随外层缩放。若外层没有高度，则由内层容器的子元素撑起。前提设置的有外层容器高度属性，若无此值不走此逻辑，取下面style中的预设
      if (styleObject.height && styleObject.height != 'auto') {
        innerCardStyleObject.height = 0;
      } else if (styleObject.height && styleObject.height == 'auto') {
        innerCardStyleObject.height = 'auto';
      }
      window.IDM.setStyleToPageHead(this.moduleObject.id, styleObject);
      window.IDM.setStyleToPageHead(
        this.moduleObject.id + ' .i-slideCard-content',
        innerCardStyleObject
      );
      window.IDM.setStyleToPageHead(
        this.moduleObject.id + ' .i-slideCard-header-tit span',
        titleStyleObject
      );
      window.IDM.setStyleToPageHead(
        this.moduleObject.id + ' .i-slideCard-header-tit .i-slideCard-header-tit-icon',
        iconStyleObject
      );
      window.IDM.setStyleToPageHead(
        this.moduleObject.id + ' .i-slideCard-header .i-slideCard-header-more',
        moreBtnStyleObject
      );
      window.IDM.setStyleToPageHead(
        this.moduleObject.id + ' .i-slideCard-content .i-slideCard-content-item',
        itemStyleObject
      );
      window.IDM.setStyleToPageHead(
        this.moduleObject.id +
          ' .i-slideCard-content .i-slideCard-content-item:active:not(.i-slideCard-content-empty)',
        itemActiveStyleObject
      );
      window.IDM.setStyleToPageHead(
        this.moduleObject.id + ' .i-slideCard-content .i-slideCard-content-item .item-img',
        itemImgStyleObject
      );
      window.IDM.setStyleToPageHead(
        this.moduleObject.id + ' .i-slideCard-content .i-slideCard-content-item .item-text-main',
        mainTextStyleObject
      );
      window.IDM.setStyleToPageHead(
        this.moduleObject.id + ' .i-slideCard-content .i-slideCard-content-item .item-text-extra',
        extraTextStyleObject
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

        const mainColor = {
          color: item.mainColor ? IDM.hex8ToRgbaString(item.mainColor.hex8) : ''
        };

        IDM.setStyleToPageHead(
          '.' +
            themeNamePrefix +
            item.key +
            ' #' +
            (this.moduleObject.packageid || 'module_demo') +
            ' .i-slideCard-header .i-slideCard-header-more',
          mainColor
        );
        IDM.setStyleToPageHead(
          '.' +
            themeNamePrefix +
            item.key +
            ' #' +
            (this.moduleObject.packageid || 'module_demo') +
            ' .i-slideCard-header-tit .i-slideCard-header-tit-icon',
          mainColor
        );
        IDM.setStyleToPageHead(
          '.' +
            themeNamePrefix +
            item.key +
            ' #' +
            (this.moduleObject.packageid || 'module_demo') +
            ' .i-slideCard-content .i-slideCard-content-item .item-text-extra',
          mainColor
        );
      }
    }
  }
};
</script>

<style scoped lang="scss">
$scale: var(--i-slideCard-scale);
.i-slideCard-outer {
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
  height: auto;
  overflow: hidden;

  .i-slideCard-header {
    display: flex;
    // height: calc(40px * #{ $scale });
    // line-height: calc(40px * #{ $scale });
    justify-content: space-between;
    align-items: center;

    .i-slideCard-header-main {
      // width: 86%;
      flex-grow: 1;
      display: flex;
      align-items: center;

      .i-slideCard-header-tit {
        font-family: PingFangSC-Regular;
        color: #333333;
        font-style: normal;
        text-decoration: none;
        font-size: calc(16px * #{$scale});
        max-width: 60%;
        display: flex;
        align-items: center;

        .i-slideCard-header-tit-icon {
          display: inline-block;
          flex: 1;
          margin-right: 5px;
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

    .i-slideCard-header-more {
      // color: red;
      &:active {
        opacity: 0.7;
      }
      .idm_filed_svg_icon {
        margin-left: 5px;
        font-size: 1em;
        width: 1em;
        height: 1em;
        fill: currentColor;
        vertical-align: -0.15em;
        outline: none;
      }
    }
  }

  .i-slideCard-content {
    flex-grow: 1;
    flex-shrink: 1;
    height: auto;

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

    .i-slideCard-content-wapper {
      height: 100%;
      width: 100%;
      display: flex;
      flex-direction: column;
      flex-wrap: nowrap;
      &::-webkit-scrollbar {
        display: none;
      }
      .i-slideCard-content-row {
        display: flex;
        flex-shrink: 0;
        // width: 100%;
        align-items: center;
        justify-content: space-between;
        flex-wrap: nowrap;
        .i-slideCard-content-empty {
          opacity: 0;
        }
        .i-slideCard-content-item {
          height: 90px;
          width: 90px;
          overflow: hidden;
          flex-shrink: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-around;
          padding: 5px;
          &:active:not(.i-slideCard-content-empty) {
            background-color: #f2f3f5;
          }
          .item-img {
            width: 50px;
            height: 50px;
            font-size: 50px;
            border-radius: 5px;
            overflow: hidden;
            .idm_filed_svg_icon {
              font-size: inherit;
              line-height: 1;
              width: 100%;
              height: 100%;
              display: block;
              fill: currentColor;
              // vertical-align: -0.15em;
              outline: none;
            }
            i {
              width: 100%;
              height: 100%;
              display: block;
              font-size: inherit;
              color: inherit;
              line-height: 1;
            }
          }
          .item-text {
            width: 100%;
            .item-text-main {
              width: 100%;
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
              line-height: 1.6;
              text-align: center;
            }
            .item-text-extra {
              width: 100%;
              display: flex;
              font-size: calc(12px * #{$scale});
              color: red;
              .item-text-extra-col {
                flex-grow: 1;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
              }
            }
          }
        }
      }
    }
  }

  .i-slideCard-mask {
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
