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
            tags: ['党员大会', '组织生活会', '民主生活会','社区生活会','党员生活会'],
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
        partySeniority: '党龄：5年',
        partyBranch: '梦创党支部'
    }
}

export const historyTodayData = {
    date: '05月17日',
    jumpUrl: '',
    content:
        '2010年5月17日至19日 中共中央,国务院在北京召开新疆工作座谈会,2010年5月17日至19日中共中央,国务院在北京召开新疆工作座谈会2010年5月17日至19日 中共中央,国务院在北京召开新疆工作座谈会'
}

export function getCheckboxCardData() {
    const _this = this
    return [
        {
            title: '第三次党员大会',
            isCheck: true,
            children: [
                {
                    username: '陈独秀',
                    avatar: IDM.url.getModuleAssetsWebPath(require('../assets/default_avatar.png'), _this.moduleObject),
                    content: '关于《2021年9月党小组会》的请假单：因工作出差在外，无法参加活动，望批准。',
                    time: '2022-09-24',
                    isCheck: true
                },
                {
                    username: '陈独秀',
                    avatar: IDM.url.getModuleAssetsWebPath(require('../assets/default_avatar.png'), _this.moduleObject),
                    content: '关于《2021年9月党小组会》的请假单：因工作出差在外，无法参加活动，望批准。',
                    time: '2022-09-24',
                    isCheck: true
                }
            ]
        },
        {
            title: '第三次党员大会',
            isCheck: true,
            children: [
                {
                    username: '陈独秀',
                    avatar: IDM.url.getModuleAssetsWebPath(require('../assets/default_avatar.png'), _this.moduleObject),
                    content: '关于《2021年9月党小组会》的请假单：因工作出差在外，无法参加活动，望批准。',
                    time: '2022-09-24',
                    isCheck: true
                },
                {
                    username: '陈独秀',
                    avatar: IDM.url.getModuleAssetsWebPath(require('../assets/default_avatar.png'), _this.moduleObject),
                    content: '关于《2021年9月党小组会》的请假单：因工作出差在外，无法参加活动，望批准。',
                    time: '2022-09-24',
                    isCheck: true
                },
                {
                    username: '陈独秀',
                    avatar: IDM.url.getModuleAssetsWebPath(require('../assets/default_avatar.png'), _this.moduleObject),
                    content: '关于《2021年9月党小组会》的请假单：因工作出差在外，无法参加活动，望批准。',
                    time: '2022-09-24',
                    isCheck: true
                }
            ]
        }
    ]
}

export const signinData = {
    questionTitle:
        '1978年5月11日，《光明日报》发表题为（）的特约评论员文章，从根本上否定了“两个凡是”的错误方针，揭开了真理标准讨论的序幕。',
    questionOptions: [
        {
            text: '《实践是检验真理的唯一标准》',
            code: 'A'
        },
        {
            text: '《一切主管世界的东西都要接受实践的检验》',
            code: 'B'
        },
        {
            text: '《马克思主义的一个最基本的原则》',
            code: 'C'
        }
    ],
    hasSignedDays: [
        {
            type: 'normal',
            date: '1661961600'
        },
        {
            type: 'special',
            date: '1662048000'
        },
        {
            type: 'normal',
            date: '1662393600'
        },
        {
            type: 'normal',
            date: '1662480000'
        },
        {
            type: 'normal',
            date: '1662566400'
        },
        {
            type: 'special',
            date: '1662652800'
        }
    ]
}

// 我的积分
export const integralData = {
    allData: 4551,
    dateintegral: 3,
    list: [
        {
            name: '登录',
            desc: ['每日首次登录1分'],
            type: '已完成'
        },
        {
            name: '阅读文章',
            desc: ['每浏览1篇文章积1分，每日上限5分', '每篇文章浏览不超过30秒不计分', '同一篇文章当天不重复积分'],
            type: '去看看',
            got: 2,
            online: '5'
        },
        {
            name: '观看视频',
            desc: ['每浏览1条视频积分1分，每日上限5分', '每条视频观看不超过30秒不计分', '同一篇视频当天不重复积分'],
            type: '去看看',
            got: 2,
            online: '5'
        },
    ]
}
// 我的积分详情
export const integralDetailData = {
    scoreAll: 4651,
    list:[
        {
            title: '阅读文章',
            time: '2022-06-30 23:59:59',
            score: '1'
        },
        {
            title: '阅读文章',
            time: '2022-06-30 23:59:59',
            score: '1'
        },
        {
            title: '阅读文章',
            time: '2022-06-30 23:59:59',
            score: '1'
        },
        {
            title: '阅读文章',
            time: '2022-06-30 23:59:59',
            score: '1'
        }
    ]
}

export const getTreeData = [
    {
        title: '0-0',
        key: '0-0',
        children: [
            {
                title: '0-0-0',
                key: '0-0-0',
                children: [
                    { title: '0-0-0-0-习近平在省部级主要领导干部“学习习近平总书记习近平在省部级主要领导干部“学习习近平总……习近平在省部级主要领导干部“学习习近平总书记习近平在省部级主要领导干部“学习习近平总……', key: '0-0-0-0' },
                    { title: '0-0-0-1-主要领导干部“学习习近平总……', key: '0-0-0-1' },
                    { title: '0-0-0-2', key: '0-0-0-2' },
                ]
            },
            {
                title: '0-0-1',
                key: '0-0-1',
                children: [
                    { title: '0-0-1-0', key: '0-0-1-0' },
                    { title: '0-0-1-1', key: '0-0-1-1' },
                    { title: '0-0-1-2', key: '0-0-1-2' },
                ]
            },
        ],
    },
    {
        title: '1-0-1',
        key: '1-0-1',
        children: [
            { title: '1-0-1-0', key: '1-0-1-0' },
            { title: '1-0-1-1', key: '1-0-1-1' },
            { title: '1-0-1-2', key: '1-0-1-2' },
        ]
    },
]
