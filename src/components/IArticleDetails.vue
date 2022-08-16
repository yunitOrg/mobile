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
    class="i-articleDetails-outer"
  >
    <van-loading v-if="isLoading" :size="loadingSize" vertical>{{
      propData.loadingDescription || '加载中...'
    }}</van-loading>
    <div
      v-else-if="articleData && Object.keys(articleData).length > 0"
      class="i-articleDetails-wapper"
    >
      <div class="i-articleDetails-header">
        <div v-if="propData.titleField" class="i-articleDetails-title">
          {{ getExpressData('data', propData.titleField, articleData) }}
        </div>
        <div
          v-if="propData.extraFieldList && propData.extraFieldList.length > 0"
          class="i-articleDetails-author"
        >
          <div
            v-for="(item, index) in propData.extraFieldList"
            :key="index"
            class="i-articleDetails-author-item"
            :style="{ 'text-align': item.textAlign }"
          >
            {{ getExpressData('data', item.field, articleData) }}
          </div>
        </div>
      </div>
      <div
        v-if="propData.contentField"
        class="i-articleDetails-content"
        v-html="getExpressData('data', propData.contentField, articleData)"
      ></div>
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
    <div
      class="i-articleDetails-mask"
      v-if="moduleObject.env !== 'production' && !propData.dataSource"
    >
      <span>！未绑定数据源</span>
    </div>
  </div>
</template>

