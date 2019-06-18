import cartMock from '../../mock/cartMock.js'
import config from '../../utils/config.js'
var app = getApp();

Page({
  data: {
    isLogin: true,
    list: [],
    cType: 'CAKE',
    pagination: {
      page: 1,
      size: 100,
      total: null,
      pages: null,
    },
    loading: false
  },

  onLoad: function() {},

  onShow: function() {
    if (app.isLogin()) { // 判断是否登录
      this.getCartList(1);
    } else {
      this.setData({
        isLogin: false
      });
    }
  },

  /**
   * 准备页面数据
   */
  prepareData: function() {
    this.getCartList(1);
  },

  /**
   * 点击分类
   */
  kindAction: function(e) {
    let cType = e.currentTarget.dataset.type;
    this.setData({
      cType: cType,
    });
    this.getCartList(1);
  },

  /**
   * 获取收藏列表
   */
  getCartList: function(_page) {
    var data = {
      url: config.favoriteListG,
      params: {
        type: this.data.cType,
        page: _page,
        size: this.data.pagination.size
      }
    }
    var _that = this;
    app.nGet(data).then(res => {
      if (res.data) {
        let list = [];
        if (_page == 1) {
          list = res.data.list;
        } else {
          list = _that.data.list.concat(res.data.list);
        }
        _that.setData({
          pagination: {
            page: res.data.page,
            size: res.data.size,
            total: res.data.total,
            pages: res.data.pages
          },
          list: list,
          loading: res.data.pages > res.data.page
        });
      }
    }, res => {});
  },

  /**
   * 上拉加载
   */
  onReachBottom() {
    console.log("上拉加载");
    if (this.data.pagination.page == this.data.pagination.pages) {
      return;
    }
    this.getCartList(this.data.pagination.page + 1);
  },

  /**
   * 点击收藏商品事件
   */
  clickAction: function(e) {
    console.log(e);
  },

  // 删除收藏商品按钮
  deleteAction: function(e) {
    var _that = this;
    var data = {
      url: config.productFavoriteP,
      params: {
        pdtId: e.detail.prodID,
        isFav: 0
      }
    }
    app.nPost(data).then(res => {
      app.showMsg('删除成功');
      var newList = _that.data.list;
      newList.splice(e.detail.index, 1);
      _that.setData({
        list: newList
      });
    }, res => {
      app.showMsg('删除失败');
    });
  },

  /**
   * 获取用户信息
   */
  bindGetUserInfo: function(e) {
    if (!e.detail.userInfo) {
      return;
    }
    app.globalData = e.detail;
    wx.navigateTo({
      url: '/pages/register/register'
    });
    // 保存信息至本地
    app.saveValue('user_avatarUrl', e.detail.userInfo.avatarUrl); // 头像
    app.saveValue('user_nickName', e.detail.userInfo.nickName); // 昵称
    // app.saveValue('user_country', e.detail.userInfo.country); // 国家
    // app.saveValue('user_province', e.detail.userInfo.province); // 省份
    // app.saveValue('user_city', e.detail.userInfo.city); // 城市
  },

})