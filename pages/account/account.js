var app = getApp();

Page({
  data: {
    isLogin: true,
    acountInfo: {
      name: '登录/注册',
      icon: '/images/h_icon1.png',
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    if (app.isLogin()) {} else {
      this.setData({
        isLogin: false
      });
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {},

  onShow: function() {
    if (app.isLogin()) {
      this.setData({
        isLogin: true,
        acountInfo: {
          name: app.globalData.userInfo.nickName || '',
          icon: app.globalData.userInfo.avatarUrl || '/images/h_icon1.png',
        }
      });
    }
  },

  /**
   * 跳转到登录页面
   */
  showOrder: function(e) {
    if (!app.isLogin()) {
      app.showMsg("暂未登陆");
    } else {
      console.log(e.currentTarget.dataset.type);
      wx.navigateTo({
        url: '/pages/order/order?type=' + e.currentTarget.dataset.type
      });
    }
  },

  /**
   * 收藏
   */
  cartAction: function() {
    if (!app.isLogin()) {
      app.showMsg("暂未登陆");
      return;
    }
    wx.navigateTo({
      url: '/pages/cart/cart'
    });
  },

  /**
   * 收货地址
   */
  addressAction: function() {
    if (!app.isLogin()) {
      app.showMsg("暂未登陆");
      return;
    }
    wx.navigateTo({
      url: '/pages/contactsManager/contactsManager'
    });
  },

  /**
   * 关于我们
   */
  aboutAction: function(e) {
    wx.navigateTo({
      url: '/pages/about/about?type=' + e.currentTarget.dataset.type
    });
  },
  // =======================

  /**
   * 获取用户信息
   */
  bindGetUserInfo: function(e) {
    if (!e.detail.userInfo) {
      return;
    }
    // 保存信息至本地
    app.saveValue('user_avatarUrl', e.detail.userInfo.avatarUrl); // 头像
    app.saveValue('user_nickName', e.detail.userInfo.nickName); // 昵称

    app.globalData = e.detail;
    wx.navigateTo({
      url: '/pages/login/login'
    });
  },

  // 退出登录
  loginOut: function(e) {
    wx.removeStorageSync('sessionKey');
    this.setData({
      isLogin: false
    });
  },

  //分享
  onShareAppMessage: (_title, _path) => {
    return {
      title: 'Chikalicious',
      path: '/pages/index/index',
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  },
  
})