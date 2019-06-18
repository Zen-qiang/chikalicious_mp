// 引入 定位SDK核心类
var QQMapWX = require('../libs/qqmap-wx-jssdk.js');
var qqmapsdk;

/**
 * 初始化地图组件
 */
var initMap = function () {
  console.log('初始化地图');
  // 实例化API核心类
  this.qqmapsdk = new QQMapWX({
    key: 'EKMBZ-2UW6V-4OGP4-ULKCT-4ZC57-WYF63'
  });
}

/**
 * 获取定位城市的 code 和 name 
 * 定位 gcj02坐标，获取当前 位置信息 中文
 */
var getAddress = function (scback, fcback) {
  this.qqmapsdk.reverseGeocoder({
    success: (res) => {
      var city_code = res.result.ad_info.city_code;
      // !!! 截取 cityCode 
      city_code = city_code.substr(3,6);
      var ret = {
        status: res.status,
        result: {
          city: res.result.ad_info.city, // 市
          city_code: city_code // 区
        }
      }
      scback(ret);
    },
    fail: fcback
  });
}

/**
 * 获取城市列表
 */
var getCity = function (scback, fcback, ccback) {
  this.qqmapsdk.getCityList({
    success: scback,
    fail: fcback,
    complete: ccback
  });
}

/**
 * 根据城市ID 获取该城市的区县
 */
var getDistrict = function (id, scback, fcback, ccback) {
  this.qqmapsdk.getDistrictByCityId({
    id: id, // 对应城市ID
    success: scback,
    fail: fcback,
    complete: ccback
  });
}

/**
 * 定位 wgs84，获取当前位置信息
 */
var getGPS_wgs84 = function (scback, fcback, ccback) {
  wx.getLocation({
    type: 'wgs84',
    altitude: false,
    success: scback,
    fail: fcback,
    complete: ccback,
  })
}

/**
 * 定位 gcj02，获取当前位置信息
 */
var getGPS_gcj02 = function (scback, fcback, ccback) {
  wx.getLocation({
    type: 'gcj02',
    altitude: false,
    success: scback,
    fail: fcback,
    complete: ccback,
  })
}

module.exports = {
  initMap,
  getAddress,
  getCity,
  getDistrict,
  getGPS_wgs84,
  getGPS_gcj02,
}