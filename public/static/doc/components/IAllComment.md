### 数据源 接口参数需要按照以下要求

```json
{
  "start": 0, //起始位置
  "pageSize": 5 // 每页条数
}
```

### 数据源 接口返回格式需要按照以下要求：

```json
{
  "code": "200",
  "type": "success",
  "message": "操作成功",
  "metadata": null,
  "token": "",
  "data": {
    "total": 10, // 总条数
    "list": [
      {
        "img": "/resource/idm/img/14.png",//头像
        "id": "11",// 标识
        "avatar": "Wunder", // 作者
        "time": "6分钟前", // 时间
        "star": true, // 是否已经点赞
        "starNum": 100, // 点赞数量
        "bt": "我认为二级市场真正的问题在于拍卖行。在艺术家的推广上，拍卖行真的和画廊格格不入。", // 评论内容
        "from": "来自广东深圳", // 评论来自地点
        "total": 100 // 回复数量
      }
    ]
  }
}
```
