// pages/order/orderDetail/orderDetail.js
import config from '../../../utils/config.js'
var app = getApp();

Page({
  /**
   * 页面的初始数据
   */
  data: {
    orderID: "",
    orderInfo: {}
  },

  onLoad: function (option) {
    let orderID = option.orderID;
    this.data.orderID = orderID;
    this.prepareData(orderID);
  },

  onUnload: function () {
    if (app.navPage.order) {
      // wx.switchTab({
      //   url: '/pages/index/index'
      // })
      app.navPage.order = false;
    }
  },

  prepareData: function (orderID) {
    var params = {
      url: config.orderDetailsG,
      params: {
        orderID: orderID,
      }
    }
    let that = this;
    app.nGet(params).then(res => {
      if (res.data) {
        that.setData({
          orderInfo: res.data
        });
      }
    }, res => {});
  },

  /**
   * 确认收货
   */
  confirmReceipt: function () {
    var params = {
      url: config.confirmReceiptP,
      params: {
        orderID: this.data.orderInfo.orderID,
      }
    }
    let that = this;
    app.nPost(params).then(res => {
      if (res.code == 666) {
        var pages = getCurrentPages();
        var prevPage = pages[pages.length - 2] //上一个页面
        prevPage.setData({
          ['tab1.selectedId']: '4'
        });
        prevPage.prepareData('4');
        wx.navigateBack();
      }
    }, res => {});
  },

  goPurch: function () {
    // app.showMsg("敬请期待！");
    let orderID = this.data.orderInfo.orderID;
    // step1 先调用支付接口，获取支付信息
    wx.showLoading({
      title: '加载中'
    })
    var params = {
      url: config.returnparam,
      params: {
        goodsid: orderID, // this.data.orderInfo.orderID,
        title: this.data.orderInfo.orderNumber
      }
    }
    let that = this;
    app.nPost(params).then(res => {
      wx.hideLoading();
      if (res.code == 666) {
        // step2 调用微信支付模块
        wx.requestPayment({
          timeStamp: res.data.timeStamp,
          nonceStr: res.data.nonceStr,
          package: res.data.package,
          signType: res.data.signType,
          paySign: res.data.paySign,
          success(res) {
            wx.redirectTo({
              url: `/pages/order/orderDetail/orderDetail?orderID=${orderID}`
            });
            app.navPage.order = true;
          },
          fail(res) {}
        });
      }
    }, res => {
      wx.hideLoading();
      app.showMsg(res.message);
    });
  },

  /**
   * 再次购买
   */
  purchAgain: function () {
    let pdtid = this.data.orderInfo.product[0].pid;
    let pdtType = this.data.orderInfo.product[0].type;
    wx.navigateTo({
      url: `/pages/details/details?id=${pdtid}&type=${pdtType}`,
    })
  }

})