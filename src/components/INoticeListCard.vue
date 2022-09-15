<template>
  <!--
    根目录规范(必须不能为空)：
    idm-ctrl：控件类型 drag_container：容器，drag_container_inlieblock：行内容器，idm_module：非容器的组件
    id：使用moduleObject.id，如果id不使用这个将会被idm-ctrl-id属性替换
    idm-ctrl-id：组件的id，这个必须不能为空
  -->
  <div
    class="i-notice-list-card-outer"
    idm-ctrl="idm_module"
    :id="moduleObject.id"
    :idm-ctrl-id="moduleObject.id"
    v-show="propData.defaultStatus != 'hidden'"
  >
    <div v-show="propData.isShowTitleBar" class="i-notice-list-card-header">
      <div
        class="header-icon"
        v-if="propData.showIcon && propData.titleIconPosition == 'left'"
      >
        <svg-icon icon-class="shu" />
      </div>
      <div class="header-text">
        {{ propData.title }}
      </div>
      <div
        class="header-icon"
        v-if="propData.showIcon && propData.titleIconPosition == 'right'"
      >
        <svg-icon icon-class="shu" />
      </div>
    </div>
    <van-loading v-if="isLoading" size="24px" vertical>加载中...</van-loading>

    <div v-else class="i-notice-list-card-content">
      <template v-if="infoList.length > 0">
        <ul>
          <li
            v-for="(notice, n) in infoList"
            :key="n"
            @click="noticeClick(notice)"
          >
            <div class="i-notice-list-item">
              <div class="item-outer-circle">
                <div class="item-inner-circle">
                  <div class="item-main-circle">
                    <span class="circle-day">{{
                      notice[propData.dateInterface] | dayFilter
                    }}</span>
                    <span class="circle-month">{{
                      notice[propData.dateInterface] | monthFilter
                    }}</span>
                  </div>
                </div>
              </div>
              <span>{{ notice[propData.btInterface] }}</span>
            </div>
          </li>
        </ul>
        <p
          class="loading-more"
          v-if="infoList.length < total"
          @click="loadData"
        >
          {{ isLoadingMore ? "加载中..." : "加载更多" }}
        </p>
      </template>
      <van-empty v-else :description="propData.emptyDescription">
        <template #image>
          <van-image
            :src="
              IDM.url.getModuleAssetsWebPath(
                require('../assets/empty-default.png'),
                moduleObject
              )
            "
          />
        </template>
      </van-empty>
    </div>
    <div
      class="i-notice-list-card-mask"
      v-if="moduleObject.env !== 'production' && !propData.dataSource"
    >
      <span>！未绑定数据源</span>
    </div>
  </div>
</template>

