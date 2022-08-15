export default {
    data() {
        return {
            pageWidth: null
        }
    },
    methods: {
        /**
         * @param {*} initSize 配置的初始尺寸
         * @param {*} ratio    配置的适配比例
         * @returns  计算后的尺寸 type Number
         */
        getAdaptiveSize(initSize, ratio = 0) {
            if (this.moduleObject.env == 'develop' && !this.pageWidth) return initSize
            initSize = Number(initSize)
            const WINDOW_WIDTH = this.pageWidth || window.innerWidth // 当前屏幕宽度
            const BASE_SIZE = Number(this.propData.baseSize) || 414 // 配置屏幕基准值宽度
            const ADAPTATION_RATIO = ratio || Number(this.propData.adaptationRatio) || 1.2 // 配置适配比例
            const FINAL_RESULT = initSize * ((WINDOW_WIDTH / BASE_SIZE - 1) * (ADAPTATION_RATIO - 1) + 1)
            if (!WINDOW_WIDTH || !BASE_SIZE || !ADAPTATION_RATIO || window.isNaN(FINAL_RESULT)) {
                // console.error(`
                //   In ${this.$options.name} Calculate's params error
                //   WINDOW_WIDTH      ---->  ${WINDOW_WIDTH}
                //   BASE_SIZE         ---->  ${BASE_SIZE}
                //   ADAPTATION_RATIO  ---->  ${ADAPTATION_RATIO}
                //   FINAL_RESULT      ---->  ${FINAL_RESULT}
                // `)
                return initSize
            }
            return Math.round(FINAL_RESULT)
        }
    }
}
