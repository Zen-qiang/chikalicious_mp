// pages/register/register.js
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
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  onUnload: function () {

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
      // todo: 获取验证码
      wx.showToast({
        title: '获取验证码成功！',
        icon: 'none',
        duration: 2000
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
        errorCodeMsg: '验证码有误，请重新输入！'
      });
      return false;
    } else {
      this.setData({
        errorCodeMsg: ''
      });
      return true;
    }
  },
  next: function () {
    let truePhone = this.confirmPhone();
    let trueCode = this.confirmCode();
    // todo 验证手机验证码是否正确 成功之后 走一下步修改密码
    if (truePhone && trueCode) {
      wx.navigateTo({
        url: '/pages/findPassword/findPassword?telPhone=' + this.data.telPhone
      })
    }
    return;

  },
  callTel: function(e) {
    let number = e.target.dataset.number;
    wx.makePhoneCall({
      phoneNumber: number
    });
  }
})