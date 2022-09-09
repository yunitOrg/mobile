export function getBannerData() {
    const _this = this
    return {
        value: [
            {
                jumpUrl: '',
                image: IDM.url.getModuleAssetsWebPath(require('../assets/banner1.jpg'), _this.moduleObject)
            },
            {
                jumpUrl: '',
                image: IDM.url.getModuleAssetsWebPath(require('../assets/banner2.jpg'), _this.moduleObject)
            },
            {
                jumpUrl: '',
                image: IDM.url.getModuleAssetsWebPath(require('../assets/banner3.jpg'), _this.moduleObject)
            }
        ]
    }
}

export function getCommonListData() {
    const _this = this
    return {
        // 样式一 mock
        value1: [
            {
                jumpUrl: '',
                title: '第三次党员大会',
                location: '梦创双杨会议室',
                personNumber: 14,
                time: '2022-07-22 10:30-11:30',
                image: IDM.url.getModuleAssetsWebPath(require('../assets/banner1.jpg'), _this.moduleObject)
            },
            {
                jumpUrl: '',
                title: '第三次党员大会',
                location: '梦创双杨会议室',
                personNumber: 14,
                time: '2022-07-22 10:30-11:30',
                image: IDM.url.getModuleAssetsWebPath(require('../assets/banner2.jpg'), _this.moduleObject)
            },
            {
                jumpUrl: '',
                title: '第三次党员大会',
                location: '梦创双杨会议室',
                personNumber: 14,
                time: '2022-07-22 10:30-11:30',
                image: IDM.url.getModuleAssetsWebPath(require('../assets/banner3.jpg'), _this.moduleObject)
            }
        ],
        // 样式二 mock
        value2: [
            {
                jumpUrl: '',
                title: '学习贯彻习主席“七一”重要讲话精神',
                process: '60%',
                time: '今天12:00',
                image: IDM.url.getModuleAssetsWebPath(require('../assets/banner1.jpg'), _this.moduleObject)
            },
            {
                jumpUrl: '',
                title: '2021年中组部《党课开讲啦》第二讲 百年大党不忘初心，砥砺前行',
                process: '25%',
                time: '今天11:20',
                image: IDM.url.getModuleAssetsWebPath(require('../assets/banner2.jpg'), _this.moduleObject)
            },
            {
                jumpUrl: '',
                title: '《党课开讲啦》节目第1期：当的光辉历程',
                process: '30%',
                time: '今天09:17',
                image: IDM.url.getModuleAssetsWebPath(require('../assets/banner3.jpg'), _this.moduleObject)
            }
        ],
        count: 3,
        moreUrl: ''
    }
}

export function getContentListData() {
    const _this = this
    return {
        value: [
            {
                jumpUrl: '',
                title: '黄浦区半淞园路街道：党员先锋我先行，助力进博添风采',
                origin: '黄埔区委组织部',
                time: '2022-07-22',
                images: []
            },
            {
                jumpUrl: '',
                title: '深入学习贯彻党的十九届六中全会精神',
                origin: '上海发布',
                time: '2021-12-22',
                images: [IDM.url.getModuleAssetsWebPath(require('../assets/banner1.jpg'), _this.moduleObject)]
            },
            {
                jumpUrl: '',
                title: '闵行莘庄：“莘长征路上” 再出发  深化“两新”党员学党史, 闵行莘庄：“莘长征路上” 再出发  深化“两新”党员学党史, 闵行莘庄：“莘长征路上” 再出发  深化“两新”党员学党史',
                origin: '闵行区委组织部',
                time: '2022-01-22',
                images: [
                    IDM.url.getModuleAssetsWebPath(require('../assets/banner3.jpg'), _this.moduleObject),
                    IDM.url.getModuleAssetsWebPath(require('../assets/banner2.jpg'), _this.moduleObject),
                    IDM.url.getModuleAssetsWebPath(require('../assets/banner1.jpg'), _this.moduleObject)
                ]
            }
        ],
        count: 3,
        moreUrl: ''
    }
}

export const todoData = {
    value: [
        {
            jumpUrl: '',
            readStatus: '0',
            moduleName: '党费缴纳',
            title: '您已经连续两个月没有交党费了，您已经连续两个月没有交党费了，您已经连续两个月没有交党费了。请尽快缴纳党费，请尽快缴纳党费，请尽快缴纳党费，重要的事说三遍'
        },
        {
            jumpUrl: '',
            moduleName: '组织生活',
            readStatus: '1',
            title: '您已经连续两个月没有参加活动了'
        }
    ],
    count: 2,
    moreUrl: ''
}

export const activityData = {
    value: [
        {
            time: '10.12',
            weekDay: '周三',
            signStatusText: '已报名',
            title: '第三次党员大会',
            tags: ['党员大会', '组织生活会'],
            location: '控江路街道社区党群服务中心',
            jumpUrl: '',
            activityStatus: '1',
            activityText: '活动中',
            userStatus: '',
            userStatusText: '',
            personNumber: 65
        },
        {
            time: '10.12',
            weekDay: '周三',
            signStatusText: '未报名',
            title: '第三次党员大会',
            tags: ['党员大会', '组织生活会'],
            location: '控江路街道社区党群服务中心',
            jumpUrl: '',
            activityStatus: '0',
            activityText: '未开始',
            userStatus: '0',
            userStatusText: '请假中',
            personNumber: 65
        },
        {
            time: '10.12',
            weekDay: '周三',
            signStatusText: '未报名',
            title: '第三次党员大会',
            tags: ['党员大会', '组织生活会'],
            location: '控江路街道社区党群服务中心',
            jumpUrl: '',
            activityStatus: '2',
            activityText: '已结束',
            userStatus: '1',
            userStatusText: '缺席',
            personNumber: 65
        }
    ],
    count: 3,
    moreUrl: ''
}

export function getMyMessageTopData() {
    const _this = this
    return {
        avatar: IDM.url.getModuleAssetsWebPath(require('../assets/default-avatar.png'), _this.moduleObject),
        username: '陈独秀',
        partySeniority: 5,
        partyBranch: '梦创'
    }
}

export const historyTodayData = {
    date: '5月17日',
    jumpUrl: '',
    content:
        '2010年5月17日至19日 中共中央,国务院在北京召开新疆工作座谈会,2010年5月17日至19日中共中央,国务院在北京召开新疆工作座谈会2010年5月17日至19日 中共中央,国务院在北京召开新疆工作座谈会'
}
