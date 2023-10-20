const express = require('express');
const router = express.Router();
const {HomePage, SetUpaWallet, TransactionsLog, listTransactions, getWalletById} = require('../controllers/task');


router.get('/', HomePage );

router.post('/api/wallet', SetUpaWallet);

router.patch('/api/wallet/:walletid', TransactionsLog)
router.get('/api/wallet/:walletid', getWalletById);

router.get('/api/wallet/transaction/:walletid', listTransactions)

module.exports = router;