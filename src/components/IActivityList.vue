<template>
    <div idm-ctrl="idm_module" :id="moduleObject.id" :idm-ctrl-id="moduleObject.id" :title="propData.htmlTitle">
        <ICommonListContainer
            :moduleObject="moduleObject"
            :ref="'listContainerRef-' + moduleObject.id"
            :propData="propData"
            :pageData="pageData"
            :isFirst="isFirst"
            :isLoading="isLoading"
            @handleClickMore="handleClickMore"
        >
            <!-- 列表内容 -->
            <template #list>
                <div
                    v-for="(item, index) in pageData.value"
                    :key="index"
                    class="box-line d-flex just-b position-r over-h"
                    @click="handleItemClick(item)"
                >
                    <!-- 左侧内容 -->
                    <div class="d-flex flex-d-c just-c align-c activity-list-left" v-if="propData.isShowLeftContent">
                        <div class="activity-list-time text-o-e">{{ getDataField(propData.timeField, item) }}</div>
                        <div class="activity-list-week text-o-e">{{ getDataField(propData.weekField, item) }}</div>
                        <div
                            class="activity-list-status nowrap"
                            v-if="getDataField(propData.activityField, item)"
                            :style="getActivityStatusStyle(getDataField(propData.activityField, item))"
                        >
                            {{ getDataField(propData.activityField, item) }}
                        </div>
                    </div>
                    <!-- 右上角状态 -->
                    <div
                        class="activity-list-right-status"
                        v-if="propData.isShowActivityStatus"
                        :style="getActivityStatusStyle(getDataField(propData.activityField, item))"
                    >
                        {{ getDataField(propData.activityField, item) }}
                    </div>
                    <!-- 右侧内容 -->
                    <div class="flex-1">
                        <!-- 标题 -->
                        <div class="activity-list-title-line d-flex align-c">
                            <span class="activity-list-title">{{ getDataField(propData.titleField, item) }}</span>
                            <span
                                class="activity-list-user-status nowrap"
                                v-if="getDataField(propData.activityField, item)"
                                :style="getUserStatusStyle(getDataField(propData.userField, item))"
                                >{{ getDataField(propData.userField, item) }}</span
                            >
                        </div>
                        <!-- 标签 -->
                        <div class="activity-list-tags text-o-e">
                            <span
                                class="activity-list-tag"
                                v-for="(tag, indexs) in getDataField(propData.tagField, item)"
                                :key="indexs"
                                >{{ tag }}</span
                            >
                        </div>
                        <!-- 地点 -->
                        <div class="d-flex align-c activity-list-style-one-location-box text-o-e">
                            <div class="d-flex align-c activity-list-icon-container" v-if="propData.isShowLocationIcon">
                                <svg
                                    v-if="propData.locationIcon && propData.locationIcon.length"
                                    class="activity-list-location-icon"
                                    aria-hidden="true"
                                >
                                    <use :xlink:href="`#${propData.locationIcon[0]}`"></use>
                                </svg>
                                <svg-icon
                                    v-else
                                    icon-class="location"
                                    className="activity-list-location-icon"
                                ></svg-icon>
                            </div>
                            <span class="text-o-e"> {{ getDataField(propData.locationField, item) }}</span>
                        </div>
                        <!-- 参与人数 -->
                        <div class="d-flex align-c activity-list-style-one-person-box text-o-e">
                            <div class="d-flex align-c activity-list-icon-container" v-if="propData.isShowPersonIcon">
                                <svg
                                    v-if="propData.personIcon && propData.personIcon.length"
                                    class="activity-list-person-icon"
                                    aria-hidden="true"
                                >
                                    <use :xlink:href="`#${propData.personIcon[0]}`"></use>
                                </svg>
                                <svg-icon v-else icon-class="ren" className="activity-list-person-icon"></svg-icon>
                            </div>
                            <span class="text-o-e">参与人数：{{ getDataField(propData.personNumberField, item) }}</span>
                        </div>
                    </div>
                </div>
            </template>
        </ICommonListContainer>
    </div>
