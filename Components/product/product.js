import config from '../../utils/config.js'
const app = getApp();

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    item: {
      type: Object,
      value: {}
    }
  },

  /**
   * 组件的初始数据
   */
  data: {},

  /**
   * 组件的方法列表
   */
  methods: {
    
    /**
     * 收藏／取消收藏
     */
    changeFav: function(e) {
      let pdtId = this.data.item.id;
      let isFav = this.data.item.isFav;
      this.setData({
        ['item.isFav']: isFav ? 0 : 1
      });
      // toDo 收藏商品
      var data = {
        url: config.productFavoriteP,
        params: {
          pdtId: pdtId,
          isFav: isFav ? 0 : 1
        }
      }
      app.nPost(data).then(data => {
        if (isFav) {
          app.showMsg('取消收藏');
        } else {
          app.showMsg('已收藏');
        }
      }, res => {});
    },

    enterDetail: function() {
      let pdtid = this.data.item.id;
      wx.navigateTo({
        url: `/pages/details/details?id=${pdtid}&type=CAKE`,
      })
    }
  }
})