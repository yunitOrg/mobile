<template>
    <div idm-ctrl="idm_module" :id="moduleObject.id" :idm-ctrl-id="moduleObject.id">
        <div class="IMenuSearch_app">
            <div class="IMenuSearch_app_menu">
                <van-grid :column-num="propData.columnNumber" :gutter="propData.gutter">
                    <van-grid-item @click="clickGrid(item)" v-for="(item,index) in menu_list" :key="index" :text="propData.useShortName ? item[propData.dataFiledShortTitle ? propData.dataFiledShortTitle : 'shortTitle'] : item[ propData.dataFiledTitle ? propData.dataFiledTitle : 'title' ]" />
                </van-grid>
            </div>
            <div v-if="propData.showSearch" class="IMenuSearch_app_search">
                <van-search v-model="value" @search="search" :shape="propData.shape" :placeholder="propData.placeholder" >
                    <template #left-icon>
                        <svg class="idm_button_svg_icon" v-if="propData.searchLeftIcon && propData.searchLeftIcon.length > 0" aria-hidden="true" > 
                            <use :xlink:href="`#${propData.searchLeftIcon[0]}`"></use>
                        </svg >
                        <SvgIcon v-else icon-class="search"></SvgIcon>
                    </template>
                </van-search>
            </div>
        </div>
    </div>
</template>
  
<script>
import adaptationScreenMixin from '../mixins/adaptationScreen'
import SvgIcon from '../icons/SvgIcon.vue';
import { menuData } from '../mock/mockDataCms.js'
import { Cascader, Grid,GridItem,Search } from "vant";

