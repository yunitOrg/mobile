# 活动统计
## 组件数据源配置

应缴党费: dues

计算规则: computationRule

显示字段: data

列表字段: list

图标字段: icon

活动名称: name

参与人数: personNum

召开次数: convene

出席率:   attendance

数据源应为:
```
{
    data:{
        dues: "20.00",
        computationRule:"#",
        list:[
            {       
                icon:"url",
                name:"党会",
                personNum:"参与人数",
                convene:"召开次数",
                attendance:"出席率"
            },
            {       
                icon:"url",
                name:"党会",
                personNum:"参与人数",
                convene:"召开次数",
                attendance:"出席率"
            },......
        ]
    }
}
```