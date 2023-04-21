# 饼状统计图
移动端组件包-表格饼状图组件（带有选择框）。注意：配置图表优先考虑`直角坐标系图表组件`和`圆心坐标系图表组件`，但如果需要在图表下显示表格，则可考虑此组件
## 组件类ID（ISelectPieChart）
idm.component.mobile.selectPieChart
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
#### 显示表格【showTable】

- 标识：`showTable`
- 默认值：`true`
#### 加载描述【loadingDescription】
用于指定组件加载中时的显示文字
- 标识：`loadingDescription`
- 默认值：`加载中...`
#### 为空描述【emptyDescription】
用于指定组件无数据时的显示文字
- 标识：`emptyDescription`
- 默认值：`暂无数据`
#### 下拉描述【selectBtnPlaceholder】
用于指定下拉无选中时的显示文字，同时也是选择器的标题
- 标识：`selectBtnPlaceholder`
- 默认值：`请选择`
- 显示：`@[isShowTitleBar]`
#### 下拉来源【columnsType】

- 标识：`columnsType`
- 默认值：`dataSource`
- 显示：`@[isShowTitleBar]`
- 选项：
	 - 数据源【dataSource】
	 - 静态配置【static】
	 - 没有下拉【none】

#### 下拉数据源【columnsDataSource】
用于选择下拉的数据源
- 标识：`columnsDataSource`
- 默认值：空
- 显示：`@[isShowTitleBar&&columnsType=='dataSource']`

入参：

```json
{
  "pageId": "当前页面的唯一标识",
  "...urlObject": "当前页面的网址url携带的参数",
  "...routerParam": "单页面跳转携带的参数"
}
```

接口返回格式示例：

```json
{
  "code": "200",
  "type": "success",
  "message": "操作成功",
  "metadata": null,
  "token": "",
  "data": [
     { "text": "2015年", "value": 2015, "isDefault": false }
    ...
  ]
}
```

- ⚠ <font color="#FF0000">**_注意事项：_**</font>
  <font color="#FF0000">如果格式有差异，请使用自定义函数，并返回正确格式的数据</font>

#### 下拉自定义函数【columnsCustomFunction】
用于格式化数据源返回的数据，参数为{urlObject:url参数,pageId:页面id,customParam:自定义的参数,resultData:原始数据,moduleObject:组件信息}
- 标识：`columnsCustomFunction`
- 默认值：空
- 显示：`@[isShowTitleBar&&columnsType=='dataSource']`
- 可设置函数数量：单个
#### 下拉静态配置【columnsList】

- 标识：`columnsList`
- 默认值：空
- 显示：`@[isShowTitleBar&&columnsType=='static']`
#### 图表数据源【chartDataSource】
用于选择图表的数据源
- 标识：`chartDataSource`
- 默认值：空

入参：

```json
{
  "id": "数据源id",
  "pageId": "当前页面的唯一标识",
  "...urlObject": "当前页面的网址url携带的参数",
  "...routerParam": "单页面跳转携带的参数",
  "selectedValue": "下拉选中项的值",
  "selectedItem": "下拉选中项的对象"
}
```

接口返回格式示例。返回的字段名没有特定的要求，格式只需满足最外层的基本格式，data 里可以为其他格式：

```json
{
  "code": "200",
  "type": "success",
  "message": "操作成功",
  "metadata": null,
  "token": "",
  "data": [
    {
      "name": "名称",
      "value": "数值",
      "displayValue": "数值的展示用字段",
      "ratio": "占比，百分比",
      "color": "可选字段，用于控制此项在图表中的颜色"
      ...
    },
    ...
  ]
}
```

- ⚠ <font color="#FF0000">**_注意事项：_**</font>
  <font color="#FF0000">如果格式有差异，请使用自定义函数，并返回正确格式的数据</font>

#### 图表自定义函数【chartDataCustomFunction】
用于格式化数据源返回的数据，参数为{urlObject:url参数,pageId:页面id,customParam:自定义的参数,resultData:原始数据,moduleObject:组件信息}
- 标识：`chartDataCustomFunction`
- 默认值：空
- 可设置函数数量：单个
### 图表属性设置
#### 图表高度【chartHeight】
注意当组件外层或内层容器有高度时，图表和表格的高度会按照此值的比例缩放。可使用px、%、vh等单位
- 标识：`chartHeight`
- 默认值：`150px`
#### 图标标题【chartTitle】
会在图表上方显示
- 标识：`chartTitle`
- 默认值：`标题`
#### 显示图例【showLegend】

- 标识：`showLegend`
- 默认值：`true`
#### 显示标签【showLabel】

- 标识：`showLabel`
- 默认值：`true`
#### 图表样式【chartType】

