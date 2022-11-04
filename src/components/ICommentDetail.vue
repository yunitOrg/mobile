<template>
  <!--
    根目录规范(必须不能为空)：
    idm-ctrl：控件类型 drag_container：容器，drag_container_inlieblock：行内容器，idm_module：非容器的组件
    id：使用moduleObject.id，如果id不使用这个将会被idm-ctrl-id属性替换
    idm-ctrl-id：组件的id，这个必须不能为空
  -->
  <div
      class="i-comment-detail-outer"
      idm-ctrl="idm_module"
      :id="moduleObject.id"
      :idm-ctrl-id="moduleObject.id"
      v-show="propData.defaultStatus != 'hidden'"
  >
    <!--
      组件内部容器
      增加class="drag_container" 必选
      idm-ctrl-id：组件的id，这个必须不能为空
      idm-container-index  组件的内部容器索引，不重复唯一且不变，必选
    -->
    <div class="i-comment-detail-wrapper">
      <div class="i-comment-detail-main" v-if="detailInfo">
        <div class="i-comment-detail-content-left">
          <img v-if="detailInfo[propData.imgInterface]" :src="IDM.url.getWebPath(detailInfo[propData.imgInterface])"
               class="content-left-avatar">
          <img v-else src="../assets/default_avatar.png" class="content-left-avatar"/>
        </div>
        <div class="i-comment-detail-content-right">
          <div class="content-right-top">
            <span class="comment-name">{{ detailInfo[propData.avatarInterface] }}</span>
            <span
                v-if="propData.showStarBtn"
                class="comment-star"
                :class="{ active: detailInfo[propData.starInterface] }"
                @click="starClick(detailInfo)"
            ><svg-icon icon-class="commentStar"/>{{
                detailInfo[propData.starNumInterface]
              }}</span
            >
          </div>
          <p class="content-right-center">{{ detailInfo[propData.btInterface] }}</p>
          <div class="content-right-bottom">
            <span class="comment-time">{{ detailInfo[propData.timeInterface] }}</span>
            <span class="comment-total">评论 {{ detailInfo[propData.totalInterface] }}</span>
          </div>
        </div>
      </div>

      <div class="i-comment-detail-content">
        <ILazyList
            v-model="loading"
            :finished="finished"
            :finished-text="finishedText"
            @load="initData"
        >
          <div
              class="i-comment-detail-content-item"
              v-for="(item, i) in infoList"
              :key="i"
              :class="{ 'border-none': infoList.length - 1 === i }"
          >
            <div class="i-comment-detail-content-left">
              <img v-if="item[propData.imgInterface]" :src="IDM.url.getWebPath(item[propData.imgInterface])"
                   class="content-left-avatar">
              <img v-else src="../assets/default_avatar.png" class="content-left-avatar"/>
            </div>
            <div class="i-comment-detail-content-right">
              <div class="content-right-top">
                <span class="comment-name">{{ item[propData.avatarInterface] }}</span>
              </div>
              <p class="content-right-center">
                回复<span>{{ item[propData.replyInterface] }}:</span>{{ item[propData.btInterface] }}
              </p>
              <div class="content-right-bottom">
                <span class="comment-time">{{ item[propData.timeInterface] }}</span>
                <span class="comment-reply" @click="replyClick(item)"
                >回复</span
                >
              </div>
            </div>
          </div>
        </ILazyList>
      </div>
    </div>

    <!--    <div class="i-comment-detail-mask" v-if="moduleObject.env !== 'production' && !propData.dataSource">-->
    <!--      <span>！未绑定数据源</span>-->
    <!--    </div>-->
  </div>
</template>

<script>
import {List} from "vant";
import ILazyList from "@/commonComponents/ILazyList";

