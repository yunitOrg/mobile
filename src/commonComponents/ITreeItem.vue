<template>
    <div class="ITreeItem_app">
        <div v-for="(item,index) in tree_data" :key="index">
            <div @click="clickNode(item)" class="header flex_between">
                <div class="header_left flex_start">
                    <div v-if="propData.showIcon && item.children && item.children.length" class="icon">
                        <span v-if="item.showChildren" class="open icon_block">
                            <svg v-if="propData.openIconClass && propData.openIconClass.length" class="idm_filed_svg_icon" aria-hidden="true" >
                                <use :xlink:href="`#${propData.openIconClass[0]}`"></use>
                            </svg>
                            <SvgIcon v-else icon-class="open"></SvgIcon>
                        </span>
                        <span v-else class="close icon_block">
                            <svg v-if="propData.closeIconClass && propData.closeIconClass.length" class="idm_filed_svg_icon" aria-hidden="true" >
                                <use :xlink:href="`#${propData.closeIconClass[0]}`"></use>
                            </svg>
                            <SvgIcon v-else icon-class="close"></SvgIcon>
                        </span>
                    </div>
                    <div class="text">{{ item[propData.dataFieldTitle || 'title'] }}</div>
                </div>
                <div class="header_right">
                    <SvgIcon v-if="item.showChildren" icon-class="down-arrow"></SvgIcon>
                    <SvgIcon v-else icon-class="right-arrow55"></SvgIcon>
                </div>
            </div>
            <div v-if="item.children && item.children.length && item.showChildren" class="main">
                <ITreeItem :tree_data="item.children" :propData="propData" :moduleObject="moduleObject"></ITreeItem>
            </div>
        </div>
    </div>
</template>
<script>
import SvgIcon from '../icons/SvgIcon.vue';
import adaptationScreenMixin from '../mixins/adaptationScreen'

export default {
    name: 'ITreeItem',
    props: [ 'tree_data','propData','moduleObject' ],
    components: {
        SvgIcon
    },
    watch: {
        'propData': {
            handler(value) {
                this.convertAttrToStyleObjectItem()
            },
            deep: true
        }
    },
    mixins: [adaptationScreenMixin],
    data() {
        return {

        }
    },
    created() {
        this.convertAttrToStyleObjectItem()
    },
    methods: {
        clickNode(item) {
            if ( item.children && item.children.length ) {
                item.showChildren = !item.showChildren;
            } else {
                item.showChildren = false;
            }
            if( this.moduleObject.env=="develop" ){
                return;
            }
            let that = this;
            let urlObject = window.IDM.url.queryObject(),
            pageId = window.IDM.broadcast&&window.IDM.broadcast.pageModule?window.IDM.broadcast.pageModule.id:"";
            var clickFunction = this.propData.clickNodeFunction;
            clickFunction&&clickFunction.forEach(item1=>{
                window[item1.name]&&window[item1.name].call(this,{
                    urlData:urlObject,
                    pageId,
                    customParam:item1.param,
                    item: item,
                    _this:this
                });
            })
        },
        /** * 把属性转换成样式对象 */
        convertAttrToStyleObjectItem() {
            var styleObject = {};
            var styleObjectText = {};
            var styleObjectIconLeft = {};
            var styleObjectIconRight = {};
            var styleObjectMain = {};
            for (const key in this.propData) {
                if (this.propData.hasOwnProperty.call(this.propData, key)) {
                    const element = this.propData[key];
                    if (!element && element !== false && element != 0) {
                        continue;
                    }
                    switch (key) {
                        case "widthItem":
                            styleObject['width'] = element;
                            break;
                        case "heightItem":
                            styleObject['height'] = element;
                            break;
                        case "bgColorItem":
                            if (element && element.hex8) {
                                styleObject["background-color"] = element.hex8;
                            }
                            break;
                        case "bgImgUrlItem":
                            styleObject["background-image"] = `url(${window.IDM.url.getWebPath(element)})`;
                            break;
                        case "boxItem":
                            IDM.style.setBoxStyle(styleObject,element)
                            break;
                        case "borderItem":
                            IDM.style.setBorderStyle(styleObject,element)
                            break;
                        case "fontNode":
                            IDM.style.setFontStyle(styleObjectText,element)
                            this.adaptiveFontSize(styleObjectText,element)
                            break;
                        case "widthIconLeft":
                            styleObjectIconLeft['width'] = element;
                            break;
                        case "heightIconLeft":
                            styleObjectIconLeft['height'] = element;
                            break;
                        case "fontIconLeft":
                            IDM.style.setFontStyle(styleObjectIconLeft,element)
                            this.adaptiveFontSize(styleObjectIconLeft,element)
                            break;
                        case "boxIconLeft":
                            IDM.style.setBoxStyle(styleObjectIconLeft,element)
                            break;
                        case "widthIconRight":
                            styleObjectIconRight['width'] = element;
                            break;
                        case "fontIconRight":
                            IDM.style.setFontStyle(styleObjectIconRight,element)
                            this.adaptiveFontSize(styleObjectIconRight,element)
                            break;
                        case "boxIconRight":
                            IDM.style.setBoxStyle(styleObjectIconRight,element)
                            break;
                        case "boxMain":
                            IDM.style.setBoxStyle(styleObjectMain,element)
                            break;
                        case "indent":
                            styleObjectMain['padding-left'] = element + 'px';
                            break;
                    }
                }
            }
            window.IDM.setStyleToPageHead(this.moduleObject.id + ' .ITreeItem_app .header', styleObject);
            window.IDM.setStyleToPageHead(this.moduleObject.id + ' .ITreeItem_app .header .text', styleObjectText);
            window.IDM.setStyleToPageHead(this.moduleObject.id + ' .ITreeItem_app .header .header_left .icon .svg-icon', styleObjectIconLeft);
            window.IDM.setStyleToPageHead(this.moduleObject.id + ' .ITreeItem_app .header .header_left .icon .idm_filed_svg_icon', styleObjectIconLeft);
            window.IDM.setStyleToPageHead(this.moduleObject.id + ' .ITreeItem_app .header .header_left .icon .icon_block', styleObjectIconLeft);
            window.IDM.setStyleToPageHead(this.moduleObject.id + ' .ITreeItem_app .header .header_right .svg-icon', styleObjectIconRight);
            window.IDM.setStyleToPageHead(this.moduleObject.id + ' .ITreeItem_app .main', styleObjectMain);
        },
    }
}
</script>
<style lang="scss" scoped>
.ITreeItem_app{
    height: 100%;
    .main{
        padding-left: 20px;
    }
    .header{
        height: 50px;
        border-bottom: 1px solid rgba(229,229,229,1);
        .icon{
            display: inline-block;
            margin-right: 5px;
            .svg-icon{
                font-size: 20px;
            }
            .idm_filed_svg_icon{
                width: 20px;
                height: 20px;
                fill: currentColor;
            }
            .icon_block{
                display: inline-block;
                width: 20px;
                height: 20px;
            }
        }
        .header_right{
            .svg-icon{
                // color: red;
            }
        }
    }
}
</style>