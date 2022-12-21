/* eslint-disable import/no-dynamic-require */
const fs = require('fs')
const path = require('path')
const Sequelize = require('sequelize')

const env = process.env.NODE_ENV || 'development'
const configPath = path.join(__dirname, '..', 'config', 'dbConfig.json')
const config = require(configPath)[env]
const sequelize = new Sequelize(config.database, config.username, config.password, config)

const db = {}

fs.readdirSync(__dirname)
  .filter(function (file) {
    return file.indexOf('.') !== 0 && file !== 'index.js'
  })
  .forEach(function (file) {
    // eslint-disable-next-line security/detect-non-literal-require, global-require
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes)
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
