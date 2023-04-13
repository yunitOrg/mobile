# 待办列表
此组件是待办列表，这里是组件简介
## 组件类ID（ITodoList）
idm.component.mobile.itodolist
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
#### 左侧图标【isShowLeftIcon】
是否显示组件标题内的左侧图标
- 标识：`isShowLeftIcon`
- 默认值：`true`
- 显示：`@[isShowTitle]`
- 选项：	 - 显示【true】	 - 隐藏【false】
#### 标题右侧【titleRightContent】
选择标题右侧展示内容
- 标识：`titleRightContent`
- 默认值：`textAndIcon`
- 显示：`@[isShowTitle]`
- 选项：	 - 文字+图标【textAndIcon】	 - 角标+图标【badgeAndIcon】	 - 文字【text】	 - 角标【badge】	 - 图标【icon】	 - 不显示【false】
#### 组件标题【htmlTitle】
组件上方标题文字
- 标识：`htmlTitle`
- 默认值：`待办列表`
- 显示：`@[isShowTitle]`
#### 最多显示【limit】
设置组件列表最多显示几条
- 标识：`limit`
- 默认值：`2`
#### 更多跳转【jumpStyle】
设置点击更多跳转方式
- 标识：`jumpStyle`
- 默认值：`_link`
- 显示：`@[isShowTitle]`
- 选项：	 - 子页面打开【_child】	 - 接口链接打开【_link】	 - 自定义链接【_custom_link】	 - 自定义函数【_custom_func】
#### 更多页面【morePageList】
选择要打开的子页面
- 标识：`morePageList`
- 默认值：空
- 显示：`@[jumpStyle === '_child' && isShowTitle == true]`
#### 是否缓存【isMoreKeep】
点击更多跳转子页面时，是否缓存本页面
- 标识：`isMoreKeep`
- 默认值：`true`
- 显示：`@[jumpStyle === '_child' && isShowTitle == true]`
- 选项：	 - 是【true】	 - 否【false】
#### 更多链接【customMoreLink】
自定义更多链接
- 标识：`customMoreLink`
- 默认值：空
- 显示：`@[jumpStyle === '_custom_link']`
#### 自定义更多跳转函数【jumpMoreCustomFunc】

- 标识：`jumpMoreCustomFunc`
- 默认值：空
- 显示：`@[jumpStyle === '_custom_func']`
- 可设置函数数量：单个
#### 单项跳转【itemJumpStyle】
设置点击单项跳转方式
- 标识：`itemJumpStyle`
- 默认值：`_link`
- 选项：	 - 子页面打开【_child】	 - 接口子页面【_interface_child】	 - 接口链接打开【_link】	 - 自定义链接【_custom_link】	 - 自定义函数【_custom_func】
#### 单项页面【itemPageList】
选择要打开的子页面
- 标识：`itemPageList`
- 默认值：空
- 显示：`@[itemJumpStyle === '_child']`
#### 是否缓存【isItemKeep】
单项页面跳转子页面时，是否缓存本页面
- 标识：`isItemKeep`
- 默认值：`true`
- 显示：`@[itemJumpStyle === '_child']`
- 选项：	 - 是【true】	 - 否【false】
#### 单项链接【customItemLink】
自定义单项链接，可写表达式，从item中获取参数 示例：itemUrl?id=@[id]
- 标识：`customItemLink`
- 默认值：空
- 显示：`@[itemJumpStyle === '_custom_link']`
#### 自定义单项跳转函数【jumpItemCustomFunc】

- 标识：`jumpItemCustomFunc`
- 默认值：空
- 显示：`@[itemJumpStyle === '_custom_func']`
- 可设置函数数量：单个
### 标题容器样式
#### 左侧图标
##### 选择图标【titleIcon】

- 标识：`titleIcon`
- 默认值：空
##### 图标颜色【titleIconFontColor】
设置图标颜色，会覆盖主题色
- 标识：`titleIconFontColor`
- 默认值：```json{}```
##### 图标大小【titleIconFontSize】

- 标识：`titleIconFontSize`
- 默认值：`18`
##### 内外边距【leftIconBox】

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
#### 右侧图标
##### 选择图标【rightTitleIcon】

- 标识：`rightTitleIcon`
- 默认值：空
##### 图标颜色【rightTitleIconFontColor】
设置图标颜色，会覆盖主题色
- 标识：`rightTitleIconFontColor`
- 默认值：```json{}```
##### 图标大小【rightTitleIconFontSize】

- 标识：`rightTitleIconFontSize`
- 默认值：`18`
##### 内外边距【rightIconBox】

- 标识：`rightIconBox`
- 默认值：```json{
    "marginTopVal": "",
    "marginRightVal": "",
    "marginBottomVal": "",
    "marginLeftVal": "4px",
    "paddingTopVal": "",
    "paddingRightVal": "",
    "paddingBottomVal": "",
    "paddingLeftVal": ""
}```
#### 标题字体【titleFontStyle】

