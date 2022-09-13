# tab列表组件
此组件为移动端 底部按钮

## 组件类名（className）
IfootBtn

## 组件类ID（classId）
idm.componet.mobile.ifootBtn

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

#### 页签选项设置

```js
1. tab标识
2. tab文字
3. 点击自定义函数
4. 按钮宽
5. 按钮高
6. 字体名称
7. 背景色
8. 分割间距
9. 容器边框
```

#### 外层容器样式

width：宽度

height: 高度

内外边距
背景色
容器阴影
容器边框

#### 全选发送消息
消息key： ifootbtn-all
```js
this.sendBroadcastMessage({
  type: 'ifootbtn-all',
  rangeModule: this.propData.triggerComponents && this.propData.triggerComponents.map(el => el.moduleId),
  message: { checkAll: val }
})
```
