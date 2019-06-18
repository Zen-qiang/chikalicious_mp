import config from '../../utils/config.js'
var app = getApp();

Page({

  /**
   * 页面的初始数据 
   */
  data: {
  },

  onLoad: function (e) {
    app.saveValue('sessionKey', '0c6acf86c5cbddbbfe0ba08e104d15979a1affdf'); // 城市
    /*
    */
  },

  register: function (e) {
    var data = {
      url: config.sendCodeG,
      params: {
        phoneNo: '17521017180'
      }
    }
    app.nGet(data).then(res => {
      console.log(res.message);
      app.showMsg(res.message);
    }, res => {
      console.log(res);
      app.showMsg(res.message);
    });
  },

  /**
   * 获取用户信息
   */
  onGotUserInfo: function (e) {

    var encryptedData = e.detail.encryptedData;
    var iv = e.detail.iv;
    var rawData = e.detail.rawData;
    var signature = e.detail.signature;
    wx.login({
      success: res => {
        var data = {
          url: config.loginP,
          params: {
            phoneNo: '17521017180',
            verify: '977375',
            code: res.code,
            encryptedData: encryptedData,
            iv: iv,
            rawData: rawData,
            signature: signature
          }
        }
        app.nPost(data).then(res => {
          // 登录成功，本地保存 sessionToken
          console.log(res);
        }, res => {
          console.log(res);
        });
      }
    });
    app.globalData.userInfo = e.detail.userInfo;

    // 保存信息至本地
    // app.saveValue('user_avatarUrl', e.detail.userInfo.avatarUrl); // 头像
    // app.saveValue('user_nickName', e.detail.userInfo.nickName); // 昵称
    // app.saveValue('user_country', e.detail.userInfo.country); // 国家
    // app.saveValue('user_province', e.detail.userInfo.province); // 省份
    // app.saveValue('user_city', e.detail.userInfo.city); // 城市
  }
})