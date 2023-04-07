import React from 'react'
import './Transaction.css'

export default function Transaction({transaction , deleteTransaction}) {

  const transactionColor = function (amount) {
    return amount > 0 ? 'deposit' : 'withdraw' 
  }

  return (
    <div className={transactionColor(transaction.amount)}>
      <div>vendor : {transaction.vendor}</div>
      <div>category : {transaction.category}</div>
      <div>amount : {transaction.amount}</div>
      <button onClick={() => deleteTransaction(transaction._id , transaction.amount)}>Delete</button>
    </div>
  )
}
