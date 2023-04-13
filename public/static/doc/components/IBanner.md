# 轮播图
此组件是轮播图，这里是组件简介
## 组件类ID（IBanner）
idm.component.mobile.ibanner
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

- 标识：`title`
- 默认值：`轮播图`
- 显示：`@[false]`
#### 显示方块【showBullet】
配置轮播分页器方块显示
- 标识：`showBullet`
- 默认值：`true`
#### 分页位置【pagePosition】

- 标识：`pagePosition`
- 默认值：`center`
- 选项：	 - 左侧【flex-start】	 - 居中【center】	 - 右侧【right】
#### 自动播放【autoplay】
设置点击轮播图片数据模式
- 标识：`autoplay`
- 默认值：`true`
- 选项：	 - 是【true】	 - 否【false】
#### 停留时间【delay】
自动播放停留时间，单位：毫秒
- 标识：`delay`
- 默认值：`3000`
- 显示：`@[autoplay == true]`
#### 显示数量【limit】
设置显示轮播图片数量，自定义配置轮播时失效
- 标识：`limit`
- 默认值：`3`
- 显示：`@[dataType === 'dataSource' || dataType === 'customInterface']`
#### 跳转方式【jumpStyle】
设置点击轮播图片时跳转方式, 链接打开时使用window.open配置的数据源链接
- 标识：`jumpStyle`
- 默认值：`_link`
- 选项：	 - 子页面打开【_child】	 - 链接打开【_link】
#### 跳转页面【pageList】
选择要打开的子页面
- 标识：`pageList`
- 默认值：空
- 显示：`@[jumpStyle === '_child']`
### 样式设置
#### 大屏高度【maxHeight】
图片高度建议设置为：86-（图片高度/图片宽度*100），单位选择vw即可实现轮播图宽高比例同比放大
- 标识：`maxHeight`
- 默认值：```json{
    "inputVal": 32,
    "selectVal": "vw"
}```
#### 小屏高度【height】
用于设置再大于分界点的设备显示的轮播高度
- 标识：`height`
- 默认值：```json{
    "inputVal": 180,
    "selectVal": "px"
}```
#### 图片宽度【imageWidth】

- 标识：`imageWidth`
- 默认值：`86%`
#### 分界点【dividingPoint】
宽度分界点，用于决定当前轮播图的高度，如果屏幕小于分界点则使用小屏高度的值，反之会使用大屏高度的值
- 标识：`dividingPoint`
- 默认值：`800`
#### 图片圆角【imgBorderRadius】

- 标识：`imgBorderRadius`
- 默认值：```json{
    "inputVal": 8,
    "selectVal": "px"
}```
#### 上外边距【marginTop】

- 标识：`marginTop`
- 默认值：```json{
    "inputVal": 10,
    "selectVal": "px"
}```
#### 下外边距【marginBottom】

- 标识：`marginBottom`
- 默认值：```json{
    "inputVal": 5,
    "selectVal": "px"
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
#### 适配设置
##### 基准值【baseSize】
此属性用于标记当前组件在显示效果最完美情况下的宽度大小（px），例如：此组件显示效果最佳宽度为414px，则此处设置为414即可，如果此组件最佳效果为当前配置的屏幕宽（px）的一半则只需要除以2即可。
- 标识：`baseSize`
- 默认值：`414`
##### 适配比例【adaptationRatio】
与基准值配合使用，如果在实际预览屏幕宽为基准值的两倍，则此组件所有可适配的内容都会基于此处设置的适配比例相对应的进行放大缩小，例如此处设置1.2，则会相对应的放大至1.2倍
- 标识：`adaptationRatio`
- 默认值：`1.2`
#### 数据模式【dataType】
设置点击轮播图片数据模式，数据源参数：{limit, start}, 返回格式： { value: [] }
- 标识：`dataType`
- 默认值：`dataSource`
- 选项：	 - 数据源【dataSource】	 - 自定义【custom】	 - 自定义接口【customInterface】
#### 选择栏目【selectColumn】

- 标识：`selectColumn`
- 默认值：空
- 显示：`@[dataType === 'customInterface']`
#### 接口地址【customInterfaceUrl】
用于获取数据源的接口地址，请按照统一标准的返回格式返回文本数据，格式如下：{"code":"200","data":"",...}
- 标识：`customInterfaceUrl`
- 默认值：`/ctrl/website/api/columnlist`
- 显示：`@[dataType === 'customInterface']`
#### 轮播配置【bannerTable】

- 标识：`bannerTable`
- 默认值：空
- 显示：`@[dataType === 'custom']`
#### 数据源【dataSource】
数据返回示例：{value: [{jumpUrl: '', image: '', imagexl: ''}], count: 0, moreUrl: ''},image:标准图片，imagexl：大尺寸图片
- 标识：`dataSource`
- 默认值：空
- 显示：`@[dataType === 'dataSource']`