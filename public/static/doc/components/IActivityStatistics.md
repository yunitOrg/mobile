# 活动统计
此组件是活动统计，这里是组件简介
## 组件类ID（IActivityStatistics）
idm.component.mobile.iactivityStatistics
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
#### 头部信息【isShowHeader】
设置是否该卡片的头部信息
- 标识：`isShowHeader`
- 默认值：`true`
- 选项：
	 - 显示【true】
	 - 隐藏【false】

#### 卡片标题【isShowHeaderText】
设置是否该列表卡片的标题
- 标识：`isShowHeaderText`
- 默认值：`true`
- 选项：
	 - 显示【true】
	 - 隐藏【false】

#### 标题【headText】

- 标识：`headText`
- 默认值：`党费缴纳`
- 显示：`@[isShowHeaderText]`
#### 金钱图标【isShowMoney】
设置是否显示列表每一项右上角金钱图标
- 标识：`isShowMoney`
- 默认值：`true`
- 选项：
	 - 显示【true】
	 - 隐藏【false】

#### 底部文字【isShowBottomText】
设置是否显示列表每一项下方文字
- 标识：`isShowBottomText`
- 默认值：`true`
- 选项：
	 - 显示【true】
	 - 隐藏【false】

#### 间隔线【isShowLine】
设置是否显示列表中的间隔线
- 标识：`isShowLine`
- 默认值：`true`
- 选项：
	 - 显示【true】
	 - 隐藏【false】

#### index值【zIndex】
设置主容器的z-index值
- 标识：`zIndex`
- 默认值：`10`
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

#### 容器边框
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
#### 边框阴影【boxShadow】

- 标识：`boxShadow`
- 默认值：`0px 2px 12px 0px rgba(0, 0, 0, 0.07)`
#### 左上文字【activityNameFont】
修改列表中每一项右上方文字样式
- 标识：`activityNameFont`
- 默认值：空
#### 右上文字【activityConveneFont】
修改列表中每一项右上方文字样式
- 标识：`activityConveneFont`
- 默认值：空
#### 下方文字【bottomFont】

- 标识：`bottomFont`
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
#### 接口参数自定义函数【customClickFunc】
接口参数自定义函数
- 标识：`customClickFunc`
- 默认值：空
- 可设置函数数量：单个
#### 点击跳转自定义函数【jumpFunction】
点击元素跳转时自定义函数
- 标识：`jumpFunction`
- 默认值：空
- 可设置函数数量：单个
#### 字段设置
##### 应缴党费【dues】
应缴党费的具体费用字段
- 标识：`dues`
- 默认值：`dues`
- 显示：`@[isShowHeader]`
##### 列表字段【activityList】
列表所有数据的字段
- 标识：`activityList`
- 默认值：`list`
##### 图标字段【activityIcon】
每个活动的图标显示字段
- 标识：`activityIcon`
- 默认值：`icon`
##### 活动名称【activityName】
每个活动的名称显示字段
- 标识：`activityName`
- 默认值：`name`
##### 参与人数【activityPersonNum】
每个活动的累计参与人次字段
- 标识：`activityPersonNum`
- 默认值：`personNum`
- 显示：`@[isShowBottomText]`
##### 召开次数【activityConvene】
每个活动的召开次数字段
- 标识：`activityConvene`
- 默认值：`convene`
##### 出席率【activityAttendance】
每个活动的出席率字段
- 标识：`activityAttendance`
- 默认值：`attendance`
- 显示：`@[isShowBottomText]`
#### 计算规则【listJumpUrl】
设置计算规则跳转的页面
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

应缴党费: dues

计算规则: computationRule

显示字段: data

列表字段: list

图标字段: icon

活动名称: name

参与人数: personNum

召开次数: convene

出席率:   attendance

数据源应为:
```
{
        dues: "20.00",
        computationRule:"#",
        list:[
            {       
                icon:"url",
                name:"党会",
                personNum:"参与人数",
                convene:"召开次数",
                attendance:"出席率"
            },
            {       
                icon:"url",
                name:"党会",
                personNum:"参与人数",
                convene:"召开次数",
                attendance:"出席率"
            },......
        ]
}
```

