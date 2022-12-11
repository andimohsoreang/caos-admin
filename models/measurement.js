'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Measurement extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Measurement.belongsTo(models.Toddler, {
        foreignKey: 'id_toddler'
      })
    }
  }
  Measurement.init({
    uuid: DataTypes.STRING,
    date: DataTypes.DATE,
    bb: DataTypes.FLOAT,
    tb: DataTypes.FLOAT,
    bbu: DataTypes.STRING,
    tbu: DataTypes.STRING,
    bbtb: DataTypes.STRING,
    lila: DataTypes.FLOAT,
    lika: DataTypes.FLOAT,
    peb: DataTypes.STRING,
    method: DataTypes.STRING,
    vitamin: DataTypes.STRING,
    current_age: DataTypes.INTEGER,
    id_toddler: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Measurement',
  });
  return Measurement;
};