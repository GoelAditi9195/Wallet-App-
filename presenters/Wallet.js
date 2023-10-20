const moment = require('moment');
const {Transactions} = require('../models');
const Sequelize = require('sequelize');
class WalletPresenter {
  
   async walletCreation(wallets){
    const transaction = await Transactions.findOne({
        where: {
          Description: "Initial Setup",
          walletId: wallets[0].id,
        },
      });
      //console.log(transaction);
      const updatedWallets =  wallets.map( (obj)=>{
         if(transaction){
                   return {...obj.toJSON(),
                    balance: obj.balance.toFixed(4),
                 transactionid: transaction.transactionId,
                 createdAt: moment(obj.createdAt).format('MMMM do YYYY, h: mm:ss a'),
                  updatedAt: moment(obj.updatedAt).format('MMMM do YYYY, h: mm:ss a')
                }

              }

        })
        console.log(updatedWallets);
       
      return updatedWallets;
    }



}

module.exports = WalletPresenter;