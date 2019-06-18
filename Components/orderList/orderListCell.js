// Components/orderList/orderListCell.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    cell: {
      type: Object,
      observer: function (newVal, oldVal) { }
    },
  },
  
  /**
   * 组件的初始数据
   */
  data: {
    status: '',
  },

  /**
   * 组件的方法列表
   */
  methods: {
    /**
     * 列表按钮点击事件
     */
    buttAction: function (e) {
      var param = {
        orderInfo: this.data.cell,
        sType: e.currentTarget.dataset.type
      };
      this.triggerEvent('delOrderCallBack', param);
    },

    /**
     * 列表行元素点击事件
     */
    cellSelected: function (e) {
      var param = {
        orderInfo: this.data.cell,
        sType: e.currentTarget.dataset.type
      };
      this.triggerEvent('click', param);
    }

  }
})
