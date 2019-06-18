var app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {},

  bindGetUserInfo: function (e) {
    if (!e.detail.userInfo) {
      return;
    }
    app.globalData = e.detail;
    wx.navigateTo({
      url: '/pages/authorize/index'
    });

    // var encryptedData = e.detail.encryptedData;
    // var iv = e.detail.iv;
    // var rawData = e.detail.rawData;
    // var signature = e.detail.signature;

    // 保存信息至本地
    // app.saveValue('user_avatarUrl', e.detail.userInfo.avatarUrl); // 头像
    // app.saveValue('user_nickName', e.detail.userInfo.nickName); // 昵称
    // app.saveValue('user_country', e.detail.userInfo.country); // 国家
    // app.saveValue('user_province', e.detail.userInfo.province); // 省份
    // app.saveValue('user_city', e.detail.userInfo.city); // 城市
  },
})