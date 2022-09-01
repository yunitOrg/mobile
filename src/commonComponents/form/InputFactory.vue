<template>
  <div>
    <van-cell-group inset>
      <component
        :is="comInput"
        :type="type"
        :label="label"
        :field="field"
        :options="options"
        :formData="formData"
        :params="params"
      ></component>
    </van-cell-group>
  </div>
</template>

<script>
import Vantinput from "./VantInput.vue";
import Vantpassword from "./Vantpassword.vue";
import Vantswitch from "./Vantswitch.vue";
import Vantcheckbox from "./Vantcheckbox.vue";
import Vanttextarea from "./Vanttextarea.vue";
import VantsendPws from "./VantsendPws.vue";
const inputMap = {
  Vantinput,
  Vantpassword,
  Vantswitch,
  Vantcheckbox,
  Vanttextarea,
  VantsendPws
}
export default{
  name: "InputFactory",
  components: inputMap,
  props: {
    label: {
      type: String,
      default: ""
    },
    type: {
      type: String,
      default: ""
    },
    field: {
      type: String,
      default: ""
    },
    options: {
      type: Object,
      default: () => {
        return {};
      }
    },
    formData: {
      type: Object,
      default: () => {
        return {};
      }
    },
    params: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  computed: {
    comInput() {
      return inputMap['Vant'+this.type];
    }
  }
}
</script>

<style lang="scss">
.input-com{
  display: flex;
  align-items: center;
  .name{
    text-align: center;
  }
}
</style>
