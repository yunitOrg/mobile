# 树形控件
此组件是树形控件，这里是组件简介
## 组件类ID（itree）
idm.component.mobile.itree
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
#### 默认展开【defaultOpen】
是否默认展开所有结点
- 标识：`defaultOpen`
- 默认值：`true`
- 选项：	 - 是【true】	 - 否【false】
#### 显示图标【showIcon】
是否显示图标
- 标识：`showIcon`
- 默认值：`true`
- 选项：	 - 是【true】	 - 否【false】
#### 滚动条【scroll】
容器滚动条显示状态
- 标识：`scroll`
- 默认值：`auto`
- 选项：	 - 显示【scroll】	 - 隐藏【hidden】	 - 自适应【auto】
#### 展开图标【openIconClass】

- 标识：`openIconClass`
- 默认值：空
#### 收缩图标【closeIconClass】

- 标识：`closeIconClass`
- 默认值：空
#### 缩进间距【indent】

- 标识：`indent`
- 默认值：`10`
### 单项样式
#### 宽高【undefined】

- 标识：`undefined`
- 默认值：空
#### 背景设置
##### 背景色【bgColorItem】

- 标识：`bgColorItem`
- 默认值：```json{}```
##### 背景图片【bgImgUrlItem】

- 标识：`bgImgUrlItem`
- 默认值：空
#### 名称文字【fontNode】

- 标识：`fontNode`
- 默认值：空
#### 左侧图标样式
##### 图标宽度【widthIconLeft】
填写auto则为自适应，或者使用px、%、vw等单位，比如100%、100px、100vw等等
- 标识：`widthIconLeft`
- 默认值：空
##### 图标高度【heightIconLeft】
填写auto则为自适应，或者使用px、%、vw等单位，比如100%、100px、100vw等等
- 标识：`heightIconLeft`
- 默认值：空
##### 字体【fontIconLeft】

- 标识：`fontIconLeft`
- 默认值：空
##### 图标内外边距【boxIconLeft】

- 标识：`boxIconLeft`
- 默认值：空
#### 右侧箭头样式
##### 字体【fontIconRight】

- 标识：`fontIconRight`
- 默认值：空
##### 图标内外边距【boxIconRight】

- 标识：`boxIconRight`
- 默认值：空
#### 容器内外边距【boxItem】

- 标识：`boxItem`
- 默认值：空
#### 容器边框【borderItem】

- 标识：`borderItem`
- 默认值：空
### 子内容容器样式
#### 容器内外边距【boxMain】

- 标识：`boxMain`
- 默认值：空
### 容器样式设置
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
#### 数据源【dataSource】

- 标识：`dataSource`
- 默认值：空
#### 接收其他组件联动参数【linkageParamList】

- 标识：`linkageParamList`
- 默认值：空
#### 字段设置
##### 节点名称【dataFieldTitle】

- 标识：`dataFieldTitle`
- 默认值：`title`
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
#### 参数自定义函数【paramsMakeFunction】
用于请求数据源时，对请求参数进行处理，返回处理后的参数
- 标识：`paramsMakeFunction`
- 默认值：空
- 可设置函数数量：单个
#### 节点点击自定义函数【clickNodeFunction】
点击节点时，触发自定义函数
- 标识：`clickNodeFunction`
- 默认值：空
- 可设置函数数量：单个