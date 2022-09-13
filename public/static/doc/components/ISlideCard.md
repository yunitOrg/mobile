# 滑动卡片

滑动卡片组件，支持上下滑动或左右滑动。

## 组件类名（className）

ISlideCard

## 组件类 ID（classId）

idm.componet.basics.slideCard

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

#### 显示模式【layoutType】

用于选择组件的滑动方向：

1. 左右滑动
2. 上下滑动

- 标识：`layoutType`
- 默认值：`左右滑动`

#### 展示列数【columNum】

左右滑动时可设置为 0，表示不固定列数，允许超出。上下滑动时则必须大于 0

- 标识：`columNum`
- 默认值：`3`

#### 显示标题【isShowTitleBar】

- 标识：`isShowTitleBar`
- 默认值：`true`

#### 组件标题【title】

- 标识：`title`
- 默认值：`年度学时`

#### 显示图标【isShowTitleBar】

配置是否显示标题右侧图标

- 标识：`isShowTitleBar`
- 默认值：`true`

#### 显示更多【moreBtn】

是否显示更多按钮

- 标识：`moreBtn`
- 默认值：`true`

#### 数据来源【dataType】

设置数据来源

1. 数据源
2. 静态配置

- 标识：`dataType`
- 默认值：`静态配置`

#### 组件数据源【dataSource】

用于选择组件的数据源，获取对应的数据。
入参：

```json
{
  "id": "数据源id",
  "pageId": "当前页面的唯一标识",
  "...urlObject": "当前页面的网址url携带的参数",
  "...routerParam": "单页面跳转携带的参数"
}
```

接口返回格式示例。返回的字段名没有特定的要求，格式只需满足最外层的基本格式，data里可以为其他格式：

```json
{
  "code": "200",
  "type": "success",
  "message": "操作成功",
  "metadata": null,
  "token": "",
  "data": [
    {
      "imgUrl": "图片",
      "iconFont": "字体图标",
      "name": "主要文字",
      "text1": "次要文字1",
      "text2": "次要文字2",
      "url": "跳转路径"
      ...
    },
    ...
  ]
}
```

- ⚠ <font color="#FF0000">**_注意事项：_**</font>
  <font color="#FF0000">如果格式有较大差异，请使用自定义函数，并返回正确格式的数据。如果只是字段名差异，请使用item字段配置</font>
