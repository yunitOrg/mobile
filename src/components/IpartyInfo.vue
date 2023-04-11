<template>
  <!--
    根目录规范(必须不能为空)：
    idm-ctrl：控件类型 drag_container：容器，drag_container_inlieblock：行内容器，idm_module：非容器的组件
    id：使用moduleObject.id，如果id不使用这个将会被idm-ctrl-id属性替换
    idm-ctrl-id：组件的id，这个必须不能为空
  -->
  <div idm-ctrl="idm_module"
    :id="moduleObject.id"
    :idm-ctrl-id="moduleObject.id">
    <div class="partyinfo-wrap">
      <div class="partyinfo-left" v-html="textFilter(propData.contextText)"></div>
      <div class="partyinfo-right" v-if="propData.isHead">
        <img :src="getImageUrl('uploadImage')" alt="">
        <span class="partyinfo-name">{{ componentData.name }}</span>
      </div>
    </div>  
  </div>
</template>

<script>
export default {
  name: 'IpartyInfo',
  data() {
    return {
      componentData: {},
      moduleObject: {},
      propData: this.$root.propData.compositeAttr || {
        isHead: true,
        auWdith: '60px',
        auHeight: '60px',
        auTop: '0',
        nameTop: '5px',
        auRight: '0',
        contextText: '<div>性别：@[sex]</div><div>民族：@[nation]</div><div>学历：@[education]</div><div>出生年月：@[year]</div><div>所在组织：@[organition]</div>'
      }
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
    getImageUrl(key) {
      if (this.componentData.head) {
        return this.componentData.head;
      } else if (this.propData[key]) {
        return IDM.url.getWebPath(this.propData[key])
      } else {
        if (this.moduleObject.codeSrc) {
          return IDM.url.getModuleAssetsWebPath(require(`../assets/default-avatar.png`), this.moduleObject);
        } else {
          return require(`../assets/default-avatar.png`)
        }
      }
    },
    textFilter (text) {
      if (!text) return '';
      text = text.replace(/\r/gi, '').replace(/\n/gi, '<br/>');
      text = text.replace(/@\[.*\]/gi, (str) => {
        if (str.length < 4) return str
        return IDM.express.replace(str, this.componentData, true)
      })
      return text
    },
    getMockData() {
      this.componentData = {
        sex: '男',
        nation: '汉',
        education: '本科',
        year: '1990-01-01',
        organition: '中粮贸易党群工作部党支部',
        name: '张三',
      }
    },
    initData () {
      if (this.moduleObject.env !== 'production') {
        this.getMockData();
        return
      }
      this.componentData = {};
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
            let head = this.propData.headField;
            let name = this.propData.nameField;
            (this.componentData || {}).head = IDM.url.getContextWebUrl(`${this.propData.imgdataSource}?fileName=${data[head]}`);
            (this.componentData || {}).name = data[name];
          }
        )
      } else {
        this.getMockData()
      }
    },
    handleStyle () {
      let styleObject = {},
        imgObject = {},
        nameObject = {};
      for (const key in this.propData) {
        if (this.propData.hasOwnProperty.call(this.propData, key)) {
          const element = this.propData[key]
          if (!element && element !== false && element != 0) {
            continue
          }
          switch (key) {
            case 'width':
              styleObject['width'] = element;
              break;
            case 'height':
              styleObject['height'] = element;
              break;
            case 'ulbox':
              IDM.style.setBoxStyle(styleObject, element)
              break
            case 'bgColor':
              styleObject['background-color'] = element && element.hex8;
              break
            case 'bglinear':
              styleObject['background-image'] = element;
              break
            case 'boxShadow':
              styleObject['box-shadow'] = element;
              break
            case 'boxborder':
              IDM.style.setBorderStyle(styleObject, element);
              break
            case 'auWdith':
              imgObject['width'] = element;
              break
            case 'auHeight':
              imgObject['height'] = element;
              break
            case 'auTop':
              imgObject['top'] = element;
              break
            case 'auRight':
              imgObject['right'] = element;
              break
            case 'nameFont':
              IDM.style.setFontStyle(nameObject, element)
              break
            case 'nameTop':
              nameObject['margin-top'] = element;
              break
          }
        }
      }
      window.IDM.setStyleToPageHead(this.moduleObject.id + " .partyinfo-wrap", styleObject);
      window.IDM.setStyleToPageHead(this.moduleObject.id + " .partyinfo-right", imgObject);
      window.IDM.setStyleToPageHead(this.moduleObject.id + " .partyinfo-name", nameObject);
    },
    init () {
      console.log(this.propData, this.moduleObject, '数据');
      this.handleStyle();
      this.initData();
    }
  }
}
</script>

<style lang="scss" scoped>
.partyinfo-wrap{
  position: relative;
  box-sizing: border-box;
  .partyinfo-right{
    position: absolute;
    text-align: center;
    img{
      width: 100%;
      height: 100%;
    }
    .partyinfo-name{
      display: inline-block;
    }
  }
}
</style>
