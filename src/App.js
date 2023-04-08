import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from './components/Header/Navbar';
import Transactions from './components/Home/Transactions';
import Operations from './components/Operations/Operations'
import Breakdown from './components/Breakdown/Breakdown';
import { useEffect, useState } from 'react';
import CONSTANTS from './Constants'
import axios from "axios";

function App() {

  const [balance , setBalance] = useState(0)

  const updateBalance = function(amount){
    setBalance(balance + amount)
  }

  async function getBalance() {
    return axios
      .get(CONSTANTS.GET_BALANCE)
      .then(function (balance) {
        return balance.data;
      })
      .catch(function (error) {
        console.log(error.message);
      });
  }

  useEffect(() => {
    const getBalanceData = async function () {
      let balanceData = await getBalance();
      setBalance(balanceData.balance);
    };

    getBalanceData();
  }, []);

  return ( 
    <Router>
      <>
        <Navbar balance={balance}/>
      </>
      <Routes>
        <Route path="/" element={<Transactions updateBalance={updateBalance}/>} />
        <Route path="/operations" element={<Operations balance={balance} updateBalance={updateBalance}/>} />
        <Route path="/breakdown" element={<Breakdown/>} />
      </Routes>
    </Router>
  );
}

export default App;
