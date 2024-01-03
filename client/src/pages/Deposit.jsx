import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import 'bootstrap/dist/css/bootstrap.min.css';

export default function Deposit() {
  const [accountHolder, setAccountHolder] = useState([]);
  const [accountNumber, setAccountNumber] = useState('');
  const [amount, setAmount] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    setError('');
    if (accountNumber.trim() !== '') {
      const fetchData = async () => {
        try {
          const response = await axios.get(`http://localhost:8000/account/balance/${accountNumber}`);
          setAccountHolder([response.data]);
        } catch (error) {
          setAccountHolder([]);
          setError('No account found');
        }
      };
      fetchData();
    } else {
      setAccountHolder([]);
    }
  }, [accountNumber]);

  const handleDeposit = async () => {
    try {
      await axios.post('http://localhost:8000/deposit', { accountNumber, amount });
      setAccountNumber('');
      setAmount('');
      navigate('/deposit');
      setSuccessMessage('Deposit successful!');
      setTimeout(() => {
        setSuccessMessage('');
      }, 2000);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container-fluid d-flex flex-column align-items-center" style={{ height: 'calc(100vh - 260px)' }}>
      <div style={{ height: '60px' }}>
        {error && (
          <div className="alert alert-warning" role="alert" style={{ width: '100vw' }}>
            {error}
          </div>
        )}
        {successMessage && (
          <div className="alert alert-success" role="alert" style={{ width: '100vw' }}>
            {successMessage}
          </div>
        )}
      </div>

      {/* User content */}
      <div style={{ height: '150px' }}>
        {accountHolder.length > 0 ? (
          <div className="card mb-4">
            <div className="card-body">
              {accountHolder.map((element, index) => (
                <div key={index}>
                  <h4 className="card-title">{`Account Holder: ${element.account.name}`}</h4>
                  <p className="card-text">{`Balance: ${element.balance.balance}`}</p>
                  <p className="card-text">{`Account Type: ${element.type.accountType}`}</p>
                  <p className="card-text">{`Interest Rate: ${element.type.interestRate}%`}</p>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <p className="text-danger">{error}</p>
        )}
      </div>

      {/* Form content */}
      <form className="container mt-4">
        <div className="mb-3">
          <label htmlFor="accountNumber" className="form-label">
            Account Number
          </label>
          <input
            type="number"
            className="form-control"
            value={accountNumber}
            onChange={(e) => setAccountNumber(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="depositAmount" className="form-label">
            Amount
          </label>
          <input
            required="true"
            type="number"
            className="form-control"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        <button type="button" className={`btn btn-primary ${error ? 'disabled' : ''}`} onClick={handleDeposit}>
          Deposit
        </button>
      </form>
    </div>
  );
}
