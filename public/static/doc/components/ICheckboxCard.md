# 多选卡片
此组件是多选卡片，这里是组件简介
## 组件类ID（ICheckboxCard）
idm.component.mobile.icheckboxcard
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
#### 图标形状【iconStyle】
配置左侧checkbox形状
- 标识：`iconStyle`
- 默认值：`square`
- 选项：	 - 方形【square】	 - 圆形【round】
### 容器样式设置
#### 宽高【undefined】

- 标识：`undefined`
- 默认值：空
#### 阴影【boxShadow】

- 标识：`boxShadow`
- 默认值：空
#### 背景色【bgColor】

- 标识：`bgColor`
- 默认值：```json{}```
#### 内外边距【box】

- 标识：`box`
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
#### 边框【border】

- 标识：`border`
- 默认值：空
### 单项样式设置
#### 阴影【subBoxShadow】

- 标识：`subBoxShadow`
- 默认值：`0 0 3px 2px #F2F2F2`
#### 背景色【subBgColor】

- 标识：`subBgColor`
- 默认值：```json{
    "hex": "#FFFFFF",
    "hex8": "#FFFFFFFF"
}```
#### 内外边距【subBox】

- 标识：`subBox`
- 默认值：```json{
    "marginTopVal": "",
    "marginRightVal": "",
    "marginBottomVal": "10px",
    "marginLeftVal": "",
    "paddingTopVal": "15px",
    "paddingRightVal": "15px",
    "paddingBottomVal": "15px",
    "paddingLeftVal": "15px"
}```
#### 子项边距【subLineBox】
设置组件单项元素内的子项元素的内外边距
- 标识：`subLineBox`
- 默认值：```json{
    "marginTopVal": "",
    "marginRightVal": "",
    "marginBottomVal": "15px",
    "marginLeftVal": "",
    "paddingTopVal": "",
    "paddingRightVal": "",
    "paddingBottomVal": "",
    "paddingLeftVal": ""
}```
#### 边框【subBorder】

- 标识：`subBorder`
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
#### 用户昵称文字【usernameFont】

- 标识：`usernameFont`
- 默认值：```json{
    "fontColors": {
        "hex": "#333333",
        "hex8": "#333333FF"
    },
    "fontSize": 16,
    "fontSizeUnit": "px"
}```
#### 时间文字【timeFont】

- 标识：`timeFont`
- 默认值：```json{
    "fontSize": 14,
    "fontSizeUnit": "px",
    "fontColors": {}
}```
#### 图标样式
##### 图标尺寸【iconSize】
设置复选框图标大小
- 标识：`iconSize`
- 默认值：空
##### 内外边距【iconBox】
标题同行的图片上边距无效
- 标识：`iconBox`
- 默认值：```json{
    "marginTopVal": "12px",
    "marginRightVal": "15px",
    "marginBottomVal": "",
    "marginLeftVal": "",
    "paddingTopVal": "",
    "paddingRightVal": "",
    "paddingBottomVal": "",
    "paddingLeftVal": ""
}```
#### 头像样式
##### 宽【avatarWidth】
填写auto则为自适应，或者使用px、%、vw等单位，比如100%、100px、100vw等等
- 标识：`avatarWidth`
- 默认值：`50px`
##### 高【avatarHeight】
填写auto则为自适应，或者使用px、%、vh等单位，比如100%、100px、100vh等等
- 标识：`avatarHeight`
- 默认值：`50px`
##### 边框【avatarBorder】

- 标识：`avatarBorder`
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
            "radius": 50,
            "radiusUnit": "px"
        },
        "rightTop": {
            "radius": 50,
            "radiusUnit": "px"
        },
        "leftBottom": {
            "radius": 50,
            "radiusUnit": "px"
        },
        "rightBottom": {
            "radius": 50,
            "radiusUnit": "px"
        }
    }
}```
##### 内外边距【avatarBox】

- 标识：`avatarBox`
- 默认值：```json{
    "marginTopVal": "3px",
    "marginRightVal": "15px",
    "marginBottomVal": "",
    "marginLeftVal": "",
    "paddingTopVal": "",
    "paddingRightVal": "",
    "paddingBottomVal": "",
    "paddingLeftVal": ""
}```
#### 标题样式
##### 内外边距【titleBox】

- 标识：`titleBox`
- 默认值：```json{
    "marginTopVal": "",
    "marginRightVal": "",
    "marginBottomVal": "10px",
    "marginLeftVal": "",
    "paddingTopVal": "",
    "paddingRightVal": "",
    "paddingBottomVal": "10px",
    "paddingLeftVal": ""
}```
##### 边框【titleBorder】

- 标识：`titleBorder`
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
            "style": "solid",
            "width": 1,
            "widthUnit": "px",
            "colors": {
                "hex": "#E4E0E0",
                "hex8": "#E4E0E0FF"
            }
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
##### 标题文字【titleFont】

- 标识：`titleFont`
- 默认值：```json{
    "fontColors": {
        "hex": "#333333",
        "hex8": "#333333FF"
    },
    "fontSize": 16,
    "fontSizeUnit": "px"
}```
#### 内容样式
##### 内容行数【contentClamp】

- 标识：`contentClamp`
- 默认值：`2`
##### 内外边距【contentBox】

- 标识：`contentBox`
- 默认值：```json{
    "marginTopVal": "5px",
    "marginRightVal": "",
    "marginBottomVal": "",
    "marginLeftVal": "",
    "paddingTopVal": "",
    "paddingRightVal": "",
    "paddingBottomVal": "",
    "paddingLeftVal": ""
}```
##### 文字【contentFont】

- 标识：`contentFont`
- 默认值：```json{
    "fontColors": {},
    "fontSize": 13,
    "fontSizeUnit": "px"
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
#### 联动组件【triggerComponents】
配置卡片选中状态改变时需要发送信息的组件
- 标识：`triggerComponents`
- 默认值：```json[]```
#### 数据源【dataSource】
数据返回示例：{value: [], count: 0, moreUrl: ''}
- 标识：`dataSource`
- 默认值：空
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
##### 选中字段【isCheckField】
设置卡片是否选中状态，不可修改
- 标识：`isCheckField`
- 默认值：`isCheck`
##### 标题字段【titleField】

- 标识：`titleField`
- 默认值：`title`
##### 头像字段【avatarField】

- 标识：`avatarField`
- 默认值：`avatar`
##### 姓名字段【usernameField】

- 标识：`usernameField`
- 默认值：`username`
##### 时间字段【timeField】

- 标识：`timeField`
- 默认值：`time`
##### 内容字段【contentField】

- 标识：`contentField`
- 默认值：`content`