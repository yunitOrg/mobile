<template>
  <!--
    根目录规范(必须不能为空)：
    idm-ctrl：控件类型 drag_container：容器，drag_container_inlieblock：行内容器，idm_module：非容器的组件
    id：使用moduleObject.id，如果id不使用这个将会被idm-ctrl-id属性替换
    idm-ctrl-id：组件的id，这个必须不能为空
  -->
  <div idm-ctrl="idm_module"
  :id="moduleObject.id" 
  :idm-ctrl-id="moduleObject.id" >
    <div class="idm-showform">
      <div class="form-top">
        <div class="form-title" v-if="propData.showTitle">
          <svg class="form-icon" aria-hidden="true" v-if="propData.titleIcon && propData.titleIcon.length">
            <use :xlink:href="`#${propData.titleIcon[0]}`"></use>
          </svg>
          <svg-icon v-else icon-class="redFlag" className="form-icon"></svg-icon>
          {{ params[propData.titleField] || propData.titleContent}}
        </div>
        <div class="form-ul" v-if="propData.showUl">
          <li v-for="(item, index) in propData.tableList" :key="index">
            <span>{{params[item.field]}}</span>
            <div>{{item.label}}</div>
          </li>
        </div>
      </div>
      <div class="form-tip" v-if="propData.showInfo">{{propData.labelTitle}}</div>
      <div class="form-detail">
        <div class="form-label form-column" v-if="params[propData.addressField]">
          <div class="form-label-title pd-t10">详细地址</div>
          <div class="form-label-desc">{{params[propData.addressField]}}</div>
        </div>
        <div class="form-label" v-if="params[propData.timeField]">
          <div class="form-label-title">时间</div>
          <div class="form-label-desc">{{params[propData.timeField]}}</div>
        </div>
        <div class="form-label" v-if="params[propData.peopleField]">
          <div class="form-label-title">联系人</div>
          <div class="form-label-desc">{{params[propData.peopleField]}}</div>
        </div>
        <div class="form-label form-column" v-if="params[propData.activeField]">
          <div class="form-label-title pd-t10">活动内容</div>
          <div class="form-label-desc">{{params[propData.activeField]}}</div>
        </div>
        <div class="form-label form-column" v-if="params[propData.infoField]">
          <div class="form-label-title pd-t10">相关资料</div>
          <div class="form-label-desc">
            <div class="form-upload-li" v-for="(item, index) in params[propData.infoField]" :key="index">{{item.name}}</div>
          </div>
        </div>
        <div class="form-label form-column" v-if="params[propData.activeSumField]">
          <div class="form-label-title pd-t10">活动总结</div>
          <div class="form-label-desc">{{params[propData.activeSumField]}}</div>
        </div>
      </div>
      <div class="d-flex just-c" v-if="isLoading">
        <van-loading size="24px" vertical>加载中...</van-loading>
      </div>
    </div>
    <div class="idm-message-list-parent-box-mask" v-if="moduleObject.env === 'develop' && !propData.dataSource">
      <span>！未绑定数据源</span>
    </div>
  </div>
</template>

