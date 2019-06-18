// pages/updatePassword/updatePassword.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    telPhone: '',
    hidePhoneNum: '',
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
    this.setData({
      telPhone: options.telPhone,
      hidePhoneNum: options.telPhone.substr(0, 3) + '****' + options.telPhone.substr(-4, 4)
    });
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
  next: function() {
    let trueCode = this.confirmCode();
    if (trueCode) {
      wx.navigateTo({
        url: '/pages/updatePwd/updatePwd?telPhone=' + this.data.telPhone,
      })
    }
  }
})