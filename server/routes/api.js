const express = require("express");
const Transaction = require("../model/transaction-model");
const transactionsUtil = require("../utilities/transactions-util");

const router = express.Router();

router.get("/transactions", function (req, res) {
  Transaction.find({})
    .then(function (transactions) {
      res.send(transactions);
    })
    .catch(function (error) {
      res.status(500).send({ message: "Internal Server Error" });
    });
});

router.get("/transactionsCategorySum", function (req, res) {  
  Transaction.aggregate([
    {
      $group: {
        _id: "$category",
        totalAmount: { $sum: "$amount" },
      },
    },
  ])
    .then(function (transactionsSum) {
      res.send(transactionsSum);
    })
    .catch(function (error) {
      res.status(500).send({ message: "Internal Server Error" });
    });
});

router.get("/balance", function (req, res) {
  Transaction.aggregate([
    {
      $group: {
        _id: null,
        balance: { $sum: "$amount" },
      },
    },
  ])
    .then(function (balance) {
      res.send(balance[0]);
    })
    .catch(function (error) {
      res.status(500).send({ message: "Internal Server Error" });
    });
});

router.post("/transaction", function (req, res) {
  let transactionData = req.body;
  let transactionSchema = transactionsUtil.getTransactionsSchema(transactionData);

  transactionSchema
    .save()
    .then((savedTransaction) => {
      res.status(201).send(savedTransaction);
    })
    .catch((error) => {
      res.status(400).send({ message: `Couldn't save ${transactionSchema.name}` });
    });
});

router.delete("/transaction/:id", function (req, res) {
  let id = req.params.id;

  Transaction.deleteOne({ _id: id })
    .then((deleted) => {
      if (deleted.deletedCount === 1) {
        res.send({ message: `Deleted from DB` });
      } else {
        res.status(400).send({ message: `Couldn't delete from DB` });
      }
    })
    .catch(function (error) {
      res.status(500).send({ message: "Internal Server Error" });
    });
});

module.exports = router;