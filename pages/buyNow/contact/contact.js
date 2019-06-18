// pages/buyNow/contact/contact.js
const app = getApp();

Page({
  /**
   * 页面的初始数据
   */
  data: {
    name: '',
    tell: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  nameChange: function(e) {
    this.setData({
      name: e.detail.detail.value
    });
  },

  tellChange: function(e) {
    this.setData({
      tell: e.detail.detail.value
    });
  },

  saveAction: function() {
    if (!this.data.name || this.data.name == '') {
      app.showMsg('请补全联系人名称');
      return;
    } else if (!this.data.tell || this.data.tell == '') {
      app.showMsg('请补全联系人电话');
      return;
    }
    app.globalData.contactInfo = {
      name: this.data.name, // 联系人名称
      tell: this.data.tell, // 联系人电话
    }
    wx.navigateBack();
  },

})