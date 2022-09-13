# 多选卡片

## 组件类名（className）

## 组件类 ID（classId）

## 组件开发语言（comLangue）

## 组件类型（comType）

## 所在代码包版本

mobile@1.0.0

## 组件属性

此章节主要介绍该组件的每个属性的含义以及如何使用说明

### 唯一标识【ctrlId】

只读属性，不可修改，作为每个组件实例的一个唯一标识

-   标识：`ctrlId`
-   默认值：`@[packageid]`

### 基本属性

### 数据源 接口返回格式需要按照以下要求：

```js
{
    code: 200,
    data: [
        {
            title: '第三次党员大会',
            isCheck: true,
            children: [
                {
                    username: '陈独秀',
                    avatar: IDM.url.getModuleAssetsWebPath(require('../assets/default_avatar.png'), _this.moduleObject),
                    content: '关于《2021年9月党小组会》的请假单：因工作出差在外，无法参加活动，望批准。',
                    time: '2022-09-24',
                    isCheck: true
                },
                {
                    username: '陈独秀',
                    avatar: IDM.url.getModuleAssetsWebPath(require('../assets/default_avatar.png'), _this.moduleObject),
                    content: '关于《2021年9月党小组会》的请假单：因工作出差在外，无法参加活动，望批准。',
                    time: '2022-09-24',
                    isCheck: true
                }
            ]
        }
    ],
    message: 'success'
}
```
