// Components/product2/product2.js
import config from '../../utils/config.js'
const app = getApp();

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    pdtInfo: {
      type: Object,
      value: {},
    },

    type: {
      type: String,
      value: '',
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    item: {}
  },

  /**
   * 组件的方法列表
   */
  methods: {

    /**
     * 收藏／取消收藏
     */
    changeFav: function () {
      let pdtId = this.data.pdtInfo.id;
      let isFav = this.data.pdtInfo.isFav;
      this.setData({
        ['pdtInfo.isFav']: isFav ? 0 : 1
      });
      // toDo 收藏商品
      var data = {
        url: config.productFavoriteP,
        params: {
          pdtId: pdtId,
          isFav: isFav ? 0 : 1
        }
      }
      console.log(data);

      app.nPost(data).then(data => {
        if (isFav) {
          app.showMsg('取消收藏');
        } else {
          app.showMsg('已收藏');
        }
      }, res => { });
    },

    enterDetail: function(e) {
      let pdtid = this.data.pdtInfo.id;
      wx.navigateTo({
        url: `/pages/details/details?id=${pdtid}&type=${this.data.type}`,
      })
    },
  }
})