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
        <div class="progress-li" v-for="(item, index) in list" :key="index">
        {{ item.name }}
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
        leftIconBox: {
          marginTopVal: "",
          marginRightVal: "",
          marginBottomVal: "10px",
          marginLeftVal: "",
          paddingTopVal: "5px",
          paddingRightVal: "",
          paddingBottomVal: "5px",
          paddingLeftVal: ""
        },
        itemBox: {
          marginTopVal: "",
          marginRightVal: "",
          marginBottomVal: "10px",
          marginLeftVal: "",
          paddingTopVal: "10px",
          paddingRightVal: "20px",
          paddingBottomVal: "10px",
          paddingLeftVal: "20px"
        },
        isTitleShow: true,
        title: '发展过程',
        bgColor: {
          hex8: '#cccccc'
        },
        itemBgcolor: {
          hex8: '#ffffff'
        }
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
        },
        {
          name: '入党积极份子的确定和培养'
        },
        {
          name: '发展对象的确定和考察',
        },
        {
          name: '预备党员接收'
        },
        {
          name: '预备党员的教育考察和转正',
        }
      ]
    },
    initData() {
      if (this.moduleObject.env !== 'production') {
        this.getMockData();
        return
      }
    },
    handleStyle() {
      let styleObject = {},
        titleStyle = {},
        itemObject = {},
        titlebox = {},
        contentStyle = {},
        arcStyle = {},
        tipsStyle = {},
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
            case 'leftIconBox':
              IDM.style.setBoxStyle(titlebox, element);
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
          }
        }
      }
      window.IDM.setStyleToPageHead(this.moduleObject.id + " .progress-wrap", styleObject);
      window.IDM.setStyleToPageHead(this.moduleObject.id + " .progress-wrap .progress-title", titlebox);
      window.IDM.setStyleToPageHead(this.moduleObject.id + " .progress-wrap .info-icon", tipsStyleObj);
      window.IDM.setStyleToPageHead(this.moduleObject.id + " .progress-wrap .pro-title", titleStyle);
      window.IDM.setStyleToPageHead(this.moduleObject.id + " .progress-wrap .progress-li", itemObject);
    },
    init() {
      console.log(this.propData, '数据');
      this.handleStyle();
      this.initData();
    }
  }
}
</script>
