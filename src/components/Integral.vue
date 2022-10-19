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
    <div class="idm-integral">
      <div class="integral-img" :style="`width:${propData.imgWidth};height:${propData.imgHeight};background-color: ${propData.colorBg}`" v-if="propData.showImg">
        <img :src="IDM.url.getWebPath(propData.topImgUrl)" v-if="propData.topImgUrl" alt="">
        <img v-else :src="img" alt="">
        <div class="integral-rule" @click="handleJump">{{propData.soreTitle}}</div>
        <div class="integral-position integral-white">
          <div class="integral-top-title">累计积分</div>
          <div class="integral-block">
            <span>{{pageData[propData.allField] || pageData.allData}}</span>
            <b>今日已获得{{pageData[propData.dateInteField] || pageData.dateintegral}}积分</b>
          </div>
        </div>
      </div>
      <div class="integral-bottom">
        <div class="integral-p" v-if="propData.integralShow">
          <svg class="idm_svg_author_icon" aria-hidden="true" v-if="propData.boxtitleIcon && propData.boxtitleIcon.length">
            <use :xlink:href="`#${propData.boxtitleIcon[0]}`"></use>
          </svg>
          <svg-icon v-else icon-class="shu" class-name="idm_svg_author_icon"></svg-icon>
          <span>{{propData.integralTitle}}</span>
        </div>
        <div class="integral-li" v-for="(item, index) in list" :key="index">
          <div class="integral-top">
            <span>{{item[propData.titleFiled] || item.name}}</span>
            <b  v-if="propData.typeShow" :style="computedStyle(item[propData.typeFiled] || item.type)">{{item[propData.typeFiled] || item.type}}</b>
          </div>
          <div class="integral-li-p" v-for="(subitem, subindex) in item[propData.descFiled] || item.desc" :key="subindex">{{subitem}}</div>
          <div class="integral-tip" v-if="item.online">已获得{{item[propData.gotFiled] || item.got}}分/每日上限{{item[propData.onlineFiled] || item.online}}分</div>
        </div>
        <ICommonEmpty
            v-if="!isLoading && list.length === 0"
            :moduleObject="moduleObject"
            :propData="propData"
        ></ICommonEmpty>
        <div class="d-flex just-c" v-if="isLoading">
            <van-loading size="24px" vertical>加载中...</van-loading>
        </div>
      </div>
    </div>
    <div class="i-articleDetails-mask" v-if="moduleObject.env === 'develop' && !propData.dataSource" >
      <span>！未绑定数据源</span>
    </div>
  </div>
</template>

