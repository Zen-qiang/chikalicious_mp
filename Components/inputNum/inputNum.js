Component({
  /**
   * 组件的属性列表
   */
  properties: {
    maxNum: {
      type: Number
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    num: 1,
    disabledMinus: true,
    disabledPlus: false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    move: function () {
      console.log('move');
    },
    bindManual: function (e) {
      let num = e.detail.value;

      if (isNaN(num)) {
        num = 1;
      }
      // 将数值与状态写回
      let disabledMinus = true;
      let disabledPlus = false;
      if (num > 1) {
        disabledMinus = false;
      }
      if (this.data.maxNum && num >= this.data.maxNum) {
        disabledPlus = true;
      }
      this.setData({
        num: parseInt(num),
        disabledMinus: disabledMinus,
        disabledPlus: disabledPlus
      });
    },
    bindMinus: function () {
      var num = this.data.num;
      let disabledMinus = false;
      let disabledPlus = false;
      if (num > 1) {
        num--;
      }
      if (num === 1) {
        disabledMinus = true;
      }
      this.setData({
        num: num,
        disabledMinus: disabledMinus,
        disabledPlus: disabledPlus
      });
    },
    bindPlus: function () {
      var num = this.data.num;
      let disabledMinus = false;
      let disabledPlus = false;
      if (this.data.maxNum) {
        if (num < this.data.maxNum) {
          num++;
        }
      } else {
        num++;
      }
      if (this.data.maxNum && num === this.data.maxNum) {
        disabledPlus = true;
      }
      this.setData({
        num: num,
        disabledMinus: disabledMinus,
        disabledPlus: disabledPlus
      });
    }
  }
})