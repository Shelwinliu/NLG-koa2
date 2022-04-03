const fs = require('fs')

const categoryService = require('../service/category.service')
const fileService = require('../service/file.service')
const { CATEGORY_ICON_PATH } = require('../constants/file-path')

class CategoryController {
  async create(ctx) {
    const { name } = ctx.request.body
    const result = await categoryService.create(name)
    ctx.body = result
  }

  async getList(ctx) {
    // console.log(ctx.request.body)
    const result = await categoryService.getList(ctx.request.body)
    ctx.body = result
  }

  async getIcon(ctx) {
    const { categoryId } = ctx.params
    const iconInfo = await fileService.getCategoryIconById(categoryId)

    // 提供图像信息
    ctx.response.set('content-type', iconInfo.mimetype)
    ctx.body = fs.createReadStream(`${CATEGORY_ICON_PATH}/${iconInfo.filename}`)
  }

  async updateCategoryInfo(ctx) {
    const { id } = ctx.params
    const updateInfo = ctx.request.body
    // console.log(id, updateInfo)
    const result = await categoryService.updateInfo(id, updateInfo)
    ctx.body = result
  }
}

module.exports = new CategoryController()
