# 弹出框按钮
此组件是弹出框按钮，这里是组件简介
## 组件类ID（IPopButton）
idm.component.mobile.ipopbutton
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
#### 默认显示【defaultOpen】
是否默认显示弹框
- 标识：`defaultOpen`
- 默认值：`false`
- 选项：	 - 是【true】	 - 否【false】
#### 显示遮罩【overlay】
是否显示遮罩层
- 标识：`overlay`
- 默认值：`true`
- 选项：	 - 是【true】	 - 否【false】
#### 关闭按钮【closeable】
是否显示关闭按钮
- 标识：`closeable`
- 默认值：`false`
- 选项：	 - 是【true】	 - 否【false】
#### 选择结果【showValue】
是否显示选择值，关键字为value，进行选择操作后可自定义函数修改value的值。
- 标识：`showValue`
- 默认值：`false`
- 选项：	 - 是【true】	 - 否【false】
#### 圆角显示【round】
弹框是否以圆角形式显示
- 标识：`round`
- 默认值：`false`
- 选项：	 - 是【true】	 - 否【false】
#### 锁定滚动【lockScroll】
是否锁定背景滚动
- 标识：`lockScroll`
- 默认值：`true`
- 选项：	 - 是【true】	 - 否【false】
#### 标签名称【label】
按钮的标签名称
- 标识：`label`
- 默认值：`按钮`
#### 默认值【defaultValue】
默认显示的结果值，选择器下拉数据中对应的valueKey
- 标识：`defaultValue`
- 默认值：`1`
#### 弹框位置【position】

- 标识：`position`
- 默认值：`bottom`
- 选项：	 - 中【center】	 - 上【top】	 - 下【bottom】	 - 左【left】	 - 右【right】
#### 按钮位置【closePosition】
关闭按钮位置
- 标识：`closePosition`
- 默认值：`top-right`
- 显示：`@[closeable]`
- 选项：	 - 右上【top-right】	 - 左上【top-left】	 - 左下【bottom-left】	 - 右下【bottom-right】
#### 弹框内容【popContentType】

- 标识：`popContentType`
- 默认值：`custom`
- 选项：	 - 自定义拖拽容器【custom】	 - 选择器【picker】
### 选择器基本属性
#### 顶部栏【showToolbar】
是否显示顶部栏
- 标识：`showToolbar`
- 默认值：`true`
- 选项：	 - 是【true】	 - 否【false】
#### 顶部标题【titlePicker】
顶部栏标题
- 标识：`titlePicker`
- 默认值：`选择`
#### 文字键名【labelKey】
选项对象中，选项文字对应的键名
- 标识：`labelKey`
- 默认值：`label`
#### 值键名【valueKey】
选项对象中，值对应的键名
- 标识：`valueKey`
- 默认值：`value`
#### 确认自定义函数【clickConfirmFunction】
点击确定时，触发自定义函数
- 标识：`clickConfirmFunction`
- 默认值：空
- 可设置函数数量：单个
#### 取消自定义函数【clickConcelFunction】
点击取消时，触发自定义函数
- 标识：`clickConcelFunction`
- 默认值：空
- 可设置函数数量：单个
### 元素基本样式
#### 标签样式
##### 文字【fontLabel】

- 标识：`fontLabel`
- 默认值：空
##### 内外边距【boxLabel】

- 标识：`boxLabel`
- 默认值：空
#### 结果值样式
##### 文字【fontValue】

- 标识：`fontValue`
- 默认值：空
##### 内外边距【boxValue】

- 标识：`boxValue`
- 默认值：空
#### 弹框样式
##### 宽度【widthPop】

- 标识：`widthPop`
- 默认值：空
##### 高度【heightPop】

- 标识：`heightPop`
- 默认值：`40%`
### 容器样式设置
#### 样式布局【layout】

- 标识：`layout`
- 默认值：空
#### 宽高【undefined】

- 标识：`undefined`
- 默认值：空
#### 背景设置
##### 背景色【bgColor】

- 标识：`bgColor`
- 默认值：```json{}```
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
- 选项：	 - 裁切显示【cover】	 - 完全显示【contain】	 - 自定义【custom】
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
- 选项：	 - 双向重复【repeat】	 - 水平重复【repeat-x】	 - 垂直重复【repeat-y】	 - 不重复【no-repeat】	 - 继承【inherit】
##### 背景模式【bgAttachment】

- 标识：`bgAttachment`
- 默认值：空
- 显示：`@[bgImgUrl]`
- 选项：	 - 固定【fixed】	 - 滚动【scroll】	 - 继承【inherit】
#### 文字【font】

- 标识：`font`
- 默认值：空
#### 内外边距【box】

- 标识：`box`
- 默认值：空
#### 边框【border】

- 标识：`border`
- 默认值：空
### 数据源
#### 数据来源【dataSourceType】

- 标识：`dataSourceType`
- 默认值：`static`
- 选项：	 - 静态数据【static】	 - 数据源【dataSource】	 - 自定义【custom】
#### 应用配置【staticData】

- 标识：`staticData`
- 默认值：```json[
    {
        "value": 1,
        "label": "选项一"
    }
]```
- 显示：`@[dataSourceType=='static']`
#### 数据源【dataSource】

- 标识：`dataSource`
- 默认值：空
- 显示：`@[dataSourceType=='dataSource']`
#### 自定义函数【getDataFunction】

- 标识：`getDataFunction`
- 默认值：空
- 显示：`@[dataSourceType=='custom']`
- 可设置函数数量：单个
#### 接收其他组件联动参数，用于获取数据源数据时作为参数【linkageParamList】

- 标识：`linkageParamList`
- 默认值：空
### 高级
#### 适配设置
##### 基准值【baseSize】
此属性用于标记当前组件在显示效果最完美情况下的宽度大小（px），例如：此组件显示效果最佳宽度为414px，则此处设置为414即可，如果此组件最佳效果为当前配置的屏幕宽（px）的一半则只需要除以2即可。
- 标识：`baseSize`
- 默认值：`414`
##### 适配比例【adaptationRatio】
与基准值配合使用，如果在实际预览屏幕宽为基准值的两倍，则此组件所有可适配的内容都会基于此处设置的适配比例相对应的进行放大缩小，例如此处设置1.2，则会相对应的放大至1.2倍
- 标识：`adaptationRatio`
- 默认值：`1.2`
#### 数据变动联动组件
##### 需求组件范围【linkageDemandPageModule】
当前选项变更需要联动其他组件需求值（比如下拉选项数据等）的组件范围
- 标识：`linkageDemandPageModule`
- 默认值：空
##### 结果组件范围【linkageResultPageModule】
当前选项变更需要联动其他组件变更结果值的组件范围
- 标识：`linkageResultPageModule`
- 默认值：空
#### 弹框显隐状态配置
##### 消息key【changePopStatusMessageKey】
消息通知的消息类型key
- 标识：`changePopStatusMessageKey`
- 默认值：`changePopStatusMessage`
##### 结果值【changePopStatusMessageValue】
消息通知中改变弹框状态的值，显示则返回true，隐藏则返回false。例：message:{status:true}，则这里填写status；message:true，则这里不填
- 标识：`changePopStatusMessageValue`
- 默认值：空
#### 参数自定义函数【paramsMakeFunction】
用于请求数据源时，对请求参数进行处理，返回处理后的参数
- 标识：`paramsMakeFunction`
- 默认值：空
- 可设置函数数量：单个