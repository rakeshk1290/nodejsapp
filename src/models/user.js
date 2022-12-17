const { DataTypes } = require('sequelize')

const crypto = require('crypto')

const generateEncryptedPassword = (password, salt) => {
  console.log('password, salt', password, salt)
  return crypto.createHash('RSA-SHA256').update(password).update(salt).digest('hex')
}

const generateSalt = () => {
  return crypto.randomBytes(16).toString('base64')
}

module.exports = function (sequelize, Sequalize) {
  const UserSchema = sequelize.define(
    'users',
    {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        get() {
          return () => this.getDataValue('password')
        },
      },
      salt: {
        type: DataTypes.STRING,
        allowNull: false,
        set(value) {
          this.setDataValue('salt', generateSalt())
        },
      },
      role: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'Guest',
        // references: {
        //   model: 'roles',
        //   key: 'roleName',
        // },
      },
    },
    {
      hooks: {
        beforeCreate: (user, options) => {
          if (user.getDataValue('password')) {
            user.password = generateEncryptedPassword(user.getDataValue('password'), user.salt)
          }
        },
      },
    }
  )
  return UserSchema
}
