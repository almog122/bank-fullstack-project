import React, {useState } from "react";
import axios from "axios";
import CONSTANTS from "../../Constants.json";
import { Button, Input, Stack } from "@mui/material";
import { Link } from "react-router-dom";

export default function Operations({balance ,updateBalance , setMessageData}) {
  const [newDeposit, setNewDeposit] = useState({amount: 0, vendor: "", category: ""});

  const updateNewDeposit = function (event) {
    setNewDeposit({ ...newDeposit, [event.target.name]: event.target.value });
  };

  function createTransaction(newTransaction) {
    axios
      .post(CONSTANTS.POST_TRANSACTION , newTransaction )
      .then((respond)=>{
        updateBalance(Number(newTransaction.amount));
        setMessageData({message : respond.data.message , severity: 'success'})
      })
      .catch((respond) => {
        setMessageData({message : respond.message , severity: 'error'})
      });
  }

  const onDepositClick = function () {
    if(newDeposit.amount === 0 || newDeposit.vendor === "" || newDeposit.category === "" ){
      setMessageData({message : "Cannot take action unless you fill all the inputs" , severity: 'error'})
    }else{
      createTransaction(newDeposit);
    }
  };

  const onWithdrawClick = function () {
    if(balance - newDeposit.amount < 500){
      setMessageData({message : "Insufficient funds" , severity: 'error'})
      return
    }
    if(newDeposit.amount === 0 || newDeposit.vendor === "" || newDeposit.category === "" ){
      setMessageData({message : "Cannot take action unless you fill all the inputs" , severity: 'error'})
      return
    }
    createTransaction({ ...newDeposit, "amount": -Number(newDeposit.amount)});
  };
  
  return (
    <Stack margin={10} direction="column" justifyContent="center" alignItems="center" spacing={2} className="Operations">
      <Input type="number" className="newTransaction-input" name={"amount"} placeholder="amount" onChange={updateNewDeposit} value={Math.abs(newDeposit.amount)} />
      <Input className="newTransaction-input" name={"vendor"} placeholder="vendor" onChange={updateNewDeposit} value={newDeposit.vendor} />
      <Input className="newTransaction-input" name={"category"} placeholder="category" onChange={updateNewDeposit} value={newDeposit.category} />
      <Link to={"/"}>
        <Button variant="contained" color="success" onClick={onDepositClick}> Deposit </Button>
        <Button variant="contained" color="error" onClick={onWithdrawClick}> Withdraw </Button>
      </Link>
    </Stack>
  );
}