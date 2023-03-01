"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Toddlers", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      uuid: {
        type: Sequelize.STRING,
      },
      no_kk: {
        type: Sequelize.STRING,
      },
      nik: {
        type: Sequelize.STRING,
      },
      no_bpjs: {
        type: Sequelize.STRING,
      },
      name: {
        type: Sequelize.STRING,
      },
      jk: {
        type: Sequelize.STRING,
      },
      birth: {
        type: Sequelize.DATEONLY,
      },
      anak_ke: {
        type: Sequelize.STRING,
      },
      nik_ayah: {
        type: Sequelize.STRING,
      },
      nama_ayah: {
        type: Sequelize.STRING,
      },
      no_bpjs_ayah: {
        type: Sequelize.STRING,
      },
      nik_ibu: {
        type: Sequelize.STRING,
      },
      nama_ibu: {
        type: Sequelize.STRING,
      },
      no_bpjs_ibu: {
        type: Sequelize.STRING,
      },
      address: {
        type: Sequelize.TEXT,
      },
      prov: {
        type: Sequelize.STRING,
      },
      kab: {
        type: Sequelize.STRING,
      },
      kec: {
        type: Sequelize.STRING,
      },
      puskesmas: {
        type: Sequelize.STRING,
      },
      posyandu: {
        type: Sequelize.STRING,
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
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Toddlers");
  },
};
