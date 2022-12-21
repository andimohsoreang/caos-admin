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
    uuid: {
      type: DataTypes.STRING,
      defaultValue: DataTypes.UUIDV4,
      unique: true,
    },
    date: DataTypes.DATEONLY,
    bb: DataTypes.FLOAT,
    tb: DataTypes.FLOAT,
    bbu: DataTypes.STRING,
    zbbu: DataTypes.FLOAT,
    rekombbu: DataTypes.FLOAT,
    tbu: DataTypes.STRING,
    ztbu: DataTypes.FLOAT,
    rekomtbu: DataTypes.FLOAT,
    bbtb: DataTypes.STRING,
    zbbtb: DataTypes.FLOAT,
    rekombbtb: DataTypes.FLOAT,
    predict_proba: DataTypes.FLOAT,
    predict_result: DataTypes.FLOAT,
    predict_accuracy: DataTypes.FLOAT,
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