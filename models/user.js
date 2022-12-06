'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      unique: true
    },
    name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: { msg: 'Name is required' },
        min: { args: 3, msg: 'Nama minimal 3 huruf' }
      }
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: { msg: 'Email is required' },
        isEmail: { msg: 'Must be a valid email' }
      },
      unique: true
    },
    role: {
      type: DataTypes.STRING,
      defaultValue: 'masyarakat'
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: 'active'
    },
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};