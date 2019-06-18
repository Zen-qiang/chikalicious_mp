// pages/buyNow/invoice/invoice.js

const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isBill: false,
    billHeader: "", // 发票抬头
    billNo: "", // 发票税号
    invoiceAddress: "", // 地址、电话（选填）
    invoiceBankAccount: "", // 开户行及账号（选填）
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let bill = options.isNeedBill;
    let isBill = false;
    if (bill == '1') {
      isBill = true
    }
    this.setData({
      isBill: isBill,
      billHeader: options.billHeader,
      billNo: options.billHeader,
      invoiceAddress: options.invoiceAddress,
      invoiceBankAccount: options.invoiceBankAccount,
    });
  },

  /** 是否需要蜡烛 */
  switchChange: function(e) {
    this.setData({
      isBill: e.detail.value
    });
  },

  textChange: function(e) {
    this.setData({
      billHeader: e.detail.detail.value
    });
  },

  billNoChange: function(e) {
    this.setData({
      billNo: e.detail.detail.value
    });
  },

  invoiceAddressChange: function(e) {
    this.setData({
      invoiceAddress: e.detail.detail.value
    });
  },

  invoiceBankAccountChange: function(e) {
    this.setData({
      invoiceBankAccount: e.detail.detail.value
    });
  },

  // 
  saveAction: function() {
    if (!this.data.billHeader || this.data.billHeader == '') {
      app.showMsg('请补全发票抬头');
      return;
    }
    if (!this.data.billNo || this.data.billNo == '') {
      app.showMsg('请补全发票税号');
      return;
    }
    app.globalData.billInfo = {
      isNeedBill: this.data.isBill, // 是否需要发票
      billHeader: this.data.billHeader, // 发票抬头
      billNo: this.data.billNo, // 发票抬头
      invoiceAddress: this.data.invoiceAddress, // 地址、电话（选填）
      invoiceBankAccount: this.data.invoiceBankAccount, // 开户行及账号（选填）
    }
    wx.navigateBack();
  },

})