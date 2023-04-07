import React, { useEffect, useState } from "react";
import axios from "axios";
import CONSTANTS from "../../Constants.json";
import "./Operations.css";
import { Link } from "react-router-dom";

export default function Operations({updateBalance}) {
  const [newDeposit, setNewDeposit] = useState({amount: 0, vendor: "", category: "",});

  const updateNewDeposit = function (event) {
    setNewDeposit({ ...newDeposit, [event.target.name]: event.target.value });
  };

  function createTransaction(newTransaction) {
    axios
      .post(CONSTANTS.POST_TRANSACTION , newTransaction )
      .catch(function (error) {
        console.log(error.message);
      });
  }

  const onDepositClick = function () {
    updateBalance(Number(newDeposit.amount));
    createTransaction(newDeposit);
  };

  const onWithdrawClick = function () {
    let newAmount = -Number(newDeposit.amount);
    updateBalance(newAmount);
    createTransaction({ ...newDeposit, "amount": newAmount});
  };
  
  return (
    <div className="Operations">
      <input type="number" className="newTransaction-input" name={"amount"} placeholder="amount" onChange={updateNewDeposit} value={Math.abs(newDeposit.amount)} />
      <input className="newTransaction-input" name={"vendor"} placeholder="vendor" onChange={updateNewDeposit} value={newDeposit.vendor} />
      <input className="newTransaction-input" name={"category"} placeholder="category" onChange={updateNewDeposit} value={newDeposit.category} />
      <Link to="/">
        <button onClick={()=> onDepositClick()}> Deposit </button>
        <button onClick={() => onWithdrawClick()}> Withdraw </button>
      </Link>
    </div>
  );
}