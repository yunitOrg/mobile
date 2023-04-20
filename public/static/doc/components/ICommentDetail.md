# 评论详情
此组件是评论详情，这里是组件简介
## 组件类ID（ICommentDetail）
idm.component.mobile.icommentdetail
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
回复为空时的文字提示
- 标识：`emptyDescription`
- 默认值：`暂无回复`
#### 加载完成【finishedTip】
数据加载完成时的文字提示
- 标识：`finishedTip`
- 默认值：`数据已加载全部`
#### 回复跳转【replyJump】
回复查看更多跳转页面
- 标识：`replyJump`
- 默认值：空
#### 默认状态【defaultStatus】

- 标识：`defaultStatus`
- 默认值：`default`
- 选项：
	 - 普通【default】
	 - 隐藏【hidden】

### 功能设置
#### 点赞按钮【showStarBtn】
控制点赞按钮显示隐藏
- 标识：`showStarBtn`
- 默认值：`true`
- 选项：
	 - 是【true】
	 - 否【false】

### 容器样式
#### 内外边距【box】

- 标识：`box`
- 默认值：空
#### 宽高【undefined】

- 标识：`undefined`
- 默认值：空
#### 背景设置
##### 背景色【bgColor】

- 标识：`bgColor`
- 默认值：空
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
#### 评论文字【font】

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
#### 评论数据【detailDataSource】
用于选择当前评论详情的数据源
- 标识：`detailDataSource`
- 默认值：空
#### 评论接口参数自定义函数【detailCustomClickFunc】
接口参数自定义函数
- 标识：`detailCustomClickFunc`
- 默认值：空
- 可设置函数数量：单个
#### 回复数据【dataSource】
用于选择当前评论回复的数据源
- 标识：`dataSource`
- 默认值：空
#### 回复接口参数自定义函数【customClickFunc】
接口参数自定义函数
- 标识：`customClickFunc`
- 默认值：空
- 可设置函数数量：单个
#### 字段设置
##### 头像地址【imgInterface】

- 标识：`imgInterface`
- 默认值：`img`
##### 标识【idInterface】

- 标识：`idInterface`
- 默认值：`id`
##### 作者【avatarInterface】

- 标识：`avatarInterface`
- 默认值：`avatar`
##### 时间【timeInterface】

- 标识：`timeInterface`
- 默认值：`time`
##### 已点赞【starInterface】

- 标识：`starInterface`
- 默认值：`star`
##### 点赞数量【starNumInterface】

- 标识：`starNumInterface`
- 默认值：`star`
##### 评论内容【btInterface】

- 标识：`btInterface`
- 默认值：`bt`
##### 来自地区【fromInterface】

- 标识：`fromInterface`
- 默认值：`from`
##### 回复数量【totalInterface】

- 标识：`totalInterface`
- 默认值：`total`
##### 回复人【replyInterface】

- 标识：`replyInterface`
- 默认值：`reply`
#### 刷新KEY【messageRefreshKey】
根据组件接收到的消息KEY来刷新数据
- 标识：`messageRefreshKey`
- 默认值：空
- 选项：
	 - inbox【inbox】
	 - info【info】


### 评论详情数据源 接口参数需要按照以下要求

```json
{
  "commentId": "1111", // 评论id
}
```

### 评论详情数据源 接口返回格式需要按照以下要求：

```json
{
    "total": 10, // 总条数
    "list": [
      {
        "img": "/resource/idm/img/14.png",//头像
        "id": "11",// 标识
        "avatar": "Wunder", // 作者
        "time": "6分钟前", // 时间
        "star": true, // 是否已经点赞
        "starNum": 100, // 点赞数量
        "bt": "我认为二级市场真正的问题在于拍卖行。在艺术家的推广上，拍卖行真的和画廊格格不入。", // 评论内容
        "from": "来自广东深圳", // 评论来自地点
        "total": 100, // 回复数量
      }
    ]
}
```



### 回复列表数据源 接口参数需要按照以下要求

```json
{
  "start": 0, //起始位置
  "pageSize": 5 // 每页条数
}
```

### 回复列表数据源 接口返回格式需要按照以下要求：

```json
{
  "code": "200",
  "type": "success",
  "message": "操作成功",
  "metadata": null,
  "token": "",
  "data": {
    "total": 10, // 总条数
    "list": [
      {
        "img": "/resource/idm/img/14.png",//头像
        "id": "11",// 标识
        "avatar": "Wunder", // 作者
        "time": "6分钟前", // 时间
        "star": true, // 是否已经点赞
        "starNum": 100, // 点赞数量
        "bt": "我认为二级市场真正的问题在于拍卖行。在艺术家的推广上，拍卖行真的和画廊格格不入。", // 评论内容
        "from": "来自广东深圳", // 评论来自地点
        "total": 100, // 回复数量
        "reply": "The Shy" // 回复给谁
      }
    ]
  }
}
```