</template>
<script>
import ICommonListContainer from '../commonComponents/ICommonListContainer'
import commonListMixin from '../mixins/commonList'
import adaptationScreenMixin from '../mixins/adaptationScreen'
import { activityData } from '../mock/mockData'
export default {
    name: 'IActivityList',
    components: {
        ICommonListContainer
    },
    mixins: [adaptationScreenMixin, commonListMixin],
    data() {
        return {
            moduleObject: {},
            propData: this.$root.propData.compositeAttr || {},
            pageData: { value: [], count: 0, moreUrl: '' }
        }
    },
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
        /**
         * 获取用户当前活动的状态样式
         * @param {*} text 用户状态文字
         */
        getUserStatusStyle(text) {
            if (Array.isArray(this.propData.userStatusList) && this.propData.userStatusList.length > 0) {
                const currentUserStatus = this.propData.userStatusList.find((el) => el.statusText === text),
                    styleObj = {}
                if (currentUserStatus) {
                    if (Object.keys(currentUserStatus.userStatusFont).length > 0) {
                        IDM.style.setFontStyle(styleObj, currentUserStatus.userStatusFont)
                        this.adaptiveFontSize(styleObj, currentUserStatus.userStatusFont)
                    }
                    if (Object.keys(currentUserStatus.userBorder).length > 0) {
                        IDM.style.setBorderStyle(styleObj, currentUserStatus.userBorder)
                    }
                    return styleObj
                }
            }
            return {}
        },
        /**
         * 获取活动当前状态样式
         * @param {*} text 活动状态文字
         */
        getActivityStatusStyle(text) {
            if (Array.isArray(this.propData.activityList) && this.propData.activityList.length > 0) {
                const currentActivityStatus = this.propData.activityList.find((el) => el.statusText === text),
                    styleObj = {}
                if (currentActivityStatus) {
                    if (Object.keys(currentActivityStatus.activityStatusFont).length > 0) {
                        IDM.style.setFontStyle(styleObj, currentActivityStatus.activityStatusFont)
                        this.adaptiveFontSize(styleObj, currentActivityStatus.activityStatusFont)
                    }
                    if (
                        currentActivityStatus.activityStatusBgColor &&
                        currentActivityStatus.activityStatusBgColor.hex8
                    ) {
                        styleObj['background-color'] = IDM.hex8ToRgbaString(
                            currentActivityStatus.activityStatusBgColor.hex8
                        )
                    }
                    return styleObj
                }
            }
            return {}
        },
        // 设置样式
        convertAttrToStyleObject() {
            var boxLineStyleObj = {},
                timeBoxStyleObj = {},
                weekBoxStyleObj = {},
                activityStatusBoxStyleObj = {},
                titleBoxStyleObj = {},
                titleFontObj = {},
                tagStyleObj = {},
                locationIconObj = {},
                locationLineObj = {},
                personIconObj = {},
                personLineObj = {},
                userStyleObj = {}
            for (const key in this.propData) {
                if (this.propData.hasOwnProperty.call(this.propData, key)) {
                    const element = this.propData[key]
                    if (!element && element !== false && element != 0) {
                        continue
                    }
                    switch (key) {
                        case 'lineBgColor':
                            if (element && element.hex8) {
                                boxLineStyleObj['background-color'] = IDM.hex8ToRgbaString(element.hex8)
                            }
                            break
                        case 'lineBox':
                            IDM.style.setBoxStyle(boxLineStyleObj, element)
                            break
                        case 'lineBorder':
                            IDM.style.setBorderStyle(boxLineStyleObj, element)
                            break
                        case 'lineBoxShadow':
                            boxLineStyleObj['box-shadow'] = element
                            break
                        // 时间样式
                        case 'timeBox':
                            IDM.style.setBoxStyle(timeBoxStyleObj, element)
                            break
                        case 'timeFont':
                            IDM.style.setFontStyle(timeBoxStyleObj, element)
                            this.adaptiveFontSize(timeBoxStyleObj, element)
                            break
                        // 星期样式
                        case 'weekBox':
                            IDM.style.setBoxStyle(weekBoxStyleObj, element)
                            break
                        case 'weekFont':
                            IDM.style.setFontStyle(weekBoxStyleObj, element)
                            this.adaptiveFontSize(weekBoxStyleObj, element)
                            break
                        // 活动状态
                        case 'activityStatusBox':
                            IDM.style.setBoxStyle(activityStatusBoxStyleObj, element)
                            break
                        case 'activityStatusBorder':
                            IDM.style.setBorderStyle(activityStatusBoxStyleObj, element)
                            break
                        // 标题样式
                        case 'titleBorder':
                            IDM.style.setBorderStyle(titleBoxStyleObj, element)
                            break
                        case 'titleBox':
                            IDM.style.setBoxStyle(titleBoxStyleObj, element)
                            break
                        case 'titleFont':
                            IDM.style.setFontStyle(titleFontObj, element)
                            this.adaptiveFontSize(titleFontObj, element)
                            break
                        // 标签样式
                        case 'tagBox':
                            IDM.style.setBoxStyle(tagStyleObj, element)
                            this.adaptiveFontSize(tagStyleObj, element)
                            break
                        case 'tagFont':
                            IDM.style.setFontStyle(tagStyleObj, element)
                            this.adaptiveFontSize(tagStyleObj, element)
                            break
                        case 'tagBorder':
                            IDM.style.setBorderStyle(tagStyleObj, element)
                            break
                        case 'tagBgColor':
                            if (element && element.hex8) {
                                tagStyleObj['background-color'] = IDM.hex8ToRgbaString(element.hex8) + ' !important'
                            }
                            break
                        //地点行样式
                        case 'locationIconColor':
                            if (element && element.hex8) {
                                locationIconObj['fill'] = IDM.hex8ToRgbaString(element.hex8)
                                locationIconObj['color'] = IDM.hex8ToRgbaString(element.hex8)
                            }
                            break
                        case 'locationIconSize':
                            locationIconObj['width'] = element + 'px'
                            locationIconObj['height'] = element + 'px'
                            locationIconObj['font-size'] = element + 'px'
                            break
                        case 'locationBox':
                            IDM.style.setBoxStyle(locationLineObj, element)
                            break
                        case 'locationFontStyle':
                            IDM.style.setFontStyle(locationLineObj, element)
                            this.adaptiveFontSize(locationLineObj, element)
                            break

                        //人物行样式
                        case 'personIconColor':
                            if (element && element.hex8) {
                                personIconObj['fill'] = IDM.hex8ToRgbaString(element.hex8)
                                personIconObj['color'] = IDM.hex8ToRgbaString(element.hex8)
                            }
                            break
                        case 'personIconSize':
                            personIconObj['width'] = element + 'px'
                            personIconObj['height'] = element + 'px'
                            personIconObj['font-size'] = element + 'px'
                            break
                        case 'personBox':
                            IDM.style.setBoxStyle(personLineObj, element)
                            break
                        case 'personFont':
                            IDM.style.setFontStyle(personLineObj, element)
                            this.adaptiveFontSize(personLineObj, element)
                            break
                        //人物状态
                        case 'userStatusBox':
                            IDM.style.setBoxStyle(userStyleObj, element)
                            break
                    }
                }
            }
            // 单列总体样式
            window.IDM.setStyleToPageHead(this.moduleObject.id + ' .box-line', boxLineStyleObj)
            window.IDM.setStyleToPageHead(this.moduleObject.id + ' .activity-list-left', {
                'margin-right': boxLineStyleObj['padding-left']
            })
            // 时间样式
            window.IDM.setStyleToPageHead(this.moduleObject.id + ' .activity-list-time', timeBoxStyleObj)
            // 星期样式
            window.IDM.setStyleToPageHead(this.moduleObject.id + ' .activity-list-week', weekBoxStyleObj)
            // 活动状态
            window.IDM.setStyleToPageHead(this.moduleObject.id + ' .activity-list-status', activityStatusBoxStyleObj)
            // 标题样式
            window.IDM.setStyleToPageHead(this.moduleObject.id + ' .activity-list-title-line', titleBoxStyleObj)
            window.IDM.setStyleToPageHead(this.moduleObject.id + ' .activity-list-title', titleFontObj)
            // 标签样式
            window.IDM.setStyleToPageHead(this.moduleObject.id + ' .activity-list-tag', tagStyleObj)
            // 地点行样式
            window.IDM.setStyleToPageHead(this.moduleObject.id + ' .activity-list-location-icon', locationIconObj)
            window.IDM.setStyleToPageHead(
                this.moduleObject.id + ' .activity-list-style-one-location-box',
                locationLineObj
            )
            // 人物行样式
            window.IDM.setStyleToPageHead(this.moduleObject.id + ' .activity-list-person-icon', personIconObj)
            window.IDM.setStyleToPageHead(this.moduleObject.id + ' .activity-list-style-one-person-box', personLineObj)
            //icon样式
            window.IDM.setStyleToPageHead(this.moduleObject.id + ' .activity-list-icon-container', {
                'margin-right': '6px'
            })
            //人物状态
            window.IDM.setStyleToPageHead(this.moduleObject.id + ' .activity-list-user-status', userStyleObj)

            this.$nextTick(() => {
                this.$refs['listContainerRef-' + this.moduleObject.id].convertAttrToStyleObject()
            })
            this.initData()
        },
        // 主题颜色
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
                let bgColorObj = {
                    'background-color': item.mainColor ? IDM.hex8ToRgbaString(item.mainColor.hex8) : ''
                }
                IDM.setStyleToPageHead(
                    '.' +
                        themeNamePrefix +
                        item.key +
                        (` #${this.moduleObject.id}-common-list` || 'module_demo') +
                        ' .activity-list-tag',
                    bgColorObj
                )
            }
            // 通用样式
            this.$nextTick(() => {
                this.$refs['listContainerRef-' + this.moduleObject.id].convertThemeListAttrToStyleObject()
            })
        },
        reload() {
            //请求数据源
            this.initData()
        },

        initData() {
            if (this.moduleObject.env === 'develop') {
                this.pageData = activityData
                return
            }
            this.isFirst = false
            this.isLoading = true
            this.getDataSourceData()
        },
        setContextValue(object) {
            console.log('统一接口设置的值', object)
            if (object.type != 'pageCommonInterface') {
                return
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.box-line:last-child {
    border-bottom: 0 !important;
}
.nowrap {
    white-space: nowrap;
}

.activity-list-right-status {
    position: absolute;
    right: -40px;
    top: -19px;
    transform: rotate(40deg);
    padding: 30px 30px 5px 30px;
}
</style>
