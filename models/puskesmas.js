"use strict";
const { Model } = require("sequelize");
const posyandu = require("./posyandu");
module.exports = (sequelize, DataTypes) => {
  class Puskesmas extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Puskesmas.init(
    {
      uuid: {
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        unique: true,
      },
      nama: DataTypes.STRING,
      alamat: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Puskesmas",
    }
  );
  return Puskesmas;
};
