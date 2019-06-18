let indexMock = {
  carouselList: [
    {
      id: '1',
      type: 'pdt',
      target: '1',
      imgUrl: 'https://cdnimg.ocj.com.cn/item_images/item/15/22/6777/15226777L.jpg'
    },
    {
      id: '2',
      type: 'href',
      target: 'https://www.baidu.com',
      imgUrl: 'https://cdnimg.ocj.com.cn/item_images/item/15/23/1096/15231096L.jpg'
    }
  ],
  pdtList: {
    page: 2, // 当前页
    size: 5, // 页面数量
    total: 10, // 列表总数量
    pages: 2, //列表总页数
    list: [
      {
        id: 0,
        title: '仙境提拉米苏', //标题
        desc: '冰淇淋、蛋糕、奶油 清凉一整个夏天', // 描述
        price: '234', //价格
        originalPrice: '666',//原始价格
        isFav: true,//是否收藏
        imgUrl: 'https://cdnimg.ocj.com.cn/item_images/item/15/22/6777/15226777L.jpg'//商品图片
      },
      {
        id: 1,
        title: '仙境提拉米苏1', //标题
        desc: '冰淇淋、蛋糕、奶油 清凉一整个夏天', // 描述
        price: '134', //价格
        originalPrice: '666',//原始价格
        isFav: false,//是否收藏
        imgUrl: 'https://cdnimg.ocj.com.cn/item_images/item/15/23/1096/15231096L.jpg'//商品图片
      },
      {
        id: 2,
        title: '仙境提拉米苏2', //标题
        desc: '冰淇淋、蛋糕、奶油 清凉一整个夏天', // 描述
        price: '134', //价格
        originalPrice: '666',//原始价格
        isFav: false,//是否收藏
        imgUrl: 'https://cdnimg.ocj.com.cn/item_images/item/15/23/1096/15231096L.jpg'//商品图片
      },
      {
        id: 3,
        title: '仙境提拉米苏3', //标题
        desc: '冰淇淋、蛋糕、奶油 清凉一整个夏天', // 描述
        price: '134', //价格
        originalPrice: '666',//原始价格
        isFav: false,//是否收藏
        imgUrl: 'https://cdnimg.ocj.com.cn/item_images/item/15/23/1096/15231096L.jpg'//商品图片
      },
      {
        id: 4,
        title: '仙境提拉米苏4', //标题
        desc: '冰淇淋、蛋糕、奶油 清凉一整个夏天', // 描述
        price: '134', //价格
        originalPrice: '666',//原始价格
        isFav: true,//是否收藏
        imgUrl: 'https://cdnimg.ocj.com.cn/item_images/item/15/23/1096/15231096L.jpg'//商品图片
      }
    ]
  }
}

export default indexMock;