export default {
    name: 'IMenuSearch',
    mixins: [adaptationScreenMixin],
    components: {
        [Grid.name]: Grid,
        [GridItem.name]: GridItem,
        SvgIcon
    },
    data() {
        return {
            moduleObject: {},
            propData: this.$root.propData.compositeAttr || {
                columnNumber: 4,
                gutter: 10,
                showSearch: true,
                placeholder: '请输入关键词进行搜索',
                background: {
                    hex: '#666666'
                }
            },
            menu_list: [],
        }
    },
    props: {
    },
    created() {
        this.moduleObject = this.$root.moduleObject
        this.convertAttrToStyleObject();
        this.getMenuData()
    },
    watch: {
        'propData.selectColumn': {
            handler(value) {
                this.getMenuData()
            },
            deep: true,
            immediate: true
        },
        'propData.limit': {
            handler(value) {
                this.getMenuData()
            },
            immediate: true
        }
    },
    mounted() {
        
    },
    destroyed() { },
    methods: {
        getMenuData() {
            if ( (!this.propData.customInterfaceUrl) || !this.propData.selectColumn ) {
                let menu_list = [];
                if ( this.propData.limit ) {
                    for( let i = 0,maxi = menuData.length;i < maxi;i++ ) {
                        if ( i < parseInt(this.propData.limit) ) {
                            menu_list.push(menuData[i])
                        }
                    }
                    this.menu_list = menu_list;
                } else {
                    this.menu_list = JSON.parse(JSON.stringify(menuData));
                }
                return
            }
            IDM.http.get(this.propData.customInterfaceUrl,{
                columnId: this.propData.selectColumn ? this.propData.selectColumn.id : '0',
                limit: this.propData.limit || ''
            }).then((res) => {
                if (res && res.data && res.data.code == '200' && res.data.data ) {
                    let result = this.propData.dataFiled ? this.getExpressData('resultData',this.propData.dataFiled,res.data.data) : res.data.data.rows;
                    this.menu_list = result || [];
                }
            })
        },
        search(e) {
            console.log(e)
        },
        clickGrid(item) {
            console.log(item);
            let url = item[this.propData.dataFiledShortJumpUrl ? this.propData.dataFiledShortJumpUrl : 'jumpUrl'];
            if ( (!url) || this.moduleObject.env == 'develop' ) {
                return
            }
            switch(this.propData.jumpStyle){
                case "_child":
                    IDM.router.push(this.moduleObject.pageid,item.childPage,{
                        keep:this.propData.isKeepCash,
                        params:{
                            columnId: item.id,
                            ...item
                        },
                        enterAnim:"",
                        quitAnim:""
                    });
                    break;
                case "_custom_link":
                    let url = IDM.express.replace(this.propData.moreJumpUrl,item)
                    window.location.href = IDM.url.getWebPath(url)
                    break;
                case "_custom_func":
                    if (this.propData.jumpCustomFunc && this.propData.jumpCustomFunc.length > 0) {
                        const funcName = this.propData.jumpCustomFunc[0].name
                        window[funcName] && window[funcName].call(this,{
                            moduleObject:this.moduleObject,
                            item: item,
                            _this: this
                        })
                    }
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
        convertAttrToStyleObjectMenu() {
            var styleObject = {};
            var styleObjectFont = {};
            for (const key in this.propData) {
                if (this.propData.hasOwnProperty.call(this.propData, key)) {
                    const element = this.propData[key];
                    if (!element && element !== false && element != 0) {
                        continue;
                    }
                    switch (key) {
                        case 'fontMenu':
                            IDM.style.setFontStyle(styleObjectFont, element)
                            this.adaptiveFontSize(styleObjectFont, element)
                            break;
                        case "boxMenu":
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
                        case "borderMenu":
                            if (element.border.top.width > 0) {
                                styleObject["border-top-width"] = element.border.top.width + element.border.top.widthUnit;
                                styleObject["border-top-style"] = element.border.top.style;
                                if (element.border.top.colors.hex8) {
                                    styleObject["border-top-color"] = IDM.hex8ToRgbaString(element.border.top.colors.hex8);
                                }
                            }
                            if (element.border.right.width > 0) {
                                styleObject["border-right-width"] = element.border.right.width + element.border.right.widthUnit;
                                styleObject["border-right-style"] = element.border.right.style;
                                if (element.border.right.colors.hex8) {
                                    styleObject["border-right-color"] = IDM.hex8ToRgbaString(element.border.right.colors.hex8);
                                }
                            }
                            if (element.border.bottom.width > 0) {
                                styleObject["border-bottom-width"] = element.border.bottom.width + element.border.bottom.widthUnit;
                                styleObject["border-bottom-style"] = element.border.bottom.style;
                                if (element.border.bottom.colors.hex8) {
                                    styleObject["border-bottom-color"] = IDM.hex8ToRgbaString(element.border.bottom.colors.hex8);
                                }
                            }
                            if (element.border.left.width > 0) {
                                styleObject["border-left-width"] = element.border.left.width + element.border.left.widthUnit;
                                styleObject["border-left-style"] = element.border.left.style;
                                if (element.border.left.colors.hex8) {
                                    styleObject["border-left-color"] = IDM.hex8ToRgbaString(element.border.left.colors.hex8);
                                }
                            }
                            styleObject["border-top-left-radius"] = element.radius.leftTop.radius + element.radius.leftTop.radiusUnit;
                            styleObject["border-top-right-radius"] = element.radius.rightTop.radius + element.radius.rightTop.radiusUnit;
                            styleObject["border-bottom-left-radius"] = element.radius.leftBottom.radius + element.radius.leftBottom.radiusUnit;
                            styleObject["border-bottom-right-radius"] = element.radius.rightBottom.radius + element.radius.rightBottom.radiusUnit;
                            break;
                    }
                }
            }
            window.IDM.setStyleToPageHead(this.moduleObject.id + ' .IMenuSearch_app_menu', styleObject);
            window.IDM.setStyleToPageHead(this.moduleObject.id + ' .IMenuSearch_app_menu .van-grid-item__text', styleObjectFont);
        },
        convertAttrToStyleObjectSearch() {
            var styleObject = {};
            var styleObjectFont = {};
            var styleObjectBg = {};
            var styleObjectIcon = {};
            for (const key in this.propData) {
                if (this.propData.hasOwnProperty.call(this.propData, key)) {
                    const element = this.propData[key];
                    if (!element && element !== false && element != 0) {
                        continue;
                    }
                    switch (key) {
                        case 'bgColorSearch':
                            if (element && element.hex8) {
                                styleObjectBg["background-color"] = IDM.hex8ToRgbaString(element.hex8);
                            }
                            break;
                        case 'fontSearch':
                            IDM.style.setFontStyle(styleObjectFont, element)
                            this.adaptiveFontSize(styleObjectFont, element)
                            break;
                        case "boxSearch":
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
                        case 'fontSizeIcon':
                            styleObjectIcon['font-size'] = element;
                            break
                        case 'fontColorIcon':
                            if (element && element.hex8) {
                                styleObjectIcon["color"] = IDM.hex8ToRgbaString(element.hex8);
                            }
                            break
                    }
                }
            }
            window.IDM.setStyleToPageHead(this.moduleObject.id + ' .IMenuSearch_app_search', styleObject);
            window.IDM.setStyleToPageHead(this.moduleObject.id + ' .IMenuSearch_app_search .van-grid-item__text', styleObjectFont);
            window.IDM.setStyleToPageHead(this.moduleObject.id + ' .IMenuSearch_app_search .van-search__content', styleObjectBg);
            window.IDM.setStyleToPageHead(this.moduleObject.id + ' .IMenuSearch_app_search .svg-icon', styleObjectIcon);
        },
        convertAttrToStyleObject() {
            this.convertAttrToStyleObjectMenu()
            this.convertAttrToStyleObjectSearch()
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
                                styleObject["background-color"] = IDM.hex8ToRgbaString(element.hex8);
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
                                    styleObject["border-top-color"] = IDM.hex8ToRgbaString(element.border.top.colors.hex8);
                                }
                            }
                            if (element.border.right.width > 0) {
                                styleObject["border-right-width"] = element.border.right.width + element.border.right.widthUnit;
                                styleObject["border-right-style"] = element.border.right.style;
                                if (element.border.right.colors.hex8) {
                                    styleObject["border-right-color"] = IDM.hex8ToRgbaString(element.border.right.colors.hex8);
                                }
                            }
                            if (element.border.bottom.width > 0) {
                                styleObject["border-bottom-width"] = element.border.bottom.width + element.border.bottom.widthUnit;
                                styleObject["border-bottom-style"] = element.border.bottom.style;
                                if (element.border.bottom.colors.hex8) {
                                    styleObject["border-bottom-color"] = IDM.hex8ToRgbaString(element.border.bottom.colors.hex8);
                                }
                            }
                            if (element.border.left.width > 0) {
                                styleObject["border-left-width"] = element.border.left.width + element.border.left.widthUnit;
                                styleObject["border-left-style"] = element.border.left.style;
                                if (element.border.left.colors.hex8) {
                                    styleObject["border-left-color"] = IDM.hex8ToRgbaString(element.border.left.colors.hex8);
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
.IMenuSearch_app{
    // background: white;
    .IMenuSearch_app_menu{
        padding: 15px 0;
        border-bottom: 1px solid  rgba(234,234,234,1);
        .van-grid-item__content{
            padding: 0;
            background-color: none;
        }
    }
    .IMenuSearch_app_search{
        .svg-icon{
            color: #999;
        }
    }
}
</style>