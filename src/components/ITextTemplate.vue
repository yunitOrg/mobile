<template>
    <div idm-ctrl="idm_module" :id="moduleObject.id" :idm-ctrl-id="moduleObject.id" class="ITextTemplate_app">
        <div v-if="propData.isShowLogo" class="logo">
            <img :src="getImageUrl('logoImgUrl')" alt="">
        </div>
        <div v-if="propData.isShowTitle" class="idm-text-template-title">
            <span v-html="textFilter(propData.titleText)"></span>
        </div>
        <div class="idm-text-template-content" v-html="textFilter(propData.contextText)"></div>
        <div v-if="propData.isShowInfo" class="info">
            <div v-if="propData.isShowInfoTitle" class="title flex_center">
                <div class="title_main flex_center">
                    <img v-if="propData.isShowInfoTitleImg" :src="getImageUrl('infoTitleImgUrl')" alt="">
                    <span class="text">{{ componentData[this.propData.dataFieldInfoTitle || 'infoTitle'] }}</span>
                </div>
            </div>
            <div class="message">
                <div v-if="propData.isShowInfoLabel" class="label flex_center">
                    <div class="line"></div>
                    <div class="text">{{ componentData[this.propData.dataFieldInfoLabel || 'infoLabel']  }}</div>
                    <div class="line"></div>
                </div>
                <div class="content">{{ componentData[this.propData.dataFieldInfoMessage || 'infoMessage'] }}</div>
            </div>
        </div>
    </div>
