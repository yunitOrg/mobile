# 图表图文
这里用来描述组件的具体作用说明，描述内容建议简明扼要。
## 组件类名（className）
Icell
## 组件类ID（classId）
idm.component.mobile.icell
## 组件开发语言（comLangue）
vue
## 组件类型（comType）
common
## 所在代码包版本
mobile@1.0.1

### 高级
1. 参数、消息过滤函数 可以对消息数据处理 返回给组件使用
```js
  // 过滤接口参数 源码 传了一个参数：消息
  fileterParams(message) {
    let obj = {};
    if (this.propData.paramsMsgFun && this.propData.paramsMsgFun.length > 0) {
      let name = this.propData.paramsMsgFun[0].name
      obj = window[name] && window[name].call(this, {msg: message});
    }
    return obj
  },
```
2. 点击执行函数   可以写点击后的执行逻辑   可以跳转页面 发消息等等
```js
// 点击 源码
handleClick () {
  if (this.propData.customFunc && this.propData.customFunc.length > 0) {
    let name = this.propData.customFunc[0].name;
    window[name] && window[name].call(this);
  }
},
```
