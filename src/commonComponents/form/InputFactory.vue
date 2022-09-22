<template>
  <div class="input-component">
    <component
      :is="comInput"
      :id="id"
      :type="type"
      :label="label"
      :field="field"
      :options="options"
      :formData="formData"
      :params="params"
      :moduleObject="moduleObject"
      @callFunc="handleClickCall"
    ></component>
  </div>
</template>

<script>
import Vantinput from "./VantInput.vue";
import Vantpassword from "./Vantpassword.vue";
import Vantswitch from "./Vantswitch.vue";
import Vantcheckbox from "./Vantcheckbox.vue";
import Vanttextarea from "./Vanttextarea.vue";
import VantsendPws from "./VantsendPws.vue";
import Vantcalendar from "./Vantcalendar.vue";
import VantactionSheet from "./VantactionSheet.vue";
const inputMap = {
  Vantinput,
  Vantpassword,
  Vantswitch,
  Vantcheckbox,
  Vanttextarea,
  VantsendPws,
  Vantcalendar,
  VantactionSheet
}
export default{
  name: "InputFactory",
  components: inputMap,
  inject: ['propData'],
  props: {
    id: {
      type: String,
      default: ""
    },
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
    moduleObject: {
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
  },
  methods: {
    converBoxStyle () {
      let styleObject = {}
      if (this.propData.componentBox) {
        IDM.style.setBoxStyle(styleObject, this.propData.componentBox)
      }
      if (this.propData.componentBorder) {
        IDM.style.setBorderStyle(styleObject, this.propData.componentBorder)
      }
      window.IDM.setStyleToPageHead(this.id + " .input-component", styleObject);
    },
    handleClickCall (val) {
      this.$emit('callFunc', val)
    }
  },
  mounted () {
    this.converBoxStyle()
  }
}
</script>

<style lang="scss">
.input-com{
  display: flex;
  align-items: center;
  .name{
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .required{
    color: red;
    padding-right: 5px;
  }
  .form-cel{
    flex: 1;
  }
  .celright{
    flex: 1;
    min-height: 44px;
    line-height: 44px;
    padding-right: 16px;
  }
}
.customclas{
  max-height: 40% !important;
}
</style>
