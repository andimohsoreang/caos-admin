'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class DatasetData extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  DatasetData.init({
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      unique: true
    },
    name: DataTypes.STRING,
    berat_badan: DataTypes.INTEGER,
    tinggi_badan: DataTypes.INTEGER,
    usia: DataTypes.INTEGER,
    label: DataTypes.INTEGER,
    akurasi: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'DatasetData',
  });
  return DatasetData;
};