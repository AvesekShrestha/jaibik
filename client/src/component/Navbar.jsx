import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
    const location = useLocation();

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light" style={{ height: "60px", boxShadow: "1px 1px 2px grey" }}>
            <div className="container">
                <Link to="/" className="navbar-brand" style={{ fontFamily: "Sevillana" }}>Jaibik</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className={`nav-item ${location.pathname === '/' ? 'active' : ''}`}>
                            <Link to="/" className="nav-link">Home</Link>
                        </li>
                        <li className={`nav-item ${location.pathname === '/account' ? 'active' : ''}`}>
                            <Link to="/account" className="nav-link">Account</Link>
                        </li>
                        <li className={`nav-item dropdown ${location.pathname.startsWith('/transactions') ? 'active' : ''}`}>
                            <Link to="/" className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Transactions
                            </Link>
                            <ul className="dropdown-menu">
                                <li><Link to="/deposit" className="dropdown-item">Deposit</Link></li>
                                <li><Link to="/withdraw" className="dropdown-item">Withdraw</Link></li>
                            </ul>
                        </li>
                        <li className={`nav-item dropdown ${location.pathname.startsWith('/loan') ? 'active' : ''}`}>
                            <Link to="/" className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Loan
                            </Link>
                            <ul className="dropdown-menu">
                                <li><Link to="/loan/provide" className="dropdown-item">Provide Loan</Link></li>
                                <li><Link to="/loan/receive" className="dropdown-item">Recive Loan</Link></li>
                                <li><Link to="/account" className="dropdown-item">Loan Details</Link></li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}
