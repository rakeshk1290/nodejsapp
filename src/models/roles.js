const { DataTypes } = require('sequelize')

module.exports = function (sequelize, Sequalize) {
  const roleSchema = sequelize.define('roles', {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    roleName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  })
  return roleSchema
}
