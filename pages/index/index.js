//index.js
import config from '../../utils/config.js'
const location = require('../../tools/location.js');
const app = getApp();

Page({
  data: {
    cityName: '',
    cityCode: '',
    carouselList: [], // 幻灯片
    pagination: {
      page: 1,
      size: 6,
      total: null,
      pages: null,
    },
    newProdList: [], // 新品列表
    pdtList: [], // 推荐商品列表
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    loading: true,
    noData: false,
    startTime: null,
    currentTime: null
  },

  onLoad: function() {
    // this.getCarouselList(); // 获取首页幻灯片
    let _that = this;
    location.getAddress((res) => {
      var oldCityName = app.getValue('cityName');
      var oldCityCode = app.getValue('cityCode');
      var newCityName = res.result.city;
      var newCityCode = res.result.city_code;
      if (!oldCityName || !oldCityCode) { // 没检测到位置信息
        app.saveValue('cityName', newCityName);
        app.saveValue('cityCode', newCityCode);
        _that.reloadData(newCityName, newCityCode);
      } else if (newCityCode !== oldCityCode) { // 检测到位置不一致，提示是否切换
        wx.showModal({
          title: '提示',
          content: '当前定位与上次定位不一致，是否切换',
          success: function(res) {
            if (res.confirm) { // 点击确定
              app.saveValue('cityName', newCityName);
              app.saveValue('cityCode', newCityCode);
              _that.reloadData(newCityName, newCityCode);
            } else if (res.cancel) {} // 点击取消
          }
        });
      }
    }, (fresp) => {
      console.log("定位失败");
    });
  },

  onShow: function() {
    let cityName = app.getValue('cityName');
    let cityCode = app.getValue('cityCode');
    // if (cityCode != this.data.cityCode) {
    //   this.reloadData(cityName, cityCode);
    // }
    this.reloadData(cityName, cityCode);
  },
  onTabItemTap(item) {
    const nowTime = Date.now()
    if (nowTime - this.data.startTime < 60 * 1000) return
    let cityName = app.getValue('cityName');
    let cityCode = app.getValue('cityCode');
    this.reloadData(cityName, cityCode);
  },
  prodAction: function(e) {
    let pdtid = e.currentTarget.dataset.prod.id;
    wx.navigateTo({
      url: `/pages/details/details?id=${pdtid}&type=CAKE`,
    })
  },
  formatDate (date) {
    let time = new Date(date),
      hour = time.getHours(),
      minute = time.getMinutes(),
      second = time.getSeconds()
    return hour + ":" + minute + ":" + second
  },
  reloadData: function(cityName, cityCode) {
    const dateNow = Date.now(),
      currentTime = this.formatDate(dateNow)
    this.setData({
      cityName: cityName,
      cityCode: cityCode,
      pagination: {
        page: 1,
        size: 6,
        total: null,
        pages: null,
      },
      // pdtList: [],
      noData: false,
      startTime: dateNow,
      currentTime: currentTime
    });
    this.getCarouselList(); // 首页幻灯片
    this.getNewProd(); // 新品推荐
    this.getPdtList(); // 获取首页商品列表
  },

  /** 获取首页幻灯片 */
  getCarouselList() {
    var data = {
      url: config.indexCarouselG,
      params: {}
    }
    app.nGet(data).then(data => {
      if (data.data && data.data.list) {
        this.setData({
          carouselList: data.data.list,
        });
      }
    }, res => {
      if (res.code == 1007) {
        this.setData({
          noData: true
        });
      }
    });
  },

  /** 新品推荐 */
  getNewProd() {
    var data = {
      url: config.recommendProductList,
      params: {
        type: '5',
        page: 1,
        size: 4
      }
    }
    app.nGet(data).then(data => {
      if (data.data) {
        this.setData({
          newProdList: data.data.list
        });
      }
    }, res => {
      if (res.code == 1007) {
        this.setData({
          noData: true
        });
      }
    });
  },

  /** 获取首页商品列表 */
  getPdtList() {
    var data = {
      url: config.recommendProductList,
      params: {
        type: '6',
        page: this.data.pagination.page,
        size: this.data.pagination.size
      }
    }
    app.nGet(data).then(data => {
      if (data.data) {
        let pdtList = data.data.page === 1 ? data.data.list : this.data.pdtList.push(...data.data.list)
        // let pdtList = this.data.pdtList.concat(data.data.list);
        this.setData({
          pagination: {
            page: data.data.page + 1,
            size: data.data.size,
            total: data.data.total,
            pages: data.data.pages
          },
          pdtList: pdtList,
          loading: (data.data.page + 1) < data.data.pages
        });
      }
    }, res => {
      if (res.code == 1007) {
        this.setData({
          noData: true
        });
      }
    });
  },

  jumpUrl(e) {
    let item = e.currentTarget.dataset.item;
    let target = item.target;
    if (item.type === 'href') {
      wx.navigateTo({
        url: '/pages/webView/webView?src=' + target,
      });
    } else if (item.type === 'pdt') {
      wx.navigateTo({
        url: '/pages/details/details?id=' + target,
      });
    } else if (item.type === 'news') {
      app.indexData = item;
      wx.navigateTo({
        url: '/pages/indexDetail/indexDetail',
      });
    }
  },

  /** 定位 */
  locateAction: function() {
    wx.navigateTo({
      url: `/pages/locate/locate`,
    });
  },

  onPullDownRefresh: function() {
    let cityName = app.getValue('cityName');
    let cityCode = app.getValue('cityCode');
    if (cityCode != this.data.cityCode) {
      this.reloadData(cityName, cityCode);
    }
    wx.stopPullDownRefresh();
  },

  onReachBottom() {
    var that = this;
    let currentPage = that.data.pagination.page;
    let pages = that.data.pagination.pages;
    if (Number(currentPage) > pages) {
      that.setData({
        loading: false
      });
      return;
    } else {
      this.getPdtList();
    }
  },

  //分享
  onShareAppMessage: (_title, _path) => {
    return {
      title: 'Chikalicious',
      path: '/pages/index/index',
      success: function(res) {
        // 转发成功
      },
      fail: function(res) {
        // 转发失败
      }
    }
  },
})