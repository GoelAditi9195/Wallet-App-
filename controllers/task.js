const router = require("../routes/task");
const { Wallet } = require("../models");
const { Transactions } = require("../models");
const Validate = require("../validators/tasks");
const { v4: uuidv4 } = require("uuid");
const Sequelize = require("sequelize");
const { message } = require("../validators/schema");
const TransactionsPresenter = require('../presenters/TransactionsList');
const WalletPresenter = require('../presenters/Wallet');

function HomePage(req, res, next) {
  res.status(200).send("Wallet App");
  next();
}

async function SetUpaWallet(req, res, next) {
  try {
    const { name, balance } = req.body;
    const validate = new Validate();
    const { error, value } = validate.validateWallet(name, balance);
    
    if (!error) {
      const existingWallet = await Wallet.findOne({
        where: { name },
      });
      if (existingWallet) {
        res
          .status(400)
          .json({
            message: `Error creating wallet -This name : ${existingWallet.name} already exists `,
          });
      } else {
        const wallets = await Wallet.bulkCreate([{ name, balance }]);
        const transactionId = uuidv4();
        await Transactions.bulkCreate([{
          transactionId,
          walletId: wallets[0].id,
          balance,
          Description : "Initial Setup",
        }])
        const requiredTrans = await Transactions.findOne({
          where: {
            Description: "Initial Setup",
            walletId : wallets[0].id,
          }
      })
        await requiredTrans.save();
        const walletpresenter = new WalletPresenter();
        const data = await walletpresenter.walletCreation(wallets);
         await res
          .status(201)
          .json({ message: "Wallet created successfully", data});
          console.log("wallet created successfully");
      }
    } else {
      res
        .status(400)
        .json({
          field: error.details[0].path,
          message: error.details[0].message,
        });
    }
  } catch (error) {
    console.error("Error creating wallet:", error);
    res.status(500).json({ message: "Internal server error" });
  }

  next();
}

async function TransactionsLog(req, res, body) {
  const wid = req.params.walletid;
  const { amount, Description } = req.body;
  console.log(wid);

  //console.log(wallet);
  //add validator here
  const validate = new Validate();
  const correct = await validate.validateTransaction(wid, amount, Description);
  console.log(correct);
  if (correct) {
    const wallet = await Wallet.findByPk(wid);
    const transactionId = uuidv4();
    let type = 0;
    if (amount > 0) {
      type = 1; //credit

      const transaction = await Transactions.bulkCreate([
        {
          transactionId,
          walletId: wallet.id,
          balance: wallet.balance + amount,
          type,
          amount,
          Description,
        },
      ]);
      wallet.balance += amount;
      await wallet.save();
      res.status(200).json({
        message: "Transaction added succesfully - Money credited ",
        transaction,
        
      });
    } else {
      type = 0; //debit
      const transaction = await Transactions.bulkCreate([
        {
          transactionId,
          walletId: wallet.id,
          balance: wallet.balance - amount,
          type,
          amount,
          Description,
        },
      ]);
      wallet.balance -= amount;
       await wallet.save();
      res.status(200).json({
        message: "Transaction added succesfully- Money debited",
        transaction,
      });
    }
  } else {
    res.status(400).json({ message: "Enter correct details" });
  }
  //next();
}

async function getWalletById(req,res,next){

const wid = req.params.walletid;
const wallet = await Wallet.findByPk(wid);
if(wallet){
res.status(200).json(wallet);}
res.status(400).json({message : "Enter correct wallet id"});
}

async function listTransactions(req, res, next) {
  const wid = req.params.walletid;
const limit = 2; 
 const {page=1} = req.query;
 const offset = (page-1) * limit;

  try {
    const transactions = await Transactions.findAll({
      where: { walletId: wid },
      offset: offset,
      limit: limit,
      order: [["createdAt", "DESC"]],
    });
    
    const presenter = new TransactionsPresenter();
    const transformedTransactions = presenter.changeType(transactions);
    res.status(200).json(transformedTransactions);
  } catch (error) {
    console.error("Error fetching transactions:", error);
    res.status(500).json({ message: "Internal server error" });
  }

  next();
}

module.exports = {
  HomePage,
  SetUpaWallet,
  TransactionsLog,
  getWalletById,
  listTransactions,
};
