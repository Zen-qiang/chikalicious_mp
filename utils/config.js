
var root = '';
// root = 'https://sit.dingliantech.com/api'; // dev环境
root = 'https://mp.chikalicious.cn/api';
// root = 'http://bobo.easy.echosite.cn/api';
// 

var Config = {
  'loginP': `${root}` + '/user/userLogin', // 登录
  'sendCodeG': `${root}` + '/user/sendCode', // 发送验证码
  'getListG': `${root}` + '/list/getList', // 通用列表
  'recommendProductList': `${root}/product/recommendProductList`, // 新品推荐或人气爆款
  'queryOpenUpRegion': `${root}/shop/queryOpenUpRegion`, // 定位·城市列表
  // 订单相关
  'orderListG': `${root}` + '/order/orderList', // 订单列表
  'orderDetailsG': `${root}` + '/order/orderDetails', // 订单详情
  'submitOrderP': `${root}` + '/order/submitOrder', // 立即购买 支付按钮
  'confirmReceiptP': `${root}` + '/order/confirmReceipt', // 确认收货
  'deleteOrderG': `${root}` + '/order/deleteOrder', // 删除订单
  'returnparam': `${root}/order/returnparam`, // 立即支付
  // 用户相关
  'shopListG': `${root}` + '/shop/shopList', // 门店列表
  'addConsigneeP': `${root}` + '/user/addConsignee', // 新增收货人信息
  'chooseDefaultConsigneeP': `${root}` + '/user/chooseDefaultConsignee', // 设置默认 收货人信息
  'deleteConsigneeG': `${root}` + '/user/deleteConsignee', // 删除收货人信息
  'consigneeListG': `${root}` + '/user/consigneeList', // 收货人信息列表
  // 商品相关
  'indexCarouselG': `${root}` + '/product/indexCarousel', // 首页轮播 幻灯片
  'productCategoryListG': `${root}` + '/product/productCategoryList', // 全部分类tab
  'productListG': `${root}` + '/product/productList', // 商品列表
  'productInfoG': `${root}` + '/product/productInfo', // 商品详情
  'productOrderDetailsG': `${root}` + '/product/productOrderDetails', // 立即购买 查询数据
  'favoriteListG': `${root}` + '/product/favoriteList', // 收藏列表
  'productFavoriteP': `${root}` + '/product/productFavorite', // 收藏/取消收藏
  'deleteFavoriteProductP': `${root}` + '/product/deleteFavoriteProduct', // 取消收藏
  // 收货地址相关
  addressList: `${root}/user/consigneeList`, // 获取地址列表
  addressDelete: `${root}/user/deleteConsignee`, // 地址删除
  addressCreate: `${root}/user/saveConsignee`, // 地址修改|保存
  addressDefault: `${root}/user/chooseDefaultConsignee`, // 设置默认收货地址
  'addressGet': `${root}` + '/user/queryConsignee', // 收货人详情
  // 获取网页内容（帮助中心/关于我们）
  'webContentGet': `${root}` + '/user/getWebContent',
  'queryUserAgreement': `${root}` + '/user/queryUserAgreement', // 
  'queryShopHours':`${root}/shop/queryShopHours`
};

export default Config;