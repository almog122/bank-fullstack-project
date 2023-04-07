import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Transactions.css";
import Transaction from "./Transaction";
import CONSTANTS from "../../Constants.json";

export default function Transactions({updateBalance}) {
  const [transactions, setTransactions] = useState([]);
  const [deletedTransactionId, setDeletedTransactionId] = useState(0);

  async function getTransactions() {
    return axios
      .get(CONSTANTS.GET_TRANSACTIONS)
      .then(function (transactions) {
        return transactions.data;
      })
      .catch(function (error) {
        console.log(error.message);
      });
  }

  useEffect(() => {
    const getTransactionsData = async function () {
      let transactionsData = await getTransactions();
      setTransactions(transactionsData);
    };
    getTransactionsData();
  }, [deletedTransactionId]);

  const deleteTransaction = function (id , amount) {
    axios
      .delete(`${CONSTANTS.DELETE_TRANSACTION}/${id}`)
      .then((respond) => {
        updateBalance(-amount)
        console.log(respond.data.message);
        setDeletedTransactionId(id);
      })
      .catch(function (error) {
        console.log(error.message);
      });
  };

  return (
    <div className="home">
      {transactions.map((transaction) => (
        <Transaction
          key={transaction._id}
          transaction={transaction}
          deleteTransaction={deleteTransaction}
        />
      ))}
    </div>
  );
}