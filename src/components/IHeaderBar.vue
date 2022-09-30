<template>
    <div idm-ctrl="idm_module" :id="moduleObject.id" :idm-ctrl-id="moduleObject.id">
        <div class="IHeaderBar_app flex_between">
            <div class="IHeaderBar_app_left">
                <img v-if="propData.logoImgSrc" :src="IDM.url.getWebPath(propData.logoImgSrc)" alt="">
                <img v-else :src="IDM.url.getModuleAssetsWebPath(require('../assets/cms-logo.png'),this.moduleObject)" alt="">
            </div>
            <div @click="handleRightClick" class="IHeaderBar_app_right">
                <SvgIcon icon-class="menu"></SvgIcon>
            </div>
            
        </div>
        <!-- drag container -->
        <div v-if="propData.isOpenBottomContainer" class="drag_container idm-navbar-bottom-animate" :style="bottomContainerStyle" :class="{ 'idm-navbar-bottom-fix': propData.bottomIsFixTop }" :idm-ctrl-id="moduleObject.id" idm-container-index="1" >
        </div>
    </div>
</template>
  
<script>
import adaptationScreenMixin from '../mixins/adaptationScreen'
import SvgIcon from '../icons/SvgIcon.vue';
import { menuData } from '../mock/mockDataCms.js'
import {  } from "vant";

