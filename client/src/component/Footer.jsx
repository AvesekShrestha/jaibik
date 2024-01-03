import React from 'react'

export default function Footer() {
    return (
        <>
            <div className='container-fluid bg-dark text-light ' style={{ height: "200px" }}>
                <div className="row ">
                    <div className="col-4 fs-3 d-flex justify-content-center align-items-center flex-column" style={{ fontFamily: "Sevillana" }}>Jaibik Krishi Sahakari</div>

                    <div className="col-4 d-flex justify-content-center align-items-center">
                        <div className='d-flex justify-content-center align-items-center flex-column'>
                            <h4 className='mt-3'>What we do</h4>
                            <ul>
                                <li className="list-unstyled">Provide Loan</li>
                                <li className="list-unstyled">Give favoralbe interest</li>
                                <li className="list-unstyled">Lorem, ipsum.</li>
                                <li className="list-unstyled">Provide Loan</li>

                            </ul>
                        </div>
                    </div>
                    <div className="col-4 d-flex justify-content-center align-items-center">
                        <div className='d-flex justify-content-center align-items-center flex-column'>
                            <h4 className='mt-3'>Connect With Us</h4>
                            <ul>
                                <li className="list-unstyled">Facebook</li>
                                <li className="list-unstyled">Twitter</li>
                                <li className="list-unstyled">Instagraom</li>
                                <li className="list-unstyled">Youtube</li>

                            </ul>
                        </div>
                    </div>

                </div>

            </div>
        </>
    )
}
