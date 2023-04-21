# 滑动卡片
移动端组件包-滑动卡片
## 组件类ID（ISlideCard）
idm.component.mobile.slideCard
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
#### 显示模式【layoutType】
设置内容过多时的显示模式，可以左右滑动或上下滑动
- 标识：`layoutType`
- 默认值：`scroll`
- 选项：
	 - 左右滑动【scroll】
	 - 上下滑动【slip】

#### 展示列数【columNum】
左右滑动时可设置为0，表示不固定列数，允许超出。上下滑动时则必须大于0
- 标识：`columNum`
- 默认值：`3`
#### 显示标题【isShowTitleBar】
是否显示标题栏
- 标识：`isShowTitleBar`
- 默认值：`true`
#### 组件标题【title】
组件标题
- 标识：`title`
- 默认值：`年度学时`
- 显示：`@[isShowTitleBar]`
#### 显示图标【showIcon】
配置是否显示标题右侧图标
- 标识：`showIcon`
- 默认值：`true`
- 显示：`@[isShowTitleBar]`
#### 显示更多【moreBtn】
是否显示更多按钮
- 标识：`moreBtn`
- 默认值：`true`
- 显示：`@[isShowTitleBar]`
#### 数据来源【dataType】
设置数据来源
- 标识：`dataType`
- 默认值：`static`
- 选项：
	 - 静态配置【static】
	 - 数据源【dataSource】
	 - 自定义接口【customInterface】

#### 接口地址【url】
用于获取数据的接口地址。请按照统一标准的返回格式返回文本数据，格式如下：{"code":"200","data":"",...}
- 标识：`url`
- 默认值：`/ctrl/website/api/columnlist`
- 显示：`@[dataType=='customInterface']`
#### 选择栏目【selectColumn】

- 标识：`selectColumn`
- 默认值：空
- 显示：`@[dataType=='customInterface']`
#### 显示数量【limit】

- 标识：`limit`
- 默认值：空
- 显示：`@[dataType=='customInterface']`
#### 数据源【dataSource】
用于选择组件的数据源, 入参如下{id:数据源的id,pageId:页面id,...urlObject:当前路径参数}
- 标识：`dataSource`
- 默认值：空
- 显示：`@[dataType=='dataSource']`

入参：

```json
{
  "pageId": "当前页面的唯一标识",
  "...urlObject": "当前页面的网址url携带的参数",
  "...routerParam": "单页面跳转携带的参数"
}
```
接口返回格式示例。返回的字段名没有特定的要求，格式只需满足最外层的基本格式，data里可以为其他格式：

```json
{
  "code": "200",
  "type": "success",
  "message": "操作成功",
  "metadata": null,
  "token": "",
  "data": [
    {
      "imgUrl": "图片",
      "iconFont": "字体图标",
      "name": "主要文字",
      "text1": "次要文字1",
      "text2": "次要文字2",
      "url": "跳转路径"
      ...
    },
    ...
  ]
}
```

- ⚠ <font color="#FF0000">**_注意事项：_**</font>
  <font color="#FF0000">如果格式有较大差异，请使用自定义函数，并返回正确格式的数据。如果只是字段名差异，请使用item字段配置</font>
#### 自定义函数【customFunction】
用于格式化数据源返回的数据，参数为{urlObject:url参数,pageId:页面id,customParam:自定义的参数,resultData:原始数据,moduleObject:组件信息}
- 标识：`customFunction`
- 默认值：空
- 显示：`@[dataType=='dataSource' || dataType=='customInterface']`
- 可设置函数数量：单个
#### 组件静态配置【dataStaticSet】

- 标识：`dataStaticSet`
- 默认值：空
- 显示：`@[dataType=='static']`
### 内容属性设置
#### 图片图标【displayType】
设置图像区域的展示类型
- 标识：`displayType`
- 默认值：`img`
- 选项：
	 - 图片【img】
	 - 图标【icon】

#### 显示文字【showText】

- 标识：`showText`
- 默认值：`true`
#### 加载描述【loadingDescription】
用于指定组件加载中时的显示文字
- 标识：`loadingDescription`
- 默认值：`加载中...`
#### 为空描述【emptyDescription】
用于指定组件无数据时的显示文字
- 标识：`emptyDescription`
- 默认值：`暂无数据`
#### 为空样式
##### 图标大小【emptyImageSize】