<script>
import { integralData } from '@/mock/mockData.js';
import ICommonEmpty from '../commonComponents/ICommonEmpty'
export default {
  name: 'Integral',
  components: {
    ICommonEmpty
  },
  data () {
    return {
      moduleObject:{},
      pageData: {},
      list: [],
      img: '',
      isLoading: false,
      propData:this.$root.propData.compositeAttr||{
        imgWidth: 'auto',
        imgHeight: '200px',
        soreTitle: '积分规则？',
        showImg: true,
        typeShow: true,
        colorBg: "#DA1412",
        integralTitle: '积分奖励',
        boxShadow: "0px 0px 10px 0px #e3dede",
        integralShow: true,
        boxposition: '35%',
        allboxPostion: '35px',
        getBoxPostionTop: '15px',
        getBoxPostionRight: '-123px',
        soreTop: '20px',
        soreLeft: '20px',
        bgColor: {
          hex: '#ffffff',
          hex8: '#ffffffff'
        },
        liBox: {
          marginTopVal: "",
          marginRightVal: "",
          marginBottomVal: "",
          marginLeftVal: "",
          paddingTopVal: "10px",
          paddingRightVal: "",
          paddingBottomVal: "10px",
          paddingLeftVal: ""
        },
        box: {
          marginTopVal: "-20px",
          marginRightVal: "10px",
          marginBottomVal: "",
          marginLeftVal: "10px",
          paddingTopVal: "20px",
          paddingRightVal: "10px",
          paddingBottomVal: "",
          paddingLeftVal: "10px"
        }
      }
    }
  },
  created () {
    this.moduleObject = this.$root.moduleObject
    this.init()
  },
  mounted () {
    this.img = IDM.url.getModuleAssetsWebPath(require("../assets/integral.png"), this.moduleObject)
  },

  methods: {
    computedStyle (val) {
      let result = {}
      if (this.propData.btnTable && this.propData.btnTable.length > 0) {
        let obj = this.propData.btnTable.find(item => item.name === val);
        let bgobj = obj.btnBg || {};
        result = { 'background-color': bgobj.hex8 }
      }
      return result
    },
    propDataWatchHandle (propData) {
      this.propData = propData.compositeAttr||{};
      this.init();
    },
    init () {
      console.log(this.propData, '数据');
      if (this.moduleObject.env == "production") {
        this.initData()
      } else {
        this.pageData = integralData
        this.list = integralData.list
      }
      this.converStyleObj();
      this.converThemeListObject();
    },
    converStyleObj () {
      let styleObject = {},
          subtitleObject = {},
          desctitleObject = {},
          numStyleObject = {},
          checkStyleObject = {},
          liboxStyleObject = {},
          descStyleObject = {},
          tipStyleObject = {},
          liTtitleObject = {},
          btnObject = {},
          blockObject = {},
          soreObject = {},
          positionObject = {},
          colorCheck = {};
      for (const key in this.propData) {
        if (this.propData.hasOwnProperty.call(this.propData, key)) {
          const element = this.propData[key]
          if (!element && element !== false && element != 0) {
              continue
          }
          switch (key) {
            case 'boxposition':
              positionObject['top'] = element
              break
            case 'allboxPostion':
              blockObject['top'] = element
              break
            case 'getBoxPostionTop':
              desctitleObject['top'] = element
              break
            case 'getBoxPostionRight':
              desctitleObject['right'] = element
              break
            case 'titleFont':
              IDM.style.setFontStyle(styleObject, element)
              break
            case 'subTitleFont':
              IDM.style.setFontStyle(subtitleObject, element)
              break
            case 'descTitleFont':
              IDM.style.setFontStyle(desctitleObject, element)
              break
            case 'boxShadow':
              numStyleObject['box-shadow'] = element
              break
            case 'box':
              IDM.style.setBoxStyle(numStyleObject, element)
              break
            case 'bgColor':
              numStyleObject['background-color'] = element && element.hex8
              break
            case 'boxBorder':
              IDM.style.setBorderStyle(numStyleObject, element)
              break
            case 'integralFont':
              IDM.style.setFontStyle(checkStyleObject, element)
              break
            case 'titleIconColor':
              colorCheck['color'] = element && element.hex + ' !important'
              colorCheck['fill'] = element && element.hex + ' !important'
              break
            case 'titleIconSize':
              colorCheck['width'] = element + 'px'
              colorCheck['height'] = element + 'px'
              break
            case 'liBox':
              IDM.style.setBoxStyle(liboxStyleObject, element)
              break
            case 'liboxBorder':
              IDM.style.setBorderStyle(liboxStyleObject, element)
              break
            case 'descFont':
              IDM.style.setFontStyle(descStyleObject, element)
              break
            case 'descBox':
              IDM.style.setBoxStyle(descStyleObject, element)
              break
            case 'tipsFont':
              IDM.style.setFontStyle(tipStyleObject, element, true)
              break
            case 'tipsBox':
              tipStyleObject['padding'] = `${element} 0`
              break
            case 'titleLiFont':
              IDM.style.setFontStyle(liTtitleObject, element)
              break
            case 'btnMargin':
              IDM.style.setBoxStyle(btnObject, element)
              break
            case 'btnFont':
              IDM.style.setFontStyle(btnObject, element)
              break
            case 'btnBorder':
              IDM.style.setBorderStyle(btnObject, element)
              break
            case 'soreFont':
              IDM.style.setFontStyle(soreObject, element)
              break
            case 'soreTop':
              soreObject['top'] = element
              break
            case 'soreLeft':
              soreObject['left'] = element
              break
          }
        }
      }
      window.IDM.setStyleToPageHead(this.moduleObject.id + " .integral-position", positionObject);
      window.IDM.setStyleToPageHead(this.moduleObject.id + " .integral-rule", soreObject);
      window.IDM.setStyleToPageHead(this.moduleObject.id + " .integral-top-title", styleObject);
      window.IDM.setStyleToPageHead(this.moduleObject.id + " .integral-top span", liTtitleObject);
      window.IDM.setStyleToPageHead(this.moduleObject.id + " .integral-block", blockObject);
      window.IDM.setStyleToPageHead(this.moduleObject.id + " .integral-block span", subtitleObject);
      window.IDM.setStyleToPageHead(this.moduleObject.id + " .integral-block b", desctitleObject);
      window.IDM.setStyleToPageHead(this.moduleObject.id + " .integral-bottom", numStyleObject);
      window.IDM.setStyleToPageHead(this.moduleObject.id + " .integral-p span", checkStyleObject);
      window.IDM.setStyleToPageHead(this.moduleObject.id + " .idm_svg_author_icon", colorCheck);
      window.IDM.setStyleToPageHead(this.moduleObject.id + " .integral-li", liboxStyleObject);
      window.IDM.setStyleToPageHead(this.moduleObject.id + " .integral-li .integral-li-p", descStyleObject);
      window.IDM.setStyleToPageHead(this.moduleObject.id + " .integral-li .integral-tip", tipStyleObject);
      window.IDM.setStyleToPageHead(this.moduleObject.id + " .integral-top b", btnObject);
    },
    initData () {
      let that = this;
      const customInterfaceUrl = '/ctrl/dataSource/getDatas';
      if (this.moduleObject.env == "production") {
        this.isLoading = true
        this.propData.dataSource &&
          IDM.http
            .post(
              customInterfaceUrl,
              {
                id: this.propData.dataSource && this.propData.dataSource.value,
              },
              {
                headers: {
                  "Content-Type": "application/json;charset=UTF-8",
                },
              }
            )
            .then((res) => {
              if (res.status == 200 && res.data.code == 200) {
                let obj = (res.data || {}).data
                that.pageData = obj;
                that.list = obj[that.propData.liFiled]
              } else {
                IDM.message.error(res.message);
              }
            })
            .finally(() => {
              this.isLoading = false
            })
      }
    },
    handleClick (row) {
      let that = this;
      let { customClickFunc, key } = row;
      if (customClickFunc && customClickFunc.length > 0 ) {
        customClickFunc.forEach(item => {
          window[item.name] && window[item.name].call(that, {
            value: key
          });
        })
      }
    },
    handleJump () {
      let url = null
      switch (this.propData.jumpStyle) {
        case '_child':
          if (this.propData.morePageList && this.propData.morePageList.length > 0) {
                IDM.router.push(
                    this.moduleObject.pageid,
                    this.propData.morePageList[0].id,
                    this.propData.isPageKeep,
                    {},
                    '',
                    ''
                )
            } else {
                IDM.message.warning('请选择要跳转的子页面')
            }
          break
       case '_custom_link':
          url = this.propData.customLink;
          window.open(IDM.url.getWebPath(url))
          break
        case 'jumpCustomFunc':
          if (this.propData.jumpCustomFunc && this.propData.jumpCustomFunc.length > 0) {
            const funcName = this.propData.jumpCustomFunc[0].name
            window[funcName] && window[funcName].call(this)
          }
          break
      }
    },
     // 设置主题
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
          `.${themeNamePrefix}${item.key} #${(this.moduleObject.id || "module_demo")} .integral-li .integral-tip`,
          {
            "color": item.mainColor ? item.mainColor.hex8 : "",
          }
        );
        IDM.setStyleToPageHead(
          `.${themeNamePrefix}${item.key} #${(this.moduleObject.id || "module_demo")} .idm_svg_author_icon`,
          {
            "color": item.mainColor ? item.mainColor.hex8 : "",
            "fill": item.mainColor ? item.mainColor.hex8 : ""
          }
        );
      }
    }
  }
}
</script>

<style lang="scss" scoped>
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
.idm-integral{
  .integral-rule{
    position: absolute;
  }
  .integral-img{
    position: relative;
    img{
      width: 100%;
      height: 100%;
    }
    .integral-white{
      color: #fff;
      position: absolute;
      text-align: center;
    }
    .integral-position{
      left: 50%;
      transform: translate(-50%, 0);
    }
    .integral-block{
      position: absolute;
      b{
        position: absolute;
      }
    }
  }
  .integral-bottom{
    position: relative;
  }
  .integral-bottom .integral-li:last-child{
    border: 0;
  }
  .integral-li{
    .integral-top{
      display: flex;
      align-items: center;
      justify-content: space-between;
      b{
        font-weight: normal;
      }
    }
    .integral-tip{
      text-align: center;
    }
  }
}
</style>
