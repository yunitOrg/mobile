# 党史今日
此组件是党史今日，这里是组件简介
## 组件类ID（IHistoryToday）
idm.component.mobile.ihistorytoday
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
#### 标题【title】

- 标识：`title`
- 默认值：`党史今日`
#### 跳转方式【jumpStyle】
设置点击更多跳转方式
- 标识：`jumpStyle`
- 默认值：`_link`
- 选项：	 - 子页面打开【_child】	 - 接口链接打开【_link】	 - 自定义链接【_custom_link】	 - 自定义函数【_custom_func】
#### 跳转页面【jumpPageList】
选择要跳转的页面
- 标识：`jumpPageList`
- 默认值：空
- 显示：`@[jumpStyle === '_child']`
#### 是否缓存【isPageKeep】
跳转子页面时，是否缓存本页面
- 标识：`isPageKeep`
- 默认值：`true`
- 显示：`@[jumpStyle === '_child']`
- 选项：	 - 是【true】	 - 否【false】
#### 跳转链接【customLink】
自定义跳转链接
- 标识：`customLink`
- 默认值：空
- 显示：`@[jumpStyle === '_custom_link']`
#### 自定义点击跳转函数【jumpCustomFunc】

- 标识：`jumpCustomFunc`
- 默认值：空
- 显示：`@[jumpStyle === '_custom_func']`
- 可设置函数数量：单个
### 容器样式设置
#### 宽高【undefined】

- 标识：`undefined`
- 默认值：空
#### 阴影【boxShadow】

- 标识：`boxShadow`
- 默认值：空
#### 内外边距【box】

- 标识：`box`
- 默认值：```json{
    "marginTopVal": "10px",
    "marginRightVal": "10px",
    "marginBottomVal": "10px",
    "marginLeftVal": "10px",
    "paddingTopVal": "10px",
    "paddingRightVal": "5px",
    "paddingBottomVal": "10px",
    "paddingLeftVal": "15px"
}```
#### 背景色【bgColor】

- 标识：`bgColor`
- 默认值：```json{
    "hex": "#FFEDDF",
    "hex8": "#FFEDDFFF"
}```
#### 边框【border】

- 标识：`border`
- 默认值：```json{
    "border": {
        "top": {
            "style": "",
            "width": 0,
            "widthUnit": "px",
            "colors": {}
        },
        "right": {
            "style": "",
            "width": 0,
            "widthUnit": "px",
            "colors": {}
        },
        "bottom": {
            "style": "",
            "width": 0,
            "widthUnit": "px",
            "colors": {}
        },
        "left": {
            "style": "",
            "width": 0,
            "widthUnit": "px",
            "colors": {}
        }
    },
    "radius": {
        "leftTop": {
            "radius": 3,
            "radiusUnit": "px"
        },
        "rightTop": {
            "radius": 3,
            "radiusUnit": "px"
        },
        "leftBottom": {
            "radius": 3,
            "radiusUnit": "px"
        },
        "rightBottom": {
            "radius": 3,
            "radiusUnit": "px"
        }
    }
}```
### 左侧样式设置
#### 底部背景【leftBottomBgColor】

- 标识：`leftBottomBgColor`
- 默认值：```json{
    "hex": "#FFB300",
    "hex8": "#FFB300FF"
}```
#### 内外边距【leftBox】

- 标识：`leftBox`
- 默认值：```json{
    "marginTopVal": "",
    "marginRightVal": "",
    "marginBottomVal": "",
    "marginLeftVal": "",
    "paddingTopVal": "",
    "paddingRightVal": "15px",
    "paddingBottomVal": "",
    "paddingLeftVal": ""
}```
#### 下方边距【leftBottomBox】

- 标识：`leftBottomBox`
- 默认值：```json{
    "marginTopVal": "5px",
    "marginRightVal": "",
    "marginBottomVal": "",
    "marginLeftVal": "",
    "paddingTopVal": "3px",
    "paddingRightVal": "6px",
    "paddingBottomVal": "3px",
    "paddingLeftVal": "6px"
}```
#### 下方边框【leftBottomBorder】

