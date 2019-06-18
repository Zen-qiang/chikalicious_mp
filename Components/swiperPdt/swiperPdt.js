// components/address/address.js
Component({
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
  properties: {
    pdtList: {
      type: Array,
      value: []
    }
  },
  data: {
    showModal: false
  },
  methods: {
    getPdtInfo(e) {
      let pdtId = e.target.dataset.pdtid;
      wx.navigateTo({
        url: '/pages/details/details?id=' + pdtId
      });
    },
    orderPdt(e) {
      let pdtId = e.target.dataset.pdtid;
      console.log('orderPdt: ' + pdtId);
      this.setData({
        showModal: true
      });
    },
    closeModal(e) {
      this.setData({
        showModal: false
      });
    }
  }
})