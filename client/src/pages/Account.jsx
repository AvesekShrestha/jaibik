import React, { useEffect, useState } from 'react'
import axios from 'axios'
import homeImage from '../assets/image1.jpg'
import { Link } from 'react-router-dom'


export default function Account() {
    const [data, setData] = useState([])
    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get(`http://localhost:8000/account/user`)
            setData(response.data)
        }
        fetchData()

    }, [])
    const handleOnSearch = async () => {

    }
    return (
        <>
            <div style={{ minHeight: "calc(100vh - 260px)" }} className='container'>

                {/* heading section  */}
                <div className='d-flex flex-row justify-content-between align-items-center' style={{ height: "60px" }}>
                    <p className='fs-2 text-muted'>Accounts</p>

                    <div>
                        <form className="d-flex" role="search">
                            <input className="form-control me-2" type="number" placeholder="Account Number" aria-label="Search" />
                            <button className="btn btn-outline-success" onClick={handleOnSearch}>Search</button>
                        </form>
                    </div>
                </div>

                {/* account list section  */}
                <div className='overflow-auto' style={{ height: "calc(100vh - 320px)" }}>

                    {
                        data.map((element, index) => {
                            return (
                                <Link to={`http://localhost:5173/profile/${element._id}`} className='d-flex align-items-center justify-content-center flex-column mt-4 rounded px-3 text-dark' style={{ boxShadow: "1px 1px 2px grey", cursor: "pointer", textDecoration: "none" }} key={index}>
                                    <div style={{ width: "100%", height: "80px" }} className='rounded d-flex flex-row align-items-center'>
                                        <div style={{ height: "60px", width: "60px", borderRadius: "50%" }} className='bg-primary me-5'>
                                            <img src={homeImage} alt='photo' style={{ height: "60px", objectFit: "cover", objectPosition: "center" }} />
                                        </div>
                                        <p className='fs-5'>{element.name}</p>
                                    </div>
                                </Link>
                            )
                        })
                    }

                </div>

            </div>
        </>
    )
}