<script>
const months = {
  "01": "一",
  "02": "二",
  "03": "三",
  "04": "四",
  "05": "五",
  "06": "六",
  "07": "七",
  "08": "八",
  "09": "九",
  10: "十",
  11: "十一",
  12: "十二",
};
import { Empty, Loading, Image as VanImage } from "vant";
import "vant/lib/empty/style";
import "vant/lib/loading/style";
import "vant/lib/image/style";
export default {
  name: "INoticeListCard",
  components: {
    [Empty.name]: Empty,
    [Loading.name]: Loading,
    [VanImage.name]: VanImage,
  },
  data() {
    return {
      moduleObject: {},
      propData: this.$root.propData.compositeAttr || {
        title: "通知公告",
        columns: 2,
        emptyDescription: "暂无数据",
        defaultNumber: 4,
        isShowTitleBar: true,
        showIcon: true,
        titleIconPosition: "left",
        listInterface: "list",
        dateInterface: "date",
        btInterface: "bt",
      },
      isLoading: true,
      isLoadingMore: false,
      infoList: [],
      total: 0,
    };
  },
  filters: {
    dayFilter(value) {
      return value.split(" ")[0].split("-")[2] - 0;
    },
    monthFilter(value) {
      return months[value.split(" ")[0].split("-")[1]] + "月";
    },
  },
  props: {},
  created() {
    this.moduleObject = this.$root.moduleObject;
    this.convertAttrToStyleObject();
    this.convertThemeListAttrToStyleObject();
    this.isLoading = true;
    this.initData();
  },
  mounted() {},
  destroyed() {},
  methods: {
    noticeClick(notice) {
      if (this.propData.replyJump && this.propData.replyJump.length > 0) {
        IDM.router.push(
          this.moduleObject.pageid,
          this.propData.replyJump[0].id,
          this.propData.isPageKeep,
          {
            id:notice.id,
          },
          "",
          ""
        );
      } else {
        IDM.message.warning("请选择要跳转的子页面");
      }
    },
    /**
     * 获取更多数据
     */
    loadData() {
      if (this.isLoadingMore) {
        // 防抖
        return;
      }
      this.isLoadingMore = true;
      this.initData(true);
    },
    /**
     * 重载
     */
    reload() {
      this.isLoading = true;
      this.infoList = [];
      this.initData();
    },
    /**
     * 加载动态数据
     */
    initData(loadMore) {
      if (!this.moduleObject.env || this.moduleObject.env == "develop") {
        // mock数据
        setTimeout(() => {
          this.isLoading = false;
          this.isLoadingMore = false;
          const res = {
            total: 10,
            list: [
              {
                id: "1",
                date: "2022-08-02 18:00:00",
                bt: "关于十月份",
              },
              {
                id: "2",
                date: "2022-07-11",
                bt: "关于十月份工作的通知细则",
              },
              {
                id: "3",
                date: "2022-10-24",
                bt: "关于十月份工作的通知细则",
              },
              {
                id: "4",
                date: "2022-11-02",
                bt: "关于十月份工作的通知细则",
              },
            ],
          };

          this.total = res.total;
          if (loadMore) {
            this.infoList = [...this.infoList, ...res.list];
          } else {
            this.infoList = res[this.propData.listInterface];
          }
        }, 1000);

        return;
      }
      let dataSource = this.propData.dataSource;
      if (!dataSource) {
        this.isLoading = false;
        return;
      }
      let url = `ctrl/dataSource/getDatas`;
      IDM.http
        .post(
          url,
          {
            id: dataSource.value,
            start: this.infoList.length,
            limit: this.propData.defaultNumber,
          },
          {
            headers: {
              "Content-Type": "application/json;charset=UTF-8",
            },
          }
        )
        .done((res) => {
          console.log(res, "接口数据");
          if (res.code === "200") {
            const result = res.data;
            this.total = result.total;
            if (loadMore) {
              this.infoList = [
                ...this.infoList,
                ...result[this.propData.listInterface],
              ];
            } else {
              this.infoList = result[this.propData.listInterface];
            }
          } else {
            console.log(url + "请求失败");
          }
        })
        .error((response) => {
          console.log(url + "请求失败");
        })
        .always((res) => {
          this.isLoading = false;
          this.isLoadingMore = false;
        });
    },
    /**
     * 适配页面
     */
    getScale(pageWidth) {
      const base = this.propData.baseValue || 414;
      const ratio = this.propData.adaptationRatio || 1.2;
      const width =
        this.moduleObject.env === "production"
          ? window.innerWidth
          : pageWidth || 414;
      return (width / base - 1) * (ratio - 1) + 1;
    },
    /**
     * 提供父级组件调用的刷新prop数据组件
     */
    propDataWatchHandle(propData) {
      this.propData = propData.compositeAttr || {};
      this.convertAttrToStyleObject();
      this.convertThemeListAttrToStyleObject();
    },
    /**
     * 把属性转换成样式对象
     */
    convertAttrToStyleObject(pageSize = {}) {
      var styleObject = {};
      var titleFontStyleObject = {};
      var outerCircleStyleObject = {};
      var innerStyleObject = {};

      const scale = this.getScale(pageSize.width);
      styleObject["--i-notice-list-card-scale"] = scale;

      if (this.propData.bgSize && this.propData.bgSize == "custom") {
        styleObject["background-size"] =
          (this.propData.bgSizeWidth
            ? this.propData.bgSizeWidth.inputVal +
              this.propData.bgSizeWidth.selectVal
            : "auto") +
          " " +
          (this.propData.bgSizeHeight
            ? this.propData.bgSizeHeight.inputVal +
              this.propData.bgSizeHeight.selectVal
            : "auto");
      } else if (this.propData.bgSize) {
        styleObject["background-size"] = this.propData.bgSize;
      }
      if (this.propData.positionX && this.propData.positionX.inputVal) {
        styleObject["background-position-x"] =
          this.propData.positionX.inputVal + this.propData.positionX.selectVal;
      }
      if (this.propData.positionY && this.propData.positionY.inputVal) {
        styleObject["background-position-y"] =
          this.propData.positionY.inputVal + this.propData.positionY.selectVal;
      }
      for (const key in this.propData) {
        if (this.propData.hasOwnProperty.call(this.propData, key)) {
          const element = this.propData[key];
          if (!element && element !== false && element != 0) {
            continue;
          }
          switch (key) {
            case "width":
            case "height":
              styleObject[key] = element;
              break;
            case "bgColor":
              if (element && element.hex8) {
                styleObject["background-color"] = IDM.hex8ToRgbaString(
                  element.hex8
                );
                outerCircleStyleObject["background-color"] =
                  IDM.hex8ToRgbaString(element.hex8);
              }
              break;
            case "innerBgColor":
              if (element && element.hex8) {
                innerStyleObject["background-color"] = IDM.hex8ToRgbaString(
                  element.hex8
                );
              }
              break;
            case "box":
              if (element.marginTopVal) {
                styleObject["margin-top"] = `${element.marginTopVal}`;
              }
              if (element.marginRightVal) {
                styleObject["margin-right"] = `${element.marginRightVal}`;
              }
              if (element.marginBottomVal) {
                styleObject["margin-bottom"] = `${element.marginBottomVal}`;
              }
              if (element.marginLeftVal) {
                styleObject["margin-left"] = `${element.marginLeftVal}`;
              }
              if (element.paddingTopVal) {
                styleObject["padding-top"] = `${element.paddingTopVal}`;
              }
              if (element.paddingRightVal) {
                styleObject["padding-right"] = `${element.paddingRightVal}`;
              }
              if (element.paddingBottomVal) {
                styleObject["padding-bottom"] = `${element.paddingBottomVal}`;
              }
              if (element.paddingLeftVal) {
                styleObject["padding-left"] = `${element.paddingLeftVal}`;
              }
              break;
            case "innerBox":
              if (element.marginTopVal) {
                innerStyleObject["margin-top"] = `${element.marginTopVal}`;
              }
              if (element.marginRightVal) {
                innerStyleObject["margin-right"] = `${element.marginRightVal}`;
              }
              if (element.marginBottomVal) {
                innerStyleObject[
                  "margin-bottom"
                ] = `${element.marginBottomVal}`;
              }
              if (element.marginLeftVal) {
                innerStyleObject["margin-left"] = `${element.marginLeftVal}`;
              }
              if (element.paddingTopVal) {
                innerStyleObject["padding-top"] = `${element.paddingTopVal}`;
              }
              if (element.paddingRightVal) {
                innerStyleObject[
                  "padding-right"
                ] = `${element.paddingRightVal}`;
              }
              if (element.paddingBottomVal) {
                innerStyleObject[
                  "padding-bottom"
                ] = `${element.paddingBottomVal}`;
              }
              if (element.paddingLeftVal) {
                innerStyleObject["padding-left"] = `${element.paddingLeftVal}`;
              }
              break;
            case "bgImgUrl":
              styleObject[
                "background-image"
              ] = `url(${window.IDM.url.getWebPath(element)})`;
              break;
            case "positionX":
              //背景横向偏移

              break;
            case "positionY":
              //背景纵向偏移

              break;
            case "bgRepeat":
              //平铺模式
              styleObject["background-repeat"] = element;
              break;
            case "bgAttachment":
              //背景模式
              styleObject["background-attachment"] = element;
              break;
            case "border":
              if (element.border.top.width > 0) {
                styleObject["border-top-width"] =
                  element.border.top.width + element.border.top.widthUnit;
                styleObject["border-top-style"] = element.border.top.style;
                if (element.border.top.colors.hex8) {
                  styleObject["border-top-color"] = IDM.hex8ToRgbaString(
                    element.border.top.colors.hex8
                  );
                }
              }
              if (element.border.right.width > 0) {
                styleObject["border-right-width"] =
                  element.border.right.width + element.border.right.widthUnit;
                styleObject["border-right-style"] = element.border.right.style;
                if (element.border.right.colors.hex8) {
                  styleObject["border-right-color"] = IDM.hex8ToRgbaString(
                    element.border.right.colors.hex8
                  );
                }
              }
              if (element.border.bottom.width > 0) {
                styleObject["border-bottom-width"] =
                  element.border.bottom.width + element.border.bottom.widthUnit;
                styleObject["border-bottom-style"] =
                  element.border.bottom.style;
                if (element.border.bottom.colors.hex8) {
                  styleObject["border-bottom-color"] = IDM.hex8ToRgbaString(
                    element.border.bottom.colors.hex8
                  );
                }
              }
              if (element.border.left.width > 0) {
                styleObject["border-left-width"] =
                  element.border.left.width + element.border.left.widthUnit;
                styleObject["border-left-style"] = element.border.left.style;
                if (element.border.left.colors.hex8) {
                  styleObject["border-left-color"] = IDM.hex8ToRgbaString(
                    element.border.left.colors.hex8
                  );
                }
              }

              styleObject["border-top-left-radius"] =
                element.radius.leftTop.radius +
                element.radius.leftTop.radiusUnit;
              styleObject["border-top-right-radius"] =
                element.radius.rightTop.radius +
                element.radius.rightTop.radiusUnit;
              styleObject["border-bottom-left-radius"] =
                element.radius.leftBottom.radius +
                element.radius.leftBottom.radiusUnit;
              styleObject["border-bottom-right-radius"] =
                element.radius.rightBottom.radius +
                element.radius.rightBottom.radiusUnit;
              break;
            case "innerBorder":
              if (element.border.top.width > 0) {
                innerStyleObject["border-top-width"] =
                  element.border.top.width + element.border.top.widthUnit;
                innerStyleObject["border-top-style"] = element.border.top.style;
                if (element.border.top.colors.hex8) {
                  innerStyleObject["border-top-color"] = IDM.hex8ToRgbaString(
                    element.border.top.colors.hex8
                  );
                }
              }
              if (element.border.right.width > 0) {
                innerStyleObject["border-right-width"] =
                  element.border.right.width + element.border.right.widthUnit;
                innerStyleObject["border-right-style"] =
                  element.border.right.style;
                if (element.border.right.colors.hex8) {
                  innerStyleObject["border-right-color"] = IDM.hex8ToRgbaString(
                    element.border.right.colors.hex8
                  );
                }
              }
              if (element.border.bottom.width > 0) {
                innerStyleObject["border-bottom-width"] =
                  element.border.bottom.width + element.border.bottom.widthUnit;
                innerStyleObject["border-bottom-style"] =
                  element.border.bottom.style;
                if (element.border.bottom.colors.hex8) {
                  innerStyleObject["border-bottom-color"] =
                    IDM.hex8ToRgbaString(element.border.bottom.colors.hex8);
                }
              }
              if (element.border.left.width > 0) {
                innerStyleObject["border-left-width"] =
                  element.border.left.width + element.border.left.widthUnit;
                innerStyleObject["border-left-style"] =
                  element.border.left.style;
                if (element.border.left.colors.hex8) {
                  innerStyleObject["border-left-color"] = IDM.hex8ToRgbaString(
                    element.border.left.colors.hex8
                  );
                }
              }

              innerStyleObject["border-top-left-radius"] =
                element.radius.leftTop.radius +
                element.radius.leftTop.radiusUnit;
              innerStyleObject["border-top-right-radius"] =
                element.radius.rightTop.radius +
                element.radius.rightTop.radiusUnit;
              innerStyleObject["border-bottom-left-radius"] =
                element.radius.leftBottom.radius +
                element.radius.leftBottom.radiusUnit;
              innerStyleObject["border-bottom-right-radius"] =
                element.radius.rightBottom.radius +
                element.radius.rightBottom.radiusUnit;
              break;
            case "boxShadow":
              styleObject["box-shadow"] = element;
              break;
            case "innerBoxShadow":
              innerStyleObject["box-shadow"] = element;
              break;
            case "font":
              innerStyleObject["font-family"] = element.fontFamily;
              if (element.fontColors.hex8) {
                innerStyleObject["color"] = IDM.hex8ToRgbaString(
                  element.fontColors.hex8
                );
              }
              innerStyleObject["font-weight"] =
                element.fontWeight && element.fontWeight.split(" ")[0];
              innerStyleObject["font-style"] = element.fontStyle;
              innerStyleObject["font-size"] =
                element.fontSize + element.fontSizeUnit;
              innerStyleObject["line-height"] =
                element.fontLineHeight +
                (element.fontLineHeightUnit == "-"
                  ? ""
                  : element.fontLineHeightUnit);
              innerStyleObject["text-align"] = element.fontTextAlign;
              innerStyleObject["text-decoration"] = element.fontDecoration;
              break;
            case "titleFont":
              titleFontStyleObject["font-family"] = element.fontFamily;
              if (element.fontColors.hex8) {
                titleFontStyleObject["color"] = IDM.hex8ToRgbaString(
                  element.fontColors.hex8
                );
              }
              titleFontStyleObject["font-weight"] =
                element.fontWeight && element.fontWeight.split(" ")[0];
              titleFontStyleObject["font-style"] = element.fontStyle;
              titleFontStyleObject["font-size"] =
                element.fontSize + element.fontSizeUnit;
              titleFontStyleObject["line-height"] =
                element.fontLineHeight +
                (element.fontLineHeightUnit == "-"
                  ? ""
                  : element.fontLineHeightUnit);
              titleFontStyleObject["text-align"] = element.fontTextAlign;
              titleFontStyleObject["text-decoration"] = element.fontDecoration;
              break;
          }
        }
      }
      window.IDM.setStyleToPageHead(this.moduleObject.id, styleObject);
      window.IDM.setStyleToPageHead(
        this.moduleObject.id + ` .i-notice-list-card-header .header-text`,
        titleFontStyleObject
      );
      window.IDM.setStyleToPageHead(
        this.moduleObject.id +
          ` .i-notice-list-card-content .i-notice-list-item .item-outer-circle`,
        outerCircleStyleObject
      );
      window.IDM.setStyleToPageHead(
        this.moduleObject.id +
          ` .i-notice-list-card-content .i-notice-list-item`,
        innerStyleObject
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
        IDM.setting &&
        IDM.setting.applications &&
        IDM.setting.applications.themeNamePrefix
          ? IDM.setting.applications.themeNamePrefix
          : "idm-theme-";
      for (var i = 0; i < themeList.length; i++) {
        var item = themeList[i];

        IDM.setStyleToPageHead(
          "." +
            themeNamePrefix +
            item.key +
            " #" +
            (this.moduleObject.packageid || "module_demo") +
            " .i-notice-list-card-header .header-icon",
          {
            color: item.mainColor
              ? IDM.hex8ToRgbaString(item.mainColor.hex8)
              : "",
          }
        );

        IDM.setStyleToPageHead(
          "." +
            themeNamePrefix +
            item.key +
            " #" +
            (this.moduleObject.packageid || "module_demo") +
            " .i-notice-list-card-content .i-notice-list-item .item-inner-circle",
          {
            "border-color": item.mainColor
              ? IDM.hex8ToRgbaString(item.mainColor.hex8)
              : "",
          }
        );

        IDM.setStyleToPageHead(
          "." +
            themeNamePrefix +
            item.key +
            " #" +
            (this.moduleObject.packageid || "module_demo") +
            " .i-notice-list-card-content .i-notice-list-item .item-main-circle",
          {
            "background-color": item.mainColor
              ? IDM.hex8ToRgbaString(item.mainColor.hex8)
              : "",
          }
        );
      }
    },
    /**
     * 通用的url参数对象
     * 所有地址的url参数转换
     */
    commonParam() {
      let urlObject = IDM.url.queryObject();
      var params = {
        pageId:
          window.IDM.broadcast && window.IDM.broadcast.pageModule
            ? window.IDM.broadcast.pageModule.id
            : "",
        urlData: JSON.stringify(urlObject),
      };
      return params;
    },
    /**
     * 通用的获取表达式匹配后的结果
     */
    getExpressData(dataName, dataFiled, resultData) {
      //给defaultValue设置dataFiled的值
      var _defaultVal = undefined;
      if (dataFiled) {
        var filedExp = dataFiled;
        filedExp = dataName + (filedExp.startsWiths("[") ? "" : ".") + filedExp;
        var dataObject = { IDM: window.IDM };
        dataObject[dataName] = resultData;
        _defaultVal = window.IDM.express.replace.call(
          this,
          "@[" + filedExp + "]",
          dataObject
        );
      }
      //对结果进行再次函数自定义
      if (
        this.propData.customFunction &&
        this.propData.customFunction.length > 0
      ) {
        var params = this.commonParam();
        var resValue = "";
        try {
          resValue =
            window[this.propData.customFunction[0].name] &&
            window[this.propData.customFunction[0].name].call(this, {
              ...params,
              ...this.propData.customFunction[0].param,
              moduleObject: this.moduleObject,
              expressData: _defaultVal,
              interfaceData: resultData,
            });
        } catch (error) {}
        _defaultVal = resValue;
      }

      return _defaultVal;
    },
    showThisModuleHandle() {
      this.propData.defaultStatus = "default";
    },
    hideThisModuleHandle() {
      this.propData.defaultStatus = "hidden";
    },
    /**
     * 组件通信：接收消息的方法
     * @param {
     *  type:"发送消息的时候定义的类型，这里可以自己用来要具体做什么，统一规定的type：linkageResult（组件联动传结果值）、linkageDemand（组件联动传需求值）、linkageReload（联动组件重新加载）
     * 、linkageOpenDialog（打开弹窗）、linkageCloseDialog（关闭弹窗）、linkageShowModule（显示组件）、linkageHideModule（隐藏组件）、linkageResetDefaultValue（重置默认值）"
     *  message:{发送的时候传输的消息对象数据}
     *  messageKey:"消息数据的key值，代表数据类型是什么，常用于表单交互上，比如通过这个key判断是什么数据"
     *  isAcross:如果为true则代表发送来源是其他页面的组件，默认为false
     * } object
     */
    receiveBroadcastMessage(messageObject) {
      console.log("组件收到消息", messageObject);
      switch (messageObject.type) {
        case "websocket":
          if (this.propData.messageRefreshKey && messageObject.message) {
            const messageData =
              (typeof messageObject.message === "string" &&
                JSON.parse(messageObject.message)) ||
              messageObject.message;
            const arr = Array.isArray(this.propData.messageRefreshKey)
              ? this.propData.messageRefreshKey
              : [this.propData.messageRefreshKey];
            if (messageData.badgeType && arr.includes(messageData.badgeType)) {
              this.reload();
            }
          }
          break;
        case "linkageReload":
          this.reload();
          break;
        case "pageResize":
          this.convertAttrToStyleObject(messageObject.message);
          break;
      }
    },
    /**
     * 组件通信：发送消息的方法
     * @param {
     *  type:"自己定义的，统一规定的type：linkageResult（组件联动传结果值）、linkageDemand（组件联动传需求值）、linkageReload（联动组件重新加载）
     * 、linkageOpenDialog（打开弹窗）、linkageCloseDialog（关闭弹窗）、linkageShowModule（显示组件）、linkageHideModule（隐藏组件）、linkageResetDefaultValue（重置默认值）",
     *  message:{实际的消息对象},
     *  rangeModule:"为空发送给全部，根据配置的属性中设定的值（值的内容是组件的packageid数组），不取子表的，比如直接 this.$root.propData.compositeAttr["attrKey"]（注意attrKey是属性中定义的bindKey）,这里的格式为：['1','2']"",
     *  className:"指定的组件类型，比如只给待办组件发送，然后再去过滤上面的值"
     *  globalSend:如果为true则全站发送消息，注意全站rangeModule是无效的，只有className才有效，默认为false
     * } object
     */
    sendBroadcastMessage(object) {
      window.IDM.broadcast && window.IDM.broadcast.send(object);
    },
  },
};
</script>

<style lang="scss" scoped>
$scale: var(--i-notice-list-card-scale);

.i-notice-list-card-outer {
  position: relative;
  width: auto;
  background-color: #fff;
  margin: calc($scale * 12px);
  padding: calc($scale * 16px) calc($scale * 16px) 0 calc($scale * 16px);
  box-shadow: 0px calc($scale * 2px) calc($scale * 8px) 0px
    rgba(194, 194, 194, 0.5);
  border-radius: calc($scale * 10px);

  .i-notice-list-card-header {
    display: flex;
    color: #cd0502;

    .header-icon {
      color: #cd0502;
      .svg-icon {
        vertical-align: -0.2em;
      }
    }

    .header-text {
      font-size: calc($scale * 16px);
      color: #333333;
      font-weight: 700;
    }
  }

  .i-notice-list-card-content {
    padding-bottom: calc($scale * 16px);
    ul {
      display: flex;
      flex-wrap: wrap;

      li {
        min-height: calc($scale * 96px);
        width: 50%;
        margin-top: calc($scale * 46px);

        .i-notice-list-item {
          position: relative;
          font-size: calc($scale * 14px);
          color: #333333;
          font-weight: 700;
          padding: 30% calc($scale * 14px) calc($scale * 14px)
            calc($scale * 14px);
          box-shadow: 0px 2px calc($scale * 8px) 0px rgba(194, 194, 194, 0.5);
          border: 1px solid rgba(227, 227, 227, 1);
          text-align: center;
          height: 100%;
          background-color: #fff;

          & > span {
            -webkit-line-clamp: 2;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            overflow: hidden;
            text-overflow: ellipsis;
          }

          .item-outer-circle {
            position: absolute;
            width: 46%;
            padding-bottom: 46%;
            background-color: #fff;
            left: 0;
            right: 0;
            margin: 0 auto;
            top: 0;
            border-radius: 50%;
            box-shadow: calc($scale * -10px) calc($scale * -10px)
              calc($scale * 20px) calc($scale * -14px) rgba(194, 194, 194, 1)
              inset;
            transform: translateY(-50%) rotate(45deg);

            .item-inner-circle {
              position: absolute;
              border: calc($scale * 3px) solid #cd0502;
              width: 80%;
              height: 80%;
              left: 0;
              right: 0;
              bottom: 0;
              top: 0;
              margin: auto;
              border-radius: 50%;
              padding: 2px;

              .item-main-circle {
                width: 100%;
                height: 100%;
                background-color: #cd0502;
                border-radius: 50%;
                transform: rotate(-45deg);
                color: #fff;
                display: flex;
                justify-content: center;
                align-items: center;
                flex-direction: column;

                .circle-day {
                  font-size: calc($scale * 15px);
                  font-weight: 600;
                }

                .circle-month {
                  font-size: calc($scale * 14px);
                  font-weight: 500;
                }

                span {
                  display: block;
                }
              }
            }
          }
        }

        &:nth-child(odd) {
          padding-right: calc($scale * 8px);
        }
        &:nth-child(even) {
          padding-left: calc($scale * 8px);
        }
      }
    }
  }

  .loading-more {
    font-size: calc($scale * 14px);
    color: #666666;
    font-weight: normal;
    padding: calc($scale * 16px) 0;
    padding-bottom: 0;
    margin-bottom: 0;
    text-align: center;
    font-family: PingFangSC-Regular;
  }

  .i-notice-list-card-mask {
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
}
</style>
