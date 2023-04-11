<template>
    <div idm-ctrl="idm_module" :id="moduleObject.id" :idm-ctrl-id="moduleObject.id" :title="propData.htmlTitle">
        <ICommonListContainer
            :moduleObject="moduleObject"
            :ref="'listContainerRef-' + moduleObject.id"
            :propData="propData"
            :pageData="pageData"
            :isFirst="isFirst"
            :isLoading="false"
            @handleClickMore="handleClickMore"
        >
            <template #list>
            <div class="idm-content-sub-content">
                <van-list
                        :immediate-check="false"
                        v-model="isLoading"
                        :finished="finished"
                        offset=""
                        finished-text="没有更多了"
                        @load="onLoadMore"
                    >
                    <div>
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
                                    v-if="getDataField(propData.imageField, item).length === 1"
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
                            <van-row gutter="10" v-if="getDataField(propData.imageField, item).length > 1">
                                <van-col
                                    :span="getDataField(propData.imageField, item).length == 2 ? 12 : 8"
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
                                <span v-if="getDataField(propData.timeField, item)"
                                    >发布时间：{{ getDataField(propData.timeField, item) }}</span
                                >
                            </div>
                        </div>
                    </div>
                    <template #finished>
                        {{ propData.isPaging ? '没有更多了' : '' }}
                    </template>
                </van-list>
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
                oneImageObj = {},
                subBoxObj = {}
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
                            oneImageObj['width'] = this.getAdaptiveSize(element, 1.8) + 'px'
                            break
                        case 'imageHeight':
                            lineImageObj['height'] = this.getAdaptiveSize(element, 1.8) + 'px'
                            break
                        case 'subHeight':
                            subBoxObj['height'] = element
                            break
                    }
                }
            }
            
            window.IDM.setStyleToPageHead(this.moduleObject.id + ' .idm-content-sub-content', subBoxObj)
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
            const hasNotDataSourceId = !this.propData.selectColumn || !this.propData.selectColumn.id
            switch (this.propData.dataType) {
                case 'dataSource':
                    if (this.moduleObject.env === 'develop') {
                        this.pageData = getContentListData.call(this)
                        this.finished = true
                        return
                    }
                    this.getDataSourceData()
                    break
                case 'customInterface':
                    if (hasNotDataSourceId && !this.commonParam().columnId) {
                        let totalList = []
                        for (let i = 0; i < 10; i++) {
                            totalList.push(...getContentListData.call(this).value)
                        }
                        totalList.length = this.propData.limit
                        this.pageData.value = totalList
                        return
                    }
                    this.getCustomSourceData((res)=> {
                        res.value && res.value.forEach(el => {
                            if(el.images && el.images.length > 3) {
                                el.images.length = 3
                            }
                        })
                    })
                    break
            }
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
.idm-content-sub-content{
    overflow: auto;
}
.one-img {
    margin: 0 0 0 10px;
}
.image-list {
    width: 100%;
}
</style>
