# 文本模板
此组件是文本模板，这里是组件简介
## 组件类ID（ITextTemplate）
idm.component.mobile.itexttemplate
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
#### 显示标题【isShowTitle】
设置是否显示组件标题
- 标识：`isShowTitle`
- 默认值：`true`
- 选项：	 - 显示【true】	 - 隐藏【false】
#### 显示消息【isShowInfo】
是否显示底部提醒消息
- 标识：`isShowInfo`
- 默认值：`false`
- 选项：	 - 显示【true】	 - 隐藏【false】
#### 显示logo【isShowLogo】
是否显示顶部logo图片
- 标识：`isShowLogo`
- 默认值：`true`
- 选项：	 - 显示【true】	 - 隐藏【false】
#### 标题文本【titleText】

- 标识：`titleText`
- 默认值：`党员政治生日`
#### 内容文本【contextText】
可用文本表达式配置
- 标识：`contextText`
- 默认值：`<div>@[memberName]同志</div><div>@[joinYear]年@[joinMonth]月@[joinDay]日，您光荣加入了中国共产党</div><div>那一刻，是您人生道路上的新起点，是您永远难忘的“政治生日”。今年是您的第@[num]个政治生日，谨向您送上生日的问候和祝福！</div><div>希望您时刻牢记入党誓词，认真履行党员义务，铭记党的宗旨，发挥党员先锋模范作用，为共产主义事业奋斗终生。</div><div style="text-align:right">@[deptNameText]委员会组织部</div><div style="text-align:right">@[createYear]年@[createMonth]月@[createDay]日</div>`
#### logo图片【logoImgUrl】
顶部logo图片
- 标识：`logoImgUrl`
- 默认值：空
- 显示：`@[isShowLogo]`
### 底部消息属性
#### 显示标题【isShowInfoTitle】
设置是否显示组件标题
- 标识：`isShowInfoTitle`
- 默认值：`true`
- 选项：	 - 显示【true】	 - 隐藏【false】
#### 显示标签【isShowInfoLabel】
设置是否显示组件标题
- 标识：`isShowInfoLabel`
- 默认值：`true`
- 选项：	 - 显示【true】	 - 隐藏【false】
#### 显示图片【isShowInfoTitleImg】
设置是否显示组件标题图片
- 标识：`isShowInfoTitleImg`
- 默认值：`true`
- 选项：	 - 显示【true】	 - 隐藏【false】
#### 标题图片【infoTitleImgUrl】
标题左侧图片
- 标识：`infoTitleImgUrl`
- 默认值：空
- 显示：`@[isShowInfoTitle&&isShowInfoTitleImg]`
### logo样式设置
#### 宽【widthLogo】
填写auto则为自适应，或者使用px、%、vw等单位，比如100%、100px、100vw等等
- 标识：`widthLogo`
- 默认值：`28%`
#### 高【heightLogo】
填写auto则为自适应，或者使用px、%、vh等单位，比如100%、100px、100vh等等
- 标识：`heightLogo`
- 默认值：空
#### 容器边距【boxLogo】

- 标识：`boxLogo`
- 默认值：空
### 标题样式设置
#### 宽【widthTitle】
填写auto则为自适应，或者使用px、%、vw等单位，比如100%、100px、100vw等等
- 标识：`widthTitle`
- 默认值：空
#### 高【heightTitle】
填写auto则为自适应，或者使用px、%、vh等单位，比如100%、100px、100vh等等
- 标识：`heightTitle`
- 默认值：空
#### 标题文字【titleFont】

- 标识：`titleFont`
- 默认值：```json{
    "fontColors": {
        "hex8": "#F11D1DFF"
    },
    "fontTextAlign": "center",
    "fontSize": 30,
    "fontSizeUnit": "px"
}```
#### 容器边距【boxTitle】

- 标识：`boxTitle`
- 默认值：空
#### 边框【borderTitle】

- 标识：`borderTitle`
- 默认值：空
### 正文样式设置
#### 内容文字【contentFont】

- 标识：`contentFont`
- 默认值：```json{
    "fontColors": {
        "hex8": ""
    },
    "fontSize": 15,
    "fontSizeUnit": "px"
}```
#### 内容边距【contentBox】

- 标识：`contentBox`
- 默认值：```json{
    "marginTopVal": "",
    "marginRightVal": "",
    "marginBottomVal": "",
    "marginLeftVal": "",
    "paddingTopVal": "",
    "paddingRightVal": "40px",
    "paddingBottomVal": "",
    "paddingLeftVal": "40px"
}```
### 消息样式设置
#### 宽度【widthInfo】
填写auto则为自适应，或者使用px、%、vw等单位，比如100%、100px、100vw等等
- 标识：`widthInfo`
- 默认值：空
#### 高度【heightInfo】
填写auto则为自适应，或者使用px、%、vw等单位，比如100%、100px、100vw等等
- 标识：`heightInfo`
- 默认值：空
#### 最大高度【minHeightInfo】
填写auto则为自适应，或者使用px、%、vw等单位，比如100%、100px、100vw等等
- 标识：`minHeightInfo`
- 默认值：空
#### 最大行数【maxRow】
正文最多显示多少行，超出隐藏
- 标识：`maxRow`
- 默认值：`4`
#### 背景设置
##### 背景色【bgColorInfo】

