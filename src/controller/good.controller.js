const fs = require('fs')

const goodService = require('../service/good.service')
const fileService = require('../service/file.service')
const {
  TEST_PATH,
  DISPLAY_PIC_PATH,
  DETAIL_PIC_PATH
} = require('../constants/file-path')

class GoodController {
  async create(ctx) {
    const result = await goodService.create(ctx.request.body)
    ctx.body = result
  }

  async getGoodList(ctx) {
    const result = await goodService.getGoodList()
    ctx.body = result
  }

  async getDisplayPicByGoodId(ctx) {
    const { goodId } = ctx.params
    const [picInfo] = await fileService.getGoodPicById('display_pic', goodId)
    console.log(picInfo)

    // 提供图像信息
    ctx.response.set('content-type', picInfo.mimetype)
    ctx.body = fs.createReadStream(`${DISPLAY_PIC_PATH}/${picInfo.filename}`)
  }

  async getDetailPicByGoodId(ctx) {
    const { goodId } = ctx.params
    // 获取该商品下的所有详情图
    const picInfo = await fileService.getGoodPicById('detail_pic', goodId)
    console.log(picInfo)
    // 获取第一个数组元素，后面的一样
    const { good_id, mimetype } = picInfo[0]

    // 获取该商品下单一详情图
    const { filename } = ctx.query
    // params 上的商品 id 要和数据库中的一致
    if (typeof filename === 'string' && goodId == good_id) {
      // 提供图像信息
      ctx.response.set('content-type', mimetype)
      return (ctx.body = fs.createReadStream(`${DETAIL_PIC_PATH}/${filename}`))
    }
    // 展示该商品所有详情图
    ctx.body = picInfo
  }

  async getGoodByKeyword(ctx) {
    const { keyword } = ctx.request.query
    const result = await goodService.getGoodsByKeyword(keyword)
    ctx.body = result
  }
}

module.exports = new GoodController()