export default {
  name: "ICommentDetail",
  components: {
    ILazyList,
    [List.name]: List
  },
  data() {
    return {
      moduleObject: {},
      propData: this.$root.propData.compositeAttr || {
        emptyDescription: "暂无回复",
        finishedTip: "数据已加载全部",
        imgInterface: 'img',
        idInterface: 'id',
        avatarInterface: 'avatar',
        timeInterface: 'time',
        starInterface: 'star',
        starNumInterface: 'starNum',
        btInterface: 'bt',
        fromInterface: 'from',
        totalInterface: 'total',
        replyInterface: 'reply',
        showStarBtn: true,
      },
      loading: false,
      finished: false,
      detailInfo: null,
      infoList: [],
      total: 0,
      pageSize: 5,
      start: 0,
      requestParams: [],
      latestNum: null
    };
  },
  props: {},
  computed: {
    finishedText() {
      let text = "";
      if (!this.loading && this.infoList.length === 0) {
        text = this.propData.emptyDescription;
      } else {
        text = this.propData.finishedTip;
      }
      return text;
    },
  },
  created() {
    this.moduleObject = this.$root.moduleObject;
    this.convertAttrToStyleObject();
    this.convertThemeListAttrToStyleObject();

    this.getDetail();
  },
  mounted() {
  },
  destroyed() {
  },
  methods: {
    getDetail() {
      let dataSource = this.propData.dataSource;
      if (!dataSource) {
        if (!this.moduleObject.env || this.moduleObject.env == "develop") {
          // mock数据
          setTimeout(() => {
            const res = {
              img: "",
              id: "",
              avatar: "Wunder",
              time: "6分钟前",
              star: false,
              starNum: 100,
              bt: "我认为二级市场真正的问题在于拍卖行。在艺术家的推广上，拍卖行真的和画廊格格不入。",
              from: "来自广东深圳",
              total: 4,
            };
            this.detailInfo = res;
          }, 500);

          return;
        }
      }

      const routerParams = this.detailFileterParams();
      IDM.datasource.request(this.propData.detailDataSource[0]?.id, {
        moduleObject: this.moduleObject,
        param: routerParams
      }, (res) => {
        this.detailInfo = res
        this.latestNum = this.detailInfo[this.propData.totalInterface]
      })
    },
    /**
     * 删除
     */
    delClick(item) {
      console.log(item, "删除");
    },
    /**
     * 回复跳转
     */
    replyClick(item) {
      IDM.broadcast.send({
        type: "replayComment",
        message: item,
        rangeModule: []
      })
    },
    /**
     * 点赞
     */
    starClick(item) {
      item.star = !item.star;
    },
    /**
     * 重载组件
     */
    reload() {
      this.loading = true;
      this.finished = false;
      this.infoList = [];
      this.requestParams = [];
      this.getDetail();
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
      var styleObject = {},
          innerStyleObject = {},
          rootStyleObject = {};

      const scale = this.getScale(pageSize.width);
      rootStyleObject["--i-comment-detail-scale"] = scale;

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

      if (this.propData.innerBgSize && this.propData.innerBgSize == "custom") {
        innerStyleObject["background-size"] =
            (this.propData.innerBgSizeWidth
                ? this.propData.innerBgSizeWidth.inputVal +
                this.propData.innerBgSizeWidth.selectVal
                : "auto") +
            " " +
            (this.propData.innerBgSizeHeight
                ? this.propData.innerBgSizeHeight.inputVal +
                this.propData.innerBgSizeHeight.selectVal
                : "auto");
      } else if (this.propData.innerBgSize) {
        innerStyleObject["background-size"] = this.propData.innerBgSize;
      }
      if (
          this.propData.innerPositionX &&
          this.propData.innerPositionX.inputVal
      ) {
        innerStyleObject["background-position-x"] =
            this.propData.innerPositionX.inputVal +
            this.propData.innerPositionX.selectVal;
      }
      if (
          this.propData.innerPositionY &&
          this.propData.innerPositionY.inputVal
      ) {
        innerStyleObject["background-position-y"] =
            this.propData.innerPositionY.inputVal +
            this.propData.innerPositionY.selectVal;
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
            case "font":
              styleObject["font-family"] = element.fontFamily;
              if (element.fontColors.hex8) {
                styleObject["color"] = IDM.hex8ToRgbaString(
                    element.fontColors.hex8
                );
              }
              styleObject["font-weight"] =
                  element.fontWeight && element.fontWeight.split(" ")[0];
              styleObject["font-style"] = element.fontStyle;
              styleObject["font-size"] =
                  element.fontSize + element.fontSizeUnit;
              styleObject["line-height"] =
                  element.fontLineHeight +
                  (element.fontLineHeightUnit == "-"
                      ? ""
                      : element.fontLineHeightUnit);
              styleObject["text-align"] = element.fontTextAlign;
              styleObject["text-decoration"] = element.fontDecoration;
              break;
            case "boxShadow":
              styleObject["box-shadow"] = element;
              break;
          }
        }
      }
      window.IDM.setStyleToPageHead(this.moduleObject.id, rootStyleObject);
      window.IDM.setStyleToPageHead(this.moduleObject.id + ` .i-comment-detail-wrapper`, styleObject);
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
            " .i-comment-detail-wrapper .content-right-top .comment-star.active",
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
            " .i-comment-detail-wrapper .i-comment-detail-content-right .content-right-center span",
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
            " .i-comment-detail-wrapper .i-comment-detail-content-right .content-right-bottom",
            {
              color: item.mainColor
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
    // 获取router的数据
    getRouterParams() {
      return this.moduleObject.routerId ? IDM.router.getParam(this.moduleObject.routerId) : {};
    },
    // 过滤接口参数
    fileterParams() {
      let obj = {};
      if (this.propData.customClickFunc && this.propData.customClickFunc.length > 0) {
        let name = this.propData.customClickFunc[0].name
        obj = window[name] && window[name].call(this, this.getRouterParams());
      }
      return obj
    },
    // 过滤接口参数
    detailFileterParams() {
      let obj = {};
      if (this.propData.detailCustomClickFunc && this.propData.detailCustomClickFunc.length > 0) {
        let name = this.propData.detailCustomClickFunc[0].name
        obj = window[name] && window[name].call(this, this.getRouterParams());
      }
      return obj
    },

    /**
     * 加载动态数据
     */
    initData() {
      let dataSource = this.propData.dataSource;
      if (!dataSource) {
        if (!this.moduleObject.env || this.moduleObject.env == "develop") {
          // mock数据
          setTimeout(() => {
            const res = {
              total: 10,
              list: [
                {
                  img: "",
                  id: "",
                  avatar: "Wunder",
                  time: "6分钟前",
                  star: true,
                  starNum: 100,
                  bt: "我认为二级市场真正的问题在于拍卖行。在艺术家的推广上，拍卖行真的和画廊格格不入。",
                  from: "来自广东深圳",
                  total: 100,
                  reply: "The Shy",
                },
                {
                  img: "",
                  id: "",
                  avatar: "The Shy",
                  time: "6分钟前",
                  star: false,
                  starNum: 100,
                  bt: "我认为二级市场真正的问题在于拍卖行。在艺术家的推广上，拍卖行真的和画廊格格不入。",
                  from: "来自广东深圳",
                  total: 100,
                  reply: "Wunder",
                },
                {
                  img: "",
                  id: "",
                  avatar: "Wunder",
                  time: "6分钟前",
                  star: false,
                  starNum: 100,
                  bt: "我认为二级市场真正的问题在于拍卖行。在艺术家的推广上，拍卖行真的和画廊格格不入。",
                  from: "来自广东深圳",
                  total: 100,
                  reply: "The Shy",
                },
                {
                  img: "",
                  id: "",
                  avatar: "The Shy",
                  time: "6分钟前",
                  star: true,
                  starNum: 100,
                  bt: "我认为二级市场真正的问题在于拍卖行。在艺术家的推广上，拍卖行真的和画廊格格不入。",
                  from: "来自广东深圳",
                  total: 100,
                  reply: "Wunder",
                },
                {
                  img: "",
                  id: "",
                  avatar: "Wunder",
                  time: "6分钟前",
                  star: false,
                  starNum: 100,
                  bt: "我认为二级市场真正的问题在于拍卖行。在艺术家的推广上，拍卖行真的和画廊格格不入。",
                  from: "来自广东深圳",
                  total: 100,
                  reply: "The Shy",
                },
              ],
            };
            if (this.infoList.length >= res.total) {
              this.finished = true;
            }
            this.infoList = [...this.infoList, ...res.list];
            this.total = res.total;
            this.loading = false;
          }, 500);

          return;
        }
      }

      if (!dataSource) {
        this.loading = false;
        return;
      }
      const routerParams = this.fileterParams();


      let tempParams = {
        pageSize: this.pageSize,
        start: this.infoList.length,
        ...routerParams
      }

      let flag = false
      if (this.requestParams.length !== 0) {
        for (const param of this.requestParams) {
          flag = JSON.stringify(tempParams) === JSON.stringify(param)
          if (flag) {
            break;
          }
        }
      }

      if (!flag) {
        this.requestParams.push({
          pageSize: this.pageSize,
          start: this.infoList.length,
          ...routerParams
        })

        IDM.datasource.request(this.propData.dataSource[0]?.id, {
          moduleObject: this.moduleObject,
          param: {
            pageSize: this.pageSize,
            start: this.infoList.length,
            ...routerParams
          }
        }, (res) => {
          if (res.length === 0) {
            this.finished = true;
          }
          this.infoList = [...this.infoList, ...res.list];

          this.total = res.total;
          if (this.infoList.length >= res.total) {
            this.finished = true;
          }
          this.loading = false;
        })
      }else {
        this.loading = false;
      }

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
        var dataObject = {IDM: window.IDM};
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
        } catch (error) {
        }
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
$scale: var(--i-comment-detail-scale);

.i-comment-detail-outer {
  position: relative;
  color: #000;
  font-size: calc(14px * #{$scale});
  height: auto;
  display: flex;
  flex-direction: column;

  .i-comment-detail-wrapper {
    height: 100%;
    overflow: auto;
    padding: 10px;

    .i-comment-detail-main {
      display: flex;
      padding: calc(16px * #{$scale});
      background-color: #fff;
      box-shadow: 0 calc(2px * #{$scale}) calc(12px * #{$scale}) 0 rgba(0, 0, 0, 0.07);
      border-radius: calc(6px * #{$scale});
      margin-bottom: 12px;

      .i-comment-detail-content-right .content-right-bottom {
        color: rgb(101, 101, 101);
      }
    }

    .i-comment-detail-content {
      background-color: #fff;
      box-shadow: 0px 2px 9px 7px rgba(238, 238, 238, 0.5);
      border-radius: calc(6px * #{$scale});
      margin-bottom: 60px;

      .i-comment-detail-content-item {
        display: flex;
        border-bottom: 1px solid rgb(222, 222, 222);
        padding: calc(16px * #{$scale});

        &.border-none {
          border-bottom: none;
        }
      }

      .i-comment-detail-content-more {
        color: rgb(102, 102, 102);
        text-align: center;
        padding-bottom: calc(10px * #{$scale});
      }
    }

    .i-comment-detail-content-left {
      width: calc(38px * #{$scale});
      min-width: calc(38px * #{$scale});

      .content-left-avatar {
        width: 100%;
        height: calc(38px * #{$scale});
        border-radius: 50%;
      }
    }

    .i-comment-detail-content-right {
      padding: 0 calc(8px * #{$scale});
      flex: 1;

      .content-right-top {
        padding: calc(10px * #{$scale}) 0 calc(6px * #{$scale}) 0;
        display: flex;
        color: rgb(146, 146, 146);
        justify-content: space-between;

        .comment-name {
          color: rgb(101, 101, 101);
        }

        .comment-star {
          cursor: pointer;

          &.active {
            color: rgb(193, 0, 0);
          }

          .svg-icon {
            margin-right: calc(4px * #{$scale});
          }
        }
      }

      .content-right-center {
        color: currentColor;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        margin: 0 0 calc(8px * #{$scale}) 0;

        span {
          color: rgb(193, 0, 0);
          margin: 0 6px;
        }
      }

      .content-right-bottom {
        display: flex;
        justify-content: space-between;
        color: rgb(193, 0, 0);

        .comment-time {
          color: rgb(101, 101, 101);
        }

        .comment-reply {
          flex: 1;
          padding-left: 24px;
        }
      }
    }
  }

  .i-comment-detail-mask {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
    background: rgba(0, 0, 0, .3);
    display: flex;
    justify-content: center;
    align-items: center;

    span {
      padding: calc(6px * #{ $scale }) calc(20px * #{ $scale });;
      color: #e6a23c;
      background: #fdf6ec;
      border: calc(1px * #{ $scale }) solid #f5dab1;
      border-radius: calc(4px * #{ $scale });;
    }
  }
}
</style>
