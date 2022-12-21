const { DataTypes } = require('sequelize')

module.exports = function (sequelize) {
  const permSchema = sequelize.define('permissions', {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    permName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    }
  })
  return permSchema
}
