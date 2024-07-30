import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTransactions, fetchStatistics, fetchBarChartData } from './redux/reducers/transactionSlice';
import Header from './components/Header';
import TransactionsTable from './components/TransactionsTable';
import Statistics from './components/Statistics';
import BarChart from './components/BarChart';
import { transactionSelector,transactionReducer,transactionActions } from './redux/reducers/transactionSlice';


const App = () => {
  const dispatch = useDispatch();
  const { transactions, statistics, barChartData, loading, error } = useSelector(transactionSelector);
  const [month, setMonth] = useState(3); 
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(fetchTransactions({ month, search, page }));
    dispatch(fetchStatistics(month));
    dispatch(fetchBarChartData(month));
  }, [month, search, page, dispatch]);


  const handleSearch = (s)=>{
    setSearch(s);
    setPage(1);
  }

  const handleMonth = (m)=>{
    setMonth(m);
    setPage(1);
  }

  return (
    <div className="app">
      <Header month = {month} search={search} handleMonth={handleMonth} handleSearch={handleSearch}/>
      <main>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error: {error}</p>
        ) : ( 
          <>
            <TransactionsTable transactions={transactions} page={page} setPage={setPage} />
            <Statistics statistics={statistics} month={month} />
            <BarChart data={barChartData} />
          </>
        )}
      </main>
    </div>
  );
};
export default App;
