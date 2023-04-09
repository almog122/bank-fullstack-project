const Transaction = require("../model/transaction-model");

const getTransactionsSchema = function (transaction) {

  const transactionSchema = new Transaction({
    amount : transaction.amount,
    category : transaction.category,
    vendor : transaction.vendor,
  });

  return transactionSchema;
};

module.exports = { getTransactionsSchema };