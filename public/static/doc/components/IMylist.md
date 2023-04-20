# 通知公告
此组件是通知公告，这里是组件简介
## 组件类ID（INoticeListCard）
idm.component.mobile.inoticelistcard
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
#### 分割线【showSplitLine】
是否显示分割线
- 标识：`showSplitLine`
- 默认值：`true`
#### 默认状态【defaultStatus】

- 标识：`defaultStatus`
- 默认值：`default`
- 选项：
	 - 普通【default】
	 - 隐藏【hidden】

### 页签设置【tabList】

- 标识：`tabList`
- 默认值：空
### 样式设置
#### 内外边距【box】

- 标识：`box`
- 默认值：空
#### 宽高【undefined】

- 标识：`undefined`
- 默认值：空
#### 背景设置
##### 背景色【bgColor】

- 标识：`bgColor`
- 默认值：
```json
{
    "hex8": "#FFFFFFFF"
}
```
##### 背景图片【bgImgUrl】

- 标识：`bgImgUrl`
- 默认值：空
##### 横向偏移【positionX】

- 标识：`positionX`
- 默认值：空
- 显示：`@[bgImgUrl]`
##### 纵向偏移【positionY】

- 标识：`positionY`
- 默认值：空
- 显示：`@[bgImgUrl]`
##### 背景大小【bgSize】

- 标识：`bgSize`
- 默认值：空
- 显示：`@[bgImgUrl]`
- 选项：
	 - 裁切显示【cover】
	 - 完全显示【contain】
	 - 自定义【custom】

##### 宽度【bgSizeWidth】

- 标识：`bgSizeWidth`
- 默认值：空
- 显示：`@[bgSize=='custom']`
##### 高度【bgSizeHeight】

- 标识：`bgSizeHeight`
- 默认值：空
- 显示：`@[bgSize=='custom']`
##### 平铺模式【bgRepeat】

- 标识：`bgRepeat`
- 默认值：空
- 显示：`@[bgImgUrl]`
- 选项：
	 - 双向重复【repeat】
	 - 水平重复【repeat-x】
	 - 垂直重复【repeat-y】
	 - 不重复【no-repeat】
	 - 继承【inherit】

##### 背景模式【bgAttachment】

- 标识：`bgAttachment`
- 默认值：空
- 显示：`@[bgImgUrl]`
- 选项：
	 - 固定【fixed】
	 - 滚动【scroll】
	 - 继承【inherit】

#### 边框【border】

- 标识：`border`
- 默认值：空
#### 边框阴影【boxShadow】

- 标识：`boxShadow`
- 默认值：空
#### 文字【font】

- 标识：`font`
- 默认值：空
### 高级
#### 适配设置
##### 基准值【baseValue】
此属性用于标记当前组件在显示效果最完美情况下的宽度大小（px），例如：此组件显示效果最佳宽度为414px，则此处设置为414即可，如果此组件最佳效果为当前配置的屏幕宽（px）的一半则只需要除以2即可。
- 标识：`baseValue`
- 默认值：`414`
##### 适配比例【adaptationRatio】
与基准值配合使用，如果在实际预览屏幕宽为基准值的两倍，则此组件所有可适配的内容都会基于此处设置的适配比例相对应的进行放大缩小，例如此处设置1.2，则会相对应的放大至1.2倍
- 标识：`adaptationRatio`
- 默认值：`1.2`
#### 数据源【dataSource】
用于选择的数据源
- 标识：`dataSource`
- 默认值：空
#### 字段设置
##### 右侧数字【numInterface】

- 标识：`numInterface`
- 默认值：`num`
#### 刷新KEY【messageRefreshKey】
根据组件接收到的消息KEY来刷新数据
- 标识：`messageRefreshKey`
- 默认值：空
- 选项：
	 - inbox【inbox】
	 - info【info】

### 数据源 接口返回格式需要按照以下要求：

```json
{
    "wddn":{//页签标识
      "num":2 // 右侧数字
    },
    "zzsh":{
      "num":5
    }
}

```