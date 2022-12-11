'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Measurements', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      uuid: {
        type: Sequelize.STRING
      },
      date: {
        type: Sequelize.DATE
      },
      bb: {
        type: Sequelize.FLOAT
      },
      tb: {
        type: Sequelize.FLOAT
      },
      bbu: {
        type: Sequelize.STRING
      },
      tbu: {
        type: Sequelize.STRING
      },
      bbtb: {
        type: Sequelize.STRING
      },
      lila: {
        type: Sequelize.FLOAT
      },
      lika: {
        type: Sequelize.FLOAT
      },
      peb: {
        type: Sequelize.STRING
      },
      method: {
        type: Sequelize.STRING
      },
      vitamin: {
        type: Sequelize.STRING
      },
      current_age: {
        type: Sequelize.INTEGER
      },
      id_toddler: {
        type: Sequelize.INTEGER
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
    await queryInterface.dropTable('Measurements');
  }
};