const express = require("express");
const Transaction = require("../model/transaction-model");
const transactionsUtil = require("../utilities/transactions-util");

const router = express.Router();

router.get("/transactions", function (req, res) {
  Transaction.find({})
    .then(function (transactions) {
      res.send(transactions);
    })
    .catch(function (err) {
      res.status(500).send({ message: "Internal Server Error" });
    });
});

router.get("/transactionsSum/:category", function (req, res) {
  let category = req.params.category;

  Transaction.aggregate([
    { $match: { category: category } },
    {
      $group: {
        _id: `total sum in ${category}`,
        total: { $sum: "$amount" },
      },
    },
  ])
    .then(function (transactionsSum) {
      res.send(transactionsSum);
    })
    .catch(function (err) {
      res.status(500).send({ message: "Internal Server Error" });
    });
});

router.post("/transactions", function (req, res) {
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

router.delete("/transactions/:id", function (req, res) {
  let id = req.params.id;

  Transaction.deleteOne({ _id: id })
    .then((deleted) => {
      if (deleted.deletedCount === 1) {
        res.send({ message: `Deleted from DB` });
      } else {
        res.status(400).send({ message: `Couldn't delete from DB` });
      }
    })
    .catch(function (err) {
      res.status(500).send({ message: "Internal Server Error" });
    });
});

module.exports = router;
