<template>
    <div idm-ctrl="idm_module" :id="moduleObject.id" :idm-ctrl-id="moduleObject.id" :title="propData.htmlTitle">
        <ICommonListContainer
            :moduleObject="moduleObject"
            :ref="'listContainerRef-' + moduleObject.id"
            :propData="propData"
            :pageData="pageData"
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
            pageWidth: null,
            pageData: { value: [], count: 0, moreUrl: '' }
        }
    },
    mixins: [commonListMixin],
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
                            break
                        case 'lineBottomBox':
                            IDM.style.setBoxStyle(lineBottomTitleObj, element)
                            break
                        // 图片样式
                        case 'imageBorder':
                            IDM.style.setBorderStyle(lineImageObj, element)
                            break
                        case 'imageWidth':
                            oneImageObj['width'] = element + 'px'
                            break
                        case 'imageHeight':
                            lineImageObj['height'] = element + 'px'
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
                let moduleColorObj = {
                    'font-size': item.mainColor ? IDM.hex8ToRgbaString(item.mainColor.hex8) : ''
                }
                IDM.setStyleToPageHead(
                    '.' +
                        themeNamePrefix +
                        item.key +
                        (` #${this.moduleObject.id}-common-list` || 'module_demo') +
                        ' .module-name',
                    moduleColorObj
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
        //点击更多
        handleClickMore() {},

        initData() {
            let that = this
            if (this.moduleObject.env === 'develop') {
                this.pageData = getContentListData.call(this)
                return
            }
            //所有地址的url参数转换
            var params = that.commonParam()
            switch (this.propData.dataSourceType) {
                case 'customInterface':
                    this.propData.customInterfaceUrl &&
                        window.IDM.http
                            .get(this.propData.customInterfaceUrl, params)
                            .then((res) => {
                                //res.data
                                that.$set(
                                    that.propData,
                                    'fontContent',
                                    that.getExpressData('resultData', that.propData.dataFiled, res.data)
                                )
                                // that.propData.fontContent = ;
                            })
                            .catch(function (error) {})
                    break
                case 'pageCommonInterface':
                    //使用通用接口直接跳过，在setContextValue执行
                    break
                case 'customFunction':
                    if (this.propData.customFunction && this.propData.customFunction.length > 0) {
                        var resValue = ''
                        try {
                            resValue =
                                window[this.propData.customFunction[0].name] &&
                                window[this.propData.customFunction[0].name].call(this, {
                                    ...params,
                                    ...this.propData.customFunction[0].param,
                                    moduleObject: this.moduleObject
                                })
                        } catch (error) {}
                        that.propData.fontContent = resValue
                    }
                    break
            }
        },
        setContextValue(object) {
            console.log('统一接口设置的值', object)
            if (object.type != 'pageCommonInterface') {
                return
            }
        },
        sendBroadcastMessage(object) {
            window.IDM.broadcast && window.IDM.broadcast.send(object)
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
