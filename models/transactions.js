'use strict';
const { description } = require('@hapi/joi/lib/types/alternatives');
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Transactions extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      
    }
  }
  Transactions.init({
    transactionId: DataTypes.UUID,
    walletId: DataTypes.INTEGER,
    type: DataTypes.INTEGER,
    amount: DataTypes.DOUBLE,
    balance: DataTypes.DOUBLE,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
    Description: DataTypes.TEXT,
  }, {
    sequelize,
    modelName: 'Transactions',
    tableName: 'Transactions',
  });
  return Transactions;
};