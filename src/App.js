import { Route, Router, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './components/Header/Navbar';
import Transactions from './components/Home/Transactions';

function App() {


  return ( 
    <Router>
      <>
        <Navbar />
      </>
      <Routes>
        <Route path="/" element={<Transactions />} />
        <Route path={`/`} element={<Catalog />} />
        <Route path="/" element={<MovieDetail/>} />
      </Routes>
    </Router>
  );
}

export default App;