- 标识：`titleFontStyle`
- 默认值：```json{
    "fontColors": {
        "hex": "#333333",
        "hex8": "#333333FF"
    },
    "fontSize": 18,
    "fontSizeUnit": "px",
    "fontWeight": "800"
}```
- 显示：`@[isShowTitle == true]`
#### 右侧字体【rightTitleFontStyle】
文本颜色默认为主题色,如果设置了颜色,会覆盖主题色
- 标识：`rightTitleFontStyle`
- 默认值：```json{
    "fontColors": {
        "hex": "",
        "hex8": ""
    },
    "fontSize": 15,
    "fontSizeUnit": "px",
    "fontWeight": "400"
}```
- 显示：`@[isShowTitle == true && (titleRightContent == 'textAndIcon' || titleRightContent == 'text')]`
#### 内外边距【titleBox】

- 标识：`titleBox`
- 默认值：空
### 外层容器样式
#### 宽高【undefined】

- 标识：`undefined`
- 默认值：空
#### 阴影【boxShadow】
填写格式如下：10px 10px 5px #888888，更多请点击查看详细填写说明
- 标识：`boxShadow`
- 默认值：`0 0 3px 2px #F2F2F2`
#### 背景颜色【bgColor】

- 标识：`bgColor`
- 默认值：```json{
    "hex": "#FFFFFF",
    "hex8": "#FFFFFFFF"
}```
#### 内外边距【box】

- 标识：`box`
- 默认值：```json{
    "marginTopVal": "10px",
    "marginRightVal": "10px",
    "marginBottomVal": "10px",
    "marginLeftVal": "10px",
    "paddingTopVal": "10px",
    "paddingRightVal": "10px",
    "paddingBottomVal": "",
    "paddingLeftVal": "10px"
}```
#### 边框【border】

- 标识：`border`
- 默认值：```json{
    "border": {
        "top": {
            "style": "",
            "width": 0,
            "widthUnit": "",
            "colors": {}
        },
        "right": {
            "style": "",
            "width": 0,
            "widthUnit": "",
            "colors": {}
        },
        "bottom": {
            "style": "",
            "width": 0,
            "widthUnit": "",
            "colors": {}
        },
        "left": {
            "style": "",
            "width": 0,
            "widthUnit": "",
            "colors": {}
        }
    },
    "radius": {
        "leftTop": {
            "radius": 5,
            "radiusUnit": "px"
        },
        "rightTop": {
            "radius": 5,
            "radiusUnit": "px"
        },
        "leftBottom": {
            "radius": 5,
            "radiusUnit": "px"
        },
        "rightBottom": {
            "radius": 5,
            "radiusUnit": "px"
        }
    }
}```
### 内层容器样式
#### 阴影【subBoxShadow】
填写格式如下：10px 10px 5px #888888，更多请点击查看详细填写说明
- 标识：`subBoxShadow`
- 默认值：空
#### 背景颜色【subBgColor】

- 标识：`subBgColor`
- 默认值：```json{}```
#### 内外边距【subBox】

- 标识：`subBox`
- 默认值：空
#### 边框【subBorder】

- 标识：`subBorder`
- 默认值：空
### 单项容器样式
#### 标题行数【lineTitleClamp】
设置标题文本超过换行的行数，如果没有超过则不生效
- 标识：`lineTitleClamp`
- 默认值：`2`
#### 内外边距【lineBox】

- 标识：`lineBox`
- 默认值：```json{
    "marginTopVal": "",
    "marginRightVal": "",
    "marginBottomVal": "",
    "marginLeftVal": "",
    "paddingTopVal": "10px",
    "paddingRightVal": "",
    "paddingBottomVal": "10px",
    "paddingLeftVal": ""
}```
#### 边框【lineBorder】

- 标识：`lineBorder`
- 默认值：```json{
    "border": {
        "top": {
            "style": "0",
            "width": 0,
            "widthUnit": "",
            "colors": {}
        },
        "right": {
            "style": "0",
            "width": 0,
            "widthUnit": "",
            "colors": {}
        },
        "bottom": {
            "style": "dashed",
            "width": 1,
            "widthUnit": "px",
            "colors": {
                "hex": "#CECBCB",
                "hex8": "#CECBCBFF"
            }
        },
        "left": {
            "style": "0",
            "width": 0,
            "widthUnit": "",
            "colors": {}
        }
    },
    "radius": {
        "leftTop": {
            "radius": 0,
            "radiusUnit": "px"
        },
        "rightTop": {
            "radius": 0,
            "radiusUnit": "px"
        },
        "leftBottom": {
            "radius": 0,
            "radiusUnit": "px"
        },
        "rightBottom": {
            "radius": 0,
            "radiusUnit": "px"
        }
    }
}```
#### 消息字体【messageFontStyle】

