const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const transactionSchema = new Schema({
  amount : Number,
  category : { type: String, required: true },
  vendor : String,
});

const Transaction = mongoose.model("Transaction", transactionSchema);
module.exports = Transaction;