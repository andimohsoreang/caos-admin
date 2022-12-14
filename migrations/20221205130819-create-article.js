"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Articles", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      uuid: {
        type: Sequelize.STRING,
      },
      title: {
        type: Sequelize.STRING,
      },
      slug: {
        type: Sequelize.STRING,
      },
      category: {
        type: Sequelize.STRING,
      },
      id_category: {
        type: Sequelize.INTEGER,
      },
      image_name: {
        type: Sequelize.STRING,
      },
      body: {
        type: Sequelize.TEXT("long"),
      },
      id_user: {
        type: Sequelize.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryterface, Sequelize) {
    await queryInterface.dropTable("Articles");
  },
};