export default {
    name: 'IHeaderBar',
    mixins: [adaptationScreenMixin],
    components: {
        SvgIcon
    },
    data() {
        return {
            moduleObject: {},
            propData: this.$root.propData.compositeAttr || {
                
            },
            bottomContainerStyle: {},
            bottomIsShow: true
        }
    },
    props: {
    },
    created() {
        this.moduleObject = this.$root.moduleObject;
        this.bottomIsShow = this.propData.defaultStatusBottomContainer;
        this.convertAttrToStyleObject();
        this.convertThemeListAttrToStyleObject()
        this.setBottomContainerIsShow();
    },
    watch: {
        
    },
    mounted() {
        
    },
    destroyed() { },
    methods: {
        handleRightClick() {
            if (this.propData.isOpenBottomContainer) {
                this.bottomIsShow = !this.bottomIsShow;
            } else {
                this.bottomIsShow = false;
            }
            this.setBottomContainerIsShow()
        },
        setBottomContainerIsShow() {
            if (this.propData.bottomIsFixTop) {
                this.bottomContainerStyle = {
                    top: this.propData.height
                }
            }
            if (!this.propData.bottomIsFixTop && this.propData.isFixTop) {
                this.bottomContainerStyle = {
                    marginTop: this.propData.height
                }
            }
            if (this.bottomIsShow) {
                setTimeout(() => {
                    this.bottomContainerStyle = {
                        ...this.bottomContainerStyle,
                        'min-height': '66px !important',
                        height: 'auto !important'
                    }
                }, 300)
            } else {
                this.bottomContainerStyle = {
                    ...this.bottomContainerStyle,
                    'min-height': '0px !important',
                    height: '0px !important'
                }
            }
            this.bottomContainerStyle = {
                ...this.bottomContainerStyle,
                'z-index': this.propData.bottomZIndex,
            }
        },
        /** * 主题颜色 */
        convertThemeListAttrToStyleObject() {
            const themeList = this.propData.themeList;
            if ( (!themeList) || !themeList.length ) {
                return
            }
            const themeNamePrefix = IDM.setting && IDM.setting.applications && IDM.setting.applications.themeNamePrefix ? IDM.setting.applications.themeNamePrefix : "idm-theme-";
            for (var i = 0; i < themeList.length; i++) {
                var item = themeList[i];
                
                if(item.key!=IDM.theme.getCurrentThemeInfo()){
                    //此处比对是不渲染输出不用的样式，如果页面会刷新就可以把此处放开
                    continue;
                }
                let fontStyleObject = {
                    "color": item.mainColor ? item.mainColor.hex8 : "",
                }
                let fontStyleObjectButton = {
                    "color": '#fff',
                }
                let borderStyleObject = {
                    'border-color': item.mainColor ? item.mainColor.hex8 : "",
                }
                let backgroundBorderObject = {
                    'color': '#fff',
                    'background-color': item.mainColor ? item.mainColor.hex8 : "",
                    'border-color': item.mainColor ? item.mainColor.hex8 : ""
                }
                let backgroundBorderObjectHover = {
                    'color': '#fff',
                    'background-color': item.minorColor ? item.minorColor.hex8 : "",
                    'border-color': item.minorColor ? item.minorColor.hex8 : "",
                }
                IDM.setStyleToPageHead( "." + themeNamePrefix + item.key + " #" + (this.moduleObject.packageid || "module_demo") + " .IHeaderBar_app_right svg)", fontStyleObject );
            }
        },
        /**
         * 提供父级组件调用的刷新prop数据组件
         */
        propDataWatchHandle(propData) {
            this.propData = propData.compositeAttr || {};
            this.convertAttrToStyleObject();
        },
        /** * 把属性转换成样式对象 */
        convertAttrToStyleObjectContent() {
            var styleObjectIcon = {};
            var styleObjectLogo = {};
            for (const key in this.propData) {
                if (this.propData.hasOwnProperty.call(this.propData, key)) {
                    const element = this.propData[key];
                    if (!element && element !== false && element != 0) {
                        continue;
                    }
                    switch (key) {
                        case 'menuIconFontSize':
                            styleObjectIcon['font-size'] = this.getAdaptiveSize(element.inputVal) + element.selectVal;
                            break;
                        case 'menuIconFontColor':
                            if (element && element.hex8) {
                                styleObjectIcon["color"] = element.hex8;
                            }
                            break;
                        case 'widthLogo':
                            styleObjectLogo['width'] = this.getAdaptiveSize(element.inputVal,'',1) + element.selectVal;
                            break;
                        case 'heightLogo':
                            styleObjectLogo['height'] = this.getAdaptiveSize(element.inputVal,'',1) + element.selectVal;
                            break;
                    }
                }
            }
            window.IDM.setStyleToPageHead(this.moduleObject.id + ' .IHeaderBar_app_left .img', styleObjectLogo);
            window.IDM.setStyleToPageHead(this.moduleObject.id + ' .IHeaderBar_app_right .svg-icon', styleObjectIcon);
        },
        convertAttrToStyleObject() {
            this.convertAttrToStyleObjectContent()
            var styleObject = {};
            if (this.propData.bgSize && this.propData.bgSize == "custom") {
                styleObject["background-size"] = (this.propData.bgSizeWidth ? this.propData.bgSizeWidth.inputVal + this.propData.bgSizeWidth.selectVal : "auto") + " " + (this.propData.bgSizeHeight ? this.propData.bgSizeHeight.inputVal + this.propData.bgSizeHeight.selectVal : "auto")
            } else if (this.propData.bgSize) {
                styleObject["background-size"] = this.propData.bgSize;
            }
            if (this.propData.positionX && this.propData.positionX.inputVal) {
                styleObject["background-position-x"] = this.propData.positionX.inputVal + this.propData.positionX.selectVal;
            }
            if (this.propData.positionY && this.propData.positionY.inputVal) {
                styleObject["background-position-y"] = this.propData.positionY.inputVal + this.propData.positionY.selectVal;
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
                                styleObject["background-color"] = element.hex8;
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
                            styleObject["background-image"] = `url(${window.IDM.url.getWebPath(element)})`;
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
                                styleObject["border-top-width"] = element.border.top.width + element.border.top.widthUnit;
                                styleObject["border-top-style"] = element.border.top.style;
                                if (element.border.top.colors.hex8) {
                                    styleObject["border-top-color"] = element.border.top.colors.hex8;
                                }
                            }
                            if (element.border.right.width > 0) {
                                styleObject["border-right-width"] = element.border.right.width + element.border.right.widthUnit;
                                styleObject["border-right-style"] = element.border.right.style;
                                if (element.border.right.colors.hex8) {
                                    styleObject["border-right-color"] = element.border.right.colors.hex8;
                                }
                            }
                            if (element.border.bottom.width > 0) {
                                styleObject["border-bottom-width"] = element.border.bottom.width + element.border.bottom.widthUnit;
                                styleObject["border-bottom-style"] = element.border.bottom.style;
                                if (element.border.bottom.colors.hex8) {
                                    styleObject["border-bottom-color"] = element.border.bottom.colors.hex8;
                                }
                            }
                            if (element.border.left.width > 0) {
                                styleObject["border-left-width"] = element.border.left.width + element.border.left.widthUnit;
                                styleObject["border-left-style"] = element.border.left.style;
                                if (element.border.left.colors.hex8) {
                                    styleObject["border-left-color"] = element.border.left.colors.hex8;
                                }
                            }

                            styleObject["border-top-left-radius"] = element.radius.leftTop.radius + element.radius.leftTop.radiusUnit;
                            styleObject["border-top-right-radius"] = element.radius.rightTop.radius + element.radius.rightTop.radiusUnit;
                            styleObject["border-bottom-left-radius"] = element.radius.leftBottom.radius + element.radius.leftBottom.radiusUnit;
                            styleObject["border-bottom-right-radius"] = element.radius.rightBottom.radius + element.radius.rightBottom.radiusUnit;
                            break;
                        case "font":
                            IDM.style.setFontStyle(styleObject, element)
                            this.adaptiveFontSize(styleObject, element)
                            break;
                        case 'boxShadow':
                            styleObject['box-shadow'] = element;
                        break;
                    }
                }
            }
            window.IDM.setStyleToPageHead(this.moduleObject.id, styleObject);
        },
        /**
         * 通用的url参数对象
         * 所有地址的url参数转换
         */
        commonParam() {
            let urlObject = IDM.url.queryObject();
            var params = {
                pageId: window.IDM.broadcast && window.IDM.broadcast.pageModule ? window.IDM.broadcast.pageModule.id : "",
                urlData: JSON.stringify(urlObject),
            };
            return params;
        },
        /**
         * 重新加载
         */
        reload() {
            //请求数据源
            this.getMenuData();
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
                _defaultVal = window.IDM.express.replace.call( this, "@[" + filedExp + "]", dataObject );
            }
            //对结果进行再次函数自定义
            if (this.propData.customFunction && this.propData.customFunction.length > 0) {
                var params = this.commonParam();
                var resValue = "";
                try {
                    resValue = window[this.propData.customFunction[0].name] && window[this.propData.customFunction[0].name].call(this, {
                        ...params,
                        ...this.propData.customFunction[0].param,
                        moduleObject: this.moduleObject,
                        expressData: _defaultVal, interfaceData: resultData
                    });
                } catch (error) {
                }
                _defaultVal = resValue;
            }

            return _defaultVal;
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
        receiveBroadcastMessage(object) {
            console.log("组件收到消息", object)
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
        /**
         * 交互功能：设置组件的上下文内容值
         * @param {
         *  type:"定义的类型，已知类型：pageCommonInterface（页面统一接口返回值）、"
         *  key:"数据key标识，页面每个接口设置的数据集名称，方便识别获取自己需要的数据"
         *  data:"数据集，内容为：字符串 or 数组 or 对象"
         * }
         */
        setContextValue(object) {
            if (object.type != "pageCommonInterface") {
                return;
            }
            //这里使用的是子表，所以要循环匹配所有子表的属性然后再去设置修改默认值
            if (object.key == this.propData.dataName) {
                // this.propData.fontContent = this.getExpressData(this.propData.dataName,this.propData.dataFiled,object.data);
                this.$set(this.propData,"fontContent",this.getExpressData(this.propData.dataName,this.propData.dataFiled,object.data));
            }
        }
    }
}
</script>
<style lang="scss">
.IHeaderBar_app{
    .IHeaderBar_app_left{
        img{
            width: 232px;
            height: 40px;
        }
    }
    
}
.idm-navbar-bottom-animate {
    overflow: hidden;
    height: 80px !important;
    transition: height 0.2s;
}
.idm-navbar-bottom-fix {
    position: fixed;
    left: 0;
    width: 100%;
}

</style>