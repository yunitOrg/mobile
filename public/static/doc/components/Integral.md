# tab列表组件
此组件为移动端 我的积分

## 组件类名（className）
Integral

## 组件类ID（classId）
idm.componet.mobile.integral

## 组件开发语言（comLangue）
vue

## 组件类型（comType）
common

## 所在代码包版本
mobile@1.0.0

## 组件属性

此章节主要介绍该组件的每个属性的含义以及如何使用说明

### 唯一标识【ctrlId】

只读属性，不可修改，作为每个组件实例的一个唯一标识
- 标识：`ctrlId`
- 默认值：`@[packageid]`

### 基本属性
数据源返回格式
```json
{
  "code": "200",
  "type": "success",
  "message": "操作成功",
  "metadata": null,
  "token": "",
  "data": {
    "allData": 4551, // 总积分
    "dateintegral": 3, // 今日获得3积分
    "list": [
        {
            "name": "登录", // 标题
            "desc": ["每日首次登录1分"], // 描述
            "type": "已完成" // 状态
        },
        {
            "name": "阅读文章",
            "desc": ["每浏览1篇文章积1分，每日上限5分", "每篇文章浏览不超过30秒不计分", "同一篇文章当天不重复积分"],
            "type": "去看看",
            "got": 2, // 已获得2积分
            "online": "5" // 每日上限5
        },
        {
            "name": "观看视频",
            "desc": ["每浏览1条视频积分1分，每日上限5分", "每条视频观看不超过30秒不计分", "同一篇视频当天不重复积分"],
            "type": "去看看",
            "got": 2,
            "online": "5"
        },
    ]
  }
}

```



