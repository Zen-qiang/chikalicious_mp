// pages/locate.js
var mapSDK = require('../../tools/location.js');
import config from '../../utils/config.js'
const app = getApp();

Page({
  /**
   * 页面的初始数据
   */
  data: {
    cityName: '',
    cityCode: "",
    cityList: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

    let cityName = app.getValue('cityName');
    let cityCode = app.getValue('cityCode');
    this.setData({
      cityName: cityName,
      cityCode: cityCode,
    });
    this.prepareData();

    // var that = this;
    // mapSDK.getAddress((sres) => {
    //   if (sres.status == 0) { // 获取成功
    //     that.setData({
    //       nowCity: sres.result.city,
    //       nowCityCode: sres.result.city_code,
    //     });
    //   }
    // }, (eres) => {});

  },

  prepareData: function() {
    //
    var data = {
      url: config.queryOpenUpRegion,
      params: {}
    }
    let that = this;
    app.nGet(data).then(res => {
      console.log(res.data.list);
      that.setData({
        cityList: res.data.list
      });
    }, res => {});
  },

  /**
   * 修改定位
   */
  changeLocation: function(e) {
    let city = e.currentTarget.dataset.city;
    let cityName = city.cityName;
    let cityCode = city.cityCode;
    app.saveValue('cityName', cityName);
    app.saveValue('cityCode', cityCode);
    wx.navigateBack();
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

})