import React from 'react';
import '../css/statistics.css';

const Statistics = (props) => {

  const {statistics,month} = props
  const getMonth = (m)=>{

    let months = ['January','February',"March","April","May","June","July","August","September","October","November","December"]
    return months[m-1];
  }
  return (
    <div className="statistics-container">
      <div className="statistics-header">
        Statistics - {getMonth(month)}
      </div>
      <div className="statistics-row">
        <div className="stat-box">
          <div className="value">${statistics.totalSales}</div>
          <div className="label">Total Amount</div>
        </div>
        <div className="stat-box">
          <div className="value">{statistics.soldItems}</div>
          <div className="label">Sold Items</div>
        </div>
        <div className="stat-box">
          <div className="value">{statistics.unsoldItems}</div>
          <div className="label">Not Sold Items</div>
        </div>
      </div>
    </div>
  );
};

export default Statistics;