- 标识：`messageFontStyle`
- 默认值：```json{
    "fontColors": {
        "hex": "#333333",
        "hex8": "#333333FF"
    },
    "fontSize": 15,
    "fontSizeUnit": "px",
    "fontWeight": "400"
}```
#### 已读字体【hasReadFontStyle】

- 标识：`hasReadFontStyle`
- 默认值：```json{
    "fontColors": {
        "hex": "",
        "hex8": ""
    },
    "fontSize": 15,
    "fontSizeUnit": "px",
    "fontWeight": "400"
}```
### 消息模块样式【moduleStyleList】
点击？查看主题设置用法指南
- 标识：`moduleStyleList`
- 默认值：```json[
    {
        "moduleName": "党费缴纳",
        "moduleFont": {
            "fontColors": {
                "hex": "#E11212",
                "hex8": "#E11212FF"
            }
        }
    },
    {
        "moduleName": "组织生活",
        "moduleFont": {
            "fontColors": {
                "hex": "#0080FF",
                "hex8": "#0080FFFF"
            }
        }
    }
]```
### 主题设置【themeList】
点击？查看主题设置用法指南
- 标识：`themeList`
- 默认值：```json[
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
]```
### 高级
#### 数据模式【dataType】
设置组件数据模式
- 标识：`dataType`
- 默认值：`dataSource`
- 选项：	 - 数据源【dataSource】	 - 自定义函数【customFunction】
#### 数据源【dataSource】
设置组件数据源，组件内接受参数：{start, limit, 自定义参数函数，chooseTab消息参数 }，数据返回示例：{value: [], count: 0, moreUrl: ''}
- 标识：`dataSource`
- 默认值：空
- 显示：`@[dataType === 'dataSource']`
#### 自定义函数【customFunction】
设置数据自定义函数
- 标识：`customFunction`
- 默认值：空
- 显示：`@[dataType === 'customFunction']`
- 可设置函数数量：单个
#### 自定义参数【paramsFunc】
设置数据源自定义参数函数，函数返回示例 return { isShowDialog: true, username: "用户名称", avatar: "头像url"}, 接口参数：{routerParams: 上页面携带的参数}
- 标识：`paramsFunc`
- 默认值：空
- 可设置函数数量：单个
#### 刷新KEY【messageRefreshKey】
根据组件接收到消息的刷新KEY来刷新数据
- 标识：`messageRefreshKey`
- 默认值：空
- 选项：
#### 已读判断【hasReadJudge】

- 标识：`hasReadJudge`
- 默认值：`express`
- 选项：	 - 表达式【express】	 - 自定义函数【customFunction】
#### 表达式【hasReadExpress】
用来判断消息已读的表达式，例如：readStatus === '1'
- 标识：`hasReadExpress`
- 默认值：`readStatus === '1'`
- 显示：`@[hasReadJudge === 'express']`
#### 已读函数【readFunction】

- 标识：`readFunction`
- 默认值：空
- 显示：`@[hasReadJudge === 'customFunction']`
- 可设置函数数量：单个
#### 标题下方内容函数【titleBottomContentFunction】
自定义风格样式显示函数，根据函数返回的html决定显示内容
- 标识：`titleBottomContentFunction`
- 默认值：空
- 可设置函数数量：单个
#### 适配设置
##### 基准值【baseSize】
此属性用于标记当前组件在显示效果最完美情况下的宽度大小（px），例如：此组件显示效果最佳宽度为414px，则此处设置为414即可，如果此组件最佳效果为当前配置的屏幕宽（px）的一半则只需要除以2即可。
- 标识：`baseSize`
- 默认值：`414`
##### 适配比例【adaptationRatio】
与基准值配合使用，如果在实际预览屏幕宽为基准值的两倍，则此组件所有可适配的内容都会基于此处设置的适配比例相对应的进行放大缩小，例如此处设置1.2，则会相对应的放大至1.2倍
- 标识：`adaptationRatio`
- 默认值：`1.2`
#### 字段设置
##### 模块字段【moduleField】

- 标识：`moduleField`
- 默认值：`moduleName`
##### 标题字段【titleField】

- 标识：`titleField`
- 默认值：`title`
##### 子页面id【subPageField】
单项点击设置接口子页面跳转时，子页面id字段
- 标识：`subPageField`
- 默认值：`pageId`
- 显示：`@[itemJumpStyle === '_interface_child']`
##### 跳转字段【jumpUrlField】
跳转链接的字段
- 标识：`jumpUrlField`
- 默认值：`jumpUrl`
##### 更多地址【moreUrlField】
更多跳转链接的字段
- 标识：`moreUrlField`
- 默认值：`moreUrl`