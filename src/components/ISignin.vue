<template>
    <!--
    根目录规范(必须不能为空)：
    idm-ctrl：控件类型 drag_container：容器，drag_container_inlieblock：行内容器，idm_module：非容器的组件
    id：使用moduleObject.id，如果id不使用这个将会被idm-ctrl-id属性替换
    idm-ctrl-id：组件的id，这个必须不能为空
  -->
    <div idm-ctrl="idm_module" :id="moduleObject.id" :idm-ctrl-id="moduleObject.id">
        <div class="idm-signin">
            <div class="signin-top d-flex flex-d-c align-c">
                <div class="signin-title">打卡天数</div>
                <div class="signin-img" :style="imgStyleObj">1</div>
                <div class="signin-btn" @click="handleSign">签到</div>
            </div>
            <div class="signin-bottom">
                <van-calendar
                    class="signin-calendar"
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
                        <span :class="getIsSign(scoped.date)"></span>
                    </template>
                </van-calendar>
            </div>
        </div>
    </div>
</template>

<script>
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
            nowDay: new Date().getDate()
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
        handleSign() {},
        setMinMaxDay() {
            var firstDay = new Date(this.defaultDate)
            firstDay.setDate(1)
            this.minDate = new Date(this.year, this.month + this.cont, firstDay.getDate())
            var endDate = new Date(this.defaultDate)
            endDate.setMonth(this.defaultDate.getMonth() + 1)
            endDate.setDate(0)
            this.maxDate = new Date(this.year, this.month + this.cont, endDate.getDate())
        },
        getIsSign(date) {
            if (!date) return ''
            date = new Date(date)
        },
        dateSelect(date) {
            console.log(date)
        },
        handlePrev() {
            this.cont--
            this.defaultDate = new Date(this.year, this.month + this.cont, this.nowDay)
            this.setMinMaxDay()
        },
        handleNext() {
            this.cont++
            this.defaultDate = new Date(this.year, this.month + this.cont, this.nowDay)
            this.setMinMaxDay()
        },
        propDataWatchHandle(propData) {
            this.propData = propData.compositeAttr || {}
            this.convertAttrToStyleObject()
            this.convertThemeListAttrToStyleObject()
        },
        initData() {
            this.setMinMaxDay()
        },
        convertAttrToStyleObject() {
            let styleObject = {},
                styleWrapObject = {},
                signinBtnObj = {}
            for (const key in this.propData) {
                if (this.propData.hasOwnProperty.call(this.propData, key)) {
                    const element = this.propData[key]
                    if (!element && element !== false && element != 0) {
                        continue
                    }
                    switch (key) {
                        case 'labelFont':
                            IDM.style.setFontStyle(styleObject, element)
                            break
                        case 'labelBox':
                            IDM.style.setBoxStyle(styleObject, element)
                            break
                        case 'box':
                            IDM.style.setBoxStyle(styleWrapObject, element)
                            break
                    }
                }
            }
            window.IDM.setStyleToPageHead(this.moduleObject.id + ' .time-label', styleObject)
            window.IDM.setStyleToPageHead(this.moduleObject.id + ' .idm-time', styleWrapObject)

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
                    '.' + themeNamePrefix + item.key + (` #${this.moduleObject.id}` || 'module_demo') + ' .signin-btn',
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
    .signin-top {
        margin: 10px;
        padding: 10px 20px;
        box-shadow: 0px 0px 20px 0px #ccc;
        position: relative;
        .signin-title {
            text-align: center;
        }
        .signin-img {
            padding: 10px 15px 0 15px;
            text-align: center;
        }
        .signin-btn {
            position: absolute;
            top: 10px;
            right: 10px;
            user-select: none;
        }
    }
    &::v-deep(.van-calendar__month-title) {
        display: none;
    }
    &::v-deep(.van-calendar__selected-day) {
        border-radius: 50%;
    }
    .signin-bottom {
        margin: 10px;
        box-shadow: 0px 0px 20px 0px #ccc;
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
