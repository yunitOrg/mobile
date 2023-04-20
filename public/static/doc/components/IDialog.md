# 即时弹框
此组件是即时弹框，这里是组件简介
## 组件类ID（IDialog）
idm.component.mobile.idialog
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
#### 只弹一次【showFlag】
只弹框一次，会在localStorage记录一个msgDialog:true， 下次页面加载会取localStorage的msgDialog是否是true 如果是true就不弹框
- 标识：`showFlag`
- 默认值：`false`
#### 风格样式【styleType】

- 标识：`styleType`
- 默认值：`politicalBirthday`
- 选项：	 - 政治生日【politicalBirthday】	 - 人物生日【personBirthday】
#### 祝福文本【congratulateText】
可用文本表达式配置，例如：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;今天是您的政治生日，祝贺您加入中国共产党@[year]周年！
 
@[empName]党支部向您致以真挚的问候！
 
希望您不忘初心，牢记使命，永葆共产党员的先进本色
- 标识：`congratulateText`
- 默认值：`&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;今天是您的政治生日，祝贺您加入中国共产党@[year]周年！
 
@[empName]党支部向您致以真挚的问候！
 
希望您不忘初心，牢记使命，永葆共产党员的先进本色`
#### 左侧按钮
##### 是否显示【isShowLeftBtn】

- 标识：`isShowLeftBtn`
- 默认值：`true`
- 选项：	 - 是【true】	 - 否【false】
##### 文本【leftBtnText】

- 标识：`leftBtnText`
- 默认值：`关闭`
- 显示：`@[isShowLeftBtn]`
#### 右侧按钮
##### 是否显示【isShowRightBtn】

- 标识：`isShowRightBtn`
- 默认值：`true`
- 选项：	 - 是【true】	 - 否【false】
##### 文本【rightBtnText】

- 标识：`rightBtnText`
- 默认值：`保存图片`
- 显示：`@[isShowRightBtn]`
### 样式设置
#### 宽度【width】

- 标识：`width`
- 默认值：`300px`
#### 高度【height】

- 标识：`height`
- 默认值：`500px`
#### z-index【dialogIndex】
图层索引
- 标识：`dialogIndex`
- 默认值：`99`
#### 背景设置
##### 背景色【bgColor】

- 标识：`bgColor`
- 默认值：```json{}```
##### 背景图片【bgImgUrl】
弹窗背景图片,可自定义上传,值为defaultImage使用默认图片
- 标识：`bgImgUrl`
- 默认值：`defaultImage`
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
- 默认值：`contain`
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
- 默认值：`no-repeat`
- 显示：`@[bgImgUrl]`
- 选项：	 - 双向重复【repeat】	 - 水平重复【repeat-x】	 - 垂直重复【repeat-y】	 - 不重复【no-repeat】	 - 继承【inherit】
##### 背景模式【bgAttachment】

- 标识：`bgAttachment`
- 默认值：空
- 显示：`@[bgImgUrl]`
- 选项：	 - 固定【fixed】	 - 滚动【scroll】	 - 继承【inherit】
#### 左侧按钮
##### 背景色【leftBtnBg】

- 标识：`leftBtnBg`
- 默认值：空
##### 内外边距【leftBtnBox】

- 标识：`leftBtnBox`
- 默认值：```json{
    "marginTopVal": "",
    "marginRightVal": "",
    "marginBottomVal": "20px",
    "marginLeftVal": "",
    "paddingTopVal": "5px",
    "paddingRightVal": "40px",
    "paddingBottomVal": "5px",
    "paddingLeftVal": "40px"
}```
##### 边框【leftBtnBorder】

