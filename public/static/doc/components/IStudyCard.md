# 活动统计
## 组件数据源配置
显示字段: data

视频图片: image

播放量: amountOfPlay

发布时间: releaseDate

视频详情: videoIntroduction

视频跳转url字段无需设置，与后端传入字段同名

数据源应为:
```
{
    data:[
    {
        image:"url",
        amountOfPlay:1500,
        releaseDate:"2022-9-7",
        videoIntroduction:"浙江宁波：植物观察 地质探索 假期研学快乐多",
        jumpUrl:"url"
    },
    {
        image:"url",
        amountOfPlay:1500,
        releaseDate:"2022-9-7",
        videoIntroduction:"浙江宁波：植物观察 地质探索 假期研学快乐多",
        jumpUrl:"url"
    }......
    ]
}
```