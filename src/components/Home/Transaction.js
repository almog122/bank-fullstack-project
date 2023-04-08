import React from 'react'
import { Button, Grid, Typography } from '@mui/material'

export default function Transaction({transaction , deleteTransaction}) {

  const transactionColor = function (amount) {
    return amount > 0 ? 'green' : 'red' 
  }

  return (
    <Grid container boxShadow={2} color={transactionColor(transaction.amount)} spacing={2} justifyContent="center" alignItems="center" width={"400px"}>

      <Grid item xs={6}>
        <Typography > vendor : {transaction.vendor}</Typography>
        <Typography > category : {transaction.category}</Typography>
      </Grid>

      <Grid item xs={6}>
        <Typography  > amount : {transaction.amount}</Typography>
        <Button variant="contained" color="error" onClick={() => deleteTransaction(transaction._id , transaction.amount)}> Delete </Button>
      </Grid>
    </Grid>
  )
}
