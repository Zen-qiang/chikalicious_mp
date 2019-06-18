import config from '../../utils/config.js'
var app = getApp();

Page({
  /**
   * 页面的初始数据
   */
  data: {
    completeRegister: false, // 是否完成注册
    countryCodes: ["+86", "+80", "+84", "+87"],
    countryCodeIndex: 0,
    telPhone: '',
    errorPhoneMsg: '',
    checkcodeDisable: false,
    showCountdown: '获取验证码',
    countdown: 60,
    venCode: '',
    errorCodeMsg: '',
    // password: '',
    // errorPasswordMsg: '',
    isAgree: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  },

  onUnload: function () {
    // if (!this.data.completeRegister) {
    //   wx.showModal({
    //     title: '',
    //     content: '点击‘返回‘将中断注册,是否返回？',
    //     confirmText: "是",
    //     cancelText: "否",
    //     success: function (res) {
    //       console.log(res);
    //       if (res.confirm) {
    //         console.log('用户点击主操作')
    //       } else {
    //         console.log('用户点击辅助操作')
    //       }
    //     }
    //   });
    // }

  },

  bindPhoneInput: function (e) {
    let value = e.detail.value;
    this.setData({
      telPhone: value
    });
  },

  bindCountryCodeChange: function (e) {
    this.setData({
      countryCodeIndex: e.detail.value
    })
  },

  confirmPhone: function () {
    let telPhone = this.data.telPhone;
    let regex = /^1\d{10}$/;
    if (!regex.test(telPhone)) {
      this.setData({
        errorPhoneMsg: '请输入正确的手机号码！'
      })
      return false;
    } else {
      this.setData({
        errorPhoneMsg: ''
      });
      return true;
    }
  },
  getVenCode: function () {
    let telPhone = this.data.telPhone;
    let regex = /^1\d{10}$/;
    if (regex.test(telPhone)) {
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
      app.nGet(data).then(res => {
        console.log(res.message);
        app.showMsg(res.message);
      }, res => {
        console.log(res);
        app.showMsg(res.message);
      });

      let interval = setInterval(() => {
        this.setData({ countdown: this.data.countdown - 1 });
        this.setData({ showCountdown: this.data.countdown + 's' });
        if (this.data.countdown < 0) {
          this.setData({ showCountdown: '获取验证码' });
          this.setData({ checkcodeDisable: false });
          this.setData({ countdown: 10 });
          clearInterval(interval);
        }
      }, 1000);
    } else {
      this.setData({
        errorPhoneMsg: '请输入正确的手机号码！'
      });
      return;
    }
  },
  bindCodeInput: function (e) {
    let value = e.detail.value;
    this.setData({
      venCode: value
    });
  },
  confirmCode: function () {
    let venCode = this.data.venCode;
    let regex = /^\d{6}$/;
    if (!regex.test(venCode)) {
      this.setData({
        errorCodeMsg: '请输入正确的验证码！'
      });
      return false;
    } else {
      this.setData({
        errorCodeMsg: ''
      });
      return true;
    }
  },
  bindPasswordInput: function (e) {
    let value = e.detail.value;
    this.setData({
      password: value
    });
  },
  confirmPassword: function () {
    let password = this.data.password;
    let regex = /^[0-9a-zA-Z!@#$%^&*]{6,12}$/;
    if (!regex.test(password)) {
      this.setData({
        errorPasswordMsg: '密码需8～20位含数字、字母、特殊字符！'
      });
      return false;
    } else {
      this.setData({
        errorPasswordMsg: ''
      });
      return true;
    }
  },
  bindAgreeChange: function (e) {
    this.setData({
      isAgree: !!e.detail.value.length
    });
  },
  register: function () {
    let truePhone = this.confirmPhone();
    let trueCode = this.confirmCode();
    // let truePassword = this.confirmPassword();
    if (truePhone && trueCode && this.data.isAgree) {
      this.completeRegister = true;
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
              verify: this.data.venCode,
              code: res.code,
              encryptedData: encryptedData,
              iv: iv,
              rawData: rawData,
              signature: signature
            }
          }
          app.nPost(data).then(res => {
            console.log('@@@@@' + JSON.stringify(res));
            // 登录成功，本地保存 sessionToken
            app.saveValue('sessionKey', res.data.sessionToken);
            wx.navigateBack();
            // toDo页面跳转
          }, res => {
            console.log(res);
          });
        }
      });
    }
  }
})