- 标识：`emptyImageSize`
- 默认值：`70`
##### 文字【emptyFont】

- 标识：`emptyFont`
- 默认值：
```json
{
    "fontColors": {
        "hex8": "#969799"
    },
    "fontSize": 14,
    "fontSizeUnit": "px"
}
```
#### 加载样式
##### 图标大小【loadingSize】

- 标识：`loadingSize`
- 默认值：`24`
##### 文字【loadingFont】

- 标识：`loadingFont`
- 默认值：
```json
{
    "fontColors": {
        "hex8": "#969799"
    },
    "fontSize": 14,
    "fontSizeUnit": "px"
}
```
#### item字段设置
##### 循环字段【resDataField】
举例：返回的数据中rows是要取的数组，则此处使用rows
- 标识：`resDataField`
- 默认值：空
##### 图片字段【imageField】
举例：item数组下有imgUrl字段，为图片，则这里应填imgUrl
- 标识：`imageField`
- 默认值：`image`
- 显示：`@[displayType=='img']`
##### 图标字段【iconField】
举例：item数组下有iconUrl字段，为图标，则这里应填iconUrl
- 标识：`iconField`
- 默认值：`icon`
- 显示：`@[displayType=='icon']`
##### 图标URL【iconfontUrl】
从iconfont下载的图标库文件夹地址， 不需要具体到文件，比如：图标css文件的路径是【/project/font_1248060_zpcega7i6m9/iconfont.css】，我们这里只需要填写【/project/font_1248060_zpcega7i6m9/】，注意：里面的文件建议不要做任何修改，否则可能读取不正确，为空时默认使用项目自带iconfont，反之设置自定义路径后iconfont类名将从接口获取
- 标识：`iconfontUrl`
- 默认值：空
- 显示：`@[displayType=='icon']`
##### 图标前缀【iconPrefix】
设置iconfont类名前缀，如类名是iconfont icon-shouye前缀为icon-
- 标识：`iconPrefix`
- 默认值：空
- 显示：`@[displayType=='icon']`
##### 图标字体【iconFontFamily】
设置iconfont字体，如类名是iconfont icon-shouye字体为iconfont
- 标识：`iconFontFamily`
- 默认值：空
- 显示：`@[displayType=='icon']`
##### 基本文字【mainTextField】
举例：item数组下有name字段，为基本文字，则这里应填name
- 标识：`mainTextField`
- 默认值：`title`
- 显示：`@[showText]`
#### item扩展字段设置【extraFields】

- 标识：`extraFields`
- 默认值：空
- 显示：`@[showText]`
#### item跳转设置
##### 跳转方式【itemJumpTarget】
item跳转方式
- 标识：`itemJumpTarget`
- 默认值：`_self`
- 选项：
	 - 当前页跳转【_self】
	 - 新窗口打开【_blank】
	 - 静态单页面打开【router】
	 - 动态单页面打开【feild】
	 - 自定义函数【custom】

##### 跳转地址【itemJumpUrl】
item跳转地址,可填写item数据作为入参，例如：@[url]?itemId=@[id]&itemName=@[name]
- 标识：`itemJumpUrl`
- 默认值：空
- 显示：`@[itemJumpTarget=='_self'||itemJumpTarget=='_blank']`
##### 跳转页面【itemJumpPageId】
单页面模式下，要跳转的页面
- 标识：`itemJumpPageId`
- 默认值：空
- 显示：`@[itemJumpTarget=='router']`
##### 跳转字段【itemJumpPageFeild】
单页面模式下，要跳转的页面
- 标识：`itemJumpPageFeild`
- 默认值：空
- 显示：`@[itemJumpTarget=='feild']`
##### 跳转自定义函数【customItemJumpFunction】
自定义跳转逻辑, 入参为{item:当前点击的item的单项数据}
- 标识：`customItemJumpFunction`
- 默认值：空
- 显示：`@[itemJumpTarget=='custom']`
- 可设置函数数量：单个
#### item样式
##### item宽【itemBoxWidth】

- 标识：`itemBoxWidth`
- 默认值：`90`
##### item高【itemBoxHeight】

- 标识：`itemBoxHeight`
- 默认值：`90`
##### 图片宽【itemImgWidth】

- 标识：`itemImgWidth`
- 默认值：`50`
##### 图片高【itemImgHeight】

