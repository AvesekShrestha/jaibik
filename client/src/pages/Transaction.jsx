import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Transaction = () => {
    const [accountNumber, setAccountNumber] = useState('');
    const [data, setData] = useState({});
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
    const [transactionData, setTransactionData] = useState({
        deposit: 0,
        withdraw: 0,
        loanProvided: 0,
        loanReceived: 0,
        share: 0,
    });
    const [errorMessage, setErrorMessage] = useState("")


    const handleInputChange = (field, value) => {
        setTransactionData((prevData) => ({
            ...prevData,
            [field]: value,
        }));
    };

    const handleOnSave = async () => {
        try {
            await axios.post(`http://localhost:8000/details/${accountNumber}`, transactionData);
            setSuccess(true);
            setTransactionData({ deposit: 0, withdraw: 0, loanProvided: 0, loanReceived: 0, share: 0 });

            // Fetch user details again after a successful transaction
            fetchUserDetails();
        } catch (error) {
            setErrorMessage(error.response.data.message)
            setError(true);
        }
    };

    const fetchUserDetails = async () => {
        try {
            if (!accountNumber || accountNumber <= 0) {
                setError(false);
                setData({});
                return;
            }
            const response = await axios.get(`http://localhost:8000/account/transaction/details/${accountNumber}`, {
                headers: { Accept: 'application/json' },
            });
            setData(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        const timeout = setTimeout(() => {
            setError(false);
            setSuccess(false);
        }, 2000);
        return () => clearTimeout(timeout);
    }, [error, success]);

    useEffect(() => {
        fetchUserDetails(); // Fetch user details initially
    }, [accountNumber]);

    const handleFocus = (event) => {
        event.target.placeholder = '';
    };

    const handleBlur = (event) => {
        event.target.placeholder = 'Enter Account Number';
    };
    return (
        <div style={{ minHeight: "calc(100vh - 260px)" }}>
            <div style={{ minHeight: "60px" }}>
                {error && (
                    <div className={`alert alert-warning`} role="alert">
                        {errorMessage}
                    </div>
                )}
                {success && (
                    <div className={`alert alert-success`} role="alert">
                        Transaction successfull.
                    </div>
                )}
            </div>
            <div className="container">

                <div className="row">
                    <div className="col-md-12">
                        <div style={{ minHeight: "180px" }} className='mb-5'>

                            {data.account && data.balance && data.loan ? (
                                <div className="card">
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
                            ) : (
                                <div className="card">
                                    <div className="card-body d-flex justify-content-center align-items-center">
                                        <p className="fs-3">Enter a valid account number</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="col-md-12">
                        <table className="table table-bordered table-striped">
                            <thead className="thead-dark">
                                <tr>
                                    <th scope="col">Account Number</th>
                                    <th scope="col">Deposit</th>
                                    <th scope="col">Withdraw</th>
                                    <th scope="col">Loan Provided</th>
                                    <th scope="col">Loan Received</th>
                                    <th scope="col">Share</th>
                                    <th scope="col">Save</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                        <input
                                            type="number"
                                            className="form-control"
                                            placeholder="Enter Account Number"
                                            onChange={(e) => setAccountNumber(e.target.value)}
                                            value={accountNumber}
                                            onFocus={handleFocus}
                                            onBlur={handleBlur}
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="number"
                                            className="form-control"
                                            placeholder="Enter Deposit Amount"
                                            onFocus={handleFocus}
                                            onBlur={handleBlur}
                                            onChange={(e) => handleInputChange("deposit", e.target.value)}
                                            value={transactionData.deposit}
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="number"
                                            className="form-control"
                                            placeholder="Enter Withdraw Amount"
                                            onFocus={handleFocus}
                                            onBlur={handleBlur}
                                            onChange={(e) => handleInputChange("withdraw", e.target.value)}
                                            value={transactionData.withdraw}
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="number"
                                            className="form-control"
                                            placeholder="Enter Amount"
                                            onFocus={handleFocus}
                                            onBlur={handleBlur}
                                            onChange={(e) => handleInputChange("loanProvided", e.target.value)}
                                            value={transactionData.loanProvided}
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="number"
                                            className="form-control"
                                            placeholder="Enter Amount"
                                            onFocus={handleFocus}
                                            onBlur={handleBlur}
                                            onChange={(e) => handleInputChange("loanReceived", e.target.value)}
                                            value={transactionData.loanReceived}
                                        />
                                    </td>

                                    <td>
                                        <input
                                            type="number"
                                            className="form-control"
                                            placeholder="Enter Share Amount"
                                            onFocus={handleFocus}
                                            onBlur={handleBlur}
                                            onChange={(e) => handleInputChange("share", e.target.value)}
                                            value={transactionData.share}
                                        />
                                    </td>

                                    <td>
                                        <button className="btn btn-primary" onClick={handleOnSave}>Save</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Transaction;
