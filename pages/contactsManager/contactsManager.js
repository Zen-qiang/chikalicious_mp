// pages/contactsManager/contactsManager.js
const app = getApp();
import config from '../../utils/config.js';

Page({
  /**
   * 页面的初始数据
   */
  data: {
    contactsData: [],
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    this.preparePageData();
  },

  //===============================

  /** 设置默认 */
  isDefaultAction: function(e) {
    var paramData = {
      url: config.addressDefault,
      params: {
        id: e.detail.id
      }
    };
    app.nPost(paramData).then(ret => {
      app.showMsg("设置成功");
      this.preparePageData();
    }, res => {});
  },

  /** 编辑 */
  editAction: function(e) {
    wx.navigateTo({
      url: '/pages/contactsUpdate/contactsUpdate?addressId=' + e.detail.id,
    });
  },

  /** 删除 */
  delAction: function(e) {
    // console.log(JSON.stringify(e.detail));
    var paramData = {
      url: config.addressDelete,
      params: {
        id: e.detail.id
      }
    };
    app.nGet(paramData).then(ret => {
      app.showMsg("删除成功");
      this.preparePageData();
    }, res => {});
  },

  /** 新增联系人 */
  addAddressAction: function() {
    wx.navigateTo({
      url: '/pages/contactsUpdate/contactsUpdate',
    });
  },

  //===============================

  /** 加载数据 */
  preparePageData() {
    var data = {
      url: config.addressList,
      params: {}
    };
    app.nGet(data).then(ret => {
      if (ret.data) {
        this.setData({
          contactsData: ret.data.list
        });
        // console.log(JSON.stringify(ret.data));
      }
    }, res => {
      // console.error(JSON.stringify(res));
    });
  },

})