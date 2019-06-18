Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    stepper: {
      // 当前 stepper 数字
      stepper: 1,
      // 最小可到的数字
      min: 1,
      // 最大可到的数字
      max: 5,
      // 小尺寸, 默认大尺寸
      size: 'small'
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    move: function () {
      console.log('move');
    },
    closeModal: function () {
      this.triggerEvent('close', {hello: 'aa'}) 
    },
    handleZanStepperChange: function ({
      // stepper 代表操作后，应该要展示的数字，需要设置到数据对象里，才会更新页面展示
      detail: stepper
    }) {
      this.setData({
        'stepper.stepper': stepper
      });
    }
  }
})