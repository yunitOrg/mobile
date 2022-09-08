# tab列表组件
此组件为移动端 排行榜

## 组件类名（className）
IHeadList

## 组件类ID（classId）
idm.componet.mobile.iheadlist

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


### 数据源 接口返回格式需要按照以下要求：

性别字段填写如：type == '1'  意思表示： type == 1 用man图标 否则是其他图标
个人页签ID: 是 数据返回数据的id   如下就填写： 
```json
{
  "code": "200",
  "type": "success",
  "message": "操作成功",
  "metadata": null,
  "token": "",
  "data": [
    {
      "img": "xxx", // 头像
      "author": "", // 作者
      "desc": "", // 描述
      "type": "1", // 男
      "tag": "书记,组织部",
      "active": "已激活"
    },
    {
      "id": 2,
      "headImg": "xxx", // 头像
      "title": "", // 标题
      "desc": "", // 描述
      "type": "2", // 女
      "tag": "书记",
      "active": "未激活" 
    }
  ]
}

```
