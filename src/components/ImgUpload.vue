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
  <div class="idm_imgupload">
    <span class="idm_upload_font" v-if="propData.showImg">上传附件（最多{{propData.uploadNumber}}个）</span>
    <van-uploader
    v-model="fileList"
    multiple
    :disabled="propData.disabledImg"
    :accept="propData.uploadfile"
    :max-count="propData.uploadNumber"
    :after-read="afterRead"
    :max-size="isOverSize"
    @oversize="onOversize"
    :before-read="beforeRead"
    />
  </div>
  </div>
</template>

<script>
import {Toast} from "vant";
export default {
  data () {
    return {
      fileList: [],
      moduleObject:{},
      propData:this.$root.propData.compositeAttr || {
        uploadNumber: 3,
        showImg: true,
        overSize: {
          inputVal: 2,
          selectVal: "M"
        },
        itemFontStyle: {
          fontColors: {
              hex: "#666"
          },
          fontSize: 14,
          fontSizeUnit: "px"
        },
        itemFontMargin: {
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
    this.moduleObject = this.$root.moduleObject
    this.init()
  },
  methods: {
    propDataWatchHandle (propData) {
      this.propData = propData.compositeAttr||{};
      this.init();
    },
    init () {
      console.log(this.propData, '数据源')
      this.convertTitleStyleObject();
      this.convertBoxStyleObject();
    },
    convertTitleStyleObject () {
      let styleObject = {};
      if (this.propData.itemFontStyle) {
        let item = this.propData.itemFontStyle || {};
        if (item.fontColors) {
          styleObject["color"] = item.fontColors.hex;
        }
        if (item.fontDecoration) {
          styleObject["text-decoration"] = item.fontDecoration;
        }
        if (item.fontFamily) {
          styleObject['font-family'] = item.fontFamily;
        }
        if (item.fontLetterSpacing) {
          styleObject["word-spacing"] = item.fontLetterSpacing + item.fontLetterSpacingUnit;
        }
        if (item.fontLineHeight) {
          styleObject['line-height'] = item.fontLineHeight + (item.fontLineHeightUnit == "-" ? "" : item.fontLineHeightUnit);
        }
        if (item.fontSize) {
          styleObject['font-size'] = item.fontSize + item.fontSizeUnit
        }
        if (item.fontStyle) {
          styleObject['font-style'] = item.fontStyle
        }
        if (item.fontTextAlign) {
          styleObject['text-align'] = item.fontTextAlign
        }
        if (item.fontWeight) {
          styleObject['font-weight'] = item.fontWeight.split(" ")[0]
        }
      }
      if (this.propData.itemFontMargin) {
        let ulbox = this.propData.itemFontMargin || {};
        if (ulbox.marginTopVal) {
          styleObject["margin-top"] = `${ulbox.marginTopVal}`;
        }
        if (ulbox.marginRightVal) {
          styleObject["margin-right"] = `${ulbox.marginRightVal}`;
        }
        if (ulbox.marginBottomVal) {
          styleObject["margin-bottom"] = `${ulbox.marginBottomVal}`;
        }
        if (ulbox.marginLeftVal) {
          styleObject["margin-left"] = `${ulbox.marginLeftVal}`;
        }
        if (ulbox.paddingTopVal) {
          styleObject["padding-top"] = `${ulbox.paddingTopVal}`;
        }
        if (ulbox.paddingRightVal) {
          styleObject["padding-right"] = `${ulbox.paddingRightVal}`;
        }
        if (ulbox.paddingBottomVal) {
          styleObject["padding-bottom"] = `${ulbox.paddingBottomVal}`;
        }
        if (ulbox.paddingLeftVal) {
          styleObject["padding-left"] = `${ulbox.paddingLeftVal}`;
        }
      }
      window.IDM.setStyleToPageHead(this.moduleObject.id + " .idm_upload_font", styleObject);
    },
    convertBoxStyleObject () {
      let styleObject = {};
      if (this.propData.ulbox) {
        let ulbox = this.propData.ulbox || {};
        if (ulbox.marginTopVal) {
          styleObject["margin-top"] = `${ulbox.marginTopVal}`;
        }
        if (ulbox.marginRightVal) {
          styleObject["margin-right"] = `${ulbox.marginRightVal}`;
        }
        if (ulbox.marginBottomVal) {
          styleObject["margin-bottom"] = `${ulbox.marginBottomVal}`;
        }
        if (ulbox.marginLeftVal) {
          styleObject["margin-left"] = `${ulbox.marginLeftVal}`;
        }
        if (ulbox.paddingTopVal) {
          styleObject["padding-top"] = `${ulbox.paddingTopVal}`;
        }
        if (ulbox.paddingRightVal) {
          styleObject["padding-right"] = `${ulbox.paddingRightVal}`;
        }
        if (ulbox.paddingBottomVal) {
          styleObject["padding-bottom"] = `${ulbox.paddingBottomVal}`;
        }
        if (ulbox.paddingLeftVal) {
          styleObject["padding-left"] = `${ulbox.paddingLeftVal}`;
        }
      }
      if (this.propData.boxWidth) {
        styleObject['width'] = this.propData.boxWidth
      }
      if (this.propData.boxHeight) {
        styleObject['height'] = this.propData.boxHeight
      }
      window.IDM.setStyleToPageHead(this.moduleObject.id + " .idm_imgupload", styleObject);
    },
    isOverSize (file) {
      console.log(file, '限制')
    },
    onOversize (file) {
      console.log(file, 'file')
      let overSize = this.propData.overSize || {};
      Toast(`文件大小不能超过 ${overSize.inputVal}${overSize.selectVal}`);
    },
    afterRead (file) {
      console.log(file)
    },
    /** 
     * 上传前
    */
    beforeRead (file) {
      if (this.propData.uploadfile) {
        console.log(this.propData.uploadfile.split(','))
        console.log(file, '上传数据')
        if (!this.propData.uploadfile.split(',').includes(file.name.split('.').slice(-1))) {
          Toast('请上传 正确格式');
          return false;
        }
      } else {
        return true
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.idm_imgupload{
  display: flex;
  flex-direction: column;
}
</style>
