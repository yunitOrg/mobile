<!-- 时间范围 -->
<template>
  <div class="input-com" :style="computedBlock">
    <div class="name" :style="computedStyle" v-if="params['labelShow']">
      <span v-if="params.required" class="required">*</span>
      {{label}}
    </div>
    <van-field
      class="form-cel"
      v-model="formData[field]"
      :placeholder="params['placeholder']"
      :input-align="params['inputAlign']"
      :disabled="params['disabled']"
      @blur="handleBlur"
      :error-message="!fieldCheck ? params['errorFont'] : ''"
      :error-message-align="params['inputAlign']"
      @click="handleBefor"
    />
    <van-calendar v-model="showCalendar"
      :type="params['dateType']"
      @confirm="onConfirm"
      :position="params['datePosition']"
      :min-date="handleStart"
      :max-date="handleStrEnd"
    />
  </div>
</template>

<script>
export default{
  name: 'VantCalendar',
  props: {
    id: String,
    label: String,
    field: String,
    options: Object,
    formData: Object,
    params: Object
  },
  data () {
    return {
      showCalendar: false,
      fieldCheck: true
    }
  },
  computed: {
    handleStart () {
      let time = (val) => new Function(`return ${val}`)()
      return time(this.params['dateRangeStart'])
    },
    handleStrEnd () {
      let time = (val) => new Function(`return ${val}`)()
      return time(this.params['dateRangeEnd'])
    },
    computedStyle () {
      let obj = {}
      obj['width'] = this.params['labelWidth'];
      obj['height'] = this.params['labelHeight']
      if (this.params.labelFont) {
        IDM.style.setFontStyle(obj, this.params.labelFont)
      }
      if (this.params.labelBox) {
        IDM.style.setBoxStyle(obj, this.params.labelBox)
      }
      if (this.params.showAlign) {
        switch (this.params.showAlign) {
          case 'center':
            obj['justify-content'] = 'center'
            break
          case 'left':
            obj['justify-content'] = 'left'
            break
          case 'right':
            obj['justify-content'] = 'end'
            break
        }
      }
      return obj
    },
    computedBlock () {
      let styleObject = {}
      if (this.params['labelBlock']) {
        styleObject['display'] = 'block'
      }
      return styleObject
    }
  },
  methods: {
    handleBlur (event) {
      const val = event.target.value;
      const func = this.params['checkField'];
      if (func && func[0] && func[0].name) {
        this.fieldCheck = window[func[0].name] && window[func[0].name].call(this, val, {params: this.formData, data: this.params})
      }
    },
    handleBefor () {
      !this.params['disabled'] && (this.showCalendar = true);
    },
    onConfirm (date) {
      let value = (val) => `${val.getFullYear()}/${val.getMonth() + 1}/${val.getDate()}`;
      let field = this.field
      if (date instanceof Array) {
        if (date.length > 2) {
          this.formData[field] = `选择了 ${date.length} 个日期`;
        } else {
          const [start, end] = date;
          this.formData[field] = `${value(start)} - ${value(end)}`;
        }
      } else {
        this.formData[field] = value(date)
      }
      this.$emit('callFunc', { type: 'Vantcalendar', data: this.formData, eventName: this.params['calendarFunc']})
      this.showCalendar = false;
    }
  }
}
</script>
