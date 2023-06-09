import React, { useEffect, useState } from "react";
import axios from "axios";
import Transaction from "./Transaction";
import CONSTANTS from "../../Constants.json";
import {Divider, Stack } from "@mui/material";

export default function Transactions({updateBalance , setMessageData}) {
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
        setMessageData({message: "Successfully deleted" , severity: 'success'});
        setDeletedTransactionId(id);
      })
      .catch(function (respond) {
        setMessageData({message: respond.message , severity: 'success'});
      });
  };

  return (
    <Stack marginTop={"30px"} direction="column" justifyContent="center" alignItems="center" spacing={2} divider={<Divider orientation="vertical" flexItem />}>
      {transactions.map((transaction) => (
        <Transaction
          key={transaction._id}
          transaction={transaction}
          deleteTransaction={deleteTransaction}
        />
      ))}
    </Stack >
  );
}