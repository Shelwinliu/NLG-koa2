const promisePool = require('../app/database')

class CategoryService {
  async create(name) {
    const statement = `INSERT INTO category (name) VALUES (?)`
    const [result] = await promisePool.execute(statement, [name])
    return result
  }

  async getList(queryInfo) {
    // console.log(queryInfo)
    const { offset, limit } = queryInfo
    const statement = `SELECT category.id, category.name, category.icon_url,
   JSON_ARRAYAGG(JSON_OBJECT('id', good.id, 'name', good.name, 'price', good.price, 
    'unit', good.unit, 'stock', good.stock, 'displayPicUrl', good.displayPicUrl)) goods
   FROM category LEFT JOIN good 
   ON good.category_id = category.id
   GROUP BY category.id LIMIT ? OFFSET ?`
    const [result] = await promisePool.execute(statement, [
      `${limit}`,
      `${offset}`
    ])
    return result
  }

  async updateIconById(iconUrl, categoryId) {
    const statement = `UPDATE category SET icon_url = ? WHERE id = ?;`
    const [result] = await promisePool.execute(statement, [iconUrl, categoryId])
    return result
  }

  async updateInfo(categoryId, updateInfo) {
    const { name } = updateInfo
    const statement = `UPDATE category SET name = ? WHERE id = ?;`
    const [result] = await promisePool.execute(statement, [name, categoryId])
    return result
  }
}

module.exports = new CategoryService()
