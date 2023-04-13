# tab列表组件
此组件为移动端 党员信息

## 组件类名（className）
IpartyInfo

## 组件类ID（classId）
idm.component.mobile.ipartyInfo

## 组件开发语言（comLangue）
vue

## 组件类型（comType）
common

## 所在代码包版本
mobile@1.0.1

## 组件属性

此章节主要介绍该组件的每个属性的含义以及如何使用说明

### 唯一标识【ctrlId】

只读属性，不可修改，作为每个组件实例的一个唯一标识
- 标识：`ctrlId`
- 默认值：`@[packageid]`

### 基本属性

#### 头像显示【isHead】
- 标题显示是否显示， 


#### 头像【uploadImage】

- 优先级：根据接口获取图片 > 本地上传图片 > 默认图片

#### 内容文本【contextText】

- 可用文本表达式配置 


### 内层样式
  - 头像宽【auWdith】
  - 头像高【auHeight】
  - 头像top【auTop】
  - 头像right【auRight】
  - 名称样式【nameFont】
  - 名称距离【nameTop】

### 外层样式
  - 宽【width】
  - 高【height】
  - 内外边距【ulbox】
  - 背景色【bgColor】
  - 渐变色【bglinear】
  - 容器阴影 【boxShadow】
  - 边框【boxborder】

### 高级

#### 数据源【dataSource】

#### 头像接口【imgdataSource】
 - 头像url拼接方法：`${头像接口}?fileName=${data[this.propData.headField]}`

#### 自定义参数【paramsFunc】

#### 结果数据处理函数【handleBackData】
 - 拿到接口请求数据后处理数据使用该函数

#### 字段设置
 - 头像【headField】
 - 名称【nameField】
