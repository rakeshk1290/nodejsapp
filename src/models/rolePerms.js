const { DataTypes } = require('sequelize')

module.exports = function (sequelize, Sequalize) {
  const rolePermsSchema = sequelize.define('rolePerms', {
    roleID: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: 'roles', // Can be both a string representing the table name or a Sequelize model
        key: 'id'
      }
    },
    permID: {
      type: DataTypes.STRING,
      allowNull: false,
      references:{
        model: 'permissions',
        key: 'id'
      }
    }
  })
  return rolePermsSchema
}
