# 我的信息头部
此组件是我的信息头部，这里是组件简介
## 组件类ID（IMyMessageTop）
idm.component.mobile.imymessagetop
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
#### 跳转方式【jumpStyle】
设置点击轮播图片时跳转方式, 链接打开时使用window.open配置的数据源链接
- 标识：`jumpStyle`
- 默认值：`_link`
- 选项：	 - 子页面打开【_child】	 - 接口链接【_link】	 - 自定义链接【_custom_link】	 - 自定义函数【_custom_func】
#### 详情页面【morePageList】
选择要打开的子页面
- 标识：`morePageList`
- 默认值：空
- 显示：`@[jumpStyle === '_child']`
#### 是否缓存【isPageKeep】
跳转子页面时，是否缓存本页面
- 标识：`isPageKeep`
- 默认值：`true`
- 显示：`@[jumpStyle === '_child']`
- 选项：	 - 是【true】	 - 否【false】
#### 跳转链接【customLink】

- 标识：`customLink`
- 默认值：空
- 显示：`@[jumpStyle === '_custom_link']`
#### 自定义跳转函数【jumpCustomFunc】

- 标识：`jumpCustomFunc`
- 默认值：空
- 显示：`@[jumpStyle === '_custom_func']`
- 可设置函数数量：单个
### 样式设置
#### 宽高【undefined】

- 标识：`undefined`
- 默认值：空
#### 内外边距【box】

- 标识：`box`
- 默认值：```json{
    "marginTopVal": "",
    "marginRightVal": "",
    "marginBottomVal": "",
    "marginLeftVal": "",
    "paddingTopVal": "20px",
    "paddingRightVal": "10px",
    "paddingBottomVal": "20px",
    "paddingLeftVal": ""
}```
#### 背景色【bgColor】

- 标识：`bgColor`
- 默认值：```json{}```
#### 边框【border】

- 标识：`border`
- 默认值：空
#### 阴影【boxShadow】

- 标识：`boxShadow`
- 默认值：空
#### 头像样式
##### 宽高【undefined】

- 标识：`undefined`
- 默认值：空
##### 内外边距【avatarBox】

- 标识：`avatarBox`
- 默认值：```json{
    "marginTopVal": "",
    "marginRightVal": "20px",
    "marginBottomVal": "",
    "marginLeftVal": "30px",
    "paddingTopVal": "",
    "paddingRightVal": "",
    "paddingBottomVal": "",
    "paddingLeftVal": ""
}```
##### 边框【avatarBorder】

- 标识：`avatarBorder`
- 默认值：```json{
    "border": {
        "top": {
            "style": "solid",
            "width": 2,
            "widthUnit": "px",
            "colors": {
                "hex": "#FFFFFF",
                "hex8": "#FFFFFFFF"
            }
        },
        "right": {
            "style": "solid",
            "width": 2,
            "widthUnit": "px",
            "colors": {
                "hex": "#FFFFFF",
                "hex8": "#FFFFFFFF"
            }
        },
        "bottom": {
            "style": "solid",
            "width": 2,
            "widthUnit": "px",
            "colors": {
                "hex": "#FFFFFF",
                "hex8": "#FFFFFFFF"
            }
        },
        "left": {
            "style": "solid",
            "width": 2,
            "widthUnit": "px",
            "colors": {
                "hex": "#FFFFFF",
                "hex8": "#FFFFFFFF"
            }
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
#### 昵称样式
##### 内外边距【usernameBox】

- 标识：`usernameBox`
- 默认值：空
##### 字体【usernameFont】

- 标识：`usernameFont`
- 默认值：```json{
    "fontSize": 18,
    "fontSizeUnit": "px",
    "fontColors": {
        "hex": "#FFFFFF",
        "hex8": "#FFFFFFFF"
    }
}```
#### 第一行样式
##### 内外边距【yearBox】

- 标识：`yearBox`
- 默认值：```json{
    "marginTopVal": "3px",
    "marginRightVal": "",
    "marginBottomVal": "3px",
    "marginLeftVal": "",
    "paddingTopVal": "",
    "paddingRightVal": "",
    "paddingBottomVal": "",
    "paddingLeftVal": ""
}```
##### 字体【yearFont】

- 标识：`yearFont`
- 默认值：```json{
    "fontSize": 14,
    "fontSizeUnit": "px",
    "fontColors": {
        "hex": "#FFFFFF",
        "hex8": "#FFFFFFFF"
    }
}```
#### 第二行样式
##### 内外边距【branchBox】

- 标识：`branchBox`
- 默认值：空
##### 字体【branchFont】

- 标识：`branchFont`
- 默认值：```json{
    "fontSize": 14,
    "fontSizeUnit": "px",
    "fontColors": {
        "hex": "#FFFFFF",
        "hex8": "#FFFFFFFF"
    }
}```
#### 第三行样式
##### 内外边距【phoneBox】

- 标识：`phoneBox`
- 默认值：```json{
    "marginTopVal": "3px",
    "marginRightVal": "",
    "marginBottomVal": "3px",
    "marginLeftVal": "",
    "paddingTopVal": "",
    "paddingRightVal": "",
    "paddingBottomVal": "",
    "paddingLeftVal": ""
}```
##### 字体【phoneFont】

- 标识：`phoneFont`
- 默认值：```json{
    "fontSize": 14,
    "fontSizeUnit": "px",
    "fontColors": {
        "hex": "#FFFFFF",
        "hex8": "#FFFFFFFF"
    }
}```
#### 图标样式
##### 图标大小【iconSize】

- 标识：`iconSize`
- 默认值：`25`
##### 图标颜色【iconColor】

- 标识：`iconColor`
- 默认值：```json{
    "hex": "#FFFFFF",
    "hex8": "#FFFFFFFF"
}```
##### 内外边距【iconBox】

- 标识：`iconBox`
- 默认值：空
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
##### 头像字段【avatarField】

- 标识：`avatarField`
- 默认值：`avatar`
##### 昵称字段【usernameField】

- 标识：`usernameField`
- 默认值：`username`
##### 第一字段【yearField】
名称下面显示的第一行数据，没有返回数据就不显示
- 标识：`yearField`
- 默认值：`partySeniority`
##### 第二字段【branchField】
名称下面显示的第二行数据，没有返回数据就不显示
- 标识：`branchField`
- 默认值：`partyBranch`
##### 第三字段【phoneField】
名称下面显示的第三行数据，没有返回数据就不显示
- 标识：`phoneField`
- 默认值：`phone`
##### 右侧跳转【jumpUrlField】
右侧跳转链接字段
- 标识：`jumpUrlField`
- 默认值：`jumpUrl`