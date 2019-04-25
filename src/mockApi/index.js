let Mock = require('mockjs')

let random = Mock.Random

// 获取商品列表
const goodsList = () => {
  let list = []
  for (let i = 0; i < random.integer(5, 16); i++) {
    let item = {
      productId: random.integer(10000000, 99999999),
      productName: random.csentence(3, 5),
      certificateId: random.integer(10000000, 99999999),
      productImg: random.image('120x120', random.color()),
      stor: random.integer(1, 1000),
      storeName: random.csentence(4, 8)
    }
    list.push(item)
  }
  return {
    resCode: '00100000',
    data: list,
    msg: ''
  }
}

Mock.mock('/stor/queryAll.htm', 'post', goodsList)