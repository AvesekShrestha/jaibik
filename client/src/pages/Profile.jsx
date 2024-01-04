import React, { useEffect, useState } from 'react';
import axios from 'axios';
import * as XLSX from 'xlsx';
import { useParams } from 'react-router-dom';
import { AiOutlineDownload } from 'react-icons/ai'

export default function Profile() {
  const { accountHolder } = useParams();
  const [data, setData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/account/user/details/${accountHolder}`, {
          headers: { Accept: 'application/json' },
        });
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [accountHolder]);

  const downloadExcel = (sectionData, sectionName) => {
    const ws = XLSX.utils.json_to_sheet(sectionData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, `${sectionName} Data`);
    XLSX.writeFile(wb, `${sectionName}_Data.xlsx`);
  };

  return (
    <div className="container" style={{ minHeight: 'calc(100vh - 260px)' }}>
      {/* Account details section */}
      <h3 className='text-center'>Account Details</h3>
      {data.account && data.balance && data.loan && (
        <div className="card mb-4">
          <div className="card-body d-flex justify-content-between align-items-center">
            <div>
              <h3 className="card-title">{`Name: ${data.account.name}`}</h3>
              <p className="card-text">{`Account Number: ${data.account.accountNumber}`}</p>
              <p className="card-text">{`Contact: ${data.account.contact}`}</p>
              <p className="card-text">{`Account Type: ${data.accountType.accountType}`}</p>
            </div>
            <div>
              <p className="card-text">{`Balance: ${data.balance.balance}`}</p>
              <p className="card-text">{`Loan: ${Math.round(data.loan.totalAmount)}`}</p>
            </div>
          </div>
        </div>
      )}

      {/* Transaction section */}
      <h3 className="text-center">Transactions</h3>
      <div className="card mb-5" style={{ maxHeight: '400px', overflowY: 'auto' }}>
        <div className="card-body d-flex">
          {/* Deposit section */}
          {data.deposit && data.deposit.length > 0 ? (
            <div className="w-50 p-3">
              <div className='d-flex justify-content-around align-items-center flex-row'>
                <h4 className="card-title text-center">Deposit</h4>
                <AiOutlineDownload size={25} onClick={() => downloadExcel(data.deposit, 'Deposit')} style={{ cursor: "pointer" }}></AiOutlineDownload>
              </div>
              <div className="table-responsive">
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th scope="col">S.N</th>
                      <th scope="col">Date</th>
                      <th scope="col">Account Number</th>
                      <th scope="col">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.deposit.map((element, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{new Date(element.date).toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' }).split('/').reverse().join('-')}</td>
                        <td>{element.accountNumber}</td>
                        <td>{element.amount}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div className="w-50 p-3">
              <h4 className="card-title">Deposit</h4>
              <p>No deposit transactions found</p>
            </div>
          )}

          {/* Withdraw section */}
          {data.withdraw && data.withdraw.length > 0 ? (
            <div className="w-50 p-3">
              <div className='d-flex flex-row justify-content-around align-items-center'>
                <h4 className="card-title text-center">Withdraw</h4>
                <AiOutlineDownload style={{ cursor: "pointer" }} size={25} onClick={() => downloadExcel(data.withdraw, 'Withdraw')}>Download Withdraw</AiOutlineDownload>
              </div>
              <div className="table-responsive">
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th scope="col">S.N</th>
                      <th scope="col">Date</th>
                      <th scope="col">Account Number</th>
                      <th scope="col">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.withdraw.map((element, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{new Date(element.date).toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' }).split('/').reverse().join('-')}</td>
                        <td>{element.accountNumber}</td>
                        <td>{element.amount}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div className="w-50 p-3">
              <h4 className="card-title">Withdraw</h4>
              <p>No Withdraw transactions found</p>
            </div>
          )}
        </div>
      </div>

      {/* Loan details section  */}
      <h3 className="text-center">Loan Details</h3>
      <div className="card mb-5" style={{ maxHeight: '400px', overflowY: 'auto' }}>
        <div className="card-body d-flex">
          {/* Loan provided section */}
          {data.loanRecord && data.loanRecord.length > 0 ? (
            <div className="w-50 p-3">
              <div className="d-flex align-items-center justify-content-around flex-row">
                <h4 className="card-title text-center">Loan Provided</h4>
                <AiOutlineDownload style={{ cursor: "pointer" }} size={25} onClick={() => downloadExcel(data.loanRecord, 'LoanProvided')}>Download Loan Provided</AiOutlineDownload>
              </div>
              <div className="table-responsive">
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th scope="col">S.N</th>
                      <th scope="col">Date</th>
                      <th scope="col">Account Number</th>
                      <th scope="col">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.loanRecord.map((element, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{new Date(element.date).toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' }).split('/').reverse().join('-')}</td>
                        <td>{element.accountNumber}</td>
                        <td>{element.amount}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div className="w-50 p-3">
              <h4 className="card-title">Loan Provided</h4>
              <p>No loan provided transactions</p>
            </div>
          )}

          {/* loan received section */}
          {data.loanReceive && data.loanReceive.length > 0 ? (
            <div className="w-50 p-3">
              <div className="d-flex align-items-center justify-content-around flex-row">
                <h4 className="card-title text-center">Loan Received</h4>
                <AiOutlineDownload size={25} style={{ cursor: "pointer" }} onClick={() => downloadExcel(data.loanReceive, 'LoanReceived')}>Download Loan Received</AiOutlineDownload>

              </div>
              <div className="table-responsive">
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th scope="col">S.N</th>
                      <th scope="col">Date</th>
                      <th scope="col">Account Number</th>
                      <th scope="col">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.loanReceive.map((element, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{new Date(element.date).toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' }).split('/').reverse().join('-')}</td>
                        <td>{element.accountNumber}</td>
                        <td>{element.amount}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div className="w-50 p-3">
              <h4 className="card-title">Loan Received</h4>
              <p>No loan received transactions</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
