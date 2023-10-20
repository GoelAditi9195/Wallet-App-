'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.addConstraint('Transactions', {
      fields: ['walletId'],
      type: 'foreign key',
      name: 'fk_walletId', 
      references: {
        table: 'Wallets', 
        field: 'id', 
      },
      onDelete: 'CASCADE', 
      onUpdate: 'CASCADE', 
    });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
      
    await queryInterface.removeConstraint('Transactions', 'fk_walletId')
  }
};
