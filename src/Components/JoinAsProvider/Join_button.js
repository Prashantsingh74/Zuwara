import React from 'react'
import '../../Style/Join_button.css';
import Navbar from '../Layout/Navbar';
import Footer from '../Layout/Footer'
import { Link } from 'react-router-dom';

function Join_button() {

    return (
        <>
            <Navbar />
            <div className="glob-box Provide-your-service">
                <div className='mx-auto' style={{maxWidth: '75rem'}}>
                    <p className='poppins-semibold zw_34 zw_title_color '>Provide My Services Via Zuwarh Request Form</p>
                </div>    
                <p className='poppins-regular zw_16 zw_text_color join-btn-subhead'>We are pleased to cooperate with us in providing and facilitating access to your services Via Zuwarh platform</p>
               

                <div className="container">
                    <p className='poppins-bold zw_24 zw_title_color' style={{ textAlign: 'left' }}>Provide Your Service as</p>

                    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3">
                        <Link to="/doctorspecialist">
                            <div className="col mb-4 me-0 ps-0">
                                <div className="card w-100 card-click px-1 ">
                                    <div className="card-title">
                                        <div className='card-title-img'>
                                            <img src="../../../../images/Group 1261155588.svg" alt="" />
                                        </div>
                                        <div className='poppins-regular zw_18 zw_black'>Doctor/specialist</div>
                                    </div>
                                </div>
                            </div>
                        </Link >
                        <Link to="/hospitalhealthcenter">
                            <div className="col mb-4 px-2 me-0 ps-0">
                                <div className="card w-100 card-click px-1 ">
                                    <div className="card-title">
                                        <div className='card-title-img'>
                                            <img src="../../../../images/hospital-svgrepo.svg" alt="" />
                                        </div>
                                        <div className='poppins-regular zw_18 zw_black w-100'>Hospital or health center</div>
                                    </div>
                                </div>
                            </div>
                        </Link >
                        <Link to="/insuarancecompany">
                            <div className="col mb-4 px-2 me-0 ps-0">
                                <div className="card w-100 card-click px-1 ">
                                    <div className="card-title">
                                        <div className='card-title-img'>
                                            <img src="../../../../images/Vector-hos.svg" alt="" />
                                        </div>
                                        <div className='poppins-regular zw_18 zw_black'>Insurance company</div>
                                    </div>
                                </div>
                            </div>
                        </Link>
                        <Link to="/Practiotioner">
                            <div className="col mb-4 px-2 me-0 ps-0">
                                <div className="card w-100 card-click px-1 ">
                                    <div className="card-title">
                                        <div className='card-title-img'>
                                            <img src="../../../../images/Group-icon.svg" alt="" />
                                        </div>
                                        <div className='poppins-regular zw_18 zw_black'>Practitioners</div>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>
                {/* </div> */}


                {/* <div className="card-shadow service-prov" style={{top: "77px",
                    marginBottom: "115px"}}>
                    <span className="btn-back mob-block">
                        <i className="icon-arrow-left"></i>
                    </span>
                    <h4 className="tit mob-header mob-block">Sanar Request form</h4>
                    <div className="text-center">
                        <h3 className="h3">Provide my services via Sanar Request form</h3>
                        <p> We are pleased to cooperate with us in providing and facilitating access to your services Via Sanar platform</p>
                    </div>
                    <ul className="track-order">
                        <li className="packed">
                            <span className="track-dot fill-dot"></span>
                        </li>
                        <li className="isa-delivered">
                            <span className="track-dot"></span>
                            <span className="track-dot"></span>
                        </li>
                        <li className="isa-delivered">
                            <span className="track-dot"></span>
                            <span className="track-dot"></span>
                        </li>
                    </ul>
                    <h3>Provide your services as</h3>
                    <ul className="slct-card">
                        <li className='nav-item'>
                            <NavLink aria-current="page" className='nav-link' to="/doctorspecialist">
                                <i className="sprite-new doc-spe"></i>Doctor / specialist
                            </NavLink>
                        </li>

                        <li className="nav-item">
                            <NavLink className='nav-link' to="/hospitalhealthcenter">
                                <i className="sprite-new hos-cen"></i>Hospital or health center
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className='nav-link' to="/insuarancecompany">

                                <i className="sprite-new in-company"></i>Insurance company
                            </NavLink>
                        </li>
                    </ul>
                </div> */}
            </div>
            <Footer />
        </>
    )
}

export default Join_button