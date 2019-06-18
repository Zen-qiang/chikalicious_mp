import config from './utils/config.js'
const location = require('./tools/location.js');

App({
  globalData: {
    userInfo: {}
  },

  navPage: {
    order: false
  },

  indexData:{},

  onLaunch: function () {
    var _that = this;
    location.initMap(); // 初始化地图
    wx.getSetting({
      success(res) {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success: function (res) {
              _that.globalData.userInfo = res.userInfo;
            }
          })
        } else {
          console.log("获取用户信息失败，未授权！");
        }
      }
    });

    // 测试接口
    // var data = {
    //   url: config.productCategoryListG,
    //   params: {}
    // }
    // this.nGet(data).then(data => { 
    //   console.log(data);
    // }, res => { 
    //   console.log(res);
    // });
  },

  /**
   * 判断用户是否登录
   */
  isLogin: function () {
    var sessionKey = this.getValue('sessionKey');
    return sessionKey ? true : false;
  },

  // ======网络请求======

  /** get 请求
    var data = {
      url: config.loginP,
      params: {
      }
    }
    app.nGet(data).then(data => {}, res => {});
   */
  nGet: function (data) {
    var _that = this;
    let sessionKey = this.getValue('sessionKey') || '';
    let cityId = this.getValue('cityCode') || '310000';
    let promise = new Promise(function (resolve, reject) {
      wx.request({
        url: data.url,
        data: data.params,
        method: "GET",
        header: {
          'content-type': 'application/x-www-form-urlencoded',
          'session-Token': sessionKey,
          'city': cityId,
        },
        success: function (res) {},
        fail: function (res) {},
        complete: function (res) {
          if (res.data && res.data.code === 666) {
            resolve(res.data);
          } else {
            reject(res.data);
            if (res.data.code === 1006) {
              // 退出登录
              _that.clearValue();
              wx.navigateTo({
                url: '/pages/login/login'
              });
            } else if (res.data && res.data.message) {
              _that.showMsg(res.data.message);
            }
          }
        }
      });
    });
    return promise;
  },

  /** post 请求
    var data = {
      url: config.loginP,
      params: {
      }
    }
    app.nPost(data).then(data => {}, res => {});
   */
  nPost: function (data) {
    var _that = this;
    let sessionKey = this.getValue('sessionKey') || '';
    let cityId = this.getValue('cityCode') || '310000';
    let promise = new Promise(function (resolve, reject) {
      wx.request({
        url: data.url,
        data: data.params,
        method: "POST",
        header: {
          'content-type': 'application/x-www-form-urlencoded',
          'session-Token': sessionKey,
          'city': cityId,
        },
        success: function (res) {},
        fail: function (res) {},
        complete: function (res) {
          if (res.data && res.data.code === 666) {
            resolve(res.data);
          } else {
            reject(res.data);
            if (res.data.code === 1006) {
              // 退出登录
              _that.clearValue();
              wx.navigateTo({
                url: '/pages/login/login'
              });
            } else if (res.data && res.data.message) {
              _that.showMsg(res.data.message);
            }
          }
        }
      });
    });
    return promise;
  },

  // ======本地存储======

  saveValue: function (key, value) {
    wx.setStorageSync(key, value);
  },

  getValue: function (key) {
    return wx.getStorageSync(key);
  },

  clearValue: function () {
    wx.clearStorageSync();
  },

  // ======提示框======
  showMsg: function (msg) {
    wx.showToast({
      title: msg,
      icon: 'none',
      duration: 2000
    })
  },


})