# 通用标题样式1
此组件是通用标题样式1，这里是组件简介
## 组件类ID（IcommonTitle）
idm.component.mobile.icommonTitle
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
#### 加载模式【isDrag】

- 标识：`isDrag`
- 默认值：`container`
- 选项：	 - 正常加载【normal】	 - 加载容器【container】
#### 标题【title】

- 标识：`title`
- 默认值：`办文效能`
#### 左侧图标
##### 加载图标【loadsvg】

- 标识：`loadsvg`
- 默认值：`image`
- 选项：	 - svg【svg】	 - image【image】
##### 选择图标【titleIcon】

- 标识：`titleIcon`
- 默认值：空
- 显示：`@[loadsvg='svg']`
##### 图标颜色【titleIconFontColor】
设置图标颜色，会覆盖主题色
- 标识：`titleIconFontColor`
- 默认值：```json{}```
- 显示：`@[loadsvg='svg']`
##### 图标大小【titleIconFontSize】

- 标识：`titleIconFontSize`
- 默认值：`18`
- 显示：`@[loadsvg='svg']`
##### 图片【uploadImage】

- 标识：`uploadImage`
- 默认值：空
- 显示：`@[loadsvg='image']`
##### 图片宽【imagewidth】
填写auto则为自适应，或者使用px、%、vw等单位，比如100%、100px、100vw等等
- 标识：`imagewidth`
- 默认值：`5px`
##### 图片高【imageheight】
填写auto则为自适应，或者使用px、%、vh等单位，比如100%、100px、100vh等等
- 标识：`imageheight`
- 默认值：`22px`
##### 图标间距【leftIconBox】

- 标识：`leftIconBox`
- 默认值：```json{
    "marginTopVal": "",
    "marginRightVal": "",
    "marginBottomVal": "",
    "marginLeftVal": "-5px",
    "paddingTopVal": "",
    "paddingRightVal": "",
    "paddingBottomVal": "",
    "paddingLeftVal": ""
}```
#### 标题间距【titleBox】

- 标识：`titleBox`
- 默认值：```json{
    "marginTopVal": "",
    "marginRightVal": "",
    "marginBottomVal": "",
    "marginLeftVal": "",
    "paddingTopVal": "",
    "paddingRightVal": "",
    "paddingBottomVal": "20px",
    "paddingLeftVal": ""
}```
#### 标题字体【titleFont】

- 标识：`titleFont`
- 默认值：空
### 外层样式
#### 宽高【undefined】

- 标识：`undefined`
- 默认值：空
#### 内外边距【ulbox】

- 标识：`ulbox`
- 默认值：```json{
    "marginTopVal": "",
    "marginRightVal": "",
    "marginBottomVal": "",
    "marginLeftVal": "",
    "paddingTopVal": "10px",
    "paddingRightVal": "10px",
    "paddingBottomVal": "10px",
    "paddingLeftVal": "10px"
}```
#### 渐变色【bglinear】
背景渐变色
- 标识：`bglinear`
- 默认值：空
#### 背景色【bgColor】

- 标识：`bgColor`
- 默认值：```json{
    "hex8": "#FFFFFFFF"
}```
#### 容器阴影【boxShadow】

- 标识：`boxShadow`
- 默认值：`0px 0px 10px 0px #ccc`
#### 边框【boxborder】

- 标识：`boxborder`
- 默认值：空