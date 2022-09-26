# 数据统计

数据统计，此组件可以自定义要显示的字段。

## 组件类名（className）

IDigitalStatistics

## 组件类 ID（classId）

idm.componet.mobile.digitalStatistics

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
入参：无

接口返回格式示例。返回的字段名没有特定的要求，格式只需满足最外层的基本格式，data 里可以为其他格式：

```json
{
  "code": "200",
  "type": "success",
  "message": "操作成功",
  "metadata": null,
  "token": "",
  "data": [
    { value: '100分钟', name: '今日学习时长', text: '学习记录' },
    { value: '100分钟', name: '今日学习时长', text: '排行榜' },
    { value: '100分钟', name: '今日学习时长', text: '查看详情' }
  ]
}
```

- ⚠ <font color="#FF0000">**_注意事项：_**</font>
  <font color="#FF0000">如果格式有差异，请使用自定义函数，并返回正确格式的数据</font>

### 字段属性设置【optionList】

用于逐一配置要展示的文字字段，分两种类型，一种为从后端接口返回的数据中取值，另一种为固定配置文字。