<script>
import { Empty, Loading, Image as VanImage } from 'vant';
import 'vant/lib/empty/style';
import 'vant/lib/loading/style';
import 'vant/lib/image/style';
export default {
  name: 'IArticleDetails',
  components: {
    [Empty.name]: Empty,
    [Loading.name]: Loading,
    [VanImage.name]: VanImage
  },
  data() {
    // {
    //       dataSource: '1',
    //       titleField: 'title',
    //       contentField: 'content',
    //       extraFieldList: [
    //         {
    //           field: 'author',
    //           textAlign: 'left'
    //         },
    //         {
    //           field: 'time',
    //           textAlign: 'right'
    //         }
    //       ]
    //     }
    return {
      moduleObject: {},
      propData: this.$root.propData.compositeAttr || {},
      isLoading: false,
      articleData: {}
    };
  },
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

    this.initData();
  },
  methods: {
    /**
     * 提供父级组件调用的刷新prop数据组件
     */
    propDataWatchHandle(propData) {
      this.propData = propData.compositeAttr || {};
      this.convertAttrToStyleObject();
    },
    /**
     * 组件通信：接收消息的方法
     */
    receiveBroadcastMessage(messageObject) {
      switch (messageObject.type) {
        // case 'websocket':
        //   if(this.propData.messageRefreshKey && messageObject.message){
        //     const messageData = typeof messageObject.message === 'string' && JSON.parse(messageObject.message) || messageObject.message
        //     const arr = Array.isArray(this.propData.messageRefreshKey) ? this.propData.messageRefreshKey : [this.propData.messageRefreshKey]
        //     if(messageData.badgeType && arr.includes(messageData.badgeType)){
        //       this.requsetList();
        //     }
        //   }
        //   break;
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
    customFormat(resultData) {
      if (
        this.propData.customFunction &&
        this.propData.customFunction[0] &&
        this.propData.customFunction[0].name
      ) {
        resultData =
          window[this.propData.customFunction[0].name] &&
          window[this.propData.customFunction[0].name].call(this, {
            customParam: this.propData.customFunction[0].param,
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
     * 请求数据
     */
    initData() {
      if (!this.moduleObject.env || this.moduleObject.env == 'develop') {
        this.articleData = {
          title: '国家卫健委：昨日新增692例本土确诊病例、1620例本土无症状感染者',
          content: '<span>html标签在渲染的时候被源码输出</span>',
          author: '成都商报红星新闻官方帐号',
          time: '2022-08-15 09:03'
        };
        return;
      }
      const dataSource = this.propData.dataSource;
      if (!dataSource) {
        return false;
      }
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
            const resultData = this.customFormat(res.data);
            this.articleData = resultData;
          }
          this.isLoading = false;
        })
        .error(err => {
          console.log(err);
          this.isLoading = false;
        });
    },
    /**
     * 把属性转换成样式对象
     */
    convertAttrToStyleObject(pageSize = {}) {
      const styleObject = {};
      const titleStyleObject = {};
      const authorStyleObject = {};
      const contentStyleObject = {};
      const emptyStyleObject = {};
      const loadingStyleObject = {};

      const scale = this.getScale(pageSize.width);
      styleObject['--i-articleDetails-scale'] = scale;

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
            case 'titleBox':
              if (element.marginTopVal) {
                titleStyleObject['margin-top'] = `${element.marginTopVal}`;
              }
              if (element.marginRightVal) {
                titleStyleObject['margin-right'] = `${element.marginRightVal}`;
              }
              if (element.marginBottomVal) {
                titleStyleObject['margin-bottom'] = `${element.marginBottomVal}`;
              }
              if (element.marginLeftVal) {
                titleStyleObject['margin-left'] = `${element.marginLeftVal}`;
              }
              if (element.paddingTopVal) {
                titleStyleObject['padding-top'] = `${element.paddingTopVal}`;
              }
              if (element.paddingRightVal) {
                titleStyleObject['padding-right'] = `${element.paddingRightVal}`;
              }
              if (element.paddingBottomVal) {
                titleStyleObject['padding-bottom'] = `${element.paddingBottomVal}`;
              }
              if (element.paddingLeftVal) {
                titleStyleObject['padding-left'] = `${element.paddingLeftVal}`;
              }
              break;
            case 'authorBox':
              if (element.marginTopVal) {
                authorStyleObject['margin-top'] = `${element.marginTopVal}`;
              }
              if (element.marginRightVal) {
                authorStyleObject['margin-right'] = `${element.marginRightVal}`;
              }
              if (element.marginBottomVal) {
                authorStyleObject['margin-bottom'] = `${element.marginBottomVal}`;
              }
              if (element.marginLeftVal) {
                authorStyleObject['margin-left'] = `${element.marginLeftVal}`;
              }
              if (element.paddingTopVal) {
                authorStyleObject['padding-top'] = `${element.paddingTopVal}`;
              }
              if (element.paddingRightVal) {
                authorStyleObject['padding-right'] = `${element.paddingRightVal}`;
              }
              if (element.paddingBottomVal) {
                authorStyleObject['padding-bottom'] = `${element.paddingBottomVal}`;
              }
              if (element.paddingLeftVal) {
                authorStyleObject['padding-left'] = `${element.paddingLeftVal}`;
              }
              break;
            case 'contentBox':
              if (element.marginTopVal) {
                contentStyleObject['margin-top'] = `${element.marginTopVal}`;
              }
              if (element.marginRightVal) {
                contentStyleObject['margin-right'] = `${element.marginRightVal}`;
              }
              if (element.marginBottomVal) {
                contentStyleObject['margin-bottom'] = `${element.marginBottomVal}`;
              }
              if (element.marginLeftVal) {
                contentStyleObject['margin-left'] = `${element.marginLeftVal}`;
              }
              if (element.paddingTopVal) {
                contentStyleObject['padding-top'] = `${element.paddingTopVal}`;
              }
              if (element.paddingRightVal) {
                contentStyleObject['padding-right'] = `${element.paddingRightVal}`;
              }
              if (element.paddingBottomVal) {
                contentStyleObject['padding-bottom'] = `${element.paddingBottomVal}`;
              }
              if (element.paddingLeftVal) {
                contentStyleObject['padding-left'] = `${element.paddingLeftVal}`;
              }
              break;
            case 'positionX':
              //背景横向偏移

              break;
            case 'positionY':
              //背景纵向偏移

              break;
            case 'bgImgUrl':
              styleObject['background-image'] = `url(${window.IDM.url.getWebPath(element)})`;
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
            case 'font':
              styleObject['font-family'] = element.fontFamily;
              if (element.fontColors.hex8) {
                styleObject['color'] = IDM.hex8ToRgbaString(element.fontColors.hex8);
              }
              styleObject['font-weight'] = element.fontWeight && element.fontWeight.split(' ')[0];
              styleObject['font-style'] = element.fontStyle;
              styleObject['font-size'] = `calc(${
                element.fontSize + element.fontSizeUnit
              } * #{$scale})`;
              styleObject['line-height'] =
                element.fontLineHeight +
                (element.fontLineHeightUnit == '-' ? '' : element.fontLineHeightUnit);
              styleObject['text-align'] = element.fontTextAlign;
              styleObject['text-decoration'] = element.fontDecoration;
              break;
            case 'titleFont':
              titleStyleObject['font-family'] = element.fontFamily;
              if (element.fontColors.hex8) {
                titleStyleObject['color'] = IDM.hex8ToRgbaString(element.fontColors.hex8);
              }
              titleStyleObject['font-weight'] =
                element.fontWeight && element.fontWeight.split(' ')[0];
              titleStyleObject['font-style'] = element.fontStyle;
              titleStyleObject['font-size'] = `calc(${
                element.fontSize + element.fontSizeUnit
              } * #{$scale})`;
              titleStyleObject['line-height'] =
                element.fontLineHeight +
                (element.fontLineHeightUnit == '-' ? '' : element.fontLineHeightUnit);
              titleStyleObject['text-align'] = element.fontTextAlign;
              titleStyleObject['text-decoration'] = element.fontDecoration;
              break;
            case 'authorFont':
              authorStyleObject['font-family'] = element.fontFamily;
              if (element.fontColors.hex8) {
                authorStyleObject['color'] = IDM.hex8ToRgbaString(element.fontColors.hex8);
              }
              authorStyleObject['font-weight'] =
                element.fontWeight && element.fontWeight.split(' ')[0];
              authorStyleObject['font-style'] = element.fontStyle;
              authorStyleObject['font-size'] = `calc(${
                element.fontSize + element.fontSizeUnit
              } * #{$scale})`;
              authorStyleObject['line-height'] =
                element.fontLineHeight +
                (element.fontLineHeightUnit == '-' ? '' : element.fontLineHeightUnit);
              authorStyleObject['text-align'] = element.fontTextAlign;
              authorStyleObject['text-decoration'] = element.fontDecoration;
              break;
            case 'contentFont':
              contentStyleObject['font-family'] = element.fontFamily;
              if (element.fontColors.hex8) {
                contentStyleObject['color'] = IDM.hex8ToRgbaString(element.fontColors.hex8);
              }
              contentStyleObject['font-weight'] =
                element.fontWeight && element.fontWeight.split(' ')[0];
              contentStyleObject['font-style'] = element.fontStyle;
              contentStyleObject['font-size'] = `calc(${
                element.fontSize + element.fontSizeUnit
              } * #{$scale})`;
              contentStyleObject['line-height'] =
                element.fontLineHeight +
                (element.fontLineHeightUnit == '-' ? '' : element.fontLineHeightUnit);
              contentStyleObject['text-align'] = element.fontTextAlign;
              contentStyleObject['text-decoration'] = element.fontDecoration;
              break;
            case 'loadingFont':
              loadingStyleObject['font-family'] = element.fontFamily;
              if (element.fontColors.hex8) {
                loadingStyleObject['color'] = IDM.hex8ToRgbaString(element.fontColors.hex8);
              }
              loadingStyleObject['font-weight'] =
                element.fontWeight && element.fontWeight.split(' ')[0];
              loadingStyleObject['font-style'] = element.fontStyle;
              loadingStyleObject['font-size'] = `calc(${
                element.fontSize + element.fontSizeUnit
              } * #{$scale})`;
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
              emptyStyleObject['font-size'] = `calc(${
                element.fontSize + element.fontSizeUnit
              } * #{$scale})`;
              emptyStyleObject['line-height'] =
                element.fontLineHeight +
                (element.fontLineHeightUnit == '-' ? '' : element.fontLineHeightUnit);
              emptyStyleObject['text-align'] = element.fontTextAlign;
              emptyStyleObject['text-decoration'] = element.fontDecoration;
              break;
          }
        }
      }
      window.IDM.setStyleToPageHead(this.moduleObject.id, styleObject);
      window.IDM.setStyleToPageHead(
        this.moduleObject.id + ' .i-articleDetails-header .i-articleDetails-title',
        titleStyleObject
      );
      window.IDM.setStyleToPageHead(
        this.moduleObject.id + ' .i-articleDetails-header .i-articleDetails-author',
        authorStyleObject
      );
      window.IDM.setStyleToPageHead(
        this.moduleObject.id + ' .i-articleDetails-content',
        contentStyleObject
      );
      window.IDM.setStyleToPageHead(this.moduleObject.id + ' .van-empty', emptyStyleObject);
      window.IDM.setStyleToPageHead(this.moduleObject.id + ' .van-loading', loadingStyleObject);
    }
  }
};
</script>

