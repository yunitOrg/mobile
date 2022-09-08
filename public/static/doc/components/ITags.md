# tab列表组件
此组件为移动端 标签选择器

## 组件类名（className）
ITags

## 组件类ID（classId）
idm.componet.mobile.itags

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

```json
{
  "code": "200",
  "type": "success",
  "message": "操作成功",
  "metadata": null,
  "token": "",
  "data": [
    {
      "name": "组织生活",
    },
    {
      "name": "党费",
    }
  ]
}

```
### 组件联动 发送消息 发送key：chooseTag

```json
{
  type: 'chooseTag',
  rangeModule: this.propData.triggerComponents && this.propData.triggerComponents.map(el => el.moduleId),
  message: this.tablist.filter(item => item.defaultActiveKey)
}
```
