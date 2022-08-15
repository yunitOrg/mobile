export default {
    data() {
        return {
            isLoading: true
        }
    },
    methods: {
        /**
         * 获取自定义字段值
         * @param {*} field 自定义字段
         * @param {*} dataObject 数据对象
         * @returns 对应字段的值
         */
        getDataField(field, dataObject) {
            if (!dataObject || !field) return ''
            return IDM.express.replace(`@[${field}]`, dataObject, true)
        },
        /**
         * 点击，列表单项事件
         * @param {*} item 列表单项数据
         * @returns
         */
        handleItemClick(item) {
            let url = this.getDataField(this.propData.jumpUrlField, item)
            if (!url) return
            url = IDM.url.getWebPath(url)
            window.open(url)
        },
        /**
         * 点击更多事件
         */
        handleClickMore() {
            let url = this.getDataField(this.propData.moreUrlField, this.pageData)
            if (!url) return
            url = IDM.url.getWebPath(url)
            window.open(url)
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
        },
        /**
         * 通用的获取表达式匹配后的结果
         */
         getExpressData(dataName, dataFiled, resultData) {
            //给defaultValue设置dataFiled的值
            var _defaultVal = undefined
            if (dataFiled) {
                var filedExp = dataFiled
                filedExp = dataName + (filedExp.startsWiths('[') ? '' : '.') + filedExp
                var dataObject = { IDM: window.IDM }
                dataObject[dataName] = resultData
                _defaultVal = window.IDM.express.replace.call(this, '@[' + filedExp + ']', dataObject)
            }

            return _defaultVal
        },
        sendBroadcastMessage(object) {
            window.IDM.broadcast && window.IDM.broadcast.send(object)
        },
        // 列表组件统一接受消息
        receiveBroadcastMessage(messageObject) {
            switch (messageObject.type) {
                case 'websocket':
                    if (this.propData.messageRefreshKey && messageObject.message) {
                        const messageData =
                            (typeof messageObject.message === 'string' && JSON.parse(messageObject.message)) ||
                            messageObject.message
                        const arr = Array.isArray(this.propData.messageRefreshKey)
                            ? this.propData.messageRefreshKey
                            : [this.propData.messageRefreshKey]
                        if (messageData.badgeType && arr.includes(messageData.badgeType)) {
                            this.initData()
                        }
                    }
                    break
                case 'linkageReload':
                    this.initData()
                    break
                case 'pageResize':
                    this.pageWidth = messageObject.message.width
                    this.convertAttrToStyleObject()
                    break
            }
            console.log('组件收到消息', messageObject)
        },
    }
}
