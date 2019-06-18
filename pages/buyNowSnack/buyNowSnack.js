// pages/buyNowSnack/buyNowSnack.js
// pages/buyNow/buyNow.js
import config from '../../utils/config.js'
const app = getApp();

Page({
  /**
   * 页面的初始数据
   */
  data: {
    pdtId: '',
    type: '',
    prodInfo: {}, // 接口返回信息
    name: '', // 联系人姓名
    tell: '', // 联系人电话
    address: '',
    addressID: '',
    specID: '', // 规格ID
    count: 1, // 数量
    isNeedBill: false, // 是否需要发票
    billHeader: "", // 发票抬头
    billNo: "", // 发票税号
    invoiceAddress: "", // 地址、电话（选填）
    invoiceBankAccount: "", // 开户行及账号（选填）
    msg: "", // 订单留言
    stepper: {
      min: 1,
      max: 9999
    },
    price: '', // 该规格单价
    orderPrice: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let pdtId = options.id;
    let cType = options.type;
    this.setData({
      pdtId: pdtId,
      type: cType
    });
    this.prepareData();
  },

  onShow: function() {

    if (app.globalData.contactInfo) {
      this.setData({
        name: app.globalData.contactInfo.name,
        tell: app.globalData.contactInfo.tell
      });
      app.globalData.contactInfo = null;
    }
    if (app.globalData.billInfo) {
      this.setData({
        isNeedBill: app.globalData.billInfo.isNeedBill, // 是否需要发票
        billHeader: app.globalData.billInfo.billHeader, // 发票抬头
        billNo: app.globalData.billInfo.billNo,
        invoiceAddress: app.globalData.billInfo.invoiceAddress, // 地址、电话（选填）
        invoiceBankAccount: app.globalData.billInfo.invoiceBankAccount, // 开户行及账号（选填）
      });
      app.globalData.billInfo = null;
    }
  },

  prepareData: function() {
    var paramData = {
      url: config.productOrderDetailsG,
      params: {
        pdtId: this.data.pdtId,
        type: this.data.type
      }
    }
    app.nGet(paramData).then(data => {
      if (data.data) {
        let consigneeName = "";
        let consigneePhoneNum = "";
        let consigneeAddress = "";
        if (data.data.consigneeMsg) {
          consigneeName = data.data.consigneeMsg.name ? data.data.consigneeMsg.name : "";
          consigneePhoneNum = data.data.consigneeMsg.phoneNum ? data.data.consigneeMsg.phoneNum : "";
          consigneeAddress = data.data.consigneeMsg.fullAddress ? data.data.consigneeMsg.fullAddress : "";
        }
        this.setData({
          prodInfo: data.data,
          name: consigneeName,
          tell: consigneePhoneNum,
          address: consigneeAddress,
        });
      }
    }, res => {});
  },

  /** 选择规格 */
  specAction: function(e) {
    let price = e.currentTarget.dataset.type.preferentialPrice;
    this.setData({
      price: price,
      specID: e.currentTarget.dataset.type.id,
      orderPrice: price * this.data.count,
    });
  },

  /**
   * 添加联系人
   */
  addcontact: function(e) {
    wx.navigateTo({
      url: '/pages/contactsChoose/contactsChoose'
    })
  },

  /**
   * 发票
   */
  invoiceAction: function() {
    let bill = '0';
    let billHeader = "";
    let billNo = "";
    let invoiceAddress = "";
    let invoiceBankAccount = "";
    if (this.data.isNeedBill) {
      bill = '1';
      billHeader = this.data.billHeader;
      billNo = this.data.billNo;
      invoiceAddress = this.data.invoiceAddress; // 地址、电话（选填）
      invoiceBankAccount = this.data.invoiceBankAccount; // 开户行及账号（选填）

    }
    wx.navigateTo({
      url: `/pages/buyNow/invoice/invoice?isNeedBill=${bill}&billHeader=${billHeader}&billNo=${billNo}&invoiceAddress=${invoiceAddress}&invoiceBankAccount=${invoiceBankAccount}`
    })
  },

  /**
   * 订单留言
   */
  textInputAction: function(e) {
    this.setData({
      msg: e.detail.value
    });
  },

  /**
   * 数量计步器
   */
  countStepperChange: function(e) {
    this.setData({
      orderPrice: this.data.price * e.detail,
      count: e.detail
    });
  },

  /**
   * 去付款
   */
  goPurchaseAction: function(e) {
    let prodData = this.data.prodInfo;

    if (!this.data.tell || this.data.tell == '') {
      app.showMsg('请补全联系人');
      return;
    } else if (!this.data.name || this.data.name == '') {
      app.showMsg('请补全联系人');
      return;
    } else if (!this.data.address || this.data.address == '') {
      app.showMsg('请补全联系人');
      return;
    } else if (!this.data.specID || this.data.specID == '') {
      app.showMsg('请选择商品规格');
      return;
    }
    wx.showLoading({
      title: '生成订单'
    })
    var data = {
      url: config.submitOrderP,
      params: {
        phoneNo: this.data.tell, // 是	string	收货人电话号码
        consignee: this.data.name, // 	是	string	收货人姓名
        address: this.data.address || '',
        pdtId: this.data.pdtId, // 	是	number	商品ID
        spec: this.data.specID, // 	是	number	规格id
        number: this.data.count, // 	是	number	数量
        needInvoice: this.data.isNeedBill, // 	是	boolean	是否需要发票
        invoiceTitle: this.data.billHeader, // 	是	string	发票抬头
        invoiceNo: this.data.billNo, // 	是	string	发票税号
        invoiceAddress: this.data.invoiceAddress, // 地址、电话（选填）
        invoiceBankAccount: this.data.invoiceBankAccount, // 开户行及账号（选填）
        note: this.data.msg, // 	是	string	订单留言
        type: 'SNACK', // this.data.type	是	String	商品类型 CAKE/SNACK
      }
    }
    let that = this;
    app.nPost(data).then(res => {
      if (res.code == 666) {
        that.purchase(res);
        // app.showMsg("下单成功");
      } else {
        wx.hideLoading()
      }
    }, res => {
      wx.hideLoading()
    });
  },

  purchase: function(data) {
    // app.showMsg("敬请期待！");
    let orderID = data.data.orderId;
    // step1 先调用支付接口，获取支付信息
    var params = {
      url: config.returnparam,
      params: {
        goodsid: orderID,
        title: "",
      }
    }
    let that = this;
    app.nPost(params).then(res => {
      wx.hideLoading();
      if (res.code == 666) {
        // step2 调用微信支付模块
        wx.requestPayment({
          timeStamp: res.data.timeStamp,
          nonceStr: res.data.nonceStr,
          package: res.data.package,
          signType: res.data.signType,
          paySign: res.data.paySign,
          success(res) {
            wx.redirectTo({
              url: `/pages/order/orderDetail/orderDetail?orderID=${orderID}`
            });
            app.navPage.order = true;
          },
          fail(res) {}
        });
      }
    }, res => {
      wx.hideLoading()
      app.showMsg(res.message);
    });
  }

})