- 标识：`itemImgHeight`
- 默认值：`50`
##### 图片圆角【itemImgRadius】

- 标识：`itemImgRadius`
- 默认值：`5`
##### 图标大小【itemIconSize】

- 标识：`itemIconSize`
- 默认值：`50`
- 显示：`@[displayType=='icon']`
##### 图标颜色【itemIconColor】

- 标识：`itemIconColor`
- 默认值：空
- 显示：`@[displayType=='icon']`
##### item间隔【itemMargin】

- 标识：`itemMargin`
- 默认值：`0`
- 显示：`@[layoutType=='scroll'&&columNum == 0]`
##### 行间类型【rowMarginType】
设置行间距类型
- 标识：`rowMarginType`
- 默认值：`adapt`
- 显示：`@[layoutType!='scroll']`
- 选项：
	 - 自适应【adapt】
	 - 固定值【static】

##### 行间隔值【rowMargin】

- 标识：`rowMargin`
- 默认值：`0`
- 显示：`@[layoutType!='scroll'&&rowMarginType=='static']`
##### 背景颜色【itemBgColor】

- 标识：`itemBgColor`
- 默认值：空
##### 阴影样式【itemShadow】

- 标识：`itemShadow`
- 默认值：空
##### 边框【itemBorder】

- 标识：`itemBorder`
- 默认值：空
##### 内外边距【itembox】

- 标识：`itembox`
- 默认值：
```json
{
    "marginTopVal": "0",
    "marginRightVal": "0",
    "marginBottomVal": "0",
    "marginLeftVal": "0",
    "paddingTopVal": "5px",
    "paddingRightVal": "5px",
    "paddingBottomVal": "5px",
    "paddingLeftVal": "5px"
}
```
##### 基本文字样式【mainFont】

- 标识：`mainFont`
- 默认值：空
- 显示：`@[showText]`
##### 扩展文字样式【extraFont】

- 标识：`extraFont`
- 默认值：空
- 显示：`@[showText]`
#### item触发样式
##### 背景颜色【itemActiveBgColor】

- 标识：`itemActiveBgColor`
- 默认值：空
##### 阴影样式【itemActiveShadow】

- 标识：`itemActiveShadow`
- 默认值：空
##### 边框【itemActiveBorder】

- 标识：`itemActiveBorder`
- 默认值：空
### 标题属性设置
#### 图标位置【titleIconPosition】
设置组件标题图标位置
- 标识：`titleIconPosition`
- 默认值：`left`
- 显示：`@[showIcon]`
- 选项：
	 - 左边【left】
	 - 右边【right】

#### 自定义图标【titleIcon】

- 标识：`titleIcon`
- 默认值：空
- 显示：`@[showIcon]`
#### 图标颜色【titleIconColor】

- 标识：`titleIconColor`
- 默认值：空
- 显示：`@[showIcon]`
#### 图标大小【titleIconSize】

- 标识：`titleIconSize`
- 默认值：`16`
- 显示：`@[showIcon]`
#### 标题文字【titleFont】
标题文字样式设置
- 标识：`titleFont`
- 默认值：
```json
{
    "fontColors": {
        "hex": "#333333",
        "hex8": "#333333FF"
    },
    "fontSize": 16,
    "fontSizeUnit": "px",
    "fontWeight": "600"
}
```
#### 更多属性设置
##### 跳转方式【moreTarget】
更多按钮跳转方式
- 标识：`moreTarget`
- 默认值：`_self`
- 选项：
	 - 当前页跳转【_self】
	 - 新窗口打开【_blank】
	 - 单页面打开【router】
	 - 自定义函数【custom】

##### 跳转地址【moreUrl】
更多按钮跳转地址
- 标识：`moreUrl`
- 默认值：空
- 显示：`@[moreTarget=='_self'||moreTarget=='_blank']`
##### 跳转页面【moreBtnToPageId】
单页面模式下，要跳转的页面
- 标识：`moreBtnToPageId`
- 默认值：空
- 显示：`@[moreTarget=='router']`
##### 跳转自定义函数【customMoreBtnFunction】
自定义跳转逻辑
- 标识：`customMoreBtnFunction`
- 默认值：空
- 显示：`@[moreTarget=='custom']`
- 可设置函数数量：单个
##### 更多文字【moreFont】
更多文字样式设置
- 标识：`moreFont`
- 默认值：空
##### 图标大小【moreIconSize】
图标大小
- 标识：`moreIconSize`
- 默认值：`22`
##### 图标颜色【moreIconColor】
图标颜色
- 标识：`moreIconColor`
- 默认值：空
### 外层容器样式
#### 宽高【undefined】

