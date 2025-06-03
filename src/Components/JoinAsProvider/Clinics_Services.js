import React from 'react'
import '../../Style/clinics_services.css'
import { Link } from 'react-router-dom';

function Clinics_Services() {
    return (
        <div className="joinus-serv top120">
            <div className="row mb20">
                <div className="col-4 col-md-4 col-sm-6 sa-col-xs-12">
                    <h5 className="h5 mb20">Many virtual clinics in different departments, 24+ E-clinics.</h5>
                    <p>Join now as a general practitioner, specialist, or consultant with any of the subspecialties and provide your consultations remotely.</p>
                </div>
                <div className="col-8 col-md-8 col-sm-6 sa-col-xs-12">
                    <div className="card card-shadow card-primary-light">
                        <ul className="join-filter suc-tick">
                            <li>
                                <i className="icon-checked"></i> Instant Consultation
                            </li>
                            <li>
                                <i className="icon-checked"></i> General Medicine
                            </li>
                            <li>
                                <i className="icon-checked"></i> Family Medicine
                            </li>
                            <li>
                                <i className="icon-checked"></i> Psychiatry
                            </li>
                            <li>
                                <i className="icon-checked"></i> Psychology
                            </li>
                            <li>
                                <i className="icon-checked"></i> Pediatrics
                            </li>
                            <li>
                                <i className="icon-checked"></i> Obstetrics and Gynecology
                            </li>
                            <li>
                                <i className="icon-checked"></i> Dermatology &amp; Plastic Surgery
                            </li>
                            <li>
                                <i className="icon-checked"></i> Ear Nose Throat (ENT)
                            </li>
                        </ul>
                        <span className="link">And more clinilc...</span>
                        <Link className='link' to="/Joinbutton">
                            <span className="arrow-right-bg arrow-right-primary" >Join as doctor
                                <i className="icon-arrow-right"></i>
                            </span>
                        </Link>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-4 col-md-4 col-sm-6 sa-col-xs-12">
                    <h5 className="h5 mb20">Many integrated medical servicesin different fields</h5>
                    <p>Home visit - home medical services - video consultations </p>
                </div>
                <div className="col-8 col-md-8 col-sm-6 sa-col-xs-12">
                    <div className="card card-shadow card-primary-light">
                        <ul className="join-filter suc-tick">
                            <li>
                                <i className="icon-checked"></i> Virtual Consultations
                            </li>
                            <li>
                                <i className="icon-checked"></i> Laboratory
                            </li>
                            <li>
                                <i className="icon-checked"></i> Home visit Doctor
                            </li>
                            <li>
                                <i className="icon-checked"></i> Nurse visit
                            </li>
                            <li>
                                <i className="icon-checked"></i> Vitamin Iv drips
                            </li>
                        </ul>
                        <span className="link">And more sevices...</span>
                        <Link className='link' to="/Joinbutton">
                            <span className="arrow-right-bg arrow-right-primary">Join as services provider
                                <i className="icon-arrow-right"></i>
                            </span>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Clinics_Services