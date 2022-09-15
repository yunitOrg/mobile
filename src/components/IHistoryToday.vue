<template>
    <div
        idm-ctrl="idm_module"
        :id="moduleObject.id"
        :idm-ctrl-id="moduleObject.id"
        class="idm-history-day d-flex just-b align-c position-r"
    >
        <!-- 左侧内容 -->
        <div class="idm-history-day-left">
            <div class="idm-history-day-title">{{ propData.title }}</div>
            <div class="d-flex just-b align-c idm-history-day-bottom">
                <div class="d-flex align-c">
                    <svg
                        v-if="propData.leftIcon && propData.leftIcon.length"
                        class="idm-history-day-left-icon"
                        aria-hidden="true"
                    >
                        <use :xlink:href="`#${propData.leftIcon[0]}`"></use>
                    </svg>
                    <svg-icon v-else icon-class="rili" className="idm-history-day-left-icon"></svg-icon>
                </div>
                <div class="idm-history-day-date">{{ getDataField(propData.dateField, componentData) }}</div>
            </div>
        </div>
        <!-- 右侧内容 -->
        <div class="d-flex just-b align-c flex-1 idm-history-day-right" @click="handleClick">
            <div class="flex-1 idm-history-day-content">
                <div class="text-o-e-2">
                    {{ getDataField(propData.contentField, componentData) }}
                </div>
            </div>
            <div class="d-flex align-c">
                <svg
                    v-if="propData.rightIcon && propData.rightIcon.length"
                    class="idm-history-day-right-icon"
                    aria-hidden="true"
                >
                    <use :xlink:href="`#${propData.rightIcon[0]}`"></use>
                </svg>
                <svg-icon v-else icon-class="arrowRight2" class-name="idm-history-day-right-icon"></svg-icon>
            </div>
        </div>
        <ICommonMask :moduleObject="moduleObject" :propData="propData"></ICommonMask>
    </div>
