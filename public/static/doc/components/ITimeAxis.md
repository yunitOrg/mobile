# 时间轴
此组件是时间轴，这里是组件简介
## 组件类ID（ITimeAxis）
idm.component.mobile.itimeaxis
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
#### 为空描述【emptyDescription】
内容为空的时候描述文字提示
- 标识：`emptyDescription`
- 默认值：`暂无数据`
#### 默认状态【defaultStatus】

- 标识：`defaultStatus`
- 默认值：`default`
- 选项：
	 - 普通【default】
	 - 隐藏【hidden】

### 内容设置
#### 圆点样式【circleStyle】
设置一级节点圆点的样式，可选：实心，空心
- 标识：`circleStyle`
- 默认值：`solid`
- 选项：
	 - 实心【solid】
	 - 空心【hollow】

#### 圆点位置【circlePostion】
设置圆点的位置
- 标识：`circlePostion`
- 默认值：`center`
- 选项：
	 - 居上【top】
	 - 居中【center】
	 - 局下【bottom】

#### 分割线【connectLine】
设置节点连接线的样式，可选：实线，虚线，点线
- 标识：`connectLine`
- 默认值：`solid`
- 选项：
	 - 实线【solid】
	 - 虚线【dashed】
	 - 点线【dotted】

#### 卡片背景【cardbgColor】
右侧卡片背景颜色
- 标识：`cardbgColor`
- 默认值：
```json
{
    "hex8": "#F8f8F8FF"
}
```
### 样式设置
#### 内外边距【box】

- 标识：`box`
- 默认值：
```json
{
    "marginTopVal": "8px",
    "marginRightVal": "8px",
    "marginBottomVal": "8px",
    "marginLeftVal": "8px",
    "paddingTopVal": "16px",
    "paddingRightVal": "16px",
    "paddingBottomVal": "16px",
    "paddingLeftVal": "16px"
}
```
#### 宽高【undefined】

- 标识：`undefined`
- 默认值：空
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

#### 边框【border】

- 标识：`border`
- 默认值：空
#### 边框阴影【boxShadow】

- 标识：`boxShadow`
- 默认值：`0px 2px 12px 0px rgba(0, 0, 0, 0.07)`
#### 文字【font】

- 标识：`font`
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
用于选择时间轴的数据源
- 标识：`dataSource`
- 默认值：空
#### 参数自定义函数【paramsMakeFunction】
用于请求数据源时，对请求参数进行处理，返回处理后的参数
- 标识：`paramsMakeFunction`
- 默认值：空
- 可设置函数数量：单个
#### 接口返回数据处理自定义函数【dataFormatFunction】
用于请求数据源时，对请求参数进行处理，返回处理后的参数
- 标识：`dataFormatFunction`
- 默认值：空
- 可设置函数数量：单个
#### 字段设置
##### 日期【labelInterface】

- 标识：`labelInterface`
- 默认值：`label`
##### 标题【titleInterface】

- 标识：`titleInterface`
- 默认值：`title`
##### 描述【descInterface】

- 标识：`descInterface`
- 默认值：`desc`
##### 图标路径【iconInterface】

- 标识：`iconInterface`
- 默认值：`icon`
##### 图标描述【iconTextInterface】

- 标识：`iconTextInterface`
- 默认值：`iconText`
#### 刷新KEY【messageRefreshKey】
根据组件接收到的消息KEY来刷新数据
- 标识：`messageRefreshKey`
- 默认值：空
- 选项：
	 - inbox【inbox】
	 - info【info】


   
## 时间轴数据源格式为两种

### 第一种为嵌套格式

```json
{
  "data": [
    {
        "label": "2021", // 时间
        "children": [ // 子集
          {
            "label": "11-3",// 时间
            "title": "参加了《12》参加了《12》参加了《12》", // 标题
            "desc": "2021-12-11 12:33:33", // 描述
            "icon": "/resource/idm/img/14.png", // 图标
            "iconText": "组织生活" // 图标描述
          },
          {
            "label": "12-2",
            "title": "参加了《12》",
            "desc": "2021-12-11 12:33:33",
            "icon": "/resource/idm/img/14.png",
            "iconText": "组织生活"
          }
        ]
      }
  ]
}
```

### 第二种为单层格式

```json
{
  "data": [
      {
        label: "1937年7月7日", // 日期
        title: "日本帝国主义者以制争",// 标题
        desc: "1937年7月7日 日本帝国主义者。",// 描述
      },
      {
        label: "1937年7月7日",
        title:
          "日本帝国主义者以制造卢沟桥事变为七点，发动全面侵华战争",
        desc: "1937年7月7日 日本帝国主义者以制造卢沟桥事变为七点，发动全面侵华战争。", 
      }
  ]
}
```
