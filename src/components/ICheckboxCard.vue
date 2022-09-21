<template>
    <div idm-ctrl="idm_module" :id="moduleObject.id" :idm-ctrl-id="moduleObject.id">
        <ICheckboxCardItem
            v-for="(item, index) in componentData"
            :key="index"
            :itemData="item"
            :itemIndex="index"
            :propData="propData"
            :moduleObject="moduleObject"
            @itemDataChange="itemDataChange"
            @subItemChange="subItemChange"
        ></ICheckboxCardItem>
        <!-- empty placeholder -->
        <ICommonEmpty
            v-if="!isFirst && !isLoading && componentData.length === 0"
            :moduleObject="moduleObject"
            :propData="propData"
        ></ICommonEmpty>
        <!-- page loading -->
        <div class="d-flex just-c" v-if="isLoading">
            <van-loading size="24px" vertical>加载中...</van-loading>
        </div>
        <ICommonMask :moduleObject="moduleObject" :propData="propData"></ICommonMask>
    </div>
</template>
<script>
import ICheckboxCardItem from '../commonComponents/ICheckboxCardItem'
import { getCheckboxCardData } from '../mock/mockData'
import ICommonMask from '../commonComponents/ICommonMask'
import ICommonEmpty from '../commonComponents/ICommonEmpty'
import adaptationScreenMixin from '../mixins/adaptationScreen'
import { getDatasInterfaceUrl } from '@/api/config'
export default {
    name: 'ICheckboxCard',
    components: {
        ICheckboxCardItem,
        ICommonMask,
        ICommonEmpty
    },
    mixins: [adaptationScreenMixin],
    data() {
        return {
            moduleObject: {},
            propData: this.$root.propData.compositeAttr || {
                triggerComponents: []
            },
            isLoading: false, // page is loading
            isFirst: true, // page is first load
            componentData: []
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
        setAllCheckStatus(isCheck) {
            this.componentData = this.componentData.map((el) => {
                el.children = el.children.map((els) => ({ ...els, isCheck }))
                return { ...el, isCheck }
            })
        },
        itemDataChange({ itemIndex }) {
            const currentChildren = _.cloneDeep(this.componentData[itemIndex].children)
            const value = this.componentData[itemIndex].isCheck
            if (value) {
                currentChildren.forEach((el) => (el.isCheck = true))
            } else {
                currentChildren.forEach((el) => (el.isCheck = false))
            }
            this.$set(this.componentData[itemIndex], 'children', currentChildren)
            this.sendMessageToFootBtn()
        },
        subItemChange({ itemIndex, index }) {
            const currentItem = _.cloneDeep(this.componentData[itemIndex])
            const value = currentItem.children[index].isCheck
            const isAllCheck = currentItem.children.every((el) => el.isCheck)
            if (value && isAllCheck) currentItem.isCheck = true
            else currentItem.isCheck = false
            this.$set(this.componentData, itemIndex, currentItem)
            this.sendMessageToFootBtn()
        },
        sendMessageToFootBtn() {
            if (this.propData.triggerComponents.length === 0) {
                return IDM.message.warning(`请配置${this.moduleObject.comName}的联动组件`)
            }
            this.sendBroadcastMessage({
                type: 'i-checkbox-card-change',
                rangeModule: this.propData.triggerComponents.map((el) => el.moduleId),
                message: {
                    total: this.componentData.length,
                    selectNumber: this.componentData.filter((el) => el.isCheck).length
                }
            })
        },
        convertAttrToStyleObject() {
            const styleObject = {},
                subObj = {},
                usernameObj = {},
                timeObj = {},
                titleTextObj = {},
                iconObj = {},
                avatarObj = {},
                contentObj = {},
                clampObj = {},
                subLineObj = {}
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
                        // 单项样式
                        case 'subBoxShadow':
                            subObj['box-shadow'] = element
                            break
                        case 'subBgColor':
                            if (element && element.hex8) {
                                subObj['background-color'] = IDM.hex8ToRgbaString(element.hex8)
                            }
                            break
                        case 'subBox':
                            IDM.style.setBoxStyle(subObj, element)
                            break
                        case 'subBorder':
                            IDM.style.setBorderStyle(subObj, element)
                            break
                        case 'subLineBox':
                            IDM.style.setBoxStyle(subLineObj, element)
                            break

                        // 标题
                        case 'titleFont':
                            IDM.style.setFontStyle(titleTextObj, element)
                            this.adaptiveFontSize(titleTextObj, element)
                            break
                        case 'titleBox':
                            IDM.style.setBoxStyle(titleTextObj, element)
                            break
                        case 'titleBorder':
                            IDM.style.setBorderStyle(titleTextObj, element)
                            break
                        // 用户昵称
                        case 'usernameFont':
                            IDM.style.setFontStyle(usernameObj, element)
                            this.adaptiveFontSize(usernameObj, element)
                            break
                        case 'timeFont':
                            IDM.style.setFontStyle(timeObj, element)
                            this.adaptiveFontSize(timeObj, element)
                            break
                        // 图标
                        case 'iconBox':
                            IDM.style.setBoxStyle(iconObj, element)
                            break
                        // 头像
                        case 'avatarWidth':
                            avatarObj['width'] = element
                            break
                        case 'avatarHeight':
                            avatarObj['height'] = element
                            break
                        case 'avatarBorder':
                            IDM.style.setBorderStyle(avatarObj, element)
                            break
                        case 'avatarBox':
                            IDM.style.setBoxStyle(avatarObj, element)
                            break
                        // 内容
                        case 'contentBox':
                            IDM.style.setBoxStyle(contentObj, element)
                            break
                        case 'contentFont':
                            IDM.style.setFontStyle(contentObj, element)
                            this.adaptiveFontSize(contentObj, element)
                            break
                        case 'contentClamp':
                            clampObj['line-clamp'] = element
                            clampObj['-webkit-line-clamp'] = element
                            break
                    }
                }
            }
            window.IDM.setStyleToPageHead(this.moduleObject.id, styleObject)
            window.IDM.setStyleToPageHead(this.moduleObject.id + ' .idm-checkbox-card-item', subObj)
            window.IDM.setStyleToPageHead(this.moduleObject.id + ' .idm-checkbox-card-username', usernameObj)
            window.IDM.setStyleToPageHead(this.moduleObject.id + ' .idm-checkbox-card-time', timeObj)
            window.IDM.setStyleToPageHead(this.moduleObject.id + ' .idm-checkbox-card-checkbox', iconObj)
            window.IDM.setStyleToPageHead(this.moduleObject.id + ' .idm-checkbox-card-avatar', avatarObj)
            window.IDM.setStyleToPageHead(this.moduleObject.id + ' .idm-checkbox-card-content', contentObj)
            window.IDM.setStyleToPageHead(this.moduleObject.id + ' .text-o-e-2', clampObj)
            window.IDM.setStyleToPageHead(this.moduleObject.id + ' .idm-checkbox-card-title', titleTextObj)
            window.IDM.setStyleToPageHead(this.moduleObject.id + ' .idm-checkbox-card-sub', subLineObj)
            this.initData()
        },
        /**
         * theme color
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
                        ' .van-checkbox__icon--checked .van-icon',
                    {
                        color: '#FFFFFF',
                        'background-color': item.mainColor ? IDM.hex8ToRgbaString(item.mainColor.hex8) : '',
                        'border-color': item.mainColor ? IDM.hex8ToRgbaString(item.mainColor.hex8) : ''
                    }
                )
            }
        },
        reload() {
            this.initData()
        },
        initData() {
            if (this.moduleObject.env !== 'production') {
                this.componentData = getCheckboxCardData.call(this)
                return
            }
            this.isFirst = false
            this.isLoading = true
            window.IDM.http
                .post(
                    getDatasInterfaceUrl,
                    {
                        id: this.propData.dataSource && this.propData.dataSource.value,
                        ...IDM.router.getParam(this.moduleObject.routerId)
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
                        this.sendMessageToFootBtn()
                    } else {
                        IDM.message.error(res.data.message)
                    }
                })
                .finally(() => {
                    this.isLoading = false
                })
        },
        receiveBroadcastMessage(object) {
            switch (object.type) {
                case 'ifootbtn-all':
                    if (object.message) this.setAllCheckStatus(object.message.checkAll)
                    break
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
