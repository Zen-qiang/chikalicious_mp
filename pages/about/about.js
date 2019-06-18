// pages/about/about.js
var WxParse = require('../../libs/wxParse/wxParse.js');
import config from '../../utils/config.js';
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let type = options.type;
    if (!type) {
      type = 'ABOUT_US';
    }
    this.getWebContent(type);
  },
  getWebContent: function(type) {
    let that = this;
    var paramData = {
      url: config.webContentGet,
      params: {
        dataType: type
      }
    };
    app.nGet(paramData).then(ret => {
      if (ret.data) {
        if (ret.data.title) {
          wx.setNavigationBarTitle({
            title: ret.data.title,
          })
        }
        let webContent = ret.data.content ? ret.data.content : '';
        WxParse.wxParse('webContent', 'html', webContent, that, 0);
      }
    }, res => {});
  }
})