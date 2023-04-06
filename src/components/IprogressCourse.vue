<template>
  <!--
    根目录规范(必须不能为空)：
    idm-ctrl：控件类型 drag_container：容器，drag_container_inlieblock：行内容器，idm_module：非容器的组件
    id：使用moduleObject.id，如果id不使用这个将会被idm-ctrl-id属性替换
    idm-ctrl-id：组件的id，这个必须不能为空
  -->
  <div idm-ctrl="idm_module" :id="moduleObject.id" :idm-ctrl-id="moduleObject.id">
    <div class="progress-wrap">
      <div class="progress-title" v-if="propData.isTitleShow">
        <svg v-if="propData.titleIcon && propData.titleIcon.length"
          class="info-icon" aria-hidden="true">
          <use :xlink:href="`#${propData.titleIcon[0]}`"></use>
        </svg>
        <svg-icon v-else icon-class="shu" className="info-icon">
        </svg-icon>
        <span class="pro-title">{{ propData.title }}</span>
      </div>
      <div class="progress-ul">
        <div class="progress-li" v-for="(item, index) in list" :key="index" @click="changeOpen(item)">
          <div class="progress-line">
            <div>
              <span class="progress-numspan">{{index+1}}</span>
              <span class="progress-ti">{{ item.name }}</span>
            </div>
            <div class="progressli-right" :class="item.open ? 'arrow-down' : 'arrow-right'">
              <svg-icon icon-class="arrowRight2" className="progress-icon" ></svg-icon>
            </div>
          </div>
          <div class="progress-sublibox" :style="item.open ? 'display:block' : 'display:none'">
            <div class="progress-subli" v-for="(subitem, subindex) in item.children" :key="subindex">
              <div>
                <span class="subli-bg">0{{subindex+1}}</span>
                <span class="subli-font">{{subitem.name}}</span>
              </div>
              <span v-if="componentData[subitem.type] == '1'" class="progress-dui"></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'IprogressCourse',
  data() {
    return {
      componentData: {},
      moduleObject: {},
      propData: this.$root.propData.compositeAttr || {
        ulbox: {
          marginTopVal: "",
          marginRightVal: "",
          marginBottomVal: "",
          marginLeftVal: "",
          paddingTopVal: "10px",
          paddingRightVal: "10px",
          paddingBottomVal: "10px",
          paddingLeftVal: "10px"
        },
        itemBox: {
          marginTopVal: "",
          marginRightVal: "",
          marginBottomVal: "10px",
          marginLeftVal: "",
          paddingTopVal: "10px",
          paddingRightVal: "10px",
          paddingBottomVal: "10px",
          paddingLeftVal: "10px"
        },
        subitemBox: {
          marginTopVal: "",
          marginRightVal: "",
          marginBottomVal: "",
          marginLeftVal: "",
          paddingTopVal: "10px",
          paddingRightVal: "",
          paddingBottomVal: "",
          paddingLeftVal: "30px"
        },
        isTitleShow: true,
        title: '发展过程',
        bgColor: {
          hex8: '#cccccc'
        },
        itemBgcolor: {
          hex8: '#ffffff'
        },
        numWidth: '30px',
        numHeight: '30px',
        numBgColor: {
          hex8: '#ff0000FF'
        },
        childrenColor: {
          hex8: '#FFF3E8FF'
        },
        numRight: '10px',
        childrenBox: {
          marginTopVal: "",
          marginRightVal: "",
          marginBottomVal: "10px",
          marginLeftVal: "",
          paddingTopVal: "5px",
          paddingRightVal: "",
          paddingBottomVal: "5px",
          paddingLeftVal: ""
        },
        subiconright: '10px',
        subiconwidth: '30px',
        subiconheight: '22.5px',
        checkWidth: '20px',
        checkHeight: '14px'
      },
      list: []
    }
  },
  mounted() {
    this.moduleObject = this.$root.moduleObject;
    this.init()
  },
  methods: {
    propDataWatchHandle(propData) {
      this.propData = propData.compositeAttr || {};
      this.init();
    },
    getMockData () {
      this.list = [
        {
          name: '申请入党',
          children: [
            {
              name: '基本信息',
              type: 'essentialInformationStatus'
            },
            {
              name: '递交入党申请书',
              type: 'applicationStatus'
            },
            {
              name: '党组织谈话情况',
              type: 'conversationInformationStatus'
            }
          ]
        },
        {
          name: '入党积极份子的确定和培养',
          children: [
            {
              name: '确定积极分子',
              type: 'activistStatus'
            },
            {
              name: '向上级党委备案',
              type: 'superiorFilingStatusOne'
            },
            {
              name: '培养考察情况(4-4)',
              type: 'appointStatus'
            },
            {
              name: '提交思想汇报(4-4)',
              type: 'thoughtStatus'
            }
          ]
        },
        {
          name: '发展对象的确定和考察',
          children: [
            {
              name: '上级党委指标申请',
              type: 'superiorFilingStatusTwo'
            },
            {
              name: '支委会研究情况',
              type: 'branchMeetingStatus'
            },
            {
              name: '政审报告',
              type: 'politicsStatus'
            },
            {
              name: '培训情况',
              type: 'trainStatus'
            },
            {
              name: '公示情况',
              type: 'publicityStatus'
            },
          ]
        },
        {
          name: '预备党员接收',
          children: [
            {
              name: '支委会审查',
              type: 'branchVerificationStatus'
            },
            {
              name: '上级党委预审并发放入党志愿书',
              type: 'voluntaryLetterStatus'
            },
            {
              name: '召开支部大会讨论',
              type: 'anAssemblyStatus'
            },
            {
              name: '上级党委谈话',
              type: 'superiorConversationStatus'
            },
            {
              name: '上级党委审批',
              type: 'partyConfirmationStatusTwo'
            },
            {
              name: '党费核定',
              type: 'organizationFilingStatus'
            }
          ]
        },
        {
          name: '预备党员的教育考察和转正',
          children: [
            {
              name: '提交思想汇报(4-4)',
              type: 'thoughtStatus2'
            },
            {
              name: '教育考察内容(4-4)',
              type: 'educationStatus'
            },
            {
              name: '转正申请',
              type: 'becomeStatus'
            },
            {
              name: '支部委员会研究',
              type: 'branchCommitteeStudyStatus'
            },
            {
              name: '召开支部大会讨论',
              type: 'meetingSubmitStatus'
            },
            {
              name: '上级党委审批',
              type: 'partyConfirmationStatusThree'
            },
            {
              name: '材料归档',
              type: 'fileStatus'
            }
          ]
        }
      ]
    },
    changeOpen (row) {
      let ary = this.list.filter(item => item.name != row.name);
      ary.forEach(item => item.open = false);
      row.open = !row.open;
    },
    initData() {
      if (this.moduleObject.env !== 'production') {
        this.getMockData();
        this.list.forEach(item => this.$set(item, 'open', false));
        return
      }
      let params = {}
      if (this.propData.paramsFunc && this.propData.paramsFunc.length > 0) {
        const funcName = this.propData.paramsFunc[0].name
        params = window[funcName].call(this, {
          params: this.propData.paramsFunc[0].param,
          router: IDM.router.getParam(this.moduleObject.routerId)
        }) || {}
      }
      if (this.propData.dataSource && this.propData.dataSource[0]) {
        IDM.datasource.request(
          this.propData.dataSource[0]?.id,
          {
            moduleObject: this.moduleObject,
            param: {
              ...params,
              ...IDM.router.getParam(this.moduleObject.routerId),
            }
          },
          (data) => {
            this.componentData = data;
            this.list = this.propData.pageField;
            this.list.forEach(item => this.$set(item, 'open', false));
          }
        )
      } else {
        this.getMockData()
      }
    },
    handleStyle() {
      let styleObject = {},
        titleStyle = {},
        itemObject = {},
        titlebox = {},
        numspanObject = {},
        itemTitleObject = {},
        arrowIconObject = {},
        subitemObject = {},
        subBox = {},
        subitemiconObject = {},
        subitemfont = {},
        checkObject = {},
        tipsStyleObj = {};
      for (const key in this.propData) {
        if (this.propData.hasOwnProperty.call(this.propData, key)) {
          const element = this.propData[key]
          if (!element && element !== false && element != 0) {
            continue
          }
          switch (key) {
            case 'width':
              styleObject['width'] = element;
              break
            case 'height':
              styleObject['height'] = element;
              break
            case 'ulbox':
              IDM.style.setBoxStyle(styleObject, element)
              break
            case 'bgColor':
              styleObject['background-color'] = element && element.hex8;
              break
            case 'boxShadow':
              styleObject['box-shadow'] = element;
              break
            case 'boxborder':
              IDM.style.setBorderStyle(styleObject, element);
              break
            case 'titleIconFontColor':
              tipsStyleObj['color'] = element.hex;
              tipsStyleObj["fill"] = element.hex;
              break
            case 'titleIconFontSize':
              tipsStyleObj['font-size'] = element + 'px';
              tipsStyleObj['width'] = element + 'px';
              tipsStyleObj['height'] = element + 'px';
              break
            case 'titleBox':
              IDM.style.setBoxStyle(titlebox, element);
              break
            case 'leftIconBox':
              IDM.style.setBoxStyle(tipsStyleObj, element);
              break
            case 'titleFont':
              IDM.style.setFontStyle(titleStyle, element)
              break
            case 'itemWidth':
              itemObject['width'] = element;
              break
            case 'itemHeight':
              itemObject['height'] = element;
              break
            case 'itemBox':
              IDM.style.setBoxStyle(itemObject, element)
              break
            case 'itemBgcolor':
              itemObject['background-color'] = element && element.hex8;
              break
            case 'itemboxShadow':
              itemObject['box-shadow'] = element;
              break
            case 'itemboxborder':
              IDM.style.setBorderStyle(itemObject, element);
              break
            case 'numWidth':
              numspanObject['width'] = element;
              break
            case 'numHeight':
              numspanObject['height'] = element;
              numspanObject['line-height'] = element;
              break
            case 'numBgColor':
              numspanObject['background-color'] = element && element.hex8;
              break
            case 'numFont':
              IDM.style.setFontStyle(numspanObject, element)
              break
            case 'numRight':
              numspanObject['margin-right'] = element;
              break
            case 'itemNameTitle':
              IDM.style.setFontStyle(itemTitleObject, element)
              break
            case 'arrowIconColor':
              arrowIconObject['color'] = element.hex;
              arrowIconObject["fill"] = element.hex;
              break
            case 'arrowIconSize':
              arrowIconObject['font-size'] = element + 'px';
              arrowIconObject['width'] = element + 'px';
              arrowIconObject['height'] = element + 'px';
              break
            case 'childrenBox':
              IDM.style.setBoxStyle(subitemObject, element);
              break
            case 'childrenColor':
              subitemObject['background-color'] = element && element.hex8;
              break
            case 'subitemBox':
              IDM.style.setBoxStyle(subBox, element);
              break
            case 'subiconwidth':
              subitemiconObject['width'] = element;
              break
            case 'subiconheight':
              subitemiconObject['height'] = element;
              break
            case 'subiconFont':
              IDM.style.setFontStyle(subitemiconObject, element)
              break
            case 'subiconright':
              subitemiconObject['margin-right'] = element;
              break
            case 'subFont':
              IDM.style.setFontStyle(subitemfont, element)
              break
            case 'checkWidth':
              checkObject['width'] = element;
              break
            case 'checkHeight':
              checkObject['height'] = element;
              break
          }
        }
      }
      window.IDM.setStyleToPageHead(this.moduleObject.id + " .progress-wrap", styleObject);
      window.IDM.setStyleToPageHead(this.moduleObject.id + " .progress-wrap .info-icon", tipsStyleObj);
      window.IDM.setStyleToPageHead(this.moduleObject.id + " .progress-wrap .progress-title", titlebox);
      window.IDM.setStyleToPageHead(this.moduleObject.id + " .progress-wrap .pro-title", titleStyle);
      window.IDM.setStyleToPageHead(this.moduleObject.id + " .progress-wrap .progress-li", itemObject);
      window.IDM.setStyleToPageHead(this.moduleObject.id + " .progress-wrap .progress-li .progress-numspan", numspanObject);
      window.IDM.setStyleToPageHead(this.moduleObject.id + " .progress-wrap .progress-li .progress-ti", itemTitleObject);
      window.IDM.setStyleToPageHead(this.moduleObject.id + " .progress-wrap .progress-li .progress-icon", arrowIconObject);
      window.IDM.setStyleToPageHead(this.moduleObject.id + " .progress-wrap .progress-li .progress-subli", subitemObject);
      window.IDM.setStyleToPageHead(this.moduleObject.id + " .progress-wrap .progress-li .progress-sublibox", subBox);
      window.IDM.setStyleToPageHead(this.moduleObject.id + " .progress-wrap .progress-li .subli-bg", subitemiconObject);
      window.IDM.setStyleToPageHead(this.moduleObject.id + " .progress-wrap .progress-li .subli-font", subitemfont);
      window.IDM.setStyleToPageHead(this.moduleObject.id + " .progress-wrap .progress-li .progress-dui", checkObject);
    },
    init() {
      console.log(this.propData, '数据');
      this.handleStyle();
      this.initData();
    }
  }
}
</script>

<style lang="scss" scoped>
.progress-wrap{
  .progress-line{
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .progress-numspan{
      display: inline-block;
      box-sizing: border-box;
      border-radius: 50%;
    }
  }
  .arrow-down{
    transform: rotate(88deg);
  }
  .arrow-right{
    transform: rotate(0deg);
  }
  .progress-subli{
    display: flex;
    align-items: center;
    justify-content: space-between;
    .subli-bg{
      display: inline-block;
      background: url('../assets/num-bg.png') no-repeat;
      background-size: 100% 100%;
    }
    .subli-font{
      flex: 1;
    }
    .progress-dui{
      background: url('../assets/complate.png') no-repeat;
      background-size: 100% 100%;
    }
  }
}
</style>