<script>
import { getDatasInterfaceUrl } from '@/api/config'
export default {
  data () {
    return {
      isLoading: false,
      uploaddesc: [
        {
          name: 'bbaa.txt'
        },
        {
          name: 'test.pdf'
        }
      ],
      params: {},
      moduleObject: {},
      propData: this.$root.propData.compositeAttr||{
        showTitle: true,
        titleContent: '第一次党员大会',
        labelTitle: '基本信息',
        showUl: true,
        showInfo: true,
        addressField: 'address',
        tableList: [
          {
            num: 11,
            label: '应到'
          },
          {
            num: 5,
            label: '实到'
          },
          {
            num: 2,
            label: '请假'
          },
          {
            num: 4,
            label: '缺席'
          }
        ],
        box: {
          marginTopVal: "",
          marginRightVal: "",
          marginBottomVal: "",
          marginLeftVal: "",
          paddingTopVal: "10px",
          paddingRightVal: "10px",
          paddingBottomVal: "10px",
          paddingLeftVal: "10px"
        },
        contentBox: {
          marginTopVal: "",
          marginRightVal: "",
          marginBottomVal: "",
          marginLeftVal: "",
          paddingTopVal: "",
          paddingRightVal: "20px",
          paddingBottomVal: "20px",
          paddingLeftVal: "20px"
        },
        titleBox: {
          marginTopVal: "",
          marginRightVal: "20px",
          marginBottomVal: "",
          marginLeftVal: "20px",
          paddingTopVal: "20px",
          paddingRightVal: "",
          paddingBottomVal: "20px",
          paddingLeftVal: ""
        },
        ulBox: {
          marginTopVal: "",
          marginRightVal: "",
          marginBottomVal: "",
          marginLeftVal: "",
          paddingTopVal: "20px",
          paddingRightVal: "",
          paddingBottomVal: "20px",
          paddingLeftVal: ""
        },
        topShadow: "0px 0px 20px 0px #ccc",
        contentShadow: "0px 0px 20px 0px #ccc",
        titleIconSize: 20,
        numFont: {
          fontColors: {
              hex: "#f00",
              hex8: "#f00"
          },
          fontSize: 26,
          fontSizeUnit: "px"
        },
        formlabel: {
          marginTopVal: "",
          marginRightVal: "",
          marginBottomVal: "",
          marginLeftVal: "",
          paddingTopVal: "20px",
          paddingRightVal: "",
          paddingBottomVal: "20px",
          paddingLeftVal: ""
        },
        meansMargin: {
          marginTopVal: "",
          marginRightVal: "",
          marginBottomVal: "",
          marginLeftVal: "",
          paddingTopVal: "",
          paddingRightVal: "",
          paddingBottomVal: "10px",
          paddingLeftVal: ""
        }
      }
    }
  },
  created () {
    this.moduleObject = this.$root.moduleObject;
    this.init();
  },
  methods: {
    propDataWatchHandle (propData) {
      this.propData = propData.compositeAttr||{};
      this.init();
    },
    init () {
      console.log(this.propData, '数据源');
      this.initData()
      this.converStyle()
      this.converThemeListObject();
    },
    // 获取router的数据
    getRouterParams () {
      return this.moduleObject.routerId ? IDM.router.getParam(this.moduleObject.routerId): {};
    },
    // 过滤接口参数
    fileterParams () {
      let obj = {};
      if (this.propData.customClickFunc && this.propData.customClickFunc.length > 0) {
        let name = this.propData.customClickFunc[0].name
        obj = window[name] && window[name].call(this, this.getRouterParams());
      }
      return obj
    },
    initData () {
      if (this.moduleObject.env == "production") {
        this.isLoading = true;
        const routerParams = this.fileterParams();
        this.propData.dataSource &&
          IDM.http
            .post(
              getDatasInterfaceUrl,
              {
                id: this.propData.dataSource && this.propData.dataSource.value,
                ...routerParams
              },
              {
                headers: {
                  "Content-Type": "application/json;charset=UTF-8",
                },
              }
            )
            .then((res) => {
              this.isLoading = false;
              if (res.status == 200 && res.data.code == 200) {
                  this.params = res.data.data
              } else {
                  IDM.message.error(res.data.message)
              }
            })
      }
    },
    converThemeListObject () {
      let themeList = this.propData.themeList;
      if (!themeList) {
        return;
      }
      const themeNamePrefix =
        IDM.setting &&
        IDM.setting.applications &&
        IDM.setting.applications.themeNamePrefix
          ? IDM.setting.applications.themeNamePrefix
          : "idm-theme-";
      for (let i=0; i<themeList.length; i++) {
        let item = themeList[i]
        if(item.key!=IDM.theme.getCurrentThemeInfo()){
            //此处比对是不渲染输出不用的样式，如果页面会刷新就可以把此处放开
            continue;
        }
        let tempobj = {};
        tempobj = {
          "color": item.mainColor ? item.mainColor.hex8 : "",
        }
        IDM.setStyleToPageHead(
          `.${themeNamePrefix}${item.key} #${(this.moduleObject.id || "module_demo")} .form-ul span`,
          tempobj
        );
        IDM.setStyleToPageHead(
          `.${themeNamePrefix}${item.key} #${(this.moduleObject.id || "module_demo")} .form-icon`,
          {
            "color": item.mainColor ? item.mainColor.hex8 : "",
            "fill": item.mainColor ? item.mainColor.hex8 : ""
          }
        );
      }
    },
    converStyle () {
      let styleObject = {},
          styleWrapObject = {},
          styleContentObject = {},
          styleTitleObject = {},
          iconObject = {},
          formULObject = {},
          formPd = {},
          formlabel = {},
          formlabelLeft = {},
          fontlabelRight = {},
          fontmeansFont = {},
          liObject = {};
      for (const key in this.propData) {
        if (this.propData.hasOwnProperty.call(this.propData, key)) {
          const element = this.propData[key]
          if (!element && element !== false && element != 0) {
            continue
          }
          switch (key) {
            case 'box':
              IDM.style.setBoxStyle(styleWrapObject, element)
              break
            case 'boxBg':
              styleWrapObject['background-color'] = element && element.hex
              break
            case 'topShadow':
              styleObject['box-shadow'] = element
              break
            case 'topBorder':
              IDM.style.setBorderStyle(styleObject, element)
              break
            case 'contentShadow':
              styleContentObject['box-shadow'] = element
              break
            case 'contentBorder':
               IDM.style.setBorderStyle(styleContentObject, element)
              break
            case 'contentBox':
              IDM.style.setBoxStyle(styleContentObject, element)
              break
            case 'titleFont':
              IDM.style.setFontStyle(styleTitleObject, element)
              break
            case 'titleBox':
              IDM.style.setBoxStyle(styleTitleObject, element)
              break
            case 'titleBorder':
              IDM.style.setBorderStyle(styleTitleObject, element)
              break
            case 'titleIconColor':
              iconObject['color'] = element && element.hex + ' !important'
              iconObject['fill'] = element && element.hex + ' !important'
              break
            case 'titleIconSize':
              iconObject['width'] = element + 'px'
              iconObject['height'] = element + 'px'
              break
            case 'ulBox':
              IDM.style.setBoxStyle(formULObject, element)
              break
            case 'numFont':
              IDM.style.setFontStyle(liObject, element, true)
              break
            case 'nameFont':
              IDM.style.setFontStyle(liObject, element)
              break
            case 'labelBox':
              IDM.style.setBoxStyle(formPd, element)
              break
            case 'labelFont':
              IDM.style.setFontStyle(formPd, element)
              break
            case 'formlabel':
              IDM.style.setBoxStyle(formlabel, element)
              break
            case 'formlabelBorder':
              IDM.style.setBorderStyle(formlabel, element)
              break
            case 'leftTitleFont':
              IDM.style.setFontStyle(formlabelLeft, element)
              break
            case 'rightTitleFont':
              IDM.style.setFontStyle(fontlabelRight, element)
              break
            case 'meansfont':
              IDM.style.setFontStyle(fontmeansFont, element)
              break
            case 'meansMargin':
              IDM.style.setBoxStyle(fontmeansFont, element)
              break
          }
        }
      }
      window.IDM.setStyleToPageHead(this.moduleObject.id + " .idm-showform", styleWrapObject);
      window.IDM.setStyleToPageHead(this.moduleObject.id + " .form-top", styleObject);
      window.IDM.setStyleToPageHead(this.moduleObject.id + " .form-detail", styleContentObject);
      window.IDM.setStyleToPageHead(this.moduleObject.id + " .form-title", styleTitleObject);
      window.IDM.setStyleToPageHead(this.moduleObject.id + " .form-icon", iconObject);
      window.IDM.setStyleToPageHead(this.moduleObject.id + " .form-ul", formULObject);
      window.IDM.setStyleToPageHead(this.moduleObject.id + " .form-ul span", liObject);
      window.IDM.setStyleToPageHead(this.moduleObject.id + " .form-tip", formPd);
      window.IDM.setStyleToPageHead(this.moduleObject.id + " .form-label", formlabel);
      window.IDM.setStyleToPageHead(this.moduleObject.id + " .form-label-title", formlabelLeft);
      window.IDM.setStyleToPageHead(this.moduleObject.id + " .form-label-desc", fontlabelRight);
      window.IDM.setStyleToPageHead(this.moduleObject.id + " .form-upload-li", fontmeansFont);
    }
  }
}
</script>

