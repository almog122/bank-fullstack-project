import React, { useEffect, useState } from 'react'
import CONSTANTS from "../../Constants.json";
import axios from 'axios';
import CategorySum from './CategorySum';
import { Box, Stack, Typography } from '@mui/material';

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
    <Box boxShadow={2} margin={"10%"} width={'60%'} >

      <Typography variant="h3" color={'lightgreen'}>Breakdown : </Typography>

      <Stack direction="column" justifyContent="center" spacing={2}>
        {transactionsCategoriesSum.map(CategoryData => <CategorySum key={CategoryData.category} CategoryData={CategoryData}/>)}
      </Stack>
    </Box>
  )
}