- 标识：`bgColorInfo`
- 默认值：```json{}```
##### 背景图片【bgImgUrlInfo】

- 标识：`bgImgUrlInfo`
- 默认值：空
#### 容器边距【boxInfo】

- 标识：`boxInfo`
- 默认值：空
#### 大标题样式设置
##### 最小宽度【minWidthInfoTitle】
填写auto则为自适应，或者使用px、%、vw等单位，比如100%、100px、100vw等等
- 标识：`minWidthInfoTitle`
- 默认值：`160px`
##### 高度【heightInfoTitle】
填写auto则为自适应，或者使用px、%、vw等单位，比如100%、100px、100vw等等
- 标识：`heightInfoTitle`
- 默认值：`40px`
##### 偏移量【positionYInfoTitle】
元素相对自身在垂直方向的偏移量，可设置为高度的一半
- 标识：`positionYInfoTitle`
- 默认值：`-20px`
##### 图片宽度【WidthInfoTitleImg】
填写auto则为自适应，或者使用px、%、vw等单位，比如100%、100px、100vw等等
- 标识：`WidthInfoTitleImg`
- 默认值：`26px`
##### 图标高度【heightInfoTitleImg】
填写auto则为自适应，或者使用px、%、vw等单位，比如100%、100px、100vw等等
- 标识：`heightInfoTitleImg`
- 默认值：`28px`
##### 文字【fontInfoTitle】

- 标识：`fontInfoTitle`
- 默认值：空
##### 图片边距【boxInfoTitleImg】

- 标识：`boxInfoTitleImg`
- 默认值：空
##### 容器边距【boxInfoTitle】

- 标识：`boxInfoTitle`
- 默认值：空
#### 段落标签样式设置
##### 线条颜色【colorLine】

- 标识：`colorLine`
- 默认值：空
##### 文字【fontInfoLabel】

- 标识：`fontInfoLabel`
- 默认值：空
##### 文字边距【boxInfoLabel】

- 标识：`boxInfoLabel`
- 默认值：空
#### 消息正文样式设置
##### 文字【fontInfoMessage】

- 标识：`fontInfoMessage`
- 默认值：空
##### 文字边距【boxInfoMessage】

- 标识：`boxInfoMessage`
- 默认值：空
### 样式设置
#### 宽【width】
填写auto则为自适应，或者使用px、%、vw等单位，比如100%、100px、100vw等等
- 标识：`width`
- 默认值：`100%`
#### 高【height】
填写auto则为自适应，或者使用px、%、vh等单位，比如100%、100px、100vh等等
- 标识：`height`
- 默认值：`100vh`
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
#### 上边距【paddingTop】
页面顶部元素距离页面顶部的预留距离
- 标识：`paddingTop`
- 默认值：空
#### 容器边距【box】

- 标识：`box`
- 默认值：```json{
    "marginTopVal": "",
    "marginRightVal": "",
    "marginBottomVal": "",
    "marginLeftVal": "",
    "paddingTopVal": "20px",
    "paddingRightVal": "",
    "paddingBottomVal": "",
    "paddingLeftVal": ""
}```
#### 边框【border】

- 标识：`border`
- 默认值：空
### 数据源
#### 数据模式【dataType】
选择获取数据的模式
- 标识：`dataType`
- 默认值：`dataSource`
- 选项：	 - 数据源【dataSource】	 - 自定义函数【customFunction】
#### 数据源【dataSource】

- 标识：`dataSource`
- 默认值：空
- 显示：`@[dataType === 'dataSource']`
#### 自定义参数【paramsFunc】
设置数据源自定义参数函数，函数返回示例 return { isShowDialog: true, username: "用户名称", avatar: "头像url"}, 接口参数：{routerParams: 上页面携带的参数}
- 标识：`paramsFunc`
- 默认值：空
- 显示：`@[dataType === 'dataSource']`
- 可设置函数数量：单个
#### 自定义函数【customFunction】

- 标识：`customFunction`
- 默认值：空
- 显示：`@[dataType=='customFunction']`
- 可设置函数数量：单个
#### 字段设置
##### 消息标题【dataFieldInfoTitle】

- 标识：`dataFieldInfoTitle`
- 默认值：`infoTitle`
##### 消息标签【dataFieldInfoLabel】

- 标识：`dataFieldInfoLabel`
- 默认值：`infoLabel`
##### 消息内容【dataFieldInfoMessage】

- 标识：`dataFieldInfoMessage`
- 默认值：`infoMessage`
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
#### 刷新KEY【messageRefreshKey】
根据组件接收到消息的刷新KEY来刷新数据
- 标识：`messageRefreshKey`
- 默认值：空
- 选项：