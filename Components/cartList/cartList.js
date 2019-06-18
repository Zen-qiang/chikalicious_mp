Component({

  /**
   * 组件的属性列表
   */
  properties: {
    cType:{
      type: String,
    },
    shopData: {
      type: Object,
      observer: function(newVal, oldVal) {}
    },
    index: {
      type: Number,
    }

  },

  /**
   * 组件的初始数据
   */
  data: {
    startX: 0, //开始坐标
    startY: 0,
    isTouchMove: false,
    isDelStatus: false,
    products: [{
      imgUrl: '',
      prodText: '',
      prodDetail: '',
      isCheck: false, // 是否选中状态
      isTouchMove: false, // 是否显示侧滑按钮
    }],

  },

  /**
   * 组件的方法列表
   */
  methods: {

    /**
     * 点击整行产品 选择框
     */
    cellSelected: function(e) {
      if (this.data.isTouchMove) {
        return;
      }
      let pdtId = e.currentTarget.dataset.pdtid;
      wx.navigateTo({
        url: `/pages/details/details?id=${pdtId}&type=${this.data.cType}`,
      });
      // click
    },

    /**
     * 删除事件
     */
    del: function(e) {
      var param = {
        index: this.data.index,
        prodID: this.data.shopData.productID,
      };
      this.triggerEvent('delete', param);
    },

    // ========================================================================

    //手指触摸动作开始 记录起点X坐标
    touchstart: function(e) {
      this.setData({
        startX: e.changedTouches[0].clientX,
        startY: e.changedTouches[0].clientY,
        isTouchMove: false
      })
    },

    //滑动事件处理
    touchmove: function(e) {
      var index = e.currentTarget.dataset.index; //当前索引
      var startX = this.data.startX; //开始X坐标
      var startY = this.data.startY; //开始Y坐标
      var touchMoveX = e.changedTouches[0].clientX; //滑动变化坐标
      var touchMoveY = e.changedTouches[0].clientY; //滑动变化坐标
      var angle = this.angle({
        X: startX,
        Y: startY
      }, {
        X: touchMoveX,
        Y: touchMoveY
      }); //获取滑动角度

      if (Math.abs(angle) > 30) return;
      let _isDelStatus = false;
      if (touchMoveX > startX) { // 右滑
        this.data.isTouchMove = false;
      } else { // 左滑
        this.data.isTouchMove = true;
      }
      console.log(this.data.isTouchMove);

      //更新数据
      this.setData({
        isTouchMove: this.data.isTouchMove
      });
    },

    /**
     * 计算滑动角度
     * @param {Object} start 起点坐标
     * @param {Object} end 终点坐标
     */
    angle: function(start, end) {
      var _X = end.X - start.X;
      var _Y = end.Y - start.Y;
      //返回角度 / Math.atan()返回数字的反正切值
      return 360 * Math.atan(_Y / _X) / (2 * Math.PI);
    },



  }
})