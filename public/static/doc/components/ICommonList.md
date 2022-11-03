# 通用列表

这里用来描述组件的具体作用说明，描述内容建议简明扼要。

## 组件类名（className）

ICommonList

## 组件类 ID（classId）

idm.component.mobile.icommonlist

## 组件开发语言（comLangue）

vue

## 组件类型（comType）

common

## 所在代码包版本

basics@1.0.0

## 组件属性

### 唯一标识【ctrlId】

### 基本属性

#### 文本内容【fontContent】

#### title【htmlTitle】

#### 默认状态【defaultStatus】

### 样式设置

#### 内外边距【box】

#### 宽高

##### 宽【width】

##### 高【height】

#### 背景设置

##### 背景色【bgColor】

##### 背景图片【bgImgUrl】

##### 横向偏移【positionX】

##### 纵向偏移【positionY】

##### 背景大小【bgSize】

##### 宽度【bgSizeWidth】

##### 高度【bgSizeHeight】

##### 平铺模式【bgRepeat】

##### 背景模式【bgAttachment】

#### 边框【border】

#### 文字【font】

### 高级

#### 点击时动作【clickFunction】

#### 动态内容【dataSourceType】

#### 接口地址【customInterfaceUrl】

#### 结果集名【dataName】

#### 显示字段【dataFiled】

#### 自定义函数【customFunction】

##### 数据源接受参数

```js
// 如果有自定义参数函数
let params = {}
if (this.propData.paramsFunc && this.propData.paramsFunc.length > 0) {
    const funcName = this.propData.paramsFunc[0].name
    params =
        window[funcName].call(this, {
            routerParams: IDM.router.getParam(this.moduleObject.routerId)
        }) || {}
}
IDM.datasource.request(this.propData?.dataSource?.[0]?.id, {
    moduleObject: this.moduleObject,
    param: {
        ...params,
        ...this.chooseTabParams, // 接口tab传来的参数
        limit: this.propData.limit,
        start: this.currentPage
    }
})
```

##### 接口返回数据格式

```js
{
    code: 200,
    data: {
        // 样式一 mock
        value: [
            {
                jumpUrl: '',
                title: '第三次党员大会',
                location: '梦创双杨会议室',
                personNumber: 14,
                time: '2022-07-22 10:30-11:30',
                image: IDM.url.getModuleAssetsWebPath(require('../assets/banner1.jpg'), _this.moduleObject)
            },
            {
                jumpUrl: '',
                title: '第三次党员大会',
                location: '梦创双杨会议室',
                personNumber: 14,
                time: '2022-07-22 10:30-11:30',
                image: IDM.url.getModuleAssetsWebPath(require('../assets/banner2.jpg'), _this.moduleObject)
            },
            {
                jumpUrl: '',
                title: '第三次党员大会',
                location: '梦创双杨会议室',
                personNumber: 14,
                time: '2022-07-22 10:30-11:30',
                image: IDM.url.getModuleAssetsWebPath(require('../assets/banner3.jpg'), _this.moduleObject)
            }
        ],
        count: 3,
        moreUrl: ''
    },
    message: 'success'
}
```
