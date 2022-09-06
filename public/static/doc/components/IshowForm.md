### 数据源 接口返回格式需要按照以下要求：

```json
{
  "code": "200",
  "type": "success",
  "message": "操作成功",
  "metadata": null,
  "token": "",
  "data": {
    "should": 1, // 应到
    "actual": 2, // 实到
    "leave": 3, // 请假
    "absent": 4, // 缺席
    "address": "xxxx", // 详细地址
    "time": "xxx", // 时间
    "people": "xxx", // 联系人
    "active": "", //  活动内容
    "info": [ // 相关资料
      {
        "name": "aaa.txt"
      },
      {
        "name": "bbb.txt"
      }
    ],
    "activeSum": "xxx" // 活动总结
  }
}

```