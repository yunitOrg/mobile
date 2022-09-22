# tab列表组件
此组件为移动端 积分明细

## 组件类名（className）
IntegralDetal

## 组件类ID（classId）
idm.component.mobile.integralDetal

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
    "scoreAll": 4651, // 总数
    "list":[
        {
            "title": "阅读文章",
            "time": "2022-06-30 23:59:59",
            "score": "1"
        },
         {
            "title": "阅读文章",
            "time": "2022-06-30 23:59:59",
            "score": "1"
        },
         {
            "title": "阅读文章",
            "time": "2022-06-30 23:59:59",
            "score": "1"
        },
         {
            "title": "阅读文章",
            "time": "2022-06-30 23:59:59",
            "score": "1"
        }
    ]
  }
}

```



