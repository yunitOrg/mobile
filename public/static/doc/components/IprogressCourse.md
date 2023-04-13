# tab列表组件
此组件为移动端 发展过程

## 组件类名（className）
IprogressCourse

## 组件类ID（classId）
idm.component.mobile.iprogressCourse

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

#### 标题显示【isTitleShow】

  - 标题显示：`isTitleShow`
  - 默认值：`true`

#### 标题【title】

  - 标题显示：`title`
  - 默认值：`发展过程`
  - 显示：`@[isTitleShow]`

#### 左侧图标【contextText】

  - 选择图标【titleIcon】
  - 图标颜色【titleIconFontColor】
  - 图标大小【titleIconFontSize】
  - 图标间距【leftIconBox】



#### 标题间距【titleBox】
  - 标题间距【titleBox】

#### 标题字体【titleFont】

#### 单项样式
  - 宽【itemWidth】
    - 默认值：`auto`
  - 高【itemHeight】
    - 默认值：`auto`
  - 内外边距【itemBox】
    - 默认值:
    ```json
    {
      "marginTopVal": "",
      "marginRightVal": "",
      "marginBottomVal": "10px",
      "marginLeftVal": "",
      "paddingTopVal": "10px",
      "paddingRightVal": "10px",
      "paddingBottomVal": "10px",
      "paddingLeftVal": "10px"
    }
    ```
  - 背景色【itemBgcolor】
    默认值：
    ```json
    {
      "hex8": "#FFFFFFFF"
    }

  - 容器阴影【itemboxShadow】
    默认值：`"0px 0px 10px 0px #ccc"`
    ```json
    {
      "0px 0px 10px 0px #ccc"
    }
    ```
  - 边框【itemboxborder】

  - 数字样式
    - 宽【numWidth】
      - 默认值：`30px`
    - 高【numHeight】
      - 默认值： `30px`
    - 背景色【numBgColor】
      - 默认值：`"hex8": "#ff0000FF"`
    - 数字字体【numFont】
    - 数字距右【numRight】
      - 默认值：`10px`
  
  - 标题字体【itemNameTitle】

  - 右侧箭头
    - 图标颜色【arrowIconColor】
    - 图标大小【arrowIconSize】
  
  - 子集盒子【subitemBox】
    - 默认值：
    ```json
      {
        "marginTopVal": "",
        "marginRightVal": "",
        "marginBottomVal": "",
        "marginLeftVal": "",
        "paddingTopVal": "10px",
        "paddingRightVal": "",
        "paddingBottomVal": "",
        "paddingLeftVal": "30px"
      }
    ```
  - 子集样式
    - 子集边距【childrenBox】
      - 默认值：
      ```json
      {
        "marginTopVal": "",
        "marginRightVal": "",
        "marginBottomVal": "10px",
        "marginLeftVal": "",
        "paddingTopVal": "5px",
        "paddingRightVal": "",
        "paddingBottomVal": "5px",
        "paddingLeftVal": ""
      }
      ```
    - 背景色【childrenColor】  
      - 默认值：`"hex8": "#FFF3E8FF"`
    - 图标宽【subiconwidth】
      - 默认值：`30px`
    - 图标高【subiconheight】
      - 默认值：`22.5px`
    - 图标字体【subiconFont】
    - 图标距右【subiconright】
    - 标题字体【subFont】
    - 对号宽【checkWidth】
    - 对号高【checkHeight】
  
#### 外层样式
  - 宽【width】
  - 高【height】
  - 内外边距【ulbox】
  - 背景色【bgColor】
  - 容器阴影【boxShadow】
  - 边框【boxborder】

### 高级

#### 数据源【dataSource】

#### 自定义参数【paramsFunc】

#### 结果数据处理函数【handleResult】
 - 拿到接口请求数据后处理数据使用该函数

