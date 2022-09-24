<template>
  <!--
    根目录规范(必须不能为空)：
    idm-ctrl：控件类型 drag_container：容器，drag_container_inlieblock：行内容器，idm_module：非容器的组件
    id：使用moduleObject.id，如果id不使用这个将会被idm-ctrl-id属性替换
    idm-ctrl-id：组件的id，这个必须不能为空
  -->
  <div idm-ctrl="idm_module"
       :id="moduleObject.id"
       :idm-ctrl-id="moduleObject.id"
  >


    <div class="i-comment-publish-content">
      <van-field v-model="commentContent" placeholder="写评论" left-icon="edit">
        <template #button>
          <van-button @click="publishCommentContent">发表</van-button>
        </template>
      </van-field>
    </div>

  </div>
</template>

<script>
export default {
  name: "ICommentPublish",
  data() {
    return {
      commentContent:"",
      moduleObject: {},
      propData: this.$root.propData.compositeAttr || {}
    }
  },
  created() {
    this.moduleObject = this.$root.moduleObject
    this.footBtnStyle();
  },
  mounted() {
  },
  destroyed() {
  },
  methods: {
    propDataWatchHandle(propData) {
      this.propData = propData.compositeAttr || {};
    },
    publishCommentContent(){
      let that = this;
      let dataSource = this.propData.publishComment;
      if (this.propData.publishComment && this.propData.publishComment[0]) {
        const publishComment = this.propData.publishComment[0];
        const func = window[publishComment.name];
        const that = this;
        const submitParam =  func.call(this, {
          commentContent:this.commentContent,
          ...that.commonParam(),
          customParam: publishComment.param,
          routerParams: this.moduleObject.routerId ? IDM.router.getParam(this.moduleObject.routerId) : {}
        });

        let source = {id: dataSource.value}
        let obj = Object.assign({}, submitParam, source);
        let url = this.propData.publishCommentUrl;
        IDM.http
            .post(
                url,
                obj,
                {
                  headers: {
                    "Content-Type": "application/json;charset=UTF-8",
                  },
                }
            )
            .done((res) => {
              console.log(res, "接口数据");
              if (res.code === "200") {

                console.log("发送刷新消息：00111");
                that.sendBroadcastMessage({
                  type: 'linkageReload',
                  rangeModule: this.propData.triggerComponents && this.propData.triggerComponents.map(el => el.moduleId),
                  message: { }
                });

              } else {
                console.log(url + "请求失败");
              }
            })
            .error((response) => {
              console.log(url + "请求失败");
            })
            .always((res) => {
              this.loading = false;
            });

      }

    },
    commonParam() {
      let urlObject = IDM.url.queryObject();
      var params = {
        pageId:
            window.IDM.broadcast && window.IDM.broadcast.pageModule
                ? window.IDM.broadcast.pageModule.id
                : "",
        urlData: JSON.stringify(urlObject),
      };
      return params;
    },
    footBtnStyle () {

      let styleObject = {};
      for (const key in this.propData) {
        if (this.propData.hasOwnProperty.call(this.propData, key)) {
          const element = this.propData[key]
          if (!element && element !== false && element != 0) {
            continue
          }
          switch (key) {
            case 'btnFootBoxWidth':
              styleObject['width'] = element;
              break
            case 'btnFootBoxHeight':
              styleObject['height'] = element;
              break
            case 'btnFootBox':
              IDM.style.setBoxStyle(styleObject, element);
              break
            case 'btnFootBoxColor':
              styleObject['background-color'] = element && element.hex8;
              break
            case 'btnFootBoxShadown':
              styleObject['box-shadow'] = element;
              break
            case 'btnFootBoxBorder':
              IDM.style.setBorderStyle(styleObject, element);
              break
            case 'btnTop':
              styleObject['top'] = element;
              break
            case 'btnRight':
              styleObject['right'] = element;
              break
            case 'btnBottom':
              styleObject['bottom'] = element;
              break
            case 'btnLeft':
              styleObject['left'] = element;
              break
          }
        }
      }
      console.log("styleObject:");

      window.IDM.setStyleToPageHead(this.moduleObject.id + " .i-comment-publish-content", styleObject);
    }
  }
}
</script>

<style lang="scss" scoped>


.i-comment-publish-content {
  height: 80px;
  background: #ffffff;
  box-shadow: 0px -2px 3px 0px rgba(204, 204, 204, 0.5);
  display: flex;
  position:fixed;

  ::v-deep .van-cell {
    height: 60px;
    background-color: transparent;

    .van-field__left-icon {
      background: #f2f2f2;
      margin-right: 0;
      display: flex;
      align-items: center;
      padding: 0 10px;
      color: rgb(51, 51, 51);
      border-radius: 4px 0 0 4px;
    }

    .van-field__body {
      height: 100%;

      .van-field__control {
        height: 100%;
        background: #f2f2f2;
        border-radius: 0 4px 4px 0;
      }
    }

    .van-button {
      border: none;
      font-size: 16px;
      padding: 0 6px;
      color: rgb(193, 0, 0);
    }
  }
}

</style>