import React from 'react';
import '../css/transactionTable.css';

const TransactionsTable = (props) => {
  // console.log(props);

  const { transactions, currPage, totalPages, setPage } = props;
  return (
    <>
      {totalPages > 0 ?
        <div className="transactions-table">
          <table>
            <thead>
              <tr className="row">
                <th>ID</th>
                <th>Title</th>
                <th>Description</th>
                <th>Price</th>
                <th>Category</th>
                <th>Sold</th>
                <th>Sale&nbsp;Date</th>
                <th>Image</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map(transaction => (
                <tr className="row" key={transaction.product._id}>
                  <td>{transaction.product._id}</td>
                  <td>{transaction.product.title}</td>
                  <td>{transaction.product.description.slice(0, 250)}...</td>
                  <td>${transaction.price.toFixed(2)}</td>
                  <td>{transaction.product.category.name}</td>
                  <td>{transaction.sold ? 'Yes' : 'No'}</td>
                  <td>{new Date(transaction.dateOfSale).toLocaleDateString()}</td>
                  <td> <img src={transaction.product.image} alt="not Found" /> </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="pagination">
            {currPage > 1 ? <button onClick={() => setPage(currPage => Math.max(currPage - 1, 1))}>Previous</button> : <></>}
            <span id="curr-page">Page - {currPage}/{totalPages}</span>
            {currPage < totalPages ? <button onClick={() => setPage(currPage => currPage + 1)}>Next</button> : <></>}
          </div>
        </div>
        :
        <>
          <div id="notFound"> Searched transactions not found</div>
        </>
      }
    </>

  );
};

export default TransactionsTable;
