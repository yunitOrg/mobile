# 弹层日期选择
此组件是弹层日期选择，这里是组件简介
## 组件类ID（IDialogDate）
idm.component.mobile.iDialogDate
## 组件开发语言（comLangue）
vue
## 组件类型（comType）
common
## 所在代码包版本
mobile@1.0.1
## 组件属性
### 唯一标识【ctrlId】

- 标识：`ctrlId`
- 默认值：`@[packageid]`
### 基本属性
#### 时间类型【type】

- 标识：`type`
- 默认值：`date`
- 选项：
	 - 年月日【date】
	 - 年月【year-month】
	 - 月日【month-day】
	 - 时间【time】
	 - 完整时间【datetime】

#### 弹出层高【popHeight】
弹出层高度：比如：50%
- 标识：`popHeight`
- 默认值：`50%`
#### 标题【title】
标题
- 标识：`title`
- 默认值：`选择年月日`
#### 默认时间【currentDate】
默认时间：比如：new Date(2020, 0, 1)
- 标识：`currentDate`
- 默认值：`new Date(2020, 0, 1)`
#### 最小时间【minTime】
最小时间：比如：new Date(2020, 0, 1)
- 标识：`minTime`
- 默认值：`new Date(2020, 0, 1)`
#### 最大时间【maxDate】
最大时间：比如：new Date(2025, 10, 1)
- 标识：`maxDate`
- 默认值：`new Date(2025, 10, 1)`
### 高级
#### 接收消息key【sendKey】
接收消息key
- 标识：`sendKey`
- 默认值：空
#### 发消息key【receiveKey】
发消息的key
- 标识：`receiveKey`
- 默认值：`recivekey`
#### tag菜单联动组件发送消息【triggerComponents】
选择点击tag需要联动的组件
- 标识：`triggerComponents`
- 默认值：空