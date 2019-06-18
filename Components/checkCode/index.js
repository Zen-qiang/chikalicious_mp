// components/checkCode/index.js
let http = require('../../utils/util.js')
let interval = null
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    phone:{
      type:String
    },
    purpose:{
      type: String
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    showCountdown: '获取验证码', //验证码提示
    checkCode:"",
    checkcodeDisable:false,
    internet_id:'',
    countdown:120
  },

  /**
   * 组件的方法列表
   */
  methods: {
    //checkCode的双向绑定
    checkCodeInput(e){
      this.setData({
        checkCode: e.detail.value
      })
      this.triggerEvent('checkCodeInput', {checkCode: this.data.checkCode})
    },
    getCheckCode(){
      let regex = /^1([358][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8}$/
      if (!regex.test(this.properties.phone)) {
        wx.hideLoading()
        wx.showToast({
          title: '请输入有效的手机号',
          icon: 'none',
        });
        return
      }
      this.setData({ checkcodeDisable: true });
      let data = {
        mobile: this.properties.phone,
        purpose: this.properties.purpose
      };
      let configs = {
        method: 'POST',
        data: data,
        url: '/api/members/smscode/send_verify_code_mobile'
      };
      let _that = this
      wx.request({
        url: http.baseUrl + configs.url,
        data: configs.data,
        method: configs.method,
        header: {
          'content-type': configs.contentType ? configs.contentType : 'application/json' // 默认值
        },
        success: function (res) {
          if (!res.data.code || res.data.code === 200 || res.data.code === 100) {
            _that.setData({ internet_id: res.data.data['internet_id'] });
            wx.showToast({
              title: '验证码已发送',
              icon: 'none',
              duration: 2000
            });
            _that.getCountdown();
            //获取internet_id的方法
            _that.triggerEvent('getInternetId', {
              internet_id: _that.data.internet_id,
              checkCode: _that.data.checkCode
            });
          } else {
            _that.setData({ checkcodeDisable: false });
            wx.showToast({
              title: res.data.message,
              icon: 'none',
              duration: 3000
            });
          }
        }
      })
    },
    // 验证码倒计时
    getCountdown() {
      clearInterval(interval)
      interval = setInterval(() => {
        this.setData({ countdown: this.data.countdown - 1 });
        this.setData({ showCountdown: this.data.countdown + 's' });
        if (this.data.countdown < 0) {
          this.setData({ showCountdown: '获取验证码' });
          this.setData({ checkcodeDisable: false });
          this.setData({ countdown: 120 });
          clearInterval(interval);
        }
      }, 1000)
    },
    clearComponentInterval(){
      clearInterval(interval)
      this.setData({
        showCountdown: '获取验证码', //验证码提示
        checkcodeDisable: false,
        internet_id: '',
        countdown: 120
      })
    }
  }
})
