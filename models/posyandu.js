"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Posyandu extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Posyandu.belongsTo(models.Puskesmas, {
        foreignKey: "puskesmaId",
      });
    }
  }
  Posyandu.init(
    {
      uuid: {
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        unique: true,
      },
      nama: DataTypes.STRING,
      alamat: DataTypes.STRING,
      puskesmaId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Posyandus",
    }
  );
  return Posyandu;
};
