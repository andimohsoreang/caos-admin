"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Article extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Article.belongsTo(models.Category, {
        foreignKey: "categoryId",
      });

      Article.belongsTo(models.User, {
        foreignKey: "userId",
      });
    }
  }
  Article.init(
    {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        unique: true,
      },
      title: DataTypes.STRING,
      slug: DataTypes.STRING,
      category: DataTypes.STRING,
      image_name: DataTypes.STRING,
      url: DataTypes.STRING,
      body: DataTypes.TEXT("medium"),
      categoryId: DataTypes.INTEGER,
      userId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Article",
      // freezeTableName: true,
    }
  );
  return Article;
};
