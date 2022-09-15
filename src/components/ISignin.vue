<template>
    <!--
    根目录规范(必须不能为空)：
    idm-ctrl：控件类型 drag_container：容器，drag_container_inlieblock：行内容器，idm_module：非容器的组件
    id：使用moduleObject.id，如果id不使用这个将会被idm-ctrl-id属性替换
    idm-ctrl-id：组件的id，这个必须不能为空
  -->
    <div idm-ctrl="idm_module" class="idm-signin" :id="moduleObject.id" :idm-ctrl-id="moduleObject.id">
        <div class="idm-signin-top d-flex flex-d-c align-c position-r">
            <div class="idm-signin-title">打卡天数</div>
            <div class="idm-signin-img" :style="imgStyleObj">{{ componentData.hasSignedDays.length || '0' }}</div>
            <div class="idm-signin-btn" @click="handleSign">签到</div>
        </div>
        <div class="idm-signin-bottom">
            <van-calendar
                class="idm-signin-calendar"
                :show-mark="false"
                row-height="40"
                :show-subtitle="false"
                first-day-of-week="1"
                :poppable="false"
                :show-confirm="false"
                :min-date="minDate"
                :max-date="maxDate"
                @select="dateSelect"
            >
                <template #title>
                    <div class="d-flex just-b align-c idm-signin-calendar-title">
                        <div @click="handlePrev">
                            <svg-icon icon-class="arrowLeft" class-name="idm-signin-calendar-arrow"></svg-icon>
                        </div>
                        <div>{{ getShowMonth }}&nbsp;&nbsp;&nbsp;{{ new Date(maxDate).getFullYear() }}</div>
                        <div @click="handleNext" v-if="rightArrowShow()">
                            <svg-icon icon-class="arrowRight2" class-name="idm-signin-calendar-arrow"></svg-icon>
                        </div>
                        <div v-else></div>
                    </div>
                </template>
                <template #bottom-info="scoped">
                    <span
                        v-if="getIsSign(scoped.date) === 'normal'"
                        class="idm-signin-circle circle-bottom"
                        :class="isCurrentDay(scoped.date) ? 'idm-signin-circle-current' : ''"
                    ></span>
                    <svg-icon
                        v-else-if="getIsSign(scoped.date) === 'special'"
                        iconClass="wujiaoxing"
                        :className="`idm-signin-intr-wujiaoxing wujiaoxing-bottom ${
                            isCurrentDay(scoped.date) ? 'idm-signin-wujiaoxing-current' : ''
                        }`"
                    ></svg-icon>
                </template>
            </van-calendar>
            <div class="idm-signin-intr d-flex flex-d-r-r">
                <div class="d-flex align-c">
                    <svg-icon iconClass="wujiaoxing" className="idm-signin-intr-wujiaoxing"></svg-icon>
                    <span>特殊打卡日</span>
                    <!-- <svg-icon iconClass="wenhao" className="idm-signin-intr-wenhao"></svg-icon> -->
                </div>
                <div class="d-flex align-c">
                    <span class="idm-signin-circle"></span>
                    <span>已打卡</span>
                </div>
            </div>
        </div>
        <!-- popup -->
        <van-popup
            v-model="isShowPopup"
            :close-on-click-overlay="false"
            style="background: transparent"
            position="center"
        >
            <div :style="popupStyle"></div>
            <div class="idm-signin-popup-container" style="width: 320px">
                <div class="idm-signin-popup-title">
                    {{ componentData.questionTitle }}
                </div>
                <div class="idm-signin-popup-options">
                    <div
                        class="idm-signin-popup-option"
                        v-for="(item, index) in componentData.questionOptions"
                        :key="index"
                        :class="currentAnswer.code === item.code ? 'idm-signin-popup-option-active' : ''"
                        @click="handleOptionsClick(item)"
                    >
                        {{ item.text }}
                    </div>
                </div>
                <div class="idm-signin-popup-group d-flex just-a">
                    <div class="idm-signin-cancel-btn btn" @click="isShowPopup = false">取消</div>
                    <div class="idm-signin-confirm-btn btn" @click="handleConfirm">确定</div>
                </div>
            </div>
        </van-popup>
    </div>
</template>

<script>
import { signinData } from '../mock/mockData'
export default {
    data() {
        return {
            moduleObject: {},
            propData: this.$root.propData.compositeAttr || {
                labelShow: true,
                styleModel: 'mobile'
            },
            minDate: new Date(),
            maxDate: new Date(),
            cont: 0,
            defaultDate: new Date(),
            year: new Date().getFullYear(),
            month: new Date().getMonth(),
            nowDay: new Date().getDate(),
            isShowPopup: false,
            componentData: {
                questionOptions: [],
                hasSignedDays: []
            },
            currentAnswer: {},
            currentDay: null
        }
    },
    watch: {
        isShowPopup: {
            immediate: true,
            handler(newV) {
                if (newV) {
                    this.currentAnswer = {}
                }
            }
        }
    },
    created() {
        this.moduleObject = this.$root.moduleObject
        this.convertAttrToStyleObject()
        this.convertThemeListAttrToStyleObject()
    },
    computed: {
        imgStyleObj() {
            return {
                background: `url(${IDM.url.getModuleAssetsWebPath(require('../assets/daka.png'), this.moduleObject)}`,
                'background-size': '100% 100%',
                'background-repeat': 'no-repeat'
            }
        },
        popupStyle() {
            return {
                width: '320px',
                height: '150px',
                background: `url(${IDM.url.getModuleAssetsWebPath(require('../assets/dati.png'), this.moduleObject)}`,
                'background-size': '100% 100%',
                'background-repeat': 'no-repeat'
            }
        },
        getShowMonth() {
            const month = [
                '一月',
                '二月',
                '三月',
                '四月',
                '五月',
                '六月',
                '七月',
                '八月',
                '九月',
                '十月',
                '十一月',
                '十二月'
            ]
            return month[new Date(this.maxDate).getMonth()]
        }
    },
    methods: {
        rightArrowShow() {
            if (
                this.year === new Date(this.maxDate).getFullYear() &&
                this.month === new Date(this.maxDate).getMonth()
            ) {
                return false
            }
            return true
        },
        handleConfirm() {
            this.isShowPopup = false
        },
        handleOptionsClick(item) {
            this.currentAnswer = item
        },
        // 签到弹框显示
        handleSign() {
            const days = this.componentData.hasSignedDays
            if (days.length > 0) {
                const hasSignDay = days.filter((el) => el.date == this.currentDay)
                if (hasSignDay.length > 0) {
                    return IDM.message.warning('不能重复签到')
                }
            }
            this.isShowPopup = true
            if (this.moduleObject.env !== 'production') return
        },
        // 月份变化
        setMinMaxDay() {
            var firstDay = new Date(this.defaultDate)
            firstDay.setDate(1)
            this.minDate = new Date(this.year, this.month + this.cont, firstDay.getDate())
            var endDate = new Date(this.defaultDate)
            endDate.setMonth(this.defaultDate.getMonth() + 1)
            endDate.setDate(0)
            this.maxDate = new Date(this.year, this.month + this.cont, endDate.getDate())
        },
        // 某天是否已经签到
        getIsSign(date) {
            if (!date) return ''
            const dayTime = new Date(date).getTime() / 1000
            const days = this.componentData.hasSignedDays
            if (days.length === 0) return ''
            const hasSignDay = days.filter((el) => el.date == dayTime)
            if (hasSignDay.length === 0) return ''
            return hasSignDay[0].type
        },
        // 日期选择
        dateSelect(date) {
            this.currentDay = new Date(date).getTime() / 1000
        },
        // 是否当前选中天
        isCurrentDay(date) {
            const selectTime = new Date(date).getTime() / 1000
            return this.currentDay === selectTime
        },
        // 上个月
        handlePrev() {
            if (this.moduleObject.env !== 'production') return
            this.cont--
            this.defaultDate = new Date(this.year, this.month + this.cont, this.nowDay)
            this.setMinMaxDay()
            this.handleGetSignData()
        },
        // 下个月
        handleNext() {
            if (this.moduleObject.env !== 'production') return
            this.cont++
            this.defaultDate = new Date(this.year, this.month + this.cont, this.nowDay)
            this.setMinMaxDay()
            this.handleGetSignData()
        },
        propDataWatchHandle(propData) {
            this.propData = propData.compositeAttr || {}
            this.convertAttrToStyleObject()
            this.convertThemeListAttrToStyleObject()
        },
        // 获取当月签到数据
        handleGetSignData() {
            console.log(new Date(this.maxDate).getFullYear())
            console.log(new Date(this.maxDate).getMonth())
        },
        // 获取签到问题
        handleGetQuestionData() {},
        initData() {
            this.setMinMaxDay()
            this.handleGetSignData()
            if (this.moduleObject.env !== 'production') {
                this.componentData = signinData
                return
            }
        },
        convertAttrToStyleObject() {
            let styleObject = {},
                bottomStyleObj = {},
                titleObj = {},
                btnObj = {},
                dateObj = {}
            for (const key in this.propData) {
                if (this.propData.hasOwnProperty.call(this.propData, key)) {
                    const element = this.propData[key]
                    if (!element && element !== false && element != 0) {
                        continue
                    }
                    switch (key) {
                        // 顶部
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
                        case 'titleFont':
                            IDM.style.setFontStyle(titleObj, element)
                            break
                        case 'dateFont':
                            IDM.style.setFontStyle(dateObj, element)
                            break

                        // 按钮样式
                        case 'btnBox':
                            IDM.style.setBoxStyle(btnObj, element)
                            break
                        case 'btnBorder':
                            IDM.style.setBorderStyle(btnObj, element)
                            break
                        case 'btnFont':
                            IDM.style.setFontStyle(btnObj, element)
                            break

                        // 底部
                        case 'bottomWidth':
                            bottomStyleObj['width'] = element
                            break
                        case 'bottomHeight':
                            bottomStyleObj['height'] = element
                            break
                        case 'bottomBoxShadow':
                            bottomStyleObj['box-shadow'] = element
                            break
                        case 'bottomBgColor':
                            if (element && element.hex8) {
                                bottomStyleObj['background-color'] = IDM.hex8ToRgbaString(element.hex8)
                            }
                            break
                        case 'bottomBox':
                            IDM.style.setBoxStyle(bottomStyleObj, element)
                            break
                        case 'bottomBorder':
                            IDM.style.setBorderStyle(bottomStyleObj, element)
                            break
                    }
                }
            }
            window.IDM.setStyleToPageHead(this.moduleObject.id + ' .idm-signin-top', styleObject)
            window.IDM.setStyleToPageHead(this.moduleObject.id + ' .idm-signin-title', titleObj)
            window.IDM.setStyleToPageHead(this.moduleObject.id + ' .idm-signin-btn', btnObj)
            window.IDM.setStyleToPageHead(this.moduleObject.id + ' .idm-signin-img', dateObj)
            window.IDM.setStyleToPageHead(this.moduleObject.id + ' .idm-signin-bottom', bottomStyleObj)

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
                    IDM.style.generateClassName(
                        '.' + themeNamePrefix + item.key + (` #${this.moduleObject.id}` || 'module_demo'),
                        [' .idm-signin-btn', ' .van-calendar__selected-day', ' .idm-signin-circle']
                    ),
                    {
                        background: item.mainColor ? IDM.hex8ToRgbaString(item.mainColor.hex8) : ''
                    }
                )
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.idm-signin {
    .idm-signin-title {
        margin: 0 0 3px 0;
    }
    .idm-signin-img {
        padding: 10px 15px 0 15px;
    }
    .idm-signin-circle {
        width: 6px;
        height: 6px;
        border-radius: 50px;
        margin: 0 5px 1px 0;
    }
    .circle-bottom {
        margin: 0 0 2px 0;
    }
    .idm-signin-circle-current {
        background: #ffffff !important;
    }
    .idm-signin-intr {
        background: #ffffff;
        padding: 10px 10px 10px 0;
        border-top: 1px solid #eee;
        font-size: 12px;
    }
    .idm-signin-popup-container {
        background: #ffffff;
        border-bottom-left-radius: 5px;
        border-bottom-right-radius: 5px;
        margin-top: -2px;
    }
    .idm-signin-popup-title {
        color: #000;
        line-height: 1.6;
        font-size: 16px;
        padding: 6px 15px 0;
    }
    .idm-signin-popup-options {
        padding: 0 15px;
        color: #000;
    }
    .idm-signin-popup-option {
        background: #fef1f1;
        margin: 10px 0 0 0;
        padding: 10px 5px;
    }

    .idm-signin-popup-option-active {
        background: #f42020;
        color: #ffffff;
    }

    .idm-signin-popup-group {
        font-size: 15px;
        padding: 10px 0;
        .btn {
            padding: 8px 49px;
            border-radius: 3px;
        }
        .idm-signin-cancel-btn {
            border: 1px solid #ccc;
            color: #000000;
        }
        .idm-signin-confirm-btn {
            color: #ffffff;
            background: #f42020;
        }
    }
    .idm-signin-intr-wujiaoxing {
        width: 11px;
        height: 11px;
        fill: #ff952e;
        margin: 0 5px 2px 20px;
    }
    .idm-signin-wujiaoxing-current {
        fill: #ffffff;
    }
    ::v-deep(.van-calendar__bottom-info) {
        display: flex;
        justify-content: center;
        bottom: -1px;
    }
    .wujiaoxing-bottom {
        margin: 0;
    }
    .idm-signin-intr-wenhao {
        fill: #999;
        width: 14px;
        height: 14px;
        margin: 0 0 1px 5px;
    }
    .idm-signin-btn {
        position: absolute;
        top: 0;
        right: 0;
        user-select: none;
    }
    &::v-deep(.van-calendar__month-title) {
        display: none;
    }
    &::v-deep(.van-calendar__selected-day) {
        border-radius: 50%;
    }
    .idm-signin-calendar-title {
        padding: 0 10px;
    }
    .idm-signin-calendar-arrow {
        color: #786f6f;
        width: 20px;
        height: 20px;
    }
}
</style>
