import React, { useState, useEffect } from 'react';
import homeImage from '../assets/image1.jpg';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Home() {
    const [account, setAccount] = useState([]);
    const [member, setMember] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        const fetchAccount = async () => {
            try {
                const response = await axios.get('http://localhost:8000/account/type');
                setAccount(response.data);
            } catch (error) {
                console.error('Error fetching account data:', error);
            }
        };
        fetchAccount();

        const fetchMember = async () => {
            try {
                const response = await axios.get("http://localhost:8000/account")
                setMember(response.data)
            } catch (error) {
                console.log("Error occured")

            }
        }
        fetchMember()
    }, []);

    return (
        <>
            <div className="container mt-4">
                {/* Welcome Section */}
                <div className="row welcome">
                    <div className="col-md-6">
                        <div className="d-flex flex-column justify-content-center align-items-center h-100">
                            <h3 className="mb-3">Welcome to Jaibik Krishi Sakhari</h3>
                            <p className="mb-4">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur, accusantium rem eveniet delectus
                                voluptates omnis error doloribus facere animi! Minima soluta fugiat libero ipsum eveniet omnis vero nam
                                dignissimos explicabo.
                            </p>
                            <div className="d-flex align-items-center">
                                <button className="btn btn-warning me-2" onClick={() => navigate("/type")}>Create Account</button>
                                <button className="btn btn-success">Explore More</button>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="h-100">
                            <img src={homeImage} alt="Home" className="img-fluid h-100" style={{ borderRadius: '20% 0% 20% 0%' }} />
                        </div>
                    </div>
                </div>

                {/* Account Section */}
                <div className="mt-5">
                    <p className="fs-3 text-center">Accounts</p>

                    <div className="row">
                        {account.map((element, index) => (
                            <div className="col-md-4 mb-4" key={index}>
                                <div className="card">
                                    <img src={homeImage} className="card-img-top" alt="Account" />
                                    <div className="card-body">
                                        <h5 className="card-title">{element.accountType}</h5>
                                        <p>{`Interest Rate: ${element.interestRate}%`}</p>
                                        <p>{`Loan Limit: Rs. ${element.loanLimit}`}</p>
                                        <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                        <a href="/" className="btn btn-primary">
                                            Create Account
                                        </a>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>


                {/* Member Section  */}
                <div className="container mt-4">
                    {/* Member Carousel Section */}
                    <div className="mt-5">
                        <p className="fs-3 text-center">Member Details</p>
                        <div id="memberCarousel" className="carousel slide" data-bs-ride="carousel">
                            <div className="carousel-inner mb-5 rounded" style={{ boxShadow: "2px 2px 3px grey", height: "200px", backgroundColor: "#F0F0F0" }}>
                                {member.map((element, index) => (
                                    <div className={`carousel-item ${index === 0 ? 'active' : ''}`} key={index}>
                                        <div className="row">
                                            <div className="col-md-12">
                                                <div className="d-flex flex-column justify-content-center align-items-center h-100">
                                                    <h5 className='mt-2'>{element.name}</h5>
                                                    <p>{`Age : ${element.age}`}</p>
                                                    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minima, temporibus quis blanditiis dolores asperiores nisi cum commodi ullam alias laudantium.</p>
                                                    {/* Add other member details here */}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>


            </div>
        </>
    );
}