<style lang="scss" scoped>
.idm-message-list-parent-box-mask {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  background: rgba(0,0,0,.3);
  display: flex;
  justify-content: center;
  align-items: center;
  span {
    padding: 6px 20px;
    color: #e6a23c;
    background: #fdf6ec;
    border:1px solid #f5dab1;
    border-radius: 4px;
  }
}
.pd-t10{
  padding-bottom: 10px;
}
.idm-showform{
  .form-top{
    // border-radius: 5px;
    // box-shadow: 0px  0px 20px 0px #ccc;
    .form-icon{
      width: 20px;
      height: 20px;
      margin-right: 10px;
    }
    .form-title{
      display: flex;
      align-items: center;
      justify-content: center;
      // margin: 0 20px;
      // padding: 20px 0;
      // border-bottom: 1px solid #ccc;
    }
    .form-ul{
      display: flex;
      // padding: 20px 0;
      justify-content: center;
      align-items: center;
      span{
        // font-size: 26px;
        // color: #f00;
        padding-bottom: 5px;
        display: inline-block;
      }
      li{
        list-style: none;
        flex: 1;
        text-align: center;
      }
    }
  }
  .form-tip{
    // padding: 10px 0;
    // font-size: 18px;
  }
  .form-detail{
    // padding: 0 20px 20px 20px;
    // border-radius: 5px;
    // box-shadow: 0px  0px 20px 0px #ccc;
    .form-column{
      flex-direction: column;
    }
    .form-label{
      // border-bottom: 1px solid #ccc;
      // padding: 20px 0;
      display: flex;
      justify-content: space-between;
    }
    .form-label-title{
      // color: #333;
    }
    .form-upload-li{
      color: blue;
    }
    & .form-label:last-child{
      border: 0;
    }
  }
}
</style>