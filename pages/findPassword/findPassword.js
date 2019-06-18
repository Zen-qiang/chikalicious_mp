// pages/updatePassword/updatePassword.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    telPhone: '',
    historyReceiver: '',
    newPassword: '',
    errorReceiverMsg: '',
    errorPasswordMsg: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      telPhone: options.telPhone
    });
  },
  bindHistoryReceiverInput (e) {
    let value = e.detail.value;
    this.setData({
      historyReceiver: value
    });
  },
  bindNewPasswordInput (e) {
    let value = e.detail.value;
    this.setData({
      newPassword: value
    });
  },
  confirmPassword: function () {
    let password = this.data.newPassword;
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
  sumbit () {
    if (!this.data.historyReceiver) {
      this.setData({
        errorReceiverMsg: "请填写历史收件人！"
      });
      return;
    } else {
      this.setData({
        errorReceiverMsg: ""
      });
    }
    let turePassword = this.confirmPassword();
    if (turePassword) {
      // todo 新密码旧密码比较
      wx.showToast({
        title: '新密码设置成功！',
        icon: 'none',
        duration: 2000
      });
    }
    
  },
  callTel: function (e) {
    let number = e.target.dataset.number;
    wx.makePhoneCall({
      phoneNumber: number
    });
  }
})