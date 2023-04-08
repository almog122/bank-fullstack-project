import React, {useState } from "react";
import axios from "axios";
import CONSTANTS from "../../Constants.json";
import { Input, Stack } from "@mui/material";
import SnackbarAlerts from "./SnackbarAlerts"

export default function Operations({balance ,updateBalance}) {
  const [newDeposit, setNewDeposit] = useState({amount: 0, vendor: "", category: ""});

  const updateNewDeposit = function (event) {
    setNewDeposit({ ...newDeposit, [event.target.name]: event.target.value });
  };

  async function createTransaction(newTransaction) {
    return axios
      .post(CONSTANTS.POST_TRANSACTION , newTransaction )
      .then((respond)=>{
        updateBalance(Number(newTransaction.amount));
        return {message : respond.data.message , severity: 'success'}
      })
      .catch((respond) => {
        return {message : respond.message , severity: 'error'}
      });
  }

  const onDepositClick = function () {
    return createTransaction(newDeposit);
  };

  const onWithdrawClick = async function () {
    if(balance - newDeposit.amount < 500){
      return {message : "Insufficient funds" , severity: 'error'}
    } 
    if(newDeposit.amount === 0 || newDeposit.vendor === "" || newDeposit.category === "" ){
      return {message : "Cannot take action unless you fill all the inputs" , severity: 'error'}
    }

    return createTransaction({ ...newDeposit, "amount": -Number(newDeposit.amount)});
  };
  
  return (
    <Stack  direction="column" justifyContent="center" alignItems="center" spacing={2} className="Operations">
      <Input type="number" className="newTransaction-input" name={"amount"} placeholder="amount" onChange={updateNewDeposit} value={Math.abs(newDeposit.amount)} />
      <Input className="newTransaction-input" name={"vendor"} placeholder="vendor" onChange={updateNewDeposit} value={newDeposit.vendor} />
      <Input className="newTransaction-input" name={"category"} placeholder="category" onChange={updateNewDeposit} value={newDeposit.category} />
      <SnackbarAlerts onDepositClick={onDepositClick} onWithdrawClick={onWithdrawClick}></SnackbarAlerts>
    </Stack>
  );
}