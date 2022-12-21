const { DataTypes } = require('sequelize')

const crypto = require('crypto')

const generateEncryptedPassword = (password, salt) => {
  return crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex')
}

const generateSalt = () => {
  return crypto.randomBytes(16).toString('base64')
}

module.exports = function (sequelize) {
  const UserSchema = sequelize.define(
    'users',
    {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        get () {
          return () => this.getDataValue('password')
        }
      },
      salt: {
        type: DataTypes.STRING,
        allowNull: false,
        set () {
          this.setDataValue('salt', generateSalt())
        }
      },
      role: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'Guest'
        // references: {
        //   model: 'roles',
        //   key: 'roleName',
        // },
      }
    },
    {
      hooks: {
        beforeCreate: (user) => {
          if (user.getDataValue('password')) {
            user.password = generateEncryptedPassword(user.getDataValue('password'), user.salt)
          }
        }
      }
    }
  )
  UserSchema.prototype.validPassword = (password, hash, salt) => {
    const hashResult = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex')
    return hashResult === hash
  }
  return UserSchema
}
