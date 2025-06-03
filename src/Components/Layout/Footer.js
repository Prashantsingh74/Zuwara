import React, { useContext } from 'react';
import '../../Style/Footer.css';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import AccountSetup_details from "../Login_Signin_popups/AccountSetup_details";
import AccountSetup_gender from "../Login_Signin_popups/AccountSetup_gender";
import AccountSetup_captcha from "../Login_Signin_popups/AccountSetup_captcha";
import Signup from "../Login_Signin_popups/Signup";
import OTP from "../Login_Signin_popups/OTP";
import Accountsetup_success from "../Login_Signin_popups/Accountsetup_success";
import Accountsetup_Bdate from "../Login_Signin_popups/Accountsetup_Bdate";
import LoginPopup from "../Login_Signin_popups/LoginPopup";
import { Context } from "../../Context";
function Footer() {
    const { t } = useTranslation();
    const { isAuthenticated } = useContext(Context);
    const navigate = useNavigate();
    const handleModalLinkClick = (path) => {
        const nextModal = new window.bootstrap.Modal(
            document.getElementById("Loginmodal")
        );
        if (isAuthenticated) {
            navigate(path);

        } else {
            nextModal.show();
        }
    };

    return (
        <>
            <footer className="text-center text-lg-start z-footer-bg ">
                <section className="">
                    <div className="container text-center text-md-start ">
                        <div className="row mt-3">
                            <div className="col-12 col-md-4 col-lg-4 col-xl-3 mx-auto mb-5 mb-md-4">
                                {/* <div className="mt-20"> */}
                                <figure>
                                    <img className="z-ftr-lg z-footer-logo" style={{ height: "57px", width: "187px", objectFit: 'cover' }} src='/images/Logo_footer_rm.png' alt="footer-logo" />
                                </figure>
                                {/* </div> */}
                                <div className='z-social-media mt-4'>
                                    <a href="/" className="text-reset">
                                        <i className="fa fa-facebook-f z-facebook"></i>
                                    </a>
                                    <a href="/" className="text-reset">
                                        <i className="fa fa-twitter z-twitter"></i>
                                    </a>
                                    <a href="/" className="text-reset">
                                        <i className="fa fa-vimeo z-whatsapp"></i>
                                    </a>
                                    <a href="/" className="text-reset">
                                        <i className="fa fa-instagram z-instagram"></i>
                                    </a>

                                </div>
                            </div>
                            <div className="col-6 col-md-2 col-lg-2 col-xl-2 mx-auto mb-5 mb-md-4 z-footer-list a">
                                <h6 className="text-uppercase mb-4 z-title-line poppins-semibold">
                                    {t("FooterMenu1")}
                                </h6>
                                <p className='poppins-regular'>
                                    <a href="/">{t("Home")}</a>
                                </p>
                                <p className="footer-item poppins-regular">
                                    <Link className="footer-link" to="/aboutus">{t("About zuwara")}</Link>
                                </p>
                                <p className='poppins-regular'>
                                    <Link to="/joinAsProvider">{t("Join as Provider")}</Link>
                                </p>
                                <p className='poppins-regular'>
                                    <a href="/forindividuals">{t("Get-Care")}</a>
                                </p>
                            </div>
                            <div className="col-6 col-md-2 col-lg-2 col-xl-2 mx-auto mb-5 mb-md-4 z-footer-list">
                                <h6 className="text-uppercase mb-4 z-title-line poppins-semibold">
                                    {t("Zuwara Services")}
                                </h6>
                                <p className='poppins-regular'>
                                    <p className='fottlink' onClick={() => handleModalLinkClick('/laboratory')}>{t("Laboratory")}</p>
                                </p>
                                <p className='poppins-regular'>
                                    <p className='fottlink' onClick={() => handleModalLinkClick('/caregiver')}>{t("Caregiver")}</p>
                                </p>
                                <p className='poppins-regular'>
                                    <p className='fottlink' onClick={() => handleModalLinkClick('/corporate')}>{t("Corporate wellness")}</p>
                                </p>
                                <p className='poppins-regular'>
                                    <p className='fottlink' onClick={() => handleModalLinkClick('/radiology')}>{t("Radiology")}</p>
                                </p>
                                <p className='poppins-regular'>
                                    <p className='fottlink' onClick={() => handleModalLinkClick('/vitamin')}>{t("Vitamin IV Drips")}</p>
                                </p>
                                <p className='poppins-regular'>
                                    <p className='fottlink' onClick={() => handleModalLinkClick('/iqama')}>{t("Iqama")}</p>
                                </p>
                            </div>
                            <div className="col-6 col-md-2 col-lg-2 col-xl-2 mx-auto mb-5 mb-md-4 z-footer-list">
                                {/* <div className='text-center justify-self-center'> */}
                                <h6 className="text-uppercase mb-4 z-title-line poppins-semibold">
                                    {t("Zuwara Services")}
                                </h6>
                                <p className='poppins-regular'>
                                    <p className='fottlink' onClick={() => handleModalLinkClick('/Doctorvisit')}>{t("Home Visit Doctor")}</p>
                                </p>
                                <p className='poppins-regular'>
                                    <p className='fottlink' onClick={() => handleModalLinkClick('/physiotherapist')}>{t("Physiotherapist")}</p>
                                </p>
                                <p className='poppins-regular'>
                                    <p className='fottlink' onClick={() => handleModalLinkClick('/virtualconsultations')}>{t("Virtual Consultation")}</p>
                                </p>
                                <p className='poppins-regular'>
                                    <p className='fottlink' onClick={() => handleModalLinkClick('/vaccination')}>{t("Vaccination")}</p>
                                </p>
                                <p className='poppins-regular'>
                                    <p className='fottlink' onClick={() => handleModalLinkClick('/nursevisit')}>{t("Nurse visit")}</p>
                                </p>
                                {/* </div> */}
                                {/* <p className='poppins-regular'>
                                    <p className='fottlink' onClick={() => handleModalLinkClick('/iqama')}>{t("Iqama")}</p>
                                </p> */}
                            </div>
                            <div className="col-6 col-md-2 col-lg-2 col-xl-2 mx-auto mb-5 mb-md-4 z-footer-list">
                                <Link to="/contactus">
                                    <h6 className="text-uppercase mb-4 z-title-line poppins-semibold">
                                        {t("Contact-us")}
                                    </h6>
                                </Link>
                                <p className='poppins-regular'>
                                    <a href="/">{t("+966 555 434 123")}</a>
                                </p>
                                <p className='poppins-regular'>
                                    <a href="/" >{t("contact@zuwara.com")}</a>
                                </p>
                                <p className='poppins-regular'>
                                    <a href="/" >{t("Saudi Arabia Olaya, Riyadh 13151")}</a>
                                </p>
                            </div>
                        </div>
                    </div>
                    <LoginPopup />
                    <Signup />
                    <AccountSetup_details />
                    <AccountSetup_gender />
                    <AccountSetup_captcha />
                    <OTP />
                    <Accountsetup_success />
                </section>
            </footer>

            {/* For Mobile View */}
            {/* <div className='sa-mob-none'>
                <ul className='z-footer-mob footer-mob-nav'>
                    <li className="nav-item">
                        <NavLink className="router-link-active z-link" aria-current="page" to="/">
                            <span>
                                <i className='icon-services'></i>
                                Services
                            </span>
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="router-link-active" aria-current="page" to="/aboutus">
                            <span>
                                <i className='icon-appointment3'></i>
                                Appoinment
                            </span>
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="router-link-active" aria-current="page" to="/joinAsProvider">
                            <span>
                                <i className='icon-patient-list'></i>
                                Patient Record
                            </span>
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="router-link-active" aria-current="page" to="/more">
                            <span>
                                <i className='icon-more3'></i>
                                More
                            </span>
                        </NavLink>
                    </li>
                </ul>
            </div> */}
        </>
    )
}

export default Footer;
