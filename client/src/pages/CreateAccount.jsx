import React from 'react';
import { useParams } from 'react-router-dom';

export default function CreateAccount() {
    const _id = useParams();

    return (
        <>
            <div style={{ minHeight: "calc(100vh - 260px)" }}>

                <div className="container d-flex justify-content-center align-items-center" style={{ height: "calc(100vh - 260px" }} >
                    <div>

                        <form className="row g-3 needs-validation" noValidate>
                            <div className="col-md-6">
                                <label htmlFor="validationCustom01" className="form-label">Name</label>
                                <input type="text" className="form-control" id="validationCustom01" required />
                                <div className="valid-feedback">
                                    Looks good!
                                </div>
                            </div>

                            <div className="col-md-6">
                                <label htmlFor="validationCustom02" className="form-label">Age</label>
                                <input type="number" className="form-control" id="validationCustom02" placeholder="eg 1" required />
                                <div className="valid-feedback">
                                    Looks good!
                                </div>
                            </div>

                            <div className="col-md-6">
                                <label className="form-label d-block">Gender</label>
                                <div className="form-check form-check-inline">
                                    <input className="form-check-input" type="radio" name="gender" id="male" />
                                    <label className="form-check-label" htmlFor="male">Male</label>
                                </div>
                                <div className="form-check form-check-inline">
                                    <input className="form-check-input" type="radio" name="gender" id="female" />
                                    <label className="form-check-label" htmlFor="female">Female</label>
                                </div>
                            </div>

                            <div className="col-md-6">
                                <label htmlFor="validationCustom02" className="form-label">Heir</label>
                                <input type="text" className="form-control" id="validationCustom02" placeholder="eg 1" required />
                                <div className="valid-feedback">
                                    Looks good!
                                </div>
                            </div>

                            <div className="col-md-6">
                                <label htmlFor="validationCustomUsername" className="form-label">Email</label>
                                <div className="input-group has-validation">
                                    <span className="input-group-text" id="inputGroupPrepend">@</span>
                                    <input type="email" className="form-control" id="validationCustomUsername" aria-describedby="inputGroupPrepend" required />
                                    <div className="invalid-feedback">
                                        Please choose a username.
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-6">
                                <label htmlFor="validationCustom03" className="form-label">Citizenship no</label>
                                <input type="text" className="form-control" id="validationCustom03" required />
                                <div className="invalid-feedback">
                                    Please provide a valid number.
                                </div>
                            </div>

                            <div className="col-12 mt-3">
                                <button className="btn btn-primary">Create</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
