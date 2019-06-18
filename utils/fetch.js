var baseUrl = 'https://sit.dingliantech.com/api';

function fetchData(configs) {
  let sessionKey = wx.getStorageSync('sessionKey');
  let cityId = wx.getStorageSync('cityId');
  let promise = new Promise(function (resolve, reject) {
    wx.request({
      url: baseUrl + configs.url,
      data: configs.data,
      method: configs.method ? configs.method : 'GET',
      header: {
        'content-type': configs.contentType ? configs.contentType : 'application/x-www-form-urlencoded',
        'session-key': sessionKey ? sessionKey : '', // session-key 用户token
        'city': cityId ? cityId : '', // 当前定位城市Id
      },
      dataType: 'json',
      success: function (res) {
        if (!res.data.code || res.data.code === 666) {
          resolve(res.data.data);
        } else {
          reject(res.data);
        }
      },
      fail: function (res) {
        wx.showToast({
          title: '网络很傲娇，请稍后再试!',
          icon: 'none',
          duration: 2000
        });
        reject(res);
      }
    })
  });
  return promise;
};
function getOpenId(code) {
  var that = this;
  wx.request({
    url: "https://api.weixin.qq.com/sns/jscode2session?appid=wx7e98237a4154ffc7&secret=207e4a613c09b2f8648e7b477756c567&js_code=" + code + "&grant_type=authorization_code",
    data: {},
    method: 'GET',
    success: function (res) {
      let openId=res.data.openId;
      return openId;
    },
    fail: function () {
      // fail
    },
    complete: function () {
      // complete
    }
  })
};

/*获取当前页url*/
function getCurrentPageUrl() {
  var pages = getCurrentPages()    //获取加载的页面
  var currentPage = pages[pages.length - 1]    //获取当前页面的对象
  var url = currentPage.route    //当前页面url
  return url
}
/*获取上一页url*/
function getPrevPageUrl() {
  var prevPageUrl = wx.getStorageSync('prevPageUrl');
  if (prevPageUrl){
    return prevPageUrl;
  }else{
    var prevPageUrl='';
    return prevPageUrl;
  }
}

module.exports.url = {
  baseUrl: baseUrl
};
module.exports.fetchData = fetchData;
module.exports.getOpenId = getOpenId;
module.exports.getCurrentPageUrl = getCurrentPageUrl;
module.exports.getPrevPageUrl = getPrevPageUrl;