</template>
<script>
import adaptationScreenMixin from '../mixins/adaptationScreen'
export default {
    name: 'ITextTemplate',
    data() {
        return {
            moduleObject: {},
            propData: this.$root.propData.compositeAttr || {
                // isShowTitle: true,
                // titleText: '测试标题',
                // contextText: '<div>@[memberName]同志</div><div>@[joinYear]年@[joinMonth]月@[joinDay]日，您光荣加入了中国共产党</div><div>那一刻，是您人生道路上的新起点，是您永远难忘的“政治生日”。今年是您的第@[num]个政治生日，谨向您送上生日的问候和祝福！</div><div>希望您时刻牢记入党誓词，认真履行党员义务，铭记党的宗旨，发挥党员先锋模范作用，为共产主义事业奋斗终生。</div><div style="text-align:right">@[deptNameText]委员会组织部</div><div style="text-align:right">@[createYear]年@[createMonth]月@[createDay]日</div>',
                // isShowInfo: true,
                // isShowInfoTitle: true,
                // isShowInfoTitleImg: true,
                // isShowInfoLabel: true,
                // isShowLogo: true
            },
            componentData: {},
            currentPage: 1
        }
    },
    mixins: [adaptationScreenMixin],
    created() {
        this.moduleObject = this.$root.moduleObject
        this.convertAttrToStyleObject()
    },
    methods: {
        getImageUrl(key) {
            if ( this.propData[key] ) {
                return IDM.url.getWebPath(this.propData[key])
            } else {
                return IDM.url.getModuleAssetsWebPath(require(`../assets/${key}.png`),this.moduleObject)
            }
        },
        textFilter(text) {
            if (!text) return ''
            console.log(text, this.componentData)
            text = text.replace(/\r/gi, '').replace(/\n/gi, '<br/>')
            text = text.replace(/@\[.*\]/gi, (str) => {
                if (str.length < 4) return str
                return IDM.express.replace(str, this.componentData, true)
            })
            return text
        },
        propDataWatchHandle(propData) {
            this.propData = propData.compositeAttr || {}
            this.convertAttrToStyleObject()
        },
        convertAttrToStyleObjectLogo() {
            let styleObject= {};
            for (const key in this.propData) {
                if (this.propData.hasOwnProperty.call(this.propData, key)) {
                    const element = this.propData[key]
                    if (!element && element !== false && element != 0) {
                        continue
                    }
                    switch (key) {
                        case 'widthLogo':
                            styleObject['width'] = element;
                            break
                        case "heightLogo":
                            styleObject['height'] = element;
                            break;
                        case 'boxLogo':
                            IDM.style.setBoxStyle(styleObject,element)
                            break;
                    }
                }
            }
            window.IDM.setStyleToPageHead(this.moduleObject.id + ' .logo', styleObject)
        },
        convertAttrToStyleObjectTitle() {
            let styleObject= {};
            for (const key in this.propData) {
                if (this.propData.hasOwnProperty.call(this.propData, key)) {
                    const element = this.propData[key]
                    if (!element && element !== false && element != 0) {
                        continue
                    }
                    switch (key) {
                        case 'widthTitle':
                            styleObject['width'] = element
                            break
                        case 'heightTitle':
                            styleObject['height'] = element
                            break
                        case 'titleFont':
                            IDM.style.setFontStyle(styleObject, element)
                            this.adaptiveFontSize(styleObject, element)
                            break
                        case "boxTitle":
                            IDM.style.setBoxStyle(styleObject,element)
                            break;
                        case "borderTitle":
                            IDM.style.setBorderStyle(styleObject,element)
                            break;
                    }
                }
            }
            window.IDM.setStyleToPageHead(this.moduleObject.id + ' .idm-text-template-title span', styleObject)
        },
        convertAttrToStyleObjectContent() {
            let styleObject= {};
            for (const key in this.propData) {
                if (this.propData.hasOwnProperty.call(this.propData, key)) {
                    const element = this.propData[key]
                    if (!element && element !== false && element != 0) {
                        continue
                    }
                    switch (key) {
                        case 'contentFont':
                            IDM.style.setFontStyle(styleObject, element)
                            this.adaptiveFontSize(styleObject, element)
                            break
                        case "contentBox":
                            IDM.style.setBoxStyle(styleObject,element)
                            break;
                    }
                }
            }
            window.IDM.setStyleToPageHead(this.moduleObject.id + ' .idm-text-template-content', styleObject)
        },
        convertAttrToStyleObjectInfo() {
            let styleObject= {};
            let styleObjectTitleBox = {};
            let styleObjectTitle = {};
            let styleObjectTitleImg = {};
            let styleObjectTitleText = {};
            let styleObjectLine = {};
            let styleObjectLabel = {};
            let styleObjectMessage = {};

            for (const key in this.propData) {
                if (this.propData.hasOwnProperty.call(this.propData, key)) {
                    const element = this.propData[key]
                    if (!element && element !== false && element != 0) {
                        continue
                    }
                    switch (key) {
                        case 'widthInfo':
                            styleObject['width'] = element
                            break
                        case 'heightInfo':
                            styleObject['height'] = element
                            break
                        case "minHeightInfo":
                            styleObject['min-height'] = element
                            break;
                        case 'bgColorInfo':
                            if (element && element.hex8) {
                                styleObject['background-color'] = element.hex8
                            }
                            break
                        case 'bgImgUrlInfo':
                            styleObject['background-image'] = `url(${window.IDM.url.getWebPath(element)})`
                            break
                        case "boxInfo":
                            IDM.style.setBoxStyle(styleObject,element)
                            break;
                        

                        case 'minWidthInfoTitle':
                            styleObjectTitle['min-width'] = element
                            break
                        case 'heightInfoTitle':
                            styleObjectTitle['height'] = element
                            break
                        case 'positionYInfoTitle':
                            styleObjectTitleBox['top'] = element
                            break
                        case "boxInfoTitle":
                            IDM.style.setBoxStyle(styleObjectTitle,element)
                            break;
                        
                        case 'WidthInfoTitleImg':
                            styleObjectTitleImg['width'] = element
                            break
                        case 'heightInfoTitleImg':
                            styleObjectTitleImg['height'] = element
                            break
                        case "boxInfoTitleImg":
                            IDM.style.setBoxStyle(styleObjectTitleImg,element)
                            break;
                        case 'fontInfoTitle':
                            IDM.style.setFontStyle(styleObjectTitleText, element)
                            this.adaptiveFontSize(styleObjectTitleText, element)
                            break
                    
                        case 'colorLine':
                            if (element && element.hex8) {
                                styleObjectLine['background-color'] = element.hex8
                            }
                            break
                        case 'fontInfoLabel':
                            IDM.style.setFontStyle(styleObjectLabel,element)
                            this.adaptiveFontSize(styleObjectLabel, element)
                            break;
                        case "boxInfoLabel":
                            IDM.style.setBoxStyle(styleObjectLabel,element)
                            break;
                        case "fontInfoMessage":
                            IDM.style.setFontStyle(styleObjectMessage,element)
                            this.adaptiveFontSize(styleObjectMessage, element)
                            break;
                        case "boxInfoMessage":
                            IDM.setBoxStyle(styleObjectMessage,element)
                            break;
                        case "maxRow":
                            styleObjectMessage['-webkit-line-clamp'] = element;
                    }
                }
            }
            window.IDM.setStyleToPageHead(this.moduleObject.id + ' .info', styleObject)
            window.IDM.setStyleToPageHead(this.moduleObject.id + ' .info .title', styleObjectTitleBox)
            window.IDM.setStyleToPageHead(this.moduleObject.id + ' .info .title .title_main', styleObjectTitle)
            window.IDM.setStyleToPageHead(this.moduleObject.id + ' .info .title .title_main .text', styleObjectTitleText)
            window.IDM.setStyleToPageHead(this.moduleObject.id + ' .info .title .title_main img', styleObjectTitleImg)
            window.IDM.setStyleToPageHead(this.moduleObject.id + ' .info .message .label .line', styleObjectLine)
            window.IDM.setStyleToPageHead(this.moduleObject.id + ' .info .message .label .text', styleObjectLabel)
            window.IDM.setStyleToPageHead(this.moduleObject.id + ' .info .message .content', styleObjectMessage)
        },
        convertAttrToStyleObject() {
            this.convertAttrToStyleObjectTitle()
            this.convertAttrToStyleObjectContent()
            this.convertAttrToStyleObjectInfo()
            this.convertAttrToStyleObjectLogo()
            const styleObject = {};
            if (this.propData.bgSize && this.propData.bgSize == 'custom') {
                styleObject['background-size'] =
                    (this.propData.bgSizeWidth
                        ? this.propData.bgSizeWidth.inputVal + this.propData.bgSizeWidth.selectVal
                        : 'auto') +
                    ' ' +
                    (this.propData.bgSizeHeight
                        ? this.propData.bgSizeHeight.inputVal + this.propData.bgSizeHeight.selectVal
                        : 'auto')
            } else if (this.propData.bgSize) {
                styleObject['background-size'] = this.propData.bgSize
            }
            if (this.propData.positionX && this.propData.positionX.inputVal) {
                styleObject['background-position-x'] =
                    this.propData.positionX.inputVal + this.propData.positionX.selectVal
            }
            if (this.propData.positionY && this.propData.positionY.inputVal) {
                styleObject['background-position-y'] =
                    this.propData.positionY.inputVal + this.propData.positionY.selectVal
            }
            for (const key in this.propData) {
                if (this.propData.hasOwnProperty.call(this.propData, key)) {
                    const element = this.propData[key]
                    if (!element && element !== false && element != 0) {
                        continue
                    }
                    switch (key) {
                        case 'width':
                        case 'height':
                            styleObject[key] = element
                            break
                        case 'bgColor':
                            if (element && element.hex8) {
                                styleObject['background-color'] = element.hex8
                            }
                            break
                        case 'bgImgUrl':
                            styleObject['background-image'] = `url(${window.IDM.url.getWebPath(element)})`
                            break
                        case 'bgRepeat':
                            //平铺模式
                            styleObject['background-repeat'] = element
                            break
                        case 'bgAttachment':
                            //背景模式
                            styleObject['background-attachment'] = element
                            break
                        case 'box':
                            IDM.style.setBoxStyle(styleObject, element)
                            break
                        case 'border':
                            IDM.style.setBorderStyle(styleObject, element)
                            break
                        case 'paddingTop':
                            styleObject['padding-top'] = element + ' !important'
                            break;
                    }
                }
            }
            window.IDM.setStyleToPageHead(this.moduleObject.id, styleObject)
            this.initData()
        },
        reload() {
            //请求数据源
            this.initData()
        },
        getMockData() {
            this.componentData = {
                memberName: '陈独秀',
                joinYear: '2020',
                joinMonth: '1',
                joinDay: '1',
                num: '3',
                deptNameText: '梦创',
                createYear: '2023',
                createMonth: '1',
                createDay: '1',

                infoTitle: '党务小知识',
                infoLabel: '党龄',
                infoMessage: '指成为正式党员后的全部时间。党员的党龄，从预备期满转为正式党员之日算起。'
            }
        },
        initData() {
            if (this.moduleObject.env !== 'production') {
                this.getMockData()
                return
            }
            let params = {}
            if(this.propData.paramsFunc && this.propData.paramsFunc.length > 0) {
                const funcName = this.propData.paramsFunc[0].name
                params = window[funcName].call(this, {
                    ...this.propData.paramsFunc[0].param
                }) || {}
            }
            switch (this.propData.dataType) {
                case 'dataSource':
                    if ( this.propData.dataSource && this.propData.dataSource[0] ) {
                        IDM.datasource.request(
                            this.propData.dataSource[0]?.id,
                            {
                                moduleObject: this.moduleObject,
                                param: {
                                    ...params,
                                    ...IDM.router.getParam(this.moduleObject.routerId),
                                    limit: this.propData.limit,
                                    start: this.currentPage
                                }
                            },
                            (data) => {
                                this.componentData = data
                            }
                        )
                    } else {
                        this.getMockData()
                    }
                    break
                case 'customFunction':
                    if (this.propData.customFunction && this.propData.customFunction.length > 0) {
                        const funcName = this.propData.customFunction[0].name
                        if (window[funcName]) {
                            this.componentData = window[funcName].call(this, {
                                ...this.propData.customFunction[0].param
                            })
                        }
                    }
                    break
            }
        },
        receiveBroadcastMessage(object) {
            console.log('组件收到消息', object)
            if (object.type && object.type == 'linkageShowModule') {
                this.showThisModuleHandle()
            } else if (object.type && object.type == 'linkageHideModule') {
                this.hideThisModuleHandle()
            }
        },
        setContextValue(object) {
            console.log('统一接口设置的值', object)
        },
        sendBroadcastMessage(object) {
            window.IDM.broadcast && window.IDM.broadcast.send(object)
        },
        /**
         * 通用的url参数对象
         * 所有地址的url参数转换
         */
        commonParam() {
            let urlObject = IDM.url.queryObject()
            var params = {
                pageId:
                    window.IDM.broadcast && window.IDM.broadcast.pageModule ? window.IDM.broadcast.pageModule.id : '',
                urlData: JSON.stringify(urlObject)
            }
            return params
        }
    }
}
</script>
<style lang="scss" scoped>
.ITextTemplate_app{
    position: relative;
    .logo{
        width: 28%;
        margin: 0 auto 10px auto;
        img{
            width: 100%;
        }
    }
    .idm-text-template-title{
        text-align: center;
        span{
            display: inline-block;
        }
    }
    .info{
        position: relative;
        margin-top: 50px;
        padding: 32px 13px;
        box-sizing: border-box;
        background-image: url(../assets/info-bg.png);
        background-repeat: no-repeat;
        background-size: 100% 100%;
        .title{
            position: absolute;
            top: -20px;
            left: 0;
            right: 0;
            .title_main{
                min-width: 160px;
                height: 40px;
                padding: 0 17px;
                background: #BD1E25;
                border-radius: 12px;
                img{
                    width: 26px;
                    height: 28px;
                    margin-right: 12px;
                }
                .text{
                    font-family: FZDBSJW--GB1-0;
                    font-size: 17px;
                    color: #FFFFFF;
                    letter-spacing: 0.8px;
                }
            }
        }
        .message{
            .label{
                .line{
                    width: 20px;
                    height: 1px;
                    background: #BD1E25;
                }
                .text{
                    margin: 0 10px;
                    font-family: PingFang-SC-Bold;
                    font-size: 14px;
                    color: #BD1E25;
                    letter-spacing: 0;
                }
            }
            .content{
                margin-top: 9px;
                text-indent: 2em;
                font-family: PingFangSC-Regular;
                font-size: 12px;
                color: #333333;
                letter-spacing: 0;
                line-height: 20px;
                overflow: hidden; //超出的文本隐藏
                display: -webkit-box;
                -webkit-line-clamp: 4; // 超出多少行
                -webkit-box-orient: vertical;
            }
        }
    }
}
</style>

<style lang="scss">
.idm-text-template-title,
.idm-text-template-content {
    * {
        font: inherit;
    }
}
</style>
