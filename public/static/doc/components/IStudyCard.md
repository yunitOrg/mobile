# 学习内容卡片
此组件是学习内容卡片，这里是组件简介
## 组件类ID（IStudyCard）
idm.component.mobile.istudycard
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
#### 标题【headText】

- 标识：`headText`
- 默认值：`学习精选`
#### 更多页面【showMoreUrl】
点击更多后触发跳转到的页面选择
- 标识：`showMoreUrl`
- 默认值：空
#### 显示标题【isShowHeadText】
设置是否显示标题
- 标识：`isShowHeadText`
- 默认值：`true`
- 选项：
	 - 显示【true】
	 - 隐藏【false】

#### 显示更多【isShowMore】
设置是否显示右侧更多
- 标识：`isShowMore`
- 默认值：`true`
- 选项：
	 - 显示【true】
	 - 隐藏【false】

#### 播放量【isShowVideoNum】
是否显示视屏播放量
- 标识：`isShowVideoNum`
- 默认值：`true`
- 选项：
	 - 显示【true】
	 - 隐藏【false】

### 样式设置
#### 宽高【undefined】

- 标识：`undefined`
- 默认值：空
#### 内外边距【box】

- 标识：`box`
- 默认值：
```json
{
    "marginTopVal": "16px",
    "marginRightVal": "10px",
    "marginBottomVal": "16px",
    "marginLeftVal": "10px",
    "paddingTopVal": "0",
    "paddingRightVal": "12px",
    "paddingBottomVal": "0",
    "paddingLeftVal": "12px"
}
```
#### 背景设置
##### 背景色【bgColor】

- 标识：`bgColor`
- 默认值：
```json
{
    "hex8": "#FFFFFFFF"
}
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

#### 外层容器边框
##### 边框【border】

- 标识：`border`
- 默认值：
```json
{
    "border": {
        "top": {
            "style": "solid",
            "width": 1,
            "widthUnit": "px",
            "colors": {
                "rgba": {
                    "r": 243,
                    "g": 243,
                    "b": 243,
                    "a": 1
                }
            }
        },
        "right": {
            "style": "solid",
            "width": 1,
            "widthUnit": "px",
            "colors": {
                "rgba": {
                    "r": 243,
                    "g": 243,
                    "b": 243,
                    "a": 1
                }
            }
        },
        "bottom": {
            "style": "solid",
            "width": 1,
            "widthUnit": "px",
            "colors": {
                "rgba": {
                    "r": 243,
                    "g": 243,
                    "b": 243,
                    "a": 1
                }
            }
        },
        "left": {
            "style": "solid",
            "width": 1,
            "widthUnit": "px",
            "colors": {
                "rgba": {
                    "r": 243,
                    "g": 243,
                    "b": 243,
                    "a": 1
                }
            }
        }
    },
    "radius": {
        "leftTop": {
            "radius": 6,
            "radiusUnit": "px"
        },
        "rightTop": {
            "radius": 6,
            "radiusUnit": "px"
        },
        "leftBottom": {
            "radius": 6,
            "radiusUnit": "px"
        },
        "rightBottom": {
            "radius": 6,
            "radiusUnit": "px"
        }
    }
}
```
#### 视频卡片边框
##### 视频卡片边框【videoBorder】

- 标识：`videoBorder`
- 默认值：
```json
{
    "border": {
        "top": {
            "style": "solid",
            "width": 1,
            "widthUnit": "px",
            "colors": {
                "rgba": {
                    "r": 237,
                    "g": 237,
                    "b": 237,
                    "a": 1
                }
            }
        },
        "right": {
            "style": "solid",
            "width": 1,
            "widthUnit": "px",
            "colors": {
                "rgba": {
                    "r": 237,
                    "g": 237,
                    "b": 237,
                    "a": 1
                }
            }
        },
        "bottom": {
            "style": "solid",
            "width": 1,
            "widthUnit": "px",
            "colors": {
                "rgba": {
                    "r": 237,
                    "g": 237,
                    "b": 237,
                    "a": 1
                }
            }
        },
        "left": {
            "style": "solid",
            "width": 1,
            "widthUnit": "px",
            "colors": {
                "rgba": {
                    "r": 237,
                    "g": 237,
                    "b": 237,
                    "a": 1
                }
            }
        }
    },
    "radius": {
        "leftTop": {
            "radius": 4,
            "radiusUnit": "px"
        },
        "rightTop": {
            "radius": 4,
            "radiusUnit": "px"
        },
        "leftBottom": {
            "radius": 4,
            "radiusUnit": "px"
        },
        "rightBottom": {
            "radius": 4,
            "radiusUnit": "px"
        }
    }
}
```
#### 边框阴影【boxShadow】

- 标识：`boxShadow`
- 默认值：`0px 2px 12px 0px rgba(0, 0, 0, 0.07)`
#### 标题文字【headerLeftFont】

- 标识：`headerLeftFont`
- 默认值：空
#### 视频简介文字【videoBottomFont】

- 标识：`videoBottomFont`
- 默认值：空
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
#### 数据源【dataSource】
用于选择视频的数据源
- 标识：`dataSource`
- 默认值：空
#### 字段设置
##### 显示字段【dataFiled】
视频列表字段的字段名
- 标识：`dataFiled`
- 默认值：`data`
##### 视频图片【videoImage】
每个视频的插图字段
- 标识：`videoImage`
- 默认值：`image`
##### 播放量【videoAmountOfPlay】
每个视频的播放量字段
- 标识：`videoAmountOfPlay`
- 默认值：`amountOfPlay`
##### 发布时间【videoReleaseDate】
每个视频的发布时间字段
- 标识：`videoReleaseDate`
- 默认值：`releaseDate`
##### 视频详情【videoIntroduction】
每个视频的描述字段
- 标识：`videoIntroduction`
- 默认值：`videoIntroduction`
#### 视频跳转【listJumpUrl】
设置视频跳转的页面
- 标识：`listJumpUrl`
- 默认值：空
#### 刷新KEY【messageRefreshKey】
根据组件接收到的消息KEY来刷新数据
- 标识：`messageRefreshKey`
- 默认值：空
- 选项：
	 - inbox【inbox】
	 - info【info】


# 活动统计
## 组件数据源配置
显示字段: data

视频图片: image

播放量: amountOfPlay

发布时间: releaseDate

视频详情: videoIntroduction

视频跳转url字段无需设置，与后端传入字段同名

数据源应为:
```
{
    data:[
    {
        image:"url",
        amountOfPlay:1500,
        releaseDate:"2022-9-7",
        videoIntroduction:"浙江宁波：植物观察 地质探索 假期研学快乐多",
        jumpUrl:"url"
    },
    {
        image:"url",
        amountOfPlay:1500,
        releaseDate:"2022-9-7",
        videoIntroduction:"浙江宁波：植物观察 地质探索 假期研学快乐多",
        jumpUrl:"url"
    }......
    ]
}
```