# 数据统计
移动端组件包-数据统计组件
## 组件类ID（IDigitalStatistics）
idm.component.mobile.digitalStatistics
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
#### 加载描述【loadingDescription】
用于指定组件加载中时的显示文字
- 标识：`loadingDescription`
- 默认值：`加载中...`
#### 为空描述【emptyDescription】
用于指定组件无数据时的显示文字
- 标识：`emptyDescription`
- 默认值：`暂无数据`
#### 数据源【dataSource】
用于选择数据源
- 标识：`dataSource`
- 默认值：空


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
#### 自定义函数【customFunction】
用于格式化数据源返回的数据，参数为{urlObject:url参数,pageId:页面id,customParam:自定义的参数,resultData:原始数据,moduleObject:组件信息}
- 标识：`customFunction`
- 默认值：空
- 可设置函数数量：单个
### 字段属性设置【optionList】

- 标识：`optionList`
- 默认值：空
### item跳转设置
#### 跳转方式【itemJumpTarget】
item跳转方式
- 标识：`itemJumpTarget`
- 默认值：`none`
- 选项：
	 - 无【none】
	 - 当前页跳转【_self】
	 - 新窗口打开【_blank】
	 - 静态单页面打开【router】
	 - 动态单页面打开【feild】
	 - 自定义函数【custom】

#### 跳转地址【itemJumpUrl】
item跳转地址,可填写item数据作为入参，例如：@[url]?itemId=@[id]&itemName=@[name]
- 标识：`itemJumpUrl`
- 默认值：空
- 显示：`@[itemJumpTarget=='_self'||itemJumpTarget=='_blank']`
#### 跳转页面【itemJumpPageId】
单页面模式下，要跳转的页面
- 标识：`itemJumpPageId`
- 默认值：空
- 显示：`@[itemJumpTarget=='router']`
#### 跳转字段【itemJumpPageFeild】
单页面模式下，要跳转的页面
- 标识：`itemJumpPageFeild`
- 默认值：空
- 显示：`@[itemJumpTarget=='feild']`
#### 跳转自定义函数【customItemJumpFunction】
自定义跳转逻辑, 入参为{item:当前点击的item的单项数据}
- 标识：`customItemJumpFunction`
- 默认值：空
- 显示：`@[itemJumpTarget=='custom']`
- 可设置函数数量：单个
### item样式
#### 分割线【isSplitLine】

- 标识：`isSplitLine`
- 默认值：`false`
#### 背景色【splitLineColor】

- 标识：`splitLineColor`
- 默认值：
```json
{}
```
- 显示：`@[isSplitLine]`
#### 内外边距【itemBox】

- 标识：`itemBox`
- 默认值：空
#### 边框【itemBorder】

- 标识：`itemBorder`
- 默认值：空
#### 阴影样式【itemBoxShadow】
可设置组件周围的阴影，写法请遵照标准box-shadow样式，示例：0px 2px 12px 0px rgba(0,0,0,0.07)
- 标识：`itemBoxShadow`
- 默认值：空
#### 背景色【itemBgColor】

- 标识：`itemBgColor`
- 默认值：
```json
{}
```
### item触发样式
#### 内外边距【itemActiveBox】

- 标识：`itemActiveBox`
- 默认值：空
#### 边框【itemActiveBorder】

- 标识：`itemActiveBorder`
- 默认值：空
#### 阴影样式【itemActiveBoxShadow】
可设置组件周围的阴影，写法请遵照标准box-shadow样式，示例：0px 2px 12px 0px rgba(0,0,0,0.07)
- 标识：`itemActiveBoxShadow`
- 默认值：空
#### 背景色【itemActiveBgColor】

- 标识：`itemActiveBgColor`
- 默认值：
```json
{}
```
### 容器样式
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
