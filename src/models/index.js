const fs = require('fs')
const path = require('path')
const Sequelize = require('sequelize')

const env = process.env.NODE_ENV || 'development'
const configPath = path.join(__dirname, '..', 'config', 'dbConfig.json')
// eslint-disable-next-line
const config = require(configPath)[env]
const sequelize = new Sequelize(config.database, config.username, config.password, config)

const db = {}
const files = fs.readdirSync(__dirname).filter((file) => file.indexOf('.') !== 0 && file !== 'index.js')

files.forEach((file) => {
  const filePath = path.join(__dirname, file)
  // eslint-disable-next-line
  const model = file ? require(filePath)(sequelize) : ''
  db[model.name] = model
})

Object.keys(db).forEach(function (modelName) {
  if ('associate' in db[modelName]) {
    db[modelName].associate(db)
  }
})

db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports = db
