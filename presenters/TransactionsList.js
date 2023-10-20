const moment = require('moment');


class TransactionsPresenter {

    changeType(transactions){
        const transformedTransactions = transactions.map((transaction) => ({
            ...transaction.toJSON(),
            type: transaction.type === 1 ? 'credit' : 'debit',
            createdAt: moment(transaction.createdAt).format('MMMM do YYYY, h: mm:ss a'),
            updatedAt: moment(transaction.updatedAt).format('MMMM do YYYY, h: mm:ss a')
          }));

          return transformedTransactions;

    }
}

module.exports = TransactionsPresenter;