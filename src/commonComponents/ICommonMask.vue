<script>
export default {
    name: 'ICommonMask',
    props: {
        moduleObject: {
            type: Object,
            required: true
        },
        propData: {
            type: Object,
            required: true
        },
        text: {
            type: String,
            default: '！未绑定数据源'
        }
    },
    render(h) {
        if (
            !this.propData?.dataSource?.[0]?.id &&
            this.moduleObject.env === 'develop' &&
            this.propData.dataType !== 'customInterface' && this.propData.dataType !== 'customFunction'
        ) {
            return h(
                'div',
                {
                    class: 'common-list-mask'
                },
                [h('span', this.text)]
            )
        }
        return ''
    }
}
</script>

<style lang="scss">
.common-list-mask {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
    background: rgba(0, 0, 0, 0.3);
    display: flex;
    justify-content: center;
    align-items: center;
    span {
        padding: 6px 20px;
        color: #e6a23c;
        background: #fdf6ec;
        border: 1px solid #f5dab1;
        border-radius: 4px;
    }
}
</style>
