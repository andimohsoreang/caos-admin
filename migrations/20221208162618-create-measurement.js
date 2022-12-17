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
        type: Sequelize.DATEONLY
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
      zbbu: {
        type: Sequelize.FLOAT
      },
      tbu: {
        type: Sequelize.STRING
      },
      ztbu: {
        type: Sequelize.FLOAT
      },
      bbtb: {
        type: Sequelize.STRING
      },
      zbbtb: {
        type: Sequelize.FLOAT
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