// pages/updatePwd/updatePwd.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    telPhone: '',
    newPassword: '',
    newPwd: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      telPhone: options.telPhone
    });
  },
  bindNewPasswordInput(e) {
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
  bindNewPwdInput(e) {
    let value = e.detail.value;
    this.setData({
      newPwd: value
    });
  },
  confirmPwd: function () {
    let password = this.data.newPassword;
    let pwd = this.data.newPwd;
    if (password !== pwd) {
      this.setData({
        errorPwdMsg: '两次密码不一致！'
      });
      return false;
    } else {
      this.setData({
        errorPwdMsg: ''
      });
      return true;
    }
  },
  submit: function() {
    let truePassword = this.confirmPassword();
    let truePwd = this.confirmPwd();
    if (truePassword && truePwd) {
      // todo 修改密码(新旧密码比较)
      wx.showToast({
        title: '新密码设置成功！',
        icon: 'none',
        duration: 2000
      });
    }
  }
})