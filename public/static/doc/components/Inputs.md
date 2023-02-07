# 表单输入框组件
此组件为移动端 输入框组件，但能够配置出form表单效果
## 组件类名（className）
Inputs
## 组件类ID（classId）
idm.componet.mobile.inputs
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


```js
- 增加了标题 form标题能够控制标题是否显示

- 增加了底部按钮显示， 底部按钮可以随意定位，点击底部按钮自己处理点击事件，
传递的参数只有一个对象包括：form整个表单数据 router跳转过来的页面数据  value当前点击的key otherForm其他组件form发送的值

 源代码是这样：handleSubmit (row) {
  let that = this;
    let { customClickFunc, key, pageModuleSelectDataMultiple } = row;
    //表单分组标识
    let formGroupKey = this.propData.formFiledKey;
    //所有返回结果
    let moduleAllData = window.IDM.broadcast.getModuleContextValue(pageModuleSelectDataMultiple,formGroupKey);
    if (customClickFunc && customClickFunc.length > 0 ) {
      customClickFunc.forEach(item => {
        window[item.name] && window[item.name].call(that, {
          form: this.formData,
          router: this.getRouterParams(),
          value: key,
          otherForm: moduleAllData
        });
      })
    }
  }

-----------

底部按钮可以根据接口返回自行显示 哪一个按钮

在高级 => 底部按钮显示逻辑 添加自定义函数，参数有两个：form整个表单数据  按钮列表

例子：export function handleshow(ctx, obj) {
  let ary = obj;
  return ary.slice(2, 3)
}

```

```js

- 添加组件table，可供选择的组件有 输入框、密码框、开关、复选框、多行文本、发送验证码 动作面板(下拉框)

1. 左侧文本：修饰 label的文字样式
2. 文本：左侧文本
3. 绑定字段：组件绑定的字段,输入的内容给该字段，比如：输入框中该字段是name，那么获取到数据就是 name:xxx
4. placeholder: placeholder
5. 禁用: 是否禁用 true false
6. 是否必填：true false
7. 校验函数： 检验函数
8. 错误提示：错误提示语， 可以动态修改
9. 输入框类型：如果是输入框 可以使用该字段  
10. 输入框对齐方式： 输入框对齐方式
11. 下拉静态数据源：[{ name: '全部', value: 0 }, { name: '新款商品', value: 1 }, { name: '活动商品', value: 2 }]

```


#### form回填数据源  使用数据源回填数据
需要在添加组件的 [绑定字段] 属性中 添加接口返回的key， 比如：name 
```json
{
  "code": "200",
  "type": "success",
  "message": "操作成功",
  "metadata": null,
  "token": "",
  "data": {
    "name": "123456" // 输入框的值
  }
}

```

#### 消息传参
```js
// 组件传递数据给其他组件方法、1：消息 sendBroadcastMessage   2：传递到上下文 getContextValue
第一种：this.sendBroadcastMessage({
        type: 'sendFormData',
        rangeModule: this.propData.triggerComponents && this.propData.triggerComponents.map(el => el.moduleId),
        message: this.formData
      })
第二种：getContextValue ()  {
      // 接收到跳转页面的router参数
      const routerParams = this.moduleObject.routerId
        ? IDM.router.getParam(this.moduleObject.routerId)
        : {};
      let result = {
        type: "success",
        message: '',
        key: this.propData.formFiledKey || this.propData.ctrlId,
        data: {
          form: this.formData,
          ...routerParams
        }
      };
      return result;
    },
```




注：校验函数是失去焦点才校验 会传两个参数： 

```js
/*
* 确认密码与新密码是否一致
* val： 输入框中输入的
* obj: {params: {}, data: {}}， params：form绑定的数据能够拿到所有组件输入框的内容  obj: 当前组件绑定的数据， 可以data.errorFont='' 修改错误提示语
*/
export function handleSure(val, obj) {
  console.log(val, obj)
  let { params, data } = obj;
  if (val !== params.handlnew) {
      data.errorFont = '两个密码不一致'
      return false
  } else {
      return true
  }
}
```

