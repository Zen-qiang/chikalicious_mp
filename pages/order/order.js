import config from '../../utils/config.js'
var app = getApp();

Page({
  /**
   * 页面的初始数据
   */
  data: {
    list: [],

    tab1: {
      list: [{
        id: '0',
        title: '全部'
      }, {
        id: '1',
        title: '待付款'
      }, {
        id: '2',
        title: '制作中'
      }, {
        id: '3',
        title: '待收货'
      }, {
        id: '4',
        title: '已完成'
      }],
      selectedId: '0'
    },
  },

  onLoad: function(option) {
    let selectedId = this.data.tab1.selectedId;
    if (option.type) {
      this.setData({
        ['tab1.selectedId']: option.type
      });
      selectedId = option.type;
    }
    this.prepareData(selectedId);
  },

  onShow: function() {
    // if (app.navPage.order) {
    //   app.navPage.order = false;
    //   wx.navigateBack({
    //     delta: 3
    //   })
    // }
  },

  /** */
  tabAction: function(e) {
    this.data.tab1.selectedId = e.detail;
    this.prepareData(e.detail);
  },

  /** */
  onCellClick: function(e) {
    wx.navigateTo({
      url: `/pages/order/orderDetail/orderDetail?orderID=${e.detail.orderInfo.orderID}`
    })
  },

  delOrderCallBack: function(e) {
    let _that = this;
    wx.showModal({
      title: '提示',
      content: '确定要删除订单吗',
      success(res) {
        if (res.confirm) {
          let orderID = e.detail.orderInfo.orderID;
          var params = {
            url: config.deleteOrderG,
            params: {
              orderID: orderID
            }
          }
          app.nPost(params).then(res => {
            if (res.code == 666) {
              _that.prepareData(_that.data.tab1.selectedId);
              app.showMsg('删除成功！');
            }
          }, res => {});
        } else if (res.cancel) {}
      }
    });
  },

  prepareData: function(index) {
    let orderType = '';
    switch (index) {
      case '1': // 待付款
        orderType = 'WAITING_PAYMENT'
        break;
      case '2': // 制作中
        orderType = 'IN_PRODUCTUIN'
        break;
      case '3': // 待收货
        orderType = 'WAITING_EXTRACT'
        break;
      case '4': // 已完成
        orderType = 'COMPLETED'
        break;
    }

    var params = {
      url: config.orderListG,
      params: {
        type: orderType,
        page: 1,
        size: 10000
      }
    }
    app.nGet(params).then(res => {
      if (res.data) {
        this.setData({
          list: res.data.list,
        });
      }
    }, res => {});
  },

  onPullDownRefresh: function() {
    console.log("下拉刷新");
    wx.stopPullDownRefresh()
  },

  onReachBottom: function() {
    console.log("上拉加载");
  }

})