'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Transactions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        type: Sequelize.INTEGER
      },
      transactionId: {
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false,
},
      walletId: {
        type: Sequelize.INTEGER
        
      },
      type: {
        type: Sequelize.INTEGER
      },
      amount: {
        type: Sequelize.DOUBLE
      },
      balance: {
        type: Sequelize.DOUBLE
      },
      createdAt: {
        type: Sequelize.DATE
      },
      updatedAt: {
        type: Sequelize.DATE
      },
      
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Transactions');
  }
};