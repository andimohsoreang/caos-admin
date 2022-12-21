'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('DatasetData', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      uuid: {
        type: Sequelize.STRING
      },
      name: {
        type: Sequelize.STRING
      },
      berat_badan: {
        type: Sequelize.INTEGER
      },
      tinggi_badan: {
        type: Sequelize.INTEGER
      },
      usia: {
        type: Sequelize.INTEGER
      },
      label: {
        type: Sequelize.STRING
      },
      akurasi: {
        type: Sequelize.FLOAT
      },
      proba: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('DatasetData');
  }
};