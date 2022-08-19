<script type="text/jsx">
export default {
  name: 'idm-form',

  data () {
    return {
      propData: this.$root.propData.compositeAttr||{
        tableComponent: [
          {
            key: '1',
            type: 'input',
            labelSwitch: true,
            labelText: '文本'
          },
          {
            key: '2',
            type: 'password',
            labelSwitch: true,
            labelText: '文本'
          },
          {
            key: '3',
            type: 'switch',
            labelSwitch: true,
            labelText: '文本'
          },
          {
            key: '4',
            type: 'checkbox',
            labelSwitch: true,
            labelText: '文本'
          },
          {
            key: '5',
            type: 'textarea',
            labelSwitch: true,
            labelText: '文本'
          },
          {
            key: '6',
            type: 'sendPws',
            labelSwitch: true,
            labelText: '文本'
          }
        ]
      }
    }
  },
  render () {
    return <div idm-ctrl="idm_module" id={this.moduleObject.id} idm-ctrl-id={this.moduleObject.id}>
      <div class="idm_inputs">
        <van-form>
          {this.propData.tableComponent.map(item => {
            !item.render &&
            this.renderFunc(item)
          })}
        </van-form>
      </div>
    </div>
  },
  created () {
    this.moduleObject = this.$root.moduleObject;
    this.init();
  },
  methods: {
    propDataWatchHandle (propData) {
      this.propData = propData.compositeAttr||{};
      this.init();
    },
    init () {
      console.log(this.propData, '数据源')
    },
    renderFunc (item) {
      console.log(item)
    }
  }

}
</script>