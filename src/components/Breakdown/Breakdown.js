import React, { useEffect, useState } from 'react'
import CONSTANTS from "../../Constants.json";
import axios from 'axios';
import CategorySum from './CategorySum';

export default function Breakdown() {
  const [transactionsCategoriesSum, setTransactionsCategoriesSum] = useState([]);

  async function getTransactionsCategoriesSum() {
    return axios
      .get(CONSTANTS.GET_CATEGORY_SUM)
      .then(function (transactions) {
        return transactions.data;
      })
      .catch(function (error) {
        console.log(error.message);
      });
  }

  useEffect(() => {
    const getTransactionsCategoriesSumData = async function () {
      let transactionsCategorySumData = await getTransactionsCategoriesSum();
      setTransactionsCategoriesSum(transactionsCategorySumData);
    };
    getTransactionsCategoriesSumData();
  }, []);

  return (
    <div className='breakdown'>
      <h1>Breakdown</h1>
      {transactionsCategoriesSum.map(Category => <CategorySum key={Category._id} Category={Category}/>)}

    </div>
  )
}