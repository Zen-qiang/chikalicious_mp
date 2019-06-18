// pages/allProduct/allProduct.js
import allProduct from '../../mock/allProductMock.js'
const app = getApp();
import config from '../../utils/config.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    loading: true,
    tabList: [],
    selectedId: '',
    productList: [],
    pagination: {
      page: 1,
      size: 20,
      total: null,
      pages: null,
    },
    noData: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      noData: false
    });
    this.getTabList();
  },

  getTabList() {
    var data = {
      url: config.productCategoryListG,
      params: {
        type: 'CAKE'
      }
    }
    app.nGet(data).then(data => {
      wx.stopPullDownRefresh();
      if (data.data) {
        this.setData({
          tabList: data.data,
          selectedId: data.data[0].id
        });
        this.getPdtList();
      }
    }, res => {
      wx.stopPullDownRefresh();
      if (res.code == 1007) {
        this.setData({
          noData: true
        });
      }
    });
  },

  handleTabChange: function(e) {
    let tabId = e.currentTarget.dataset.type;
    this.setData({
      selectedId: tabId
    });
    this.setData({
      pagination: {
        page: 1,
        size: 4,
        total: null,
        pages: null,
      },
      productList: [],
      loading: true
    });
    this.getPdtList();
  },

  getPdtList() {
    var data = {
      url: config.productListG,
      params: {
        cateId: this.data.selectedId,
        type: 'CAKE',
        page: this.data.pagination.page,
        size: this.data.pagination.size
      }
    }
    app.nGet(data).then(data => {
      if (data.data) {
        let pdtList = this.data.productList.concat(data.data.list);
        this.setData({
          pagination: {
            page: data.data.page + 1,
            size: data.data.size,
            total: data.data.total,
            pages: data.data.pages
          },
          productList: pdtList,
          loading: (data.data.page + 1) < data.data.pages
        });
      }
    }, res => {

    });
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

  /**
   * 下拉刷新
   */
  onPullDownRefresh: function() {
    wx.stopPullDownRefresh();
  },

  //分享
  onShareAppMessage: (_title, _path) => {
    return {
      title: 'Chikalicious',
      path: '/pages/index/index',
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  },
  
})