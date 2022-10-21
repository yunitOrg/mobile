<template>
    <div
        idm-ctrl="idm_module"
        class="idm-my-message-top d-flex position-r"
        :id="moduleObject.id"
        :idm-ctrl-id="moduleObject.id"
    >
        <img
            :src="IDM.url.getWebPath(getDataField(propData.avatarField, pageData)) || defaultAvatar"
            class="idm-my-message-avatar"
            alt=""
        />
        <div class="d-flex just-b flex-1 align-c">
            <div class="flex-1">
                <div class="idm-my-message-username" v-if="getDataField(propData.usernameField, pageData)">{{ getDataField(propData.usernameField, pageData) || '暂无' }}</div>
                <div class="idm-my-message-year" v-if="getDataField(propData.yearField, pageData)">{{ getDataField(propData.yearField, pageData) || '暂无' }}</div>
                <div class="idm-my-message-branch" v-if="getDataField(propData.branchField, pageData)">{{ getDataField(propData.branchField, pageData) || '暂无' }}</div>
                <div class="idm-my-message-phone" v-if="getDataField(propData.phoneField, pageData)">{{ getDataField(propData.phoneField, pageData) || '暂无' }}</div>
            </div>
            <div @click="handleJump">
                <svg-icon icon-class="arrowRight2" class-name="idm-my-message-icon"></svg-icon>
            </div>
        </div>
        <ICommonMask :moduleObject="moduleObject" :propData="propData"></ICommonMask>
    </div>
