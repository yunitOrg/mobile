<template>
  <div class="sendpws">
    <van-field
      v-model="formData[field]"
      :placeholder="params['placeholder']"
    />
    <span class="swnd-btn">{{label}}</span>
  </div>
</template>

<script>
export default{
  name: 'VantInput',
  props: {
    label: String,
    field: String,
    options: Object,
    formData: Object,
    params: Object
  }
}
</script>

<style lang="scss" scoped>
.sendpws{
  display: flex;
  align-items: center;
  .swnd-btn{
    width: 35%;
    height: 30px;
    line-height: 30px;
    text-align: center;
    color: #f00;
    border: 1px solid #f00;
    border-radius: 5px;
    display: inline-block;
    font-size: 14px;
  }
}
</style>
