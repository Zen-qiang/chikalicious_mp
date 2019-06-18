// pages/contactsChoose/contactsChoose.js
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
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    this.preparePageData();
  },

  // 选择联系人
  chooseContact: function(e) {
    var pages = getCurrentPages();
    var prevPage = pages[pages.length - 2] //上一个页面
    console.log(e.currentTarget.dataset.contact);
    prevPage.setData({
      name: e.currentTarget.dataset.contact.name,
      tell: e.currentTarget.dataset.contact.phoneNum,
      address: e.currentTarget.dataset.contact.fullAddress,
      addressID: e.currentTarget.dataset.contact.id
    })
    wx.navigateBack();
  },

  /** 新增联系人 */
  addAddressAction: function(e) {
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
      }
    }, res => {});
  },

})