<style scoped lang="scss">
$scale: var(--i-articleDetails-scale);
.i-articleDetails-outer {
  width: auto;
  box-sizing: border-box;
  padding: 10px;
  font-family: PingFangSC-Regular;
  color: #333333;
  background-color: #fff;
  position: relative;
  font-size: calc(14px * #{$scale});
  .i-articleDetails-wapper {
    height: 100%;
    overflow: auto;
    .i-articleDetails-header {
      .i-articleDetails-title {
        font-size: calc(20px * #{$scale});
        font-weight: 600;
        text-align: justify;
        white-space: pre-wrap;
      }
      .i-articleDetails-author {
        font-size: calc(14px * #{$scale});
        color: #9195a3;
        display: flex;
        align-items: center;
        letter-spacing: 0;
        margin-top: 14px;
        .i-articleDetails-author-item {
          flex-grow: 1;
        }
      }
    }
    .i-articleDetails-content {
      font-size: calc(16px * #{$scale});
      white-space: pre-wrap;
      margin-top: 20px;
    }
  }
  .i-articleDetails-mask {
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

  ::v-deep .van-empty {
    padding: 0;
    height: 100%;
  }

  ::v-deep .van-empty__description {
    font-size: inherit;
  }

  ::v-deep .van-loading {
    justify-content: center;
    height: 100%;
  }
}
</style>
