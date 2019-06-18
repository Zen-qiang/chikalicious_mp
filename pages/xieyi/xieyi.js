// pages/xieyi/xieyi.js
var WxParse = require('../../libs/wxParse/wxParse.js');
import config from '../../utils/config.js';
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getWebContent();
  },

  getWebContent: function() {
    let that = this;
    var paramData = {
      url: config.queryUserAgreement,
      params: {}
    };
    app.nGet(paramData).then(ret => {
      if (ret.data) {
        if (ret.data.title) {
          wx.setNavigationBarTitle({
            title: ret.data.title,
          })
        }
        let webContent = ret.data.value ? ret.data.value : '';
        WxParse.wxParse('webContent', 'html', webContent, that, 0);
      }
    }, res => {});
  }
})