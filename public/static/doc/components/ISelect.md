# 表单输入框组件
此组件为移动端 下拉框
## 组件类名（className）
ISelect
## 组件类ID（classId）
idm.componet.mobile.iselect
## 组件开发语言（comLangue）
vue
## 组件类型（comType）
common
## 所在代码包版本
mobile@1.0.0
## 组件属性
此章节主要介绍该组件的每个属性的含义以及如何使用说明
### 唯一标识【ctrlId】
只读属性，不可修改，作为每个组件实例的一个唯一标识
- 标识：`ctrlId`
- 默认值：`@[packageid]`
### 基本属性

#### 展开方式【direction】

#### 遮罩层【overlay】

#### 页签选项设置【tableMenu】
```js
- 添加组件table

1. tab标识
2. tab文字 
3. 绑定字段 可以自定义返回值key
4. 数据类型： 支持 静态数据和接口获取数据
  静态数据：数据源在 textarea里编辑  数据格式必须是：text  和  value

5. 下拉数据绑定值 是接口获取到数据 的key，前端会拿这个key在接口里找下拉数据源

6. 下拉默认值 下拉默认值
7. 是否禁用

```


#### 数据源  使用数据源回填数据
如果选择是 接口获取数据 下拉数据绑定值需要填写 接口数据的key 比如：name
```json
{
  "code": "200",
  "type": "success",
  "message": "操作成功",
  "metadata": null,
  "token": "",
  "data": {
    "name": [
      {
        "text": "全选",
        "value": "0"
      },
      {
        "text": "新款商品",
        "value": "1"
      },
      {
        "text": "活动商品",
        "value": "2"
      }
    ]
  }
}

```

#### 组件通讯 

```js
type、state 可以自己定义字段， font是选中的中文名称
消息key：iselect_chooseData
参数：[
  {
    type: 0,
    font: "全部"
  },
  {
    state: 0,
    font: "全部"
  }
]
```
