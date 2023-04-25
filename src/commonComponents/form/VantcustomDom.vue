<!-- 自定义函数 -->
<template>
  <div class="cumtom-dom">
    <div v-html="handleCustomDom()"></div>
  </div>
</template>

<script>
export default{
  name: 'VantcustomDom',
  props: {
    id: String,
    label: String,
    field: String,
    options: Object,
    formData: Object,
    params: Object
  },
  methods: {
    handleCustomDom () {
      let customFun = this.params['handleCustomFun'], html = '';
      if (customFun && customFun.length > 0) {
        const func = customFun[0];
        if (func) {
          let name = func.name;
          html = window[name] && window[name].call(this, {
            params: this.params,
            formData: this.formData
          });
        }
      }
      return html
    }
  }
}
</script>