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
            <template #list>
                <div
                    v-for="(item, index) in pageData.value"
                    :key="index"
                    class="box-line"
                    @click="handleItemClick(item)"
                >
                    <div class="d-flex just-b">
                        <div class="flex-1 common-list-title">
                            <div class="text-o-e-2">{{ getDataField(propData.titleField, item) }}</div>
                        </div>
                        <img
                            v-if="item.images.length === 1"
                            class="one-img"
                            :src="
                                IDM.url.getWebPath(
                                    getDataField(propData.imageField, item) &&
                                        getDataField(propData.imageField, item)[0]
                                )
                            "
                            alt="图片加载失败"
                        />
                    </div>
                    <van-row gutter="10" v-if="item.images.length > 1">
                        <van-col
                            :span="item.images.length == 2 ? 12 : 8"
                            v-for="(items, indexs) in getDataField(propData.imageField, item) || []"
                            class="flex-1"
                            :key="indexs"
                        >
                            <img :src="IDM.url.getWebPath(items)" alt="图片加载失败" class="image-list" />
                        </van-col>
                    </van-row>
                    <div class="d-flex just-b content-list-bottom">
                        <span v-if="getDataField(propData.originField, item)"
                            >来源：{{ getDataField(propData.originField, item) }}</span
                        >
                        <span v-if="getDataField(propData.originField, item)"
                            >发布时间：{{ getDataField(propData.timeField, item) }}</span
                        >
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
import { getContentListData } from '../mock/mockData'
export default {
    name: 'IContentList',
    components: {
        ICommonListContainer
    },
    data() {
        return {
            moduleObject: {},
            propData: this.$root.propData.compositeAttr || {},
            pageData: { value: [], count: 0, moreUrl: '' }
        }
    },
    mixins: [adaptationScreenMixin, commonListMixin],
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
        // 样式
        convertAttrToStyleObject() {
            var boxLineStyleObj = {},
                lineTitleObj = {},
                lineImageObj = {},
                lineBottomTitleObj = {},
                lineTitleClampObj = {},
                oneImageObj = {}
            for (const key in this.propData) {
                if (this.propData.hasOwnProperty.call(this.propData, key)) {
                    const element = this.propData[key]
                    if (!element && element !== false && element != 0) {
                        continue
                    }
                    switch (key) {
                        // 盒子样式
                        case 'lineBox':
                            IDM.style.setBoxStyle(boxLineStyleObj, element)
                            break
                        case 'lineBorder':
                            IDM.style.setBorderStyle(boxLineStyleObj, element)
                            break
                        case 'lineTitleFont':
                            IDM.style.setFontStyle(lineTitleObj, element)
                            this.adaptiveFontSize(lineTitleObj, element)
                            break
                        // 标题样式
                        case 'lineTitleBox':
                            IDM.style.setBoxStyle(lineTitleObj, element)
                            break
                        case 'lineTitleClamp':
                            lineTitleClampObj['-webkit-line-clamp'] = element
                            lineTitleClampObj['line-clamp'] = element
                            break
                        // 底部样式
                        case 'lineBottomTitleFont':
                            IDM.style.setFontStyle(lineBottomTitleObj, element)
                            this.adaptiveFontSize(lineBottomTitleObj, element)
                            break
                        case 'lineBottomBox':
                            IDM.style.setBoxStyle(lineBottomTitleObj, element)
                            break
                        // 图片样式
                        case 'imageBorder':
                            IDM.style.setBorderStyle(lineImageObj, element)
                            break
                        case 'imageWidth':
                            oneImageObj['width'] =  this.getAdaptiveSize(element, 1.8) + 'px'
                            break
                        case 'imageHeight':
                            lineImageObj['height'] = this.getAdaptiveSize(element, 1.8) + 'px'
                    }
                }
            }
            // 盒子样式
            window.IDM.setStyleToPageHead(this.moduleObject.id + ' .box-line', boxLineStyleObj)
            // 标题样式
            window.IDM.setStyleToPageHead(this.moduleObject.id + ' .common-list-title', lineTitleObj)
            window.IDM.setStyleToPageHead(this.moduleObject.id + ' .common-list-title .text-o-e-2', lineTitleClampObj)
            // 底部样式
            window.IDM.setStyleToPageHead(this.moduleObject.id + ' .content-list-bottom', lineBottomTitleObj)
            // 图片样式
            window.IDM.setStyleToPageHead(
                IDM.style.generateClassName('#' + this.moduleObject.id, [' .one-img', ' .image-list']),
                lineImageObj
            )
            window.IDM.setStyleToPageHead(this.moduleObject.id + ' .one-img', oneImageObj)

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
            // const themeNamePrefix =
            //     IDM.setting && IDM.setting.applications && IDM.setting.applications.themeNamePrefix
            //         ? IDM.setting.applications.themeNamePrefix
            //         : 'idm-theme-'
            // for (var i = 0; i < themeList.length; i++) {
            //     var item = themeList[i]
            //     let moduleColorObj = {
            //         'font-size': item.mainColor ? IDM.hex8ToRgbaString(item.mainColor.hex8) : ''
            //     }
            //     IDM.setStyleToPageHead(
            //         '.' +
            //             themeNamePrefix +
            //             item.key +
            //             (` #${this.moduleObject.id}-common-list` || 'module_demo') +
            //             ' .module-name',
            //         moduleColorObj
            //     )
            // }
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
                this.pageData = getContentListData.call(this)
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
.one-img {
    margin: 0 0 0 10px;
}
.image-list {
    width: 100%;
}
</style>
