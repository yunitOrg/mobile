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
        }
    }
}