</template>
<script>
import { getMyMessageTopData } from '../mock/mockData'
import { getDatasInterfaceUrl } from '@/api/config'
import adaptationScreenMixin from '../mixins/adaptationScreen'
import ICommonMask from '../commonComponents/ICommonMask'
export default {
    name: 'IMyMessageTop',
    components: {
        ICommonMask
    },
    mixins: [adaptationScreenMixin],
    data() {
        return {
            moduleObject: {},
            propData: this.$root.propData.compositeAttr || {
                fontContent: 'Hello Word'
            },
            pageData: {}
        }
    },
    created() {
        this.moduleObject = this.$root.moduleObject
        this.convertAttrToStyleObject()
        this.convertThemeListAttrToStyleObject()
    },
    computed: {
        defaultAvatar() {
            return IDM.url.getModuleAssetsWebPath(require('../assets/default-avatar.jpg'), this.moduleObject)
        },
    },
    methods: {
        propDataWatchHandle(propData) {
            this.propData = propData.compositeAttr || {}
            this.convertAttrToStyleObject()
            this.convertThemeListAttrToStyleObject()
        },
        textFilter(text, dataObj) {
            if (!text) return ''
            console.log(text, this.pageData)
            text = text.replace(/\r/gi, '').replace(/\n/gi, '<br/>')
            text = text.replace(/@\[.*\]/gi, (str) => {
                if (str.length < 4) return str
                return IDM.express.replace(str, dataObj, true)
            })
            return text
        },
        handleJump() {
            if (this.moduleObject.env === 'develop') {
                return
            }
            let url = null
            switch (this.propData.jumpStyle) {
                case '_link':
                    url = this.getDataField(this.propData.jumpUrlField, this.pageData)
                    if (!url) return
                    window.open(IDM.url.getWebPath(url))
                    break
                case '_child':
                    if (this.propData.morePageList && this.propData.morePageList.length > 0) {
                        IDM.router.push(
                            this.moduleObject.pageid,
                            this.propData.morePageList[0].id,
                            this.propData.isPageKeep,
                            this,
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
        getDataField(field, dataObject) {
            if (!dataObject || !field) return ''
            return IDM.express.replace(`@[${field}]`, dataObject, true)
        },
        convertAttrToStyleObject() {
            const styleObject = {},
                avatarObj = {},
                usernameObj = {},
                partySeniorityObj = {},
                partyBranchObj = {},
                iconObj = {},
                phoneObj = {}
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
                        case 'border':
                            IDM.style.setBorderStyle(styleObject, element)
                            break
                        case 'box':
                            IDM.style.setBoxStyle(styleObject, element)
                            break
                        case 'boxShadow':
                            styleObject['box-shadow'] = element
                            break
                        case 'bgColor':
                            if (element && element.hex8) {
                                styleObject['background-color'] = IDM.hex8ToRgbaString(element.hex8) + ' !important'
                            }
                            break
                        // 头像样式
                        case 'avatarWidth':
                            avatarObj['width'] = this.getAdaptiveSize(element) + 'px'
                            break
                        case 'avatarHeight':
                            avatarObj['height'] = this.getAdaptiveSize(element) + 'px'
                            break
                        case 'avatarBorder':
                            IDM.style.setBorderStyle(avatarObj, element)
                            break
                        case 'avatarBox':
                            IDM.style.setBoxStyle(avatarObj, element)
                            break
                        // 用户昵称
                        case 'usernameBox':
                            IDM.style.setBoxStyle(usernameObj, element)
                            break
                        case 'usernameFont':
                            IDM.style.setFontStyle(usernameObj, element)
                            this.adaptiveFontSize(usernameObj, element)
                            break
                        // 党龄
                        case 'yearBox':
                            IDM.style.setBoxStyle(partySeniorityObj, element)
                            break
                        case 'yearFont':
                            IDM.style.setFontStyle(partySeniorityObj, element)
                            this.adaptiveFontSize(partySeniorityObj, element)
                            break
                        // 支部
                        case 'branchBox':
                            IDM.style.setBoxStyle(partyBranchObj, element)
                            break
                        case 'branchFont':
                            IDM.style.setFontStyle(partyBranchObj, element)
                            this.adaptiveFontSize(partyBranchObj, element)
                            break
                        // phone
                        case 'phoneBox':
                            IDM.style.setBoxStyle(phoneObj, element)
                            break
                        case 'phoneFont':
                            IDM.style.setFontStyle(phoneObj, element)
                            this.adaptiveFontSize(phoneObj, element)
                            break
                        // icon
                        case 'iconSize':
                            iconObj['width'] = this.getAdaptiveSize(element) + 'px'
                            iconObj['height'] = this.getAdaptiveSize(element) + 'px'
                            break
                        case 'iconColor':
                            if (element && element.hex8) {
                                iconObj['fill'] = IDM.hex8ToRgbaString(element.hex8)
                            }
                            break
                        case 'iconBox':
                            IDM.style.setBoxStyle(iconObj, element)
                            break
                    }
                }
            }
            window.IDM.setStyleToPageHead(this.moduleObject.id, styleObject)
            window.IDM.setStyleToPageHead(this.moduleObject.id + ' .idm-my-message-avatar', avatarObj)
            window.IDM.setStyleToPageHead(this.moduleObject.id + ' .idm-my-message-username', usernameObj)
            window.IDM.setStyleToPageHead(this.moduleObject.id + ' .idm-my-message-year', partySeniorityObj)
            window.IDM.setStyleToPageHead(this.moduleObject.id + ' .idm-my-message-branch', partyBranchObj)
            window.IDM.setStyleToPageHead(this.moduleObject.id + ' .idm-my-message-icon', iconObj)
            window.IDM.setStyleToPageHead(this.moduleObject.id + ' .idm-my-message-phone', phoneObj)
            this.initData()
        },
        reload() {
            //请求数据源
            this.initData()
        },
        initData() {
            if (this.moduleObject.env !== 'production') {
                this.pageData = getMyMessageTopData.call(this)
                return
            }
            window.IDM.http
                .post(
                    getDatasInterfaceUrl,
                    {
                        id: this.propData.dataSource && this.propData.dataSource.value,
                        limit: this.propData.limit,
                        start: 0
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
                        this.pageData = res.data.data
                    } else {
                        IDM.message.error(res.data.message)
                    }
                })
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
                    '.' + themeNamePrefix + item.key + (` #${this.moduleObject.id}` || 'module_demo'),
                    {
                        background: item.mainColor ? IDM.hex8ToRgbaString(item.mainColor.hex8) : ''
                    }
                )
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
