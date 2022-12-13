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
      // models.Category.hasMany(Article)
      // Article.belongsTo(models.Category);
      // Article.hasOne(models.Category);
      // Article.belongsTo(models.Category);
      // models.Category.hasMany(Article);
      // define association here
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
      body: DataTypes.TEXT,
      id_user: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Article",
    }
  );
  return Article;
};
