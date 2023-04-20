<template>
    <div
        idm-ctrl="idm_module"
        class="idm-dialog-congratulate"
        :id="moduleObject.id"
        ref="content"
        :idm-ctrl-id="moduleObject.id"
    >
        <img
            :src="IDM.url.getWebPath(componentData.avatar)"
            v-if="propData.styleType === 'politicalBirthday'"
            class="idm-dialog-congratulate-avatar"
            alt="头像加载失败"
        />
        <div class="idm-dialog-congratulate-username" v-if="propData.styleType === 'politicalBirthday'">
            {{ componentData.username }}
        </div>
        <div class="idm-dialog-congratulate-text" v-html="textFilter(propData.congratulateText)"></div>
        <div class="d-flex just-a idm-dialog-congratulate-btn-group">
            <div v-if="propData.isShowLeftBtn" class="idm-dialog-congratulate-left-btn" @click="handleClose">
                {{ propData.leftBtnText }}
            </div>
            <div v-if="propData.isShowRightBtn" class="idm-dialog-congratulate-right-btn" @click="handleSave">
                {{ propData.rightBtnText }}
            </div>
        </div>
    </div>
</template>

<script>
import html2Canvas from 'html2canvas'
export default {
    data() {
        return {
            moduleObject: {},
            propData: this.$root.propData.compositeAttr || {
                styleType: 'politicalBirthday',
                congratulateText: '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;今天是您的政治生日，祝贺您加入中国共产党@[year]周年！\r\n \r\n@[empName]党支部向您致以真挚的问候！\r\n \r\n希望您不忘初心，牢记使命，永葆共产党员的先进本色',
                avatarWidth: '80px',
                avatarHeight: '80px'
            },
            dialogVisible: false,
            componentData: {}
        }
    },
    created() {
        this.moduleObject = this.$root.moduleObject
        this.convertAttrToStyleObject()
        this.convertThemeListAttrToStyleObject()
    },
    // mounted() {
    //     if (this.propData.showFlag) {
    //         localStorage.setItem('msgDialog', false);
    //     }
    // },
    methods: {
        textFilter(text) {
            if (!text) return ''
            console.log(text, this.componentData)
            text = text.replace(/\r/gi, '').replace(/\n/gi, '<br/>')
            text = text.replace(/@\[.*\]/gi, (str) => {
                if (str.length < 4) return str
                return IDM.express.replace(str, this.componentData, true)
            })
            return text
        },
        handleClose() {
            if (this.moduleObject.env === 'develop') return
            if (this.propData.customLeftBtnEvent && this.propData.customLeftBtnEvent.length > 0) {
                const funcName = this.propData.customLeftBtnEvent[0].name
                if (window[funcName]) {
                    const result = window[funcName].call(this, {})
                    if (!result) return
                }
            }
            this.closeMyDialog()
            this.dialogVisible = false
        },
        handleOpen() {
            if (this.moduleObject.env === 'develop') return
            if (this.propData.showFlag) {
                let flag = localStorage.getItem('msgDialog');
                if (flag) {
                    this.closeMyDialog()
                    this.dialogVisible = false
                } else {
                    this.dialogVisible = true
                    this.openMyDialog()
                }
                
            } else {
                this.dialogVisible = true
                this.openMyDialog()
            }
        },
        handleSave() {
            if (this.moduleObject.env === 'develop') return
            if (this.propData.customRightBtnEvent && this.propData.customRightBtnEvent.length > 0) {
                const funcName = this.propData.customRightBtnEvent[0].name
                if (window[funcName]) {
                    const result = window[funcName].call(this, {})
                    if (!result) return
                }
            }
            this.$nextTick(() => {
                const ref = this.$refs.content
                html2Canvas(ref, {
                    backgroundColor: 'transparent',
                    useCORS: true
                }).then((canvas) => {
                    const dataURL = canvas.toDataURL('image/png')
                    const createDom = document.createElement('a')
                    document.body.appendChild(createDom)
                    createDom.href = dataURL
                    createDom.download = '祝福图片'
                    createDom.click()
                })
            })
        },
        propDataWatchHandle(propData) {
            this.propData = propData.compositeAttr || {}
            this.convertAttrToStyleObject()
            this.convertThemeListAttrToStyleObject()
        },
        convertAttrToStyleObject() {
            const styleObject = {},
                leftBtnObj = {},
                rightBtnObj = {},
                avatarObj = {},
                usernameObj = {},
                congratulateObj = {}

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
                        case 'bgColor':
                            if (element && element.hex8) {
                                styleObject['background-color'] = element.hex8
                            }
                            break
                        case 'bgImgUrl':
                            if (element === 'defaultImage') {
                                if (this.propData.styleType === 'politicalBirthday') {
                                    styleObject['background-image'] = `url(${IDM.url.getModuleAssetsWebPath(
                                        require('../assets/zhengzhishengri.png'),
                                        this.moduleObject
                                    )}`
                                } else {
                                    styleObject['background-image'] = `url(${IDM.url.getModuleAssetsWebPath(
                                        require('../assets/renwushengri.png'),
                                        this.moduleObject
                                    )}`
                                }
                            } else {
                                styleObject['background-image'] = `url(${window.IDM.url.getWebPath(element)})`
                            }
                            break
                        case 'positionX':
                            //背景横向偏移

                            break
                        case 'positionY':
                            //背景纵向偏移

                            break
                        case 'bgRepeat':
                            //平铺模式
                            styleObject['background-repeat'] = element
                            break
                        case 'bgAttachment':
                            //背景模式
                            styleObject['background-attachment'] = element
                            break
                        case 'width':
                        case 'height':
                            styleObject[key] = element;
                            break
                        case 'dialogIndex':
                            styleObject['z-index'] = element;
                            break
                        // 左侧按钮
                        case 'leftBtnBg':
                            if (element && element.hex8) {
                                leftBtnObj['background'] = element.hex8
                            }
                            break
                        case 'leftBtnBox':
                            IDM.style.setBoxStyle(leftBtnObj, element)
                            break
                        case 'leftBtnBorder':
                            IDM.style.setBorderStyle(leftBtnObj, element)
                            break
                        case 'leftBtnFont':
                            IDM.style.setFontStyle(leftBtnObj, element)
                            break
                        // 右侧按钮
                        case 'rightBtnBg':
                            if (element && element.hex8) {
                                rightBtnObj['background'] = element.hex8
                            }
                            break
                        case 'rightBtnBox':
                            IDM.style.setBoxStyle(rightBtnObj, element)
                            break
                        case 'rightBtnBorder':
                            IDM.style.setBorderStyle(rightBtnObj, element)
                            break
                        case 'rightBtnFont':
                            IDM.style.setFontStyle(rightBtnObj, element)
                            break
                        // 用户头像
                        case 'avatarWidth':
                            avatarObj['width'] = element
                            break
                        case 'avatarHeight':
                            avatarObj['height'] = element
                            break
                        case 'avatarBox':
                            IDM.style.setBoxStyle(avatarObj, element)
                            break
                        case 'avatarBorder':
                            IDM.style.setBorderStyle(avatarObj, element)
                            break
                        // 用户昵称
                        case 'usernameBox':
                            IDM.style.setBoxStyle(usernameObj, element)
                            break
                        case 'usernameFont':
                            IDM.style.setFontStyle(usernameObj, element)
                            break
                        // 祝福文字
                        case 'congratulateBox':
                            IDM.style.setBoxStyle(congratulateObj, element)
                            break
                        case 'congratulateFont':
                            IDM.style.setFontStyle(congratulateObj, element)
                            break
                    }
                }
            }
            window.IDM.setStyleToPageHead(this.moduleObject.id, styleObject)
            window.IDM.setStyleToPageHead(this.moduleObject.id + ' .idm-dialog-congratulate-left-btn', leftBtnObj)
            window.IDM.setStyleToPageHead(this.moduleObject.id + ' .idm-dialog-congratulate-right-btn', rightBtnObj)
            window.IDM.setStyleToPageHead(this.moduleObject.id + ' .idm-dialog-congratulate-avatar', avatarObj)
            window.IDM.setStyleToPageHead(this.moduleObject.id + ' .idm-dialog-congratulate-username', usernameObj)
            window.IDM.setStyleToPageHead(this.moduleObject.id + ' .idm-dialog-congratulate-text', congratulateObj)
            this.initData()
        },
        initData() {
            if (this.moduleObject.env !== 'production') {
                this.componentData = {
                    username: '陈独秀',
                    avatar: IDM.url.getModuleAssetsWebPath(require('../assets/default-avatar.png'), this.moduleObject),
                    year: '五',
                    empName: '梦创'
                }
                return
            }

            switch (this.propData.dialogShowType) {
                case 'dataSource':
                    IDM.datasource.request(this.propData.dataSource[0]?.id, {
                        moduleObject: this.moduleObject,
                        param: {
                            limit: this.propData.limit,
                            start: 0
                        }
                    }, (data) => {
                        this.isLoading = false;
                        if (data) {
                            if (data[this.propData.isShowDialog]) {
                                this.componentData = data;
                                this.handleOpen()
                                if (this.propData.showFlag) {
                                    localStorage.setItem('msgDialog', true);
                                }
                            }
                        }
                    })
                    break
                case 'action':
                    if (this.propData.dialogFun && this.propData.dialogFun.length > 0) {
                        const funcName = this.propData.dialogFun[0].name
                        if (window[funcName]) {
                            const result = window[funcName].call(this, {})
                            if (result[this.propData.isShowDialog]) {
                                this.componentData = result
                                this.handleOpen()
                                if (this.propData.showFlag) {
                                    localStorage.setItem('msgDialog', true);
                                }
                            }
                        }
                    }
                    break
            }
        },
        /**
         * 调用IDM提供的内置关闭方法
         */
        closeMyDialog(isOk) {
            window.IdmBuiltin_CloseDialog({
                targetModule: [{ moduleId: this.moduleObject.packageid, moduleName: this.moduleObject.asName }],
                isOkEvent: isOk
            })
        },
        /**
         * 调用IDM提供的内置打开方法
         */
        openMyDialog(isOk) {
            window.IdmBuiltin_OpenDialog({
                targetModule: [{ moduleId: this.moduleObject.packageid, moduleName: this.moduleObject.asName }],
                isOkEvent: isOk
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
                let bgColorObj = {
                    background: item.mainColor ? IDM.hex8ToRgbaString(item.mainColor.hex8) : ''
                }
                IDM.setStyleToPageHead(
                    '.' +
                        themeNamePrefix +
                        item.key +
                        (` #${this.moduleObject.id}` || 'module_demo') +
                        ' .idm-dialog-congratulate-right-btn',
                    bgColorObj
                )
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.idm-dialog-congratulate {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
}
.idm-dialog-congratulate-btn-group {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
}
</style>
