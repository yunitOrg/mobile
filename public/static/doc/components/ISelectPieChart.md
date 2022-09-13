# 饼状图

饼状图，带选择框。

## 组件类名（className）

ISelectPieChart

## 组件类 ID（classId）

idm.componet.basics.selectPieChart

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

#### 下拉数据源【columnsDataSource】

用于选择下拉的数据源，获取对应的数据。
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
  "data": [
     { "text": "2015年", "value": 2015, "isDefault": false }
    ...
  ]
}
```

- ⚠ <font color="#FF0000">**_注意事项：_**</font>
  <font color="#FF0000">如果格式有差异，请使用自定义函数，并返回正确格式的数据</font>

#### 图表数据源【chartDataSource】

用于选择图表的数据源。
入参：

```json
{
  "id": "数据源id",
  "pageId": "当前页面的唯一标识",
  "...urlObject": "当前页面的网址url携带的参数",
  "...routerParam": "单页面跳转携带的参数",
  "selectedValue": "下拉选中项的值",
  "selectedItem": "下拉选中项的对象"
}
```

接口返回格式示例。返回的字段名没有特定的要求，格式只需满足最外层的基本格式，data 里可以为其他格式：

```json
{
  "code": "200",
  "type": "success",
  "message": "操作成功",
  "metadata": null,
  "token": "",
  "data": [
    {
      "name": "名称",
      "value": "数值",
      "displayValue": "数值的展示用字段",
      "ratio": "占比，百分比",
      "color": "可选字段，用于控制此项在图表中的颜色"
      ...
    },
    ...
  ]
}
```

- ⚠ <font color="#FF0000">**_注意事项：_**</font>
  <font color="#FF0000">如果格式有差异，请使用自定义函数，并返回正确格式的数据</font>