- 标识：`leftBottomBorder`
- 默认值：```json{
    "border": {
        "top": {
            "style": "",
            "width": 0,
            "widthUnit": "px",
            "colors": {}
        },
        "right": {
            "style": "",
            "width": 0,
            "widthUnit": "px",
            "colors": {}
        },
        "bottom": {
            "style": "",
            "width": 0,
            "widthUnit": "px",
            "colors": {}
        },
        "left": {
            "style": "",
            "width": 0,
            "widthUnit": "px",
            "colors": {}
        }
    },
    "radius": {
        "leftTop": {
            "radius": 20,
            "radiusUnit": "px"
        },
        "rightTop": {
            "radius": 20,
            "radiusUnit": "px"
        },
        "leftBottom": {
            "radius": 20,
            "radiusUnit": "px"
        },
        "rightBottom": {
            "radius": 20,
            "radiusUnit": "px"
        }
    }
}```
#### 标题字体【titleFont】

- 标识：`titleFont`
- 默认值：```json{
    "fontFamily": "impact, 'microsoft yahei'",
    "fontColors": {
        "hex": "",
        "hex8": ""
    },
    "fontWeight": "600 Semi Bold",
    "fontStyle": "italic",
    "fontTextAlign": "center",
    "fontSize": 18,
    "fontSizeUnit": "px"
}```
#### 时间字体【timeFont】

- 标识：`timeFont`
- 默认值：```json{
    "fontSize": 12,
    "fontSizeUnit": "px",
    "fontColors": {
        "hex": "#FFFFFF",
        "hex8": "#FFFFFFFF"
    }
}```
#### 图标样式
##### 选择图标【leftIcon】

- 标识：`leftIcon`
- 默认值：空
##### 图标大小【iconSize】

- 标识：`iconSize`
- 默认值：`17`
##### 图标颜色【iconColor】

- 标识：`iconColor`
- 默认值：```json{
    "hex": "#FFFFFF",
    "hex8": "#FFFFFFFF"
}```
### 右侧样式设置
#### 内容行数【contentClamp】

- 标识：`contentClamp`
- 默认值：`2`
#### 内外边距【rightBox】

- 标识：`rightBox`
- 默认值：```json{
    "marginTopVal": "",
    "marginRightVal": "",
    "marginBottomVal": "",
    "marginLeftVal": "",
    "paddingTopVal": "",
    "paddingRightVal": "",
    "paddingBottomVal": "",
    "paddingLeftVal": "15px"
}```
#### 内容边距【contentBox】

- 标识：`contentBox`
- 默认值：```json{
    "marginTopVal": "",
    "marginRightVal": "",
    "marginBottomVal": "",
    "marginLeftVal": "",
    "paddingTopVal": "",
    "paddingRightVal": "5px",
    "paddingBottomVal": "",
    "paddingLeftVal": ""
}```
#### 边框【rightBorder】

- 标识：`rightBorder`
- 默认值：```json{
    "border": {
        "top": {
            "style": "",
            "width": 0,
            "widthUnit": "px",
            "colors": {}
        },
        "right": {
            "style": "",
            "width": 0,
            "widthUnit": "px",
            "colors": {}
        },
        "bottom": {
            "style": "",
            "width": 0,
            "widthUnit": "px",
            "colors": {}
        },
        "left": {
            "style": "solid",
            "width": 1,
            "widthUnit": "px",
            "colors": {
                "hex": "#FFFFFF",
                "hex8": "#FFFFFFFF"
            }
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
#### 内容字体【contentFont】

- 标识：`contentFont`
- 默认值：```json{
    "fontSize": 14,
    "fontSizeUnit": "px",
    "fontColors": {
        "hex": "#B99334",
        "hex8": "#B99334FF"
    }
}```
#### 图标样式
##### 选择图标【rightIcon】

- 标识：`rightIcon`
- 默认值：空
##### 图标大小【rightIconSize】

- 标识：`rightIconSize`
- 默认值：`18`
##### 图标颜色【rightIconColor】

- 标识：`rightIconColor`
- 默认值：```json{
    "hex": "#B99334",
    "hex8": "#B99334FF"
}```
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
#### 数据源【dataSource】
数据返回示例：{date: '5月17日', jumpUrl: '', content: '2010年5月17日至19日 中共中央,国务院在北京召开新疆工作座谈会}
- 标识：`dataSource`
- 默认值：空
#### 字段设置
##### 日期字段【dateField】

- 标识：`dateField`
- 默认值：`date`
##### 内容字段【contentField】

- 标识：`contentField`
- 默认值：`content`
##### 跳转字段【jumpUrlField】
跳转链接的字段
- 标识：`jumpUrlField`
- 默认值：`jumpUrl`