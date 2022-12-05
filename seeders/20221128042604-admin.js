'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    return queryInterface.bulkInsert('Users', [{
      uuid: '8ebe2db9-5ba5-445c-963b-adfe77ef29a1',
      name: 'Admin CAOS',
      email: 'admin@caos.com',
      role: 'admin',
      status: 'active',
      password: '$2a$10$VYCPVOtx5doufqJy4BZMz.KsO6Kqs9P6AtNqNZEk4/elra8SpvSby',
      createdAt: new Date(),
      updatedAt: new Date()
    }])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete('Users', null, {})
  }
};
