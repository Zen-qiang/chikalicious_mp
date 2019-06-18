Component({
  /**
   * 组件的属性列表
   */
  properties: {
    pdtlist: {
      type: Array,
      value: []
    },
    loading: { // 商品列表是否还可以加载
      type: Boolean
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    
  },
  created: function() {
    
  },
  /**
   * 组件的方法列表
   */
  methods: {
    changeFav: function () {
      let isFav = e.target.dataset.isFav;
      let item = {
        ...this.data.item,
        isFav: !isFav
      }
      this.setData({
        item: item
      });
      // toDo 收藏商品
    }
  }
})