<template>
    <div
        idm-ctrl="idm_module"
        :id="moduleObject.id"
        :idm-ctrl-id="moduleObject.id"
        class="idm-history-day d-flex just-b align-c"
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
                <div class="idm-history-day-date">{{ componentData.date }}</div>
            </div>
        </div>
        <!-- 右侧内容 -->
        <div class="d-flex just-b align-c flex-1 idm-history-day-right">
            <div class="flex-1 idm-history-day-content">
                <div class="text-o-e-2">
                    {{ componentData.content }}
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
    </div>
</template>
<script>
import { historyTodayData } from '../mock/mockData'
export default {
    name: 'IHistoryToday',
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
    created() {
        this.moduleObject = this.$root.moduleObject
        this.convertAttrToStyleObject()
    },
    methods: {
        propDataWatchHandle(propData) {
            this.propData = propData.compositeAttr || {}
            this.convertAttrToStyleObject()
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
                rightIconObj = {}
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
                            break
                        case 'leftBottomBox':
                            IDM.style.setBoxStyle(leftBottomObj, element)
                            break
                        case 'leftBottomBorder':
                            IDM.style.setBorderStyle(leftBottomObj, element)
                            break
                        case 'timeFont':
                            IDM.style.setFontStyle(dateObj, element)
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
                        case 'contentFont':
                            IDM.style.setFontStyle(rightObj, element)
                            break
                        case 'rightIconSize':
                            rightIconObj['width'] = element + 'px'
                            rightIconObj['height'] = element + 'px'
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
            this.initData()
        },
        reload() {
            //请求数据源
            this.initData()
        },
        initData() {
            if (this.moduleObject.env !== 'production') {
                this.componentData = historyTodayData
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
        }
    }
}
</script>
