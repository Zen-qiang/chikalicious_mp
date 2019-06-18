// pages/contactsUpdate/contactsUpdate.js
import config from '../../utils/config.js';
const Check = require('../../utils/check.js');
const app = getApp();

Page({
  /**
   * 页面的初始数据
   */
  data: {
    consignee: "", // 联系人
    phone: "", // 手机号码
    province: "", // 省
    city: "", // 市
    district: "", // 区
    detail: "", // 详细地址
    full_address: "", // 全地址
    region: ['省', '市', '区'], // 
    isDefault: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var addressId = options.addressId;
    if (addressId && addressId.length > 0) { // 修改地址
      wx.setNavigationBarTitle({
        title: '编辑收货地址',
      });
      this.preparePageData(addressId);
    } else {
      wx.setNavigationBarTitle({
        title: '新增收货地址',
      });
    }
  },

  /** input 绑定事件 */
  inputChange: function(e) {
    switch (e.target.dataset.type) {
      case "01":
        this.setData({
          consignee: e.detail.value
        });
        break;
      case "02":
        this.setData({
          phone: e.detail.value
        });
        break;
      case "03":
        this.setData({
          detail: e.detail.value,
          full_address: this.data.province + this.data.city + this.data.district + e.detail.value, // 全地址
        });
        break;
    }
  },

  /**
   * Picker 绑定事件
   */
  bindRegionChange: function(e) {
    // console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      region: e.detail.value,
      province: e.detail.value[0], // 省
      city: e.detail.value[1], // 市
      district: e.detail.value[2], // 区
      full_address: e.detail.value.join('') + this.data.detail, // 全地址
    })
  },

  switchAction: function(e) {
    this.setData({
      isDefault: e.detail.value
    });
  },

  /** 加载数据 */
  preparePageData(addressId) {
    var data = {
      url: config.addressGet,
      params: {
        id: addressId,
      }
    };
    app.nGet(data).then(ret => {
      if (ret.data) {
        console.log(ret.data);
        this.setData({
          id: ret.data.id,
          consignee: ret.data.consigneeName,
          phone: ret.data.phoneNo,
          province: ret.data.province,
          city: ret.data.city,
          district: ret.data.county,
          detail: ret.data.address,
          region: [ret.data.province, ret.data.city, ret.data.county],
          isDefault: ret.data.default
        });
      }
    }, res => {});
  },

  /** 保存按钮事件 */
  addAddressAction: function() {
    // 校验
    if (!Check.isName(this.data.consignee, 20, "收货人姓名")) {
      return;
    } else if (!Check.isPhoneNo(this.data.phone, '手机号码')) {
      return;
    } else if (this.data.province.length == 0) {
      app.showMsg('选择省市区', 2);
      return;
    } else if (!Check.isAddress(this.data.detail, 50, '详细地址')) {
      return;
    }
    // 保存
    this.saveContactsData();
  },

  /** 保存数据 */
  saveContactsData() {
    var data = {
      url: config.addressCreate,
      params: {
        id: this.data.id || "",
        consigneeName: this.data.consignee,
        phoneNo: this.data.phone,
        province: this.data.province,
        city: this.data.city,
        county: this.data.district,
        address: this.data.detail,
        setDefault: this.data.isDefault,
      }
    };
    app.nPost(data).then(ret => { 
      wx.navigateBack({
        delta: 1,
      });
      app.showMsg('保存成功');
    }, res => {});
  },

})