</template>
<script>
import ICommonMask from '../commonComponents/ICommonMask'
import { historyTodayData } from '../mock/mockData'
import { getDatasInterfaceUrl } from '@/api/config'
import adaptationScreenMixin from '../mixins/adaptationScreen'
export default {
    name: 'IHistoryToday',
    components: {
        ICommonMask
    },
    data() {
        return {
            moduleObject: {},
            propData: this.$root.propData.compositeAttr || {
                fontContent: 'Hello Word',
                defaultStatus: ''
            },
            componentData: {}
        }
    },
    mixins: [adaptationScreenMixin],
    created() {
        this.moduleObject = this.$root.moduleObject
        this.convertAttrToStyleObject()
        this.convertThemeListAttrToStyleObject()
    },
    methods: {
        propDataWatchHandle(propData) {
            this.propData = propData.compositeAttr || {}
            this.convertAttrToStyleObject()
            this.convertThemeListAttrToStyleObject()
        },
        convertAttrToStyleObject() {
            const styleObject = {},
                leftObj = {},
                leftTitleObj = {},
                leftBottomObj = {},
                dateObj = {},
                iconObj = {},
                clampObj = {},
                rightObj = {},
                rightIconObj = {},
                contentObj = {}
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
                        case 'boxShadow':
                            styleObject['box-shadow'] = element
                            break
                        case 'bgColor':
                            if (element && element.hex8) {
                                styleObject['background-color'] = IDM.hex8ToRgbaString(element.hex8)
                            }
                            break
                        case 'box':
                            IDM.style.setBoxStyle(styleObject, element)
                            break
                        case 'border':
                            IDM.style.setBorderStyle(styleObject, element)
                            break
                        // 左侧样式
                        case 'leftBox':
                            IDM.style.setBoxStyle(leftObj, element)
                            break
                        case 'titleFont':
                            IDM.style.setFontStyle(leftTitleObj, element)
                            this.adaptiveFontSize(leftTitleObj, element)
                            break
                        case 'leftBottomBox':
                            IDM.style.setBoxStyle(leftBottomObj, element)
                            break
                        case 'leftBottomBorder':
                            IDM.style.setBorderStyle(leftBottomObj, element)
                            break
                        case 'leftBottomBgColor':
                            if (element && element.hex8) {
                                leftBottomObj['background'] = IDM.hex8ToRgbaString(element.hex8)
                            }
                            break
                        case 'timeFont':
                            IDM.style.setFontStyle(dateObj, element)
                            this.adaptiveFontSize(dateObj, element)
                            break
                        case 'iconSize':
                            iconObj['width'] = element + 'px'
                            iconObj['height'] = element + 'px'
                            break
                        case 'iconColor':
                            if (element && element.hex8) {
                                iconObj['fill'] = IDM.hex8ToRgbaString(element.hex8)
                            }
                            break
                        // 右侧内容
                        case 'contentClamp':
                            clampObj['line-clamp'] = element
                            clampObj['-webkit-line-clamp'] = element
                            break
                        case 'rightBox':
                            IDM.style.setBoxStyle(rightObj, element)
                            break
                        case 'rightBorder':
                            IDM.style.setBorderStyle(rightObj, element)
                            break
                        case 'contentBox':
                            IDM.style.setBoxStyle(contentObj, element)
                            break
                        case 'contentFont':
                            IDM.style.setFontStyle(rightObj, element)
                            this.adaptiveFontSize(rightObj, element)
                            break
                        case 'rightIconSize':
                            rightIconObj['width'] = this.getAdaptiveSize(element) + 'px'
                            rightIconObj['height'] = this.getAdaptiveSize(element) + 'px'
                            break
                        case 'rightIconColor':
                            if (element && element.hex8) {
                                rightIconObj['fill'] = IDM.hex8ToRgbaString(element.hex8)
                            }
                            break
                    }
                }
            }
            window.IDM.setStyleToPageHead(this.moduleObject.id, styleObject)
            window.IDM.setStyleToPageHead(this.moduleObject.id + ' .idm-history-day-left', leftObj)
            window.IDM.setStyleToPageHead(this.moduleObject.id + ' .idm-history-day-title', leftTitleObj)
            window.IDM.setStyleToPageHead(this.moduleObject.id + ' .idm-history-day-title', leftTitleObj)
            window.IDM.setStyleToPageHead(this.moduleObject.id + ' .idm-history-day-bottom', leftBottomObj)
            window.IDM.setStyleToPageHead(this.moduleObject.id + ' .idm-history-day-date', dateObj)
            window.IDM.setStyleToPageHead(this.moduleObject.id + ' .idm-history-day-left-icon', iconObj)
            window.IDM.setStyleToPageHead(this.moduleObject.id + ' .text-o-e-2', clampObj)
            window.IDM.setStyleToPageHead(this.moduleObject.id + ' .idm-history-day-right', rightObj)
            window.IDM.setStyleToPageHead(this.moduleObject.id + ' .idm-history-day-right-icon', rightIconObj)
            window.IDM.setStyleToPageHead(this.moduleObject.id + ' .idm-history-day-content', contentObj)
            this.initData()
        },
        /**
         * 主题颜色
         */
        convertThemeListAttrToStyleObject() {
            var themeList = this.propData.themeList
            if (!themeList) {
                return
            }
            const themeNamePrefix =
                IDM.setting && IDM.setting.applications && IDM.setting.applications.themeNamePrefix
                    ? IDM.setting.applications.themeNamePrefix
                    : 'idm-theme-'
            for (var i = 0; i < themeList.length; i++) {
                var item = themeList[i]
                IDM.setStyleToPageHead(
                    '.' +
                        themeNamePrefix +
                        item.key +
                        (` #${this.moduleObject.id}` || 'module_demo') +
                        ' .idm-history-day-title',
                    {
                        color: item.mainColor ? IDM.hex8ToRgbaString(item.mainColor.hex8) : ''
                    }
                )
            }
        },
        /**
         * 获取自定义字段值
         * @param {*} field 自定义字段
         * @param {*} dataObject 数据对象
         * @returns 对应字段的值
         */
        getDataField(field, dataObject) {
            if (!dataObject || !field) return ''
            return IDM.express.replace(`@[${field}]`, dataObject, true)
        },
        handleClick() {
            if (this.moduleObject.env === 'develop') {
                return
            }
            let url = null
            switch (this.propData.jumpStyle) {
                case '_link':
                    url = this.getDataField(this.propData.jumpUrlField, this.componentData)
                    if (!url) return
                    url = IDM.url.getWebPath(url)
                    window.open(url)
                    break
                case '_child':
                    if (this.propData.jumpPageList && this.propData.jumpPageList.length > 0) {
                        IDM.router.push(
                            this.moduleObject.pageid,
                            this.propData.morePageList[0].id,
                            this.propData.isPageKeep,
                            this,
                            '',
                            ''
                        )
                    } else {
                        IDM.message.warning('请选择要跳转的子页面')
                    }
                    break
                case '_custom_link':
                    url = this.textFilter(this.propData.customLink, this.pageData)
                    if (!url) return
                    window.open(IDM.url.getWebPath(url))
                    break
                case '_custom_func':
                    if (this.propData.jumpCustomFunc && this.propData.jumpCustomFunc.length > 0) {
                        const funcName = this.propData.jumpCustomFunc[0].name
                        window[funcName] && window[funcName].call(this)
                    }
            }
        },
        reload() {
            //请求数据源
            this.initData()
        },
        initData() {
            if (this.moduleObject.env !== 'production') {
                this.componentData = historyTodayData
            }
            window.IDM.http
                .post(
                    getDatasInterfaceUrl,
                    {
                        id: this.propData.dataSource && this.propData.dataSource.value
                    },
                    {
                        headers: {
                            'Content-Type': 'application/json;charset=UTF-8'
                        }
                    }
                )
                .then((res) => {
                    //res.data
                    if (res.status == 200 && res.data.code == 200) {
                        this.componentData = res.data.data
                    } else {
                        IDM.message.error(res.data.message)
                    }
                })
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
        }
    }
}
</script>

<style scoped>
.idm-history-day-left-icon {
    margin: 0 0 1px 0;
}
</style>