- 标识：`leftBtnBorder`
- 默认值：```json{
    "border": {
        "top": {
            "style": "solid",
            "width": 1,
            "widthUnit": "px",
            "colors": {
                "hex": "#AAA7A7",
                "hex8": "#AAA7A7FF"
            }
        },
        "right": {
            "style": "solid",
            "width": 1,
            "widthUnit": "px",
            "colors": {
                "hex": "#AAA7A7",
                "hex8": "#AAA7A7FF"
            }
        },
        "bottom": {
            "style": "solid",
            "width": 1,
            "widthUnit": "px",
            "colors": {
                "hex": "#AAA7A7",
                "hex8": "#AAA7A7FF"
            }
        },
        "left": {
            "style": "solid",
            "width": 1,
            "widthUnit": "px",
            "colors": {
                "hex": "#AAA7A7",
                "hex8": "#AAA7A7FF"
            }
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
##### 文字【leftBtnFont】

- 标识：`leftBtnFont`
- 默认值：```json{
    "fontColors": {
        "hex": "#000000",
        "hex8": "#000000FF"
    }
}```
#### 右侧按钮
##### 背景【rightBtnBg】

- 标识：`rightBtnBg`
- 默认值：空
##### 内外边距【rightBtnBox】

- 标识：`rightBtnBox`
- 默认值：```json{
    "marginTopVal": "",
    "marginRightVal": "",
    "marginBottomVal": "20px",
    "marginLeftVal": "",
    "paddingTopVal": "5px",
    "paddingRightVal": "30px",
    "paddingBottomVal": "5px",
    "paddingLeftVal": "30px"
}```
##### 边框【rightBtnBorder】

- 标识：`rightBtnBorder`
- 默认值：```json{
    "border": {
        "top": {
            "style": "",
            "width": 0,
            "widthUnit": "",
            "colors": {
                "hex": "",
                "hex8": ""
            }
        },
        "right": {
            "style": "",
            "width": 0,
            "widthUnit": "",
            "colors": {
                "hex": "",
                "hex8": ""
            }
        },
        "bottom": {
            "style": "",
            "width": 0,
            "widthUnit": "",
            "colors": {
                "hex": "",
                "hex8": ""
            }
        },
        "left": {
            "style": "",
            "width": 0,
            "widthUnit": "",
            "colors": {
                "hex": "",
                "hex8": ""
            }
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
##### 文字【rightBtnFont】

- 标识：`rightBtnFont`
- 默认值：```json{
    "fontColors": {
        "hex": "#FFFFFF",
        "hex8": "#FFFFFFFF"
    }
}```
#### 用户头像
##### 宽度【avatarWidth】

- 标识：`avatarWidth`
- 默认值：`80px`
##### 高度【avatarHeight】

- 标识：`avatarHeight`
- 默认值：`80px`
##### 内外边距【avatarBox】

- 标识：`avatarBox`
- 默认值：```json{
    "marginTopVal": "110px",
    "marginRightVal": "",
    "marginBottomVal": "",
    "marginLeftVal": "110px",
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
#### 用户名称
##### 内外边距【usernameBox】

- 标识：`usernameBox`
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
##### 用户名字体【usernameFont】

- 标识：`usernameFont`
- 默认值：```json{
    "fontColors": {},
    "fontWeight": "600 Semi Bold",
    "fontSize": 19,
    "fontSizeUnit": "px",
    "fontTextAlign": "center"
}```
#### 祝福文字
##### 内外边距【congratulateBox】

- 标识：`congratulateBox`
- 默认值：```json{
    "marginTopVal": "20px",
    "marginRightVal": "",
    "marginBottomVal": "",
    "marginLeftVal": "",
    "paddingTopVal": "",
    "paddingRightVal": "30px",
    "paddingBottomVal": "",
    "paddingLeftVal": "30px"
}```
##### 字体【congratulateFont】

- 标识：`congratulateFont`
- 默认值：```json{
    "fontColors": {},
    "fontWeight": "600 Semi Bold",
    "fontSize": 15,
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
### 高级设置
#### 显示条件【dialogShowType】
选择弹窗显示条件
- 标识：`dialogShowType`
- 默认值：`dataSource`
- 选项：	 - 数据源【dataSource】	 - 自定义函数显示【action】
#### 数据源【dataSource】
数据源返回格式示例：{code: 200, data: { isShowDialog: true, username: "用户名称", avatar: "头像url", year:"五",empName: "梦创" }, message: "success"}, isShowDialog为true时显示弹窗
- 标识：`dataSource`
- 默认值：空
- 显示：`@[dialogShowType === 'dataSource']`
#### 自定义左侧按钮事件【customLeftBtnEvent】
自定义左侧按钮事件， 返回false，不执行默认事件
- 标识：`customLeftBtnEvent`
- 默认值：空
- 显示：`@[isShowLeftBtn]`
- 可设置函数数量：单个
#### 自定义右侧按钮事件【customRightBtnEvent】
自定义右侧按钮事件 返回false，不执行默认事件
- 标识：`customRightBtnEvent`
- 默认值：空
- 显示：`@[isShowRightBtn]`
- 可设置函数数量：单个
#### 显示函数【dialogFun】
函数返回示例 return { isShowDialog: true, username: "用户名称", avatar: "头像url" }, message: "success"}, isShowDialog为true时显示弹窗
- 标识：`dialogFun`
- 默认值：空
- 显示：`@[dialogShowType=='action']`
- 可设置函数数量：单个
#### 字段设置
##### 是否弹框【isShowDialog】
是否弹框
- 标识：`isShowDialog`
- 默认值：`isShowDialog`