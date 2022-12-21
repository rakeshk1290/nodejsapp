const { DataTypes } = require('sequelize')

module.exports = function (sequelize, Sequalize) {
  const rolePermsSchema = sequelize.define('rolePerms', {
    userID: {
      type: DataTypes.NUMBER,
      allowNull: false,
      references: {
        model: 'users', // Can be both a string representing the table name or a Sequelize model
        key: 'id',
      },
    },
    roleID: {
      type: DataTypes.NUMBER,
      allowNull: false,
      references: {
        model: 'roles',
        key: 'id',
      },
    },
  })
  return rolePermsSchema
}
