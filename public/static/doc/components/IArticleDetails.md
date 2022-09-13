# 饼状图

文章详情。

## 组件类名（className）

IArticleDetails

## 组件类 ID（classId）

idm.componet.basics.articleDetails

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

<font color="#CCCCCC">此章节主要用于存放设置组件所需要的一些基本信息的属性，以达到组件具备使用的基础条件</font>

#### 数据源【dataSource】

用于选择组件的数据源。
入参：

```json
{
  "id": "数据源id",
  "pageId": "当前页面的唯一标识",
  "...urlObject": "当前页面的网址url携带的参数",
  "...routerParam": "单页面跳转携带的参数"
}
```

接口返回格式示例：

```json
{
  "code": "200",
  "type": "success",
  "message": "操作成功",
  "metadata": null,
  "token": "",
  "data": {
    "title": "标题",
    "content": "<span>html标签包裹的文本</span>",
    "author": "作者",
    "time": "2022-08-15 09:03",
    ...
  }
}
```

- ⚠ <font color="#FF0000">**_注意事项：_**</font>
  <font color="#FF0000">如果格式有差异，请使用自定义函数，并返回正确格式的数据</font>
