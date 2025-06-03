import React, { useState, useContext } from 'react';
import '../../../Style/Records_addpatient.css';
import { Link, NavLink } from 'react-router-dom';
import Navbar from '../../Layout/Navbar';
import Footer from '../../Layout/Footer';
// import DatePicker from "react-datepicker";
// import { parsePhoneNumberFromString } from 'libphonenumber-js';
// import { Button } from 'bootstrap';
import Records_popup from './Records_popup.js';
import { RecordContext } from './RecordContext.js';
import { Context } from '../../../Context.js';
import PatientlistSubLeftSec from './PatientlistSubLeftSec.js';

function Records_patientlist() {
    const { doctors } = useContext(RecordContext);
    const {username} = useContext(Context);
    

    return (
        <div>
            <Navbar />
            <div className="desktop-3-YKe my-5">
                <div className="auto-group-gffr-GWY my-5 container">

                    <Link to="/profile">
                        <div className="auto-group-3h2t-cPN my-5">
                            <img className="group-1261154072-k8C" src="./images/group-1261154072-2y2.png" alt='group-1261154072-2y2' />
                            <p className="back-rBE mb-0">Back</p>
                        </div>
                    </Link>
                    <div className="auto-group-7c9r-BjJ row">
                        <div className="col-lg-4 col-md-4">
                           <PatientlistSubLeftSec/>
                        </div>
                        <div className="col-lg-8 col-md-8">
                            <div className="group-1261154803-tur">
                                <div className="view-patient-QNQ">View Patient</div>
                                <div className="group-1261154804-LWx">
                                    <img className="vector-Fdv" src="./images/vector-vFW.png" alt='vector-vFW' />
                                    <input className="search-records-and-appointments-ZuW" placeholder='Search records and appointments' type='text'></input>
                                    {/* <div className="search-records-and-appointments-ZuW">Search records and appointments</div> */}
                                </div>
                                <div className="records-Rgp">Records</div>
                                <div className="auto-group-nzxc-vtU">
                                    <div className='text-center' style={{ cursor: 'pointer' }} >
                                        {/* <img className="carbon-add-filled-XNU" src="./images/carbon-add-filled.png" /> */}
                                        <div className="add-records-Ndz">
                                            <Records_popup />
                                        </div>
                                    </div>
                                    <div className='container-fluid '>
                                        <div className='row row-cols-lg-3 row-cols-md-2'>
                                            {/* ------- */}
                                            {doctors.map((pitem) => {
                                                return (
                                                    <div className='col d-flex '>
                                                        <div class="card my-2 border-0  text-center " style={{ width: '44rem', height: '7rem', backgroundColor: '#AF22451A', }}>
                                                            <div class="">
                                                                <h3 class=" zw_text_color poppins-regular zw_16  ">{pitem.name}</h3>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            })}
                                            {/* ------- */}
                                        </div>
                                    </div>
                                </div>
                                <div className="bookings-tsE">Bookings</div>
                                <div className="group-1261154957-Qqa">
                                    <div className="group-1261154956-wac">
                                        <img className="union-VME" src="./images/union.png" alt='union' />
                                        <div className="no-appointments-1aU">No Appointments</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Records_patientlist