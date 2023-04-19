# 通知公告
此组件是通知公告，这里是组件简介
## 组件类ID（INoticeListCard）
idm.component.mobile.inoticelistcard
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
组件标题
- 标识：`title`
- 默认值：`通知公告`
#### 显示标题【isShowTitleBar】
是否显示标题栏
- 标识：`isShowTitleBar`
- 默认值：`true`
#### 显示图标【showIcon】
配置是否显示标题右侧图标
- 标识：`showIcon`
- 默认值：`true`
- 显示：`@[isShowTitleBar]`
#### 默认条数【defaultNumber】
默认请求条数
- 标识：`defaultNumber`
- 默认值：`4`
#### 为空描述【emptyDescription】
内容为空的时候描述文字提示
- 标识：`emptyDescription`
- 默认值：`暂无数据`
#### 详情跳转【replyJump】
公告详情跳转页面
- 标识：`replyJump`
- 默认值：空
#### 是否缓存【isPageKeep】
跳转公告详情页面时，是否缓存本页面
- 标识：`isPageKeep`
- 默认值：`true`
- 选项：
	 - 是【true】
	 - 否【false】

#### 默认状态【defaultStatus】

- 标识：`defaultStatus`
- 默认值：`default`
- 选项：
	 - 普通【default】
	 - 隐藏【hidden】

### 标题容器样式
#### 图标位置【titleIconPosition】
设置组件标题图标位置
- 标识：`titleIconPosition`
- 默认值：`left`
- 显示：`@[showIcon]`
- 选项：
	 - 左边【left】
	 - 右边【right】

#### 标题文字【titleFont】
标题文字样式设置
- 标识：`titleFont`
- 默认值：空
### 外层卡片样式设置
#### 内外边距【box】

- 标识：`box`
- 默认值：空
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
- 默认值：空
### 内层卡片样式设置
#### 内外边距【innerBox】

- 标识：`innerBox`
- 默认值：空
#### 背景色【innerBgColor】

- 标识：`innerBgColor`
- 默认值：
```json
{
    "hex8": "#FFFFFFFF"
}
```
#### 边框【innerBorder】

- 标识：`innerBorder`
- 默认值：空
#### 边框阴影【innerboxShadow】

- 标识：`innerboxShadow`
- 默认值：空
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
用于选择的数据源
- 标识：`dataSource`
- 默认值：空
#### 字段设置
##### 通知列表【listInterface】
通知公告通知列表字段
- 标识：`listInterface`
- 默认值：`list`
##### 日期【dateInterface】
日期格式:2022-08-08
- 标识：`dateInterface`
- 默认值：`date`
##### 公告标题【btInterface】

- 标识：`btInterface`
- 默认值：`bt`
#### 刷新KEY【messageRefreshKey】
根据组件接收到的消息KEY来刷新数据
- 标识：`messageRefreshKey`
- 默认值：空
- 选项：
	 - inbox【inbox】
	 - info【info】


### 数据源 接口参数需要按照以下要求
```json
{
  "start": 0,//起始位置
  "limit": 4 // 每页条数
}
```

### 数据源 接口返回格式需要按照以下要求：

```json
{
    "total": 10, // 总条数
    "list": [
      {
        "id": "1", // 标识
        "date": "2022-08-02", // 日期  格式：YYYY-MM-DD
        "bt": "关于十月份", // 公告标题
      },
      {
        "id": "2",
        "date": "2022-07-11",
        "bt": "关于十月份工作的通知细则",
      }
    ]
}

```