- 标识：`chartType`
- 默认值：`hollow`
- 选项：
	 - 空心【hollow】
	 - 实心【solid】

#### 空隙大小【itemBorderWidth】
设置饼状图中各项间的间隔空隙，为0则没有间隔
- 标识：`itemBorderWidth`
- 默认值：`0`
#### 顶部边距【seriesTop】
图像离容器上边缘的距离，请填入数字或百分比，如果图表标题过大，则可适当增大此值
- 标识：`seriesTop`
- 默认值：`30`
- 显示：`@[chartTitle]`
#### 底部边距【seriesBottom】
图像离容器下边缘的距离，请填入数字或百分比，如果图例较多，则可适当增大此值
- 标识：`seriesBottom`
- 默认值：`20`
- 显示：`@[showLegend]`
#### 颜色来源【colorType】

- 标识：`colorType`
- 默认值：`static`
- 选项：
	 - 静态配置【static】
	 - 取值字段【field】

#### 图表颜色【chartColors】
这里可设置图表各项的颜色，最终会按照数据源数组中的顺序加载对应的颜色
- 标识：`chartColors`
- 默认值：空
- 显示：`@[colorType=='static']`
#### 颜色字段【chartColorField】
可根据数据里的某字段控制图表颜色
- 标识：`chartColorField`
- 默认值：空
- 显示：`@[colorType=='field']`
#### 标题样式
##### 文字大小【chartTitleFontSize】

- 标识：`chartTitleFontSize`
- 默认值：`16`
##### 文字字重【chartTitleFontWeight】

- 标识：`chartTitleFontWeight`
- 默认值：`bolder`
##### 文字颜色【chartTitleFontColor】
可填数字，或css样式支持的字符串
- 标识：`chartTitleFontColor`
- 默认值：空
#### 图例样式
##### 间隔大小【legendItemGap】

- 标识：`legendItemGap`
- 默认值：`20`
##### 图标大小【legendItemSize】

- 标识：`legendItemSize`
- 默认值：`14`
##### 文字大小【legendFontSize】

- 标识：`legendFontSize`
- 默认值：`14`
##### 文字颜色【legendFontColor】

- 标识：`legendFontColor`
- 默认值：空
#### 标签样式
##### 文字大小【chartLabelFontSize】

- 标识：`chartLabelFontSize`
- 默认值：`12`
##### 文字颜色【chartLabelFontColor】

- 标识：`chartLabelFontColor`
- 默认值：空
### 表格属性设置
#### 表格高度【tableHeight】
注意当组件外层或内层容器有高度时，表格和图表的高度会按照此值的比例缩放。可使用px、%、vh等单位
- 标识：`tableHeight`
- 默认值：`150px`
#### 字段设置【tableFields】

- 标识：`tableFields`
- 默认值：空
#### 内外边距【tableBox】

- 标识：`tableBox`
- 默认值：
```json
{
    "marginTopVal": "",
    "marginRightVal": "",
    "marginBottomVal": "",
    "marginLeftVal": "",
    "paddingTopVal": "",
    "paddingRightVal": "12%",
    "paddingBottomVal": "",
    "paddingLeftVal": "12%"
}
```
#### 图标大小【tableIconSize】

- 标识：`tableIconSize`
- 默认值：`14`
#### 表格文字【tableFont】

- 标识：`tableFont`
- 默认值：
```json
{
    "fontColors": {
        "hex": "#333333",
        "hex8": "#333333ff"
    },
    "fontSize": 14,
    "fontSizeUnit": "px"
}
```
### 标题容器样式
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
#### 下拉文字【selectFont】
下拉文字样式设置
- 标识：`selectFont`
- 默认值：空
- 显示：`@[isShowTitleBar&&columnsType!='none']`
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
#### 刷新消息名【reloadKey】
此属性用来规定重加载的消息名
- 标识：`reloadKey`
- 默认值：`linkageReload`
#### 下拉切换自定义函数【customSelectChange】
通过选择器更改下拉的值时调用，参数为{urlObject:url参数,pageId:页面id,customParam:自定义的参数,moduleObject:组件信息,selectedValue:选中的值,selectedItem:选中的项,chartData:组件数据}
- 标识：`customSelectChange`
- 默认值：空
- 可设置函数数量：单个
#### 表格点击自定义函数【customTableRowCilck】
用于格式化数据源返回的数据，参数为{urlObject:url参数,pageId:页面id,customParam:自定义的参数,moduleObject:组件信息,selectedValue:选中的值,selectedItem:选中的项,chartData:组件数据,record:当前点击的行的数据}
- 标识：`customTableRowCilck`
- 默认值：空
- 可设置函数数量：单个
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