- 标识：`undefined`
- 默认值：空
#### 内外边距【box】

- 标识：`box`
- 默认值：
```json
{
    "marginTopVal": "5px",
    "marginRightVal": "5px",
    "marginBottomVal": "5px",
    "marginLeftVal": "5px",
    "paddingTopVal": "10px",
    "paddingRightVal": "10px",
    "paddingBottomVal": "10px",
    "paddingLeftVal": "10px"
}
```
#### 边框【border】

- 标识：`border`
- 默认值：空
#### 阴影样式【boxShadow】
可设置组件周围的阴影，写法请遵照标准box-shadow样式，示例：0px 2px 12px 0px rgba(0,0,0,0.07)
- 标识：`boxShadow`
- 默认值：`0px 2px 12px 0px rgba(0,0,0,0.07)`
#### 背景设置
##### 背景色【bgColor】

- 标识：`bgColor`
- 默认值：
```json
{}
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

#### 全局文字【font】
全局文字样式设置
- 标识：`font`
- 默认值：空
### 内层容器样式
#### 内外边距【innerBox】

- 标识：`innerBox`
- 默认值：
```json
{
    "marginTopVal": "",
    "marginRightVal": "",
    "marginBottomVal": "",
    "marginLeftVal": "",
    "paddingTopVal": "10px",
    "paddingRightVal": "14px",
    "paddingBottomVal": "10px",
    "paddingLeftVal": "14px"
}
```
#### 边框【innerBorder】

- 标识：`innerBorder`
- 默认值：空
#### 背景设置
##### 背景色【innerBgColor】

- 标识：`innerBgColor`
- 默认值：
```json
{
    "hex8": "#FFFFFFFF"
}
```
##### 背景图片【innerBgImgUrl】

- 标识：`innerBgImgUrl`
- 默认值：空
##### 横向偏移【innerPositionX】

- 标识：`innerPositionX`
- 默认值：空
- 显示：`@[innerBgImgUrl]`
##### 纵向偏移【innerPositionY】

- 标识：`innerPositionY`
- 默认值：空
- 显示：`@[innerBgImgUrl]`
##### 背景大小【innerBgSize】

- 标识：`innerBgSize`
- 默认值：空
- 显示：`@[innerBgImgUrl]`
- 选项：
	 - 裁切显示【cover】
	 - 完全显示【contain】
	 - 自定义【custom】

##### 宽度【innerBgSizeWidth】

- 标识：`innerBgSizeWidth`
- 默认值：空
- 显示：`@[innerBgSize=='custom']`
##### 高度【innerBgSizeHeight】

- 标识：`innerBgSizeHeight`
- 默认值：空
- 显示：`@[innerBgSize=='custom']`
##### 平铺模式【innerBgRepeat】

- 标识：`innerBgRepeat`
- 默认值：空
- 显示：`@[innerBgImgUrl]`
- 选项：
	 - 双向重复【repeat】
	 - 水平重复【repeat-x】
	 - 垂直重复【repeat-y】
	 - 不重复【no-repeat】
	 - 继承【inherit】

##### 背景模式【innerBgAttachment】

- 标识：`innerBgAttachment`
- 默认值：空
- 显示：`@[innerBgImgUrl]`
- 选项：
	 - 固定【fixed】
	 - 滚动【scroll】
	 - 继承【inherit】

### 主题设置【themeList】
点击？查看主题设置用法指南
- 标识：`themeList`
- 默认值：
```json
[
    {
        "key": "blue",
        "mainColor": {
            "hex": "#0073CA",
            "hex8": "#0073CAFF"
        }
    },
    {
        "key": "red",
        "mainColor": {
            "hex": "#E21A1A",
            "hex8": "#E21A1AFF"
        }
    },
    {
        "key": "green",
        "mainColor": {
            "hex": "#0EAF64",
            "hex8": "#0EAF64FF"
        }
    }
]
```
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
#### 刷新KEY【messageRefreshKey】
根据组件接收到的消息KEY来刷新数据
- 标识：`messageRefreshKey`
- 默认值：空
- 选项：
	 - inbox【inbox】
	 - info【info】
