<template>
    <div idm-ctrl="idm_module" :id="moduleObject.id" :idm-ctrl-id="moduleObject.id">
        <div v-if="propData.isShowTitle" class="idm-text-template-title" v-html="textFilter(propData.titleText)"></div>
        <div class="idm-text-template-content" v-html="textFilter(propData.contextText)"></div>
    </div>
</template>
<script>
import adaptationScreenMixin from '../mixins/adaptationScreen'
export default {
    name: 'ITextTemplate',
    data() {
        return {
            moduleObject: {},
            propData: this.$root.propData.compositeAttr || {},
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
        convertAttrToStyleObject() {
            const styleObject = {},
                titleObj = {},
                contentObj = {}
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
                        case 'contentBox':
                            IDM.style.setBoxStyle(contentObj, element)
                            break
                        case 'border':
                            IDM.style.setBorderStyle(styleObject, element)
                            break
                        case 'titleFont':
                            IDM.style.setFontStyle(titleObj, element)
                            this.adaptiveFontSize(titleObj, element)
                            break
                        case 'contentFont':
                            IDM.style.setFontStyle(contentObj, element)
                            this.adaptiveFontSize(contentObj, element)
                            break
                    }
                }
            }
            window.IDM.setStyleToPageHead(this.moduleObject.id, styleObject)
            window.IDM.setStyleToPageHead(this.moduleObject.id + ' .idm-text-template-title', titleObj)
            window.IDM.setStyleToPageHead(this.moduleObject.id + ' .idm-text-template-content', contentObj)
            this.initData()
        },
        reload() {
            //请求数据源
            this.initData()
        },
        initData() {
            if (this.moduleObject.env !== 'production') {
                this.componentData = {
                    memberName: '陈独秀',
                    joinYear: '2020',
                    joinMonth: '1',
                    joinDay: '1',
                    num: '3',
                    deptNameText: '梦创',
                    createYear: '2023',
                    createMonth: '1',
                    createDay: '1'
                }
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
            if (object.type != 'pageCommonInterface') {
                return
            }
            //这里使用的是子表，所以要循环匹配所有子表的属性然后再去设置修改默认值
            if (object.key == this.propData.dataName) {
                // this.propData.fontContent = this.getExpressData(this.propData.dataName,this.propData.dataFiled,object.data);
                this.$set(
                    this.propData,
                    'fontContent',
                    this.getExpressData(this.propData.dataName, this.propData.dataFiled, object.data)
                )
            }
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

<style lang="scss">
.idm-text-template-title,
.idm-text-template-content {
    * {
        font: inherit;
    }
}
</style>
