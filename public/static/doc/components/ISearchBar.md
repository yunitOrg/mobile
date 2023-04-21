# 条状搜索
移动端组件包-条状搜索组件。带有历史记录，热门词条
## 组件类ID（ISearchBar）
idm.component.mobile.searchBar
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
#### 启用热门【showPopular】
是否启用热门搜索
- 标识：`showPopular`
- 默认值：`true`
#### 启用历史【showRecord】
是否启用搜索历史
- 标识：`showRecord`
- 默认值：`true`
#### 热门来源【popularType】

- 标识：`popularType`
- 默认值：`static`
- 显示：`@[showPopular]`
- 选项：
	 - 静态配置【static】
	 - 数据源【dataSource】

#### 热门数据源【popularDataSource】
用于选择热门的数据源
- 标识：`popularDataSource`
- 默认值：空
- 显示：`@[showPopular&&popularType=='dataSource']`

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
  "data": ["党费缴纳", "主题教育", "学习", "积分", "学时", "党费缴纳", "主题教育" ...]
}
```

- ⚠ <font color="#FF0000">**_注意事项：_**</font>
  <font color="#FF0000">如果格式有差异，请使用自定义函数，并返回正确格式的数据</font>

#### 热门自定义函数【customPopularFunction】
用于格式化数据源返回的数据，参数为{urlObject:url参数,pageId:页面id,customParam:自定义的参数,resultData:原始数据,moduleObject:组件信息}
- 标识：`customPopularFunction`
- 默认值：空
- 显示：`@[showPopular&&popularType=='dataSource']`
- 可设置函数数量：单个
#### 热门静态配置【popularStaticSet】

- 标识：`popularStaticSet`
- 默认值：空
- 显示：`@[showPopular&&popularType=='static']`
#### 历史来源【recordType】

- 标识：`recordType`
- 默认值：`local`
- 显示：`@[showRecord]`
- 选项：
	 - 本地缓存【local】
	 - 数据源【dataSource】

#### 历史排序【recordLocalDisplayMode】
决定排序规则为搜索时间倒序还是搜索次数倒序
- 标识：`recordLocalDisplayMode`
- 默认值：`time`
- 显示：`@[showRecord]`
- 选项：
	 - 时间【time】
	 - 次数【freq】

#### 历史数据源【recordDataSource】
用于选择历史的数据源，入参有{type: 历史排序规则,pageId,...urlObject}
- 标识：`recordDataSource`
- 默认值：空
- 显示：`@[showRecord&&recordType=='dataSource']`

入参：

```json
{
  "pageId": "当前页面的唯一标识",
  "type": "排序规则，freq：次数 | time: 时间",
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
  "data": ["党费缴纳", "主题教育", "学习", "积分", "学时", "党费缴纳", "主题教育" ...]
}
```

- ⚠ <font color="#FF0000">**_注意事项：_**</font>
  <font color="#FF0000">如果格式有差异，请使用自定义函数，并返回正确格式的数据</font>

#### 历史自定义函数【customRecordFunction】
用于格式化数据源返回的数据，参数为{urlObject:url参数,pageId:页面id,customParam:自定义的参数,resultData:原始数据,moduleObject:组件信息}
- 标识：`customRecordFunction`
- 默认值：空
- 显示：`@[showRecord&&recordType=='dataSource']`
- 可设置函数数量：单个
#### 历史保存数据源【recordAdddataSource】
用于选择保存历史的数据源，入参有{text: 当前搜索输入的文字}

- 标识：`recordAdddataSource`
- 默认值：空
- 显示：`@[showRecord&&recordType=='dataSource']`
入参：
```json
{
  "text": "当前搜索输入的文字"
}
```

#### 历史删除数据源【recordRemoveDataSource】
用于选择删除历史的数据源，入参有{text: 当前搜索输入的文字}
- 标识：`recordRemoveDataSource`
- 默认值：空
- 显示：`@[showRecord&&recordType=='dataSource']`

入参：

```json
{
  "text": "当前搜索输入的文字"
}
```
### 搜索属性设置
#### 占位提示【placeholder】
占位提示文字
- 标识：`placeholder`
- 默认值：`请输入搜索关键词`
#### 自动聚焦【autofocus】
是否自动聚焦，iOS 系统不支持该属性
- 标识：`autofocus`
- 默认值：`false`
#### 显示取消【showAction】
是否在搜索框右侧显示取消按钮
- 标识：`showAction`
- 默认值：`true`
#### 最大字数【searchMaxlength】

- 标识：`searchMaxlength`
- 默认值：空
#### 样式设置
##### 外部容器内外边距【searchOutsideBox】

- 标识：`searchOutsideBox`
- 默认值：
```json
{
    "marginTopVal": "",
    "marginRightVal": "",
    "marginBottomVal": "",
    "marginLeftVal": "",
    "paddingTopVal": "10px",
    "paddingRightVal": "12px",
    "paddingBottomVal": "10px",
    "paddingLeftVal": "12px"
}
```
##### 外部容器背景色【searchOutsideBgColor】

- 标识：`searchOutsideBgColor`
- 默认值：
```json
{}
```
##### 搜索边框【searchBorder】

- 标识：`searchBorder`
- 默认值：空
##### 搜索背景色【searchBgColor】

- 标识：`searchBgColor`
- 默认值：
```json
{}
```
##### 搜索图标颜色【searchIconColor】

- 标识：`searchIconColor`
- 默认值：
```json
{}
```
##### 搜索输入文字【searchInputFont】

- 标识：`searchInputFont`
- 默认值：空
##### 取消按钮文字【searchCancelFont】

- 标识：`searchCancelFont`
- 默认值：空
- 显示：`@[showAction]`
### 热门搜索属性设置
#### 显示标题【isShowPopularTitleBar】
是否显示标题栏
- 标识：`isShowPopularTitleBar`
- 默认值：`true`
#### 标题文字【popularTitle】
标题文字
- 标识：`popularTitle`
- 默认值：`热门搜索`
- 显示：`@[isShowPopularTitleBar]`
#### 显示图标【showPopularIcon】
配置是否显示标题图标
- 标识：`showPopularIcon`
- 默认值：`true`
- 显示：`@[isShowPopularTitleBar]`
#### 标题图标【popularTitleIcon】

- 标识：`popularTitleIcon`
- 默认值：空
- 显示：`@[isShowPopularTitleBar&&showPopularIcon]`
#### 标题样式设置
##### 图标颜色【popularTitleIconColor】

- 标识：`popularTitleIconColor`
- 默认值：空
- 显示：`@[showPopularIcon&&isShowPopularTitleBar]`
##### 图标大小【popularTitleIconSize】

- 标识：`popularTitleIconSize`
- 默认值：`16`
- 显示：`@[showPopularIcon&&isShowPopularTitleBar]`
##### 标题文字【popularTitleFont】
标题文字样式设置
- 标识：`popularTitleFont`
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
- 显示：`@[isShowPopularTitleBar]`
#### 样式设置
##### 内外边距【popularBox】

- 标识：`popularBox`
- 默认值：
```json
{
    "marginTopVal": "10px",
    "marginRightVal": "10px",
    "marginBottomVal": "10px",
    "marginLeftVal": "10px",
    "paddingTopVal": "12px",
    "paddingRightVal": "10px",
    "paddingBottomVal": "12px",
    "paddingLeftVal": "10px"
}
```
##### 边框【popularBorder】

- 标识：`popularBorder`
- 默认值：空
##### 阴影样式【popularboxShadow】
可设置周围的阴影，写法请遵照标准box-shadow样式，示例：0px 2px 12px 0px rgba(0,0,0,0.07)
- 标识：`popularboxShadow`
- 默认值：`0px 2px 12px 0px rgba(0,0,0,0.07)`
##### 背景色【popularBgColor】

- 标识：`popularBgColor`
- 默认值：
```json
{}
```
##### 内容内外边距【popularContentBox】

- 标识：`popularContentBox`
- 默认值：空
##### 列间距【tagsMarginRight】

- 标识：`tagsMarginRight`
- 默认值：`10`
##### 行间距【tagsMarginTop】

- 标识：`tagsMarginTop`
- 默认值：`10`
##### 标签文字【tagsFont】
标签文字样式设置
- 标识：`tagsFont`
- 默认值：空
##### 标签颜色【tagsBgColor】

- 标识：`tagsBgColor`
- 默认值：
```json
{}
```
### 搜索历史属性设置
#### 显示标题【isShowRecordTitleBar】
是否显示标题栏
- 标识：`isShowRecordTitleBar`
- 默认值：`true`
#### 标题文字【recordTitle】
标题文字
- 标识：`recordTitle`
- 默认值：`搜索历史`
- 显示：`@[isShowRecordTitleBar]`
#### 显示图标【showRecordIcon】
配置是否显示标题图标
- 标识：`showRecordIcon`
- 默认值：`true`
- 显示：`@[isShowRecordTitleBar]`
#### 标题图标【recordTitleIcon】

- 标识：`recordTitleIcon`
- 默认值：空
- 显示：`@[isShowRecordTitleBar&&showRecordIcon]`
#### 标题样式设置
##### 图标颜色【recordTitleIconColor】

- 标识：`recordTitleIconColor`
- 默认值：空
- 显示：`@[showRecordIcon&&isShowRecordTitleBar]`
##### 图标大小【recordTitleIconSize】

- 标识：`recordTitleIconSize`
- 默认值：`16`
- 显示：`@[showRecordIcon&&isShowRecordTitleBar]`
##### 标题文字【recordTitleFont】
标题文字样式设置
- 标识：`recordTitleFont`
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
- 显示：`@[isShowRecordTitleBar]`
#### 样式设置
##### 内外边距【recordBox】

- 标识：`recordBox`
- 默认值：
```json
{
    "marginTopVal": "10px",
    "marginRightVal": "10px",
    "marginBottomVal": "10px",
    "marginLeftVal": "10px",
    "paddingTopVal": "12px",
    "paddingRightVal": "10px",
    "paddingBottomVal": "12px",
    "paddingLeftVal": "10px"
}
```
##### 边框【recordBorder】

- 标识：`recordBorder`
- 默认值：空
##### 阴影样式【recordboxShadow】
可设置周围的阴影，写法请遵照标准box-shadow样式，示例：0px 2px 12px 0px rgba(0,0,0,0.07)
- 标识：`recordboxShadow`
- 默认值：`0px 2px 12px 0px rgba(0,0,0,0.07)`
##### 背景色【recordBgColor】

- 标识：`recordBgColor`
- 默认值：
```json
{}
```
##### 内容内外边距【recordContentBox】

- 标识：`recordContentBox`
- 默认值：空
##### 行间距【cellPadding】

- 标识：`cellPadding`
- 默认值：`10`
##### 列表文字【cellTitleFont】
列表文字样式设置
- 标识：`cellTitleFont`
- 默认值：空
##### 图标颜色【cellIconColor】

- 标识：`cellIconColor`
- 默认值：
```json
{}
```
##### 图标大小【cellIconSize】

- 标识：`cellIconSize`
- 默认值：`16`
### 面板样式
#### 内外边距【panelBox】

- 标识：`panelBox`
- 默认值：空
#### 边框【panelBorder】

- 标识：`panelBorder`
- 默认值：空
#### 阴影样式【panelBoxShadow】
可设置组件周围的阴影，写法请遵照标准box-shadow样式，示例：0px 2px 12px 0px rgba(0,0,0,0.07)
- 标识：`panelBoxShadow`
- 默认值：空
#### 背景设置
##### 背景色【panelBgColor】

- 标识：`panelBgColor`
- 默认值：
```json
{}
```
##### 背景图片【panelBgImgUrl】

- 标识：`panelBgImgUrl`
- 默认值：空
##### 横向偏移【panelPositionX】

- 标识：`panelPositionX`
- 默认值：空
- 显示：`@[panelBgImgUrl]`
##### 纵向偏移【panelPositionY】

- 标识：`panelPositionY`
- 默认值：空
- 显示：`@[panelBgImgUrl]`
##### 背景大小【panelBgSize】

- 标识：`panelBgSize`
- 默认值：空
- 显示：`@[panelBgImgUrl]`
- 选项：
	 - 裁切显示【cover】
	 - 完全显示【contain】
	 - 自定义【custom】

##### 宽度【panelBgSizeWidth】

- 标识：`panelBgSizeWidth`
- 默认值：空
- 显示：`@[panelBgSize=='custom']`
##### 高度【panelBgSizeHeight】

- 标识：`panelBgSizeHeight`
- 默认值：空
- 显示：`@[panelBgSize=='custom']`
##### 平铺模式【panelBgRepeat】

- 标识：`panelBgRepeat`
- 默认值：空
- 显示：`@[panelBgImgUrl]`
- 选项：
	 - 双向重复【repeat】
	 - 水平重复【repeat-x】
	 - 垂直重复【repeat-y】
	 - 不重复【no-repeat】
	 - 继承【inherit】

##### 背景模式【panelBgAttachment】

- 标识：`panelBgAttachment`
- 默认值：空
- 显示：`@[panelBgImgUrl]`
- 选项：
	 - 固定【fixed】
	 - 滚动【scroll】
	 - 继承【inherit】

### 基本样式
#### 宽高【undefined】

- 标识：`undefined`
- 默认值：空
#### 内外边距【box】

- 标识：`box`
- 默认值：空
#### 边框【border】

- 标识：`border`
- 默认值：空
#### 阴影样式【boxShadow】
可设置组件周围的阴影，写法请遵照标准box-shadow样式，示例：0px 2px 12px 0px rgba(0,0,0,0.07)
- 标识：`boxShadow`
- 默认值：空
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
#### 表单标识【formFiledKey】
如果为空则会提交表单时用唯一标识作为key
- 标识：`formFiledKey`
- 默认值：空
#### 分组标识【formGroupKey】
表单分组标识，用于批量提交分组标识相同的表单控件值，减少提交控件一个一个选择控件的范围
- 标识：`formGroupKey`
- 默认值：`formGroupKey`
#### 联动组件
##### 需求组件范围【linkageDemandPageModule】
当前选项变更需要联动其他组件需求值（比如下拉选项数据等）的组件范围
- 标识：`linkageDemandPageModule`
- 默认值：空
##### tab菜单联动组件【triggerComponents】
选择点击tab需要联动的组件
- 标识：`triggerComponents`
- 默认值：空