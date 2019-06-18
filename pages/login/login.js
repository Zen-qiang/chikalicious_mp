import config from '../../utils/config.js'
var app = getApp();
// pages/login/login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    errorPhoneMsg: '',
    errorPasswordMsg: '',
    telPhone: '',
    verCode: '',
    checkcodeDisable: false,
    verText: '获取验证码',
    countdown: 60,
    isAgree: false
  },
  bindPhoneInput: function(e) {
    let value = e.detail.value;
    this.setData({
      telPhone: value
    });
  },
  bindVerCode: function(e) {
    let value = e.detail.value;
    this.setData({
      verCode: value
    });
  },
  getVerCode: function() {
    let telPhone = this.data.telPhone;
    let regex = /^1\d{10}$/;
    if (!regex.test(telPhone)) {
      wx.showToast({
        title: '手机号不正确，请重新输入',
        icon: 'none',
        duration: 2000
      });
      return;
    } else {
      this.setData({
        checkcodeDisable: true
      });
      // 获取验证码
      var data = {
        url: config.sendCodeG,
        params: {
          phoneNo: telPhone
        }
      }
      var that = this;
      app.nGet(data).then(res => {
        // console.log(res.message);
        // app.showMsg(res.message);
        let interval = setInterval(() => {
          that.setData({
            countdown: that.data.countdown - 1
          });
          that.setData({
            verText: '重新发送（' + that.data.countdown + 's)'
          });
          if (that.data.countdown < 0) {
            that.setData({
              verText: '获取验证码'
            });
            that.setData({
              checkcodeDisable: false
            });
            that.setData({
              countdown: 60
            });
            clearInterval(interval);
          }
        }, 1000);
      }, res => {
        // console.log(res);
        app.showMsg(res.message);
      });
    }
  },
  bindAgreeChange: function(e) {
    this.setData({
      isAgree: !!e.detail.value.length
    });
  },

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
    this.getVerCode();
  },

  bindGetUserInfoLogin: function(e) {
    if (!e.detail.userInfo) {
      return;
    }
    // 保存信息至本地
    app.saveValue('user_avatarUrl', e.detail.userInfo.avatarUrl); // 头像
    app.saveValue('user_nickName', e.detail.userInfo.nickName); // 昵称
    app.globalData = e.detail;
    this.login();
  },

  login: function() {
    let telPhone = this.data.telPhone;
    let regex = /^1\d{10}$/;
    if (!regex.test(telPhone)) {
      this.setData({
        errorPhoneMsg: '请输入正确的手机号码！'
      })
      return;
    }
    if (!this.data.isAgree) {
      app.showMsg('请先同意协议！');
      return;
    }

    /** 开始登陆 */
    var encryptedData = app.globalData.encryptedData;
    var iv = app.globalData.iv;
    var rawData = app.globalData.rawData;
    var signature = app.globalData.signature;
    wx.login({
      success: res => {
        var data = {
          url: config.loginP,
          params: {
            phoneNo: this.data.telPhone,
            verify: this.data.verCode,
            code: res.code,
            encryptedData: encryptedData,
            iv: iv,
            rawData: rawData,
            signature: signature
          }
        }
        app.nPost(data).then(res => {
          // 登录成功，本地保存 sessionToken
          app.saveValue('sessionKey', res.data.sessionToken);
          wx.navigateBack();
          // toDo页面跳转
        }, res => {});
      }
    });
  },

  register: function() {
    wx.navigateTo({
      url: '/pages/register/register',
    })
  },

  historyBack: function() {
    wx.navigateTo({
      url: '/pages/passwordBack/passwordBack',
    })
  },

  xieyiAction: function() {
    wx.navigateTo({
      url: '/pages/xieyi/xieyi',
    })
  }
})