# tab列表组件
此组件为移动端 tab切换组件

## 组件类名（className）
ITab

## 组件类ID（classId）
idm.componet.mobile.itab

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

#### 加载模式【isDrag】
- 可以选择正常加载、加载容器， 
- 正常加载： tab传递选中参数给页面下的组件，选中那个下面组件联动
- 加载容器：加载组件容器


#### 风格样式【type】

- 支持两种 line、card

#### 切换动画【animated】


#### 粘性布局【sticky】

- 会固定到顶部

#### 滑动切换【swipeable】

- 是否开启滚动导航

#### 粘性布局【offsetTop】

- 固定顶部距离顶部距离

#### 背景色【bgColor】

- tab背景色

#### tab 宽 高【width】

### 样式属性

#### 内外边距【box】

- tab的内外边距

#### 文字【tableStyleFont】

- tab的文字字体

#### 选中文字【tableChooseFont】

- tab的选中字体

#### 容器边框【border】

- tab的边框

#### 选中底部线宽高

- 宽、高、选中背景色


### 页签选项设置

1. tab标识
2. tab文字
3. 禁用标签
4. 默认选中


### 主题

如果组件没有设置 则用主题颜色


### 高级

- 切换面板的回调自定义函数 
- 切换标签前的回调函数

- tab菜单联动组件
会发送 chooseTab 消息
```js
{
  type: 'chooseTab',
  rangeModule: this.propData.triggerComponents && this.propData.triggerComponents.map(el => el.moduleId),
  message: this.allTabList.find(item => item.key === key)
}
```
