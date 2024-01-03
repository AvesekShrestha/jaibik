import React, { useEffect, useState } from 'react';
import homeImage from '../assets/image1.jpg';
import axios from 'axios';

export default function AccountType() {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8000/account/type');
                setData(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    return (
        <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: 'calc(100vh - 260px)' }}>
            <div className="d-flex flex-wrap justify-content-center">
                {data.map((element, index) => (
                    <div className="card m-3" style={{ width: '23rem' }} key={index}>
                        <img src={homeImage} className="card-img-top" alt="..." />
                        <div className="card-body">
                            <h5 className="card-title">{element.accountType}</h5>
                            <p className="card-text">{`Interest Rate: ${element.interestRate}%`}</p>
                            <p className="card-text">{`Loan Limit: Rs.${element.loanLimit}`}</p>
                            <a href="/" className="btn btn-primary">
                                Create Account
                            </a>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
