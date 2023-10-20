const {SetUpaWallet} = require('../controllers/task');
const Joi = require('@hapi/joi');
const {walletSchema} = require('../validators/schema');
const {Wallet} = require('../models');
const {transactionSchema} = require('../validators/schema');
const {TransactionsLog} = require('../controllers/task');

class Validate {
    validateWallet(name, balance) {
    

    let schema = walletSchema;
    //console.log(schema);
    return schema.validate({name, balance});
    //console.log(error, value);
    //return error, value;
  }

  async validateTransaction(wid, amount, Description) {
    const wallet = await Wallet.findByPk(wid);
    console.log(wallet);
    if (!wallet) {
      //const message = "ENTER VALID WALLET ID";
      
      return false;
    } 
    else {
      
      let schema = this.validateTransactionSchema();
      const { error, value } = schema.validate({amount, Description});
      if (error) {
        console.log(error);
        return false;
      }
      return true;
    }
  }
  validateWalletSchema() {
    return walletSchema;
  }

  validateTransactionSchema() {
    return transactionSchema;
  }
}
module.exports = Validate;