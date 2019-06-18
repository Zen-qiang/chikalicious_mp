import config from '../../utils/config.js'
var WxParse = require('../../libs/wxParse/wxParse.js');
const app = getApp();

Page({
  /**
   * 页面的初始数据
   */
  data: {

    headerData: { // 头部状态条
      iconUrl: '',
      isLogin: false,
      location: '--',
      userName: '--',
    },
    pdtId: '',
    type: '',
    pdtInfo: {
      imgList: [],
      title: '',
      price: '',
      presetTime: '',
      presetTimeDesc: '',
    },
    indicatorDots: false,
    autoplay: true,
    interval: 5000,
    duration: 1000
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let pdtId = options.id;
    let type = options.type;
    this.setData({
      pdtId: pdtId,
      type: type
    });
    this.getDetails();
  },

  onShow: function () {
    let isLogin = false;
    var cityName = app.getValue('cityName');
    if (app.isLogin()) {
      isLogin = true;
    } else {
      isLogin = false;
    }
    this.setData({
      headerData: {
        iconUrl: app.globalData.userInfo.avatarUrl || '/images/h_icon1.png',
        isLogin: isLogin,
        location: cityName,
        userName: app.globalData.userInfo.nickName || '',
      }
    });
  },

  getDetails() {
    var data = {
      url: config.productInfoG,
      params: {
        id: this.data.pdtId,
        type: this.data.type
      }
    }
    let that = this;
    app.nGet(data).then(data => {
      if (data.data) {
        this.setData({
          pdtInfo: data.data,
        });
        let webContent = data.data.content ? data.data.content : '';
        WxParse.wxParse('webContent', 'html', webContent, that, 0);
      }
    }, res => {});
  },

  // 跳转登录页面
  login() {
    wx.navigateTo({
      url: '/pages/login/login'
    });
  },

  /** 收藏、取消收藏 */
  changeFav: function (e) {
    let pdtId = this.data.pdtInfo.id;
    let isFav = this.data.pdtInfo.isFav;
    this.setData({
      ['pdtInfo.isFav']: isFav ? 0 : 1
    });
    // toDo 收藏商品
    var data = {
      url: config.productFavoriteP,
      params: {
        pdtId: pdtId,
        isFav: isFav ? 0 : 1
      }
    }
    app.nPost(data).then(data => {
      if (isFav) {
        app.showMsg('取消收藏');
      } else {
        app.showMsg('已收藏');
      }
    }, res => {});
  },

  order() {
    if (!this.data.pdtInfo.canPurchase){
      return;
    }

    if (!app.isLogin()) {
      wx.navigateTo({
        url: `/pages/login/login`,
      })
    } else {
      if (this.data.type == 'CAKE') {
        wx.navigateTo({
          url: `/pages/buyNow/buyNow?id=${this.data.pdtId}&type=${this.data.type}`,
        })
      } else {
        wx.navigateTo({
          url: `/pages/buyNowSnack/buyNowSnack?id=${this.data.pdtId}&type=${this.data.type}`,
        })
      }
    }
  }
})