import React, { useContext, useEffect, useRef, useState } from "react";
import "../../Style/Navbar.css";
import { NavLink, useNavigate } from "react-router-dom";
import Signin_popup from "../Login_Signin_popups/LoginPopup";
import { useTranslation } from "react-i18next";
import i18n from "../../i18n";
import AccountSetup_details from "../Login_Signin_popups/AccountSetup_details";
import AccountSetup_gender from "../Login_Signin_popups/AccountSetup_gender";
import AccountSetup_captcha from "../Login_Signin_popups/AccountSetup_captcha";
import Signup from "../Login_Signin_popups/Signup";
import OTP from "../Login_Signin_popups/OTP";
import Accountsetup_success from "../Login_Signin_popups/Accountsetup_success";
import Accountsetup_Bdate from "../Login_Signin_popups/Accountsetup_Bdate";
import LoginPopup from "../Login_Signin_popups/LoginPopup";
import { Context } from "../../Context";
import { FaGlobe } from "react-icons/fa";
function Navbar() {
  const { username, setUsername, isAuthenticated, setIsAuthenticated } =
    useContext(Context);
  // const [selectedLanguage, setSelectedLanguage] = useState(i18n.language);
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const navbarRef = useRef(null); // Create a ref for the navbar


  const { t } = useTranslation();

  const toggaleNavbar = () => {
    setShow(!show);
  };
  useEffect(() => {
    // Function to handle clicks outside of the navbar

    const handleClickOutside = (event) => {
      if (navbarRef.current && !navbarRef.current.contains(event.target)) {
        setShow(false); // Collapse the navbar
      }
    };
    // Add event listener to the document
    document.addEventListener("mousedown", handleClickOutside);
    // Cleanup event listener on component unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const handleLoginButtonClick = () => {
    if (isAuthenticated) {

      setIsAuthenticated(true);
      setUsername(username);
      // Redirect to profile page if authenticated
      navigate("/profile");
    } else {

      // Open Login modal if not authenticated
      const modal = new window.bootstrap.Modal(
        document.getElementById("Loginmodal")
      );
      modal.show();
    }
  };

  const onLogOut = () => {
    setIsAuthenticated(false);
    setUsername(username);

  };
  // for changing the language

  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState(
    localStorage.getItem("lang") || "en"
  );
  const toggleDropdown = () => setShowDropdown(!showDropdown);
  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
    setSelectedLanguage(lang);
    localStorage.setItem("lang", lang);
    setShowDropdown(false);
  };

  return (
    <>
      <nav
        className="navbar navbar-expand-lg navbar-light fixed-top bg-white "
        ref={navbarRef}
      >
        <div className="container">
          <a className="navbar-brand" href="/">
            <img
              src="images/Logo_header_zw.png"
              alt="logo_1"
              width="150px"

              height="50px"
              className="d-inline-block align-text-top"
            />
          </a>
          <div className="navContentConatiner">
            <ul className="navbar-nav navbarNavCont">


              <li className="nav-item dropdown poppins-medium zw_btn_18">
                <a
                  className="nav-link dropdown-togg "
                  href="/"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"

                >

                  <FaGlobe />
                  {/* <span className="mx-2">
                    {selectedLanguage === "en"
                      ? "EN"
                      : selectedLanguage === "ar"
                        ? "AR"
                        : "HI"}
                  </span> */}
                  <i className="fs-4 icon-down-arrow ms-2"></i>
                </a>

                <ul className="dropdown-menu">
                  <li className="poppins-medium zw_btn_18 cursor-pointer">
                    <div
                      className={`dropdown-item lang-item rounded-2 ${selectedLanguage === "en" ? "active" : ""
                        }`}
                      onClick={() => changeLanguage("en")}
                    >
                      <span>English</span>
                    </div>
                  </li>
                  <li className="poppins-medium zw_btn_18 cursor-pointer">
                    <div
                      className={`dropdown-item lang-item rounded-2 ${selectedLanguage === "ar" ? "active" : ""
                        }`}
                      onClick={() => changeLanguage("ar")}
                    >
                      <span> العربية</span>
                    </div>
                  </li>
                </ul>
              </li>

              <li
                className="nav-item z-mob-notific z-mob-notification"
                data-bs-toggle="modal"
                data-bs-target="#staticBackdroppn"
              >
                <a className="nav-link dropdown-togg">
                  <i className="fa fa-bell-o"></i>
                </a>
              </li>

              <li className="z-btn-list p-0 poppins-medium zw_btn_18">
                <button
                  className="z-btn-primary px-3 login-button"
                  style={{ width: '150px', height: '45px', border: "1px solid #000000" }}
                  onClick={handleLoginButtonClick}
                >
                  <span className="poppins-medium">
                    {isAuthenticated
                      ? `${username.split(' ')[0]} ${username.split(' ')[1]?.slice(0, 3)}`
                      : t("LOGIN")}
                  </span>
                </button>

                <button
                  className="z-btn-primary login-icon"
                  style={{ border: "none", background: "transparent" }}
                  onClick={handleLoginButtonClick}
                >
                  {/* <i className="fa-solid fa-user" style={{ fontSize: '24px', color: '#000' }}></i> */}
                  <img src="./images/acc_icon.webp" className="notifi-img-size" alt="login"/>
                </button>

              </li>

              <button className="navbar-toggler" onClick={toggaleNavbar}>
                <span className="navbar-toggler-icon"></span>
              </button>
            </ul>

            <div
              className={`collapse navbar-collapse ${show ? "show" : ""} `}
              id="navbarSupportedContentNav"
            >
              <ul className="navbar-nav ms-auto mb-2 mb-lg-0 web-navbar-nav z-nav">
                <li className="nav-item poppins-medium zw_btn_18">
                  <NavLink className="nav-link" aria-current="page" to="/">
                    {" "}
                    {t("NavHome")}{" "}
                  </NavLink>
                </li>
                <li className="nav-item poppins-medium zw_btn_18 ">
                  <NavLink className="nav-link" to="/aboutus">
                    {" "}
                    {t("NavAbout")}{" "}
                  </NavLink>
                </li>
                <li className="nav-item poppins-medium zw_btn_18">
                  <NavLink className="nav-link" to="/joinAsProvider">
                    {" "}
                    {t("NavJoin")}{" "}
                  </NavLink>
                </li>

                <li className="nav-item dropdown poppins-medium zw_btn_18">
                  <a
                    className="nav-link dropdown-toggle"
                    href="/"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    {t("NavGet")}
                  </a>
                  <ul className="dropdown-menu">
                    <li className="poppins-medium zw_btn_18">
                      <NavLink className="dropdown-item" to="/forindividuals">
                        {t("NavIndividual")}
                      </NavLink>
                    </li>
                    <li className="poppins-medium zw_btn_18">
                      <NavLink className="dropdown-item" to="/forbussiness">
                        {t("NavBusiness")}
                      </NavLink>
                    </li>
                  </ul>
                </li>

                <li
                  className="nav-item poppins-medium zw_btn_18 "
                  data-bs-toggle="modal"
                  data-bs-target="#staticBackdroppn"
                >
                  <a className="nav-link" style={{ cursor: "pointer" }}>
                    <i className="fa fa-bell-o"></i>{" "}
                  </a>
                </li>
              </ul>
            </div>
          </div>
          {/* <!-- Modal --> */}
          <div
            className="modal fade "
            id="staticBackdroppn"
            data-bs-backdrop="static"
            data-bs-keyboard="false"
            tabindex="-1"
            aria-labelledby="staticBackdropLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-dialog-scrollable notifi-align">
              <div className="modal-content">
                <div className="modal-header border-0">
                  <button
                    type="button"
                    className="btn-close "
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body my-4">
                  <div
                    className="card my-4 border-0 shadow"
                    style={{ background: "#E7F4FF" }}
                  >
                    <div className="row g-0 align-items-center">
                      <div className="col-3 col-sm-2" >
                        <img
                          src="./images/notification-reminder-icon.png"
                          className="mx-2 notifi-img-size"
                          alt="notification-reminder-icon"
                        />
                      </div>
                      <div className="col-9 col-sm-10">
                        <div className="card-body p-0 mx-2">
                          <h6 className="poppins-semibold zw_14 zw_text_color">
                            Reminder
                          </h6>
                          <p
                            className=" poppins-regular zw_14 zw_86909D my-2"
                          >
                            Would your mind rating our service? It would be
                            really helpful for us to know how you felt
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div
                    className="card my-4 border-0 shadow"
                    style={{ background: "#EDFEEB" }}
                  >
                    <div className="row g-0 align-items-center">
                      <div className="col-3 col-sm-2" >
                        <img
                          src="./images/notification-appointmnet-icon.png"
                          className="mx-2 notifi-img-size"
                          alt="notification-appointmnet-icon"
                        />
                      </div>
                      <div className="col-9 col-sm-10">
                        <div className="card-body p-0 mx-2">
                          <h6 className="poppins-semibold zw_14 zw_text_color">
                            Appointmnet Confirmation
                          </h6>
                          <p
                            className=" poppins-regular zw_14 zw_86909D my-2"
                          >
                            If you have any issue with our service, please let
                            us know we are here to help
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="card my-4 border-0 shadow"
                    style={{ background: "#E7F4FF" }}
                  >
                    <div className="row g-0 align-items-center">
                      <div className="col-3 col-sm-2" >
                        <img
                          src="./images/notification-reminder-icon.png"
                          className="mx-2 notifi-img-size"
                          alt="notification-reminder-icon"
                        />
                      </div>
                      <div className="col-9 col-sm-10">
                        <div className="card-body p-0 mx-2">
                          <h6 className="poppins-semibold zw_14 zw_text_color">
                            Reminder
                          </h6>
                          <p
                            className=" poppins-regular zw_14 zw_86909D my-2"
                          >
                            Would your mind rating our service? It would be
                            really helpful for us to know how you felt
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="card my-4 border-0 shadow"
                    style={{ background: "#EDFEEB" }}
                  >
                    <div className="row g-0 align-items-center">
                      <div className="col-3 col-sm-2" >
                        <img
                          src="./images/notification-appointmnet-icon.png"
                          className="mx-2 notifi-img-size"
                          alt="notification-appointmnet-icon"
                        />
                      </div>
                      <div className="col-9 col-sm-10">
                        <div className="card-body p-0 mx-2">
                          <h6 className="poppins-semibold zw_14 zw_text_color">
                            Appointmnet Confirmation
                          </h6>
                          <p
                            className=" poppins-regular zw_14 zw_86909D my-2"
                          >
                            If you have any issue with our service, please let
                            us know we are here to help
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="card my-4 border-0 shadow"
                    style={{ background: "#E7F4FF" }}
                  >
                    <div className="row g-0 align-items-center">
                      <div className="col-3 col-sm-2" >
                        <img
                          src="./images/notification-reminder-icon.png"
                          className="mx-2 notifi-img-size"
                          alt="notification-reminder-icon"
                        />
                      </div>
                      <div className="col-9 col-sm-10">
                        <div className="card-body p-0 mx-2">
                          <h6 className="poppins-semibold zw_14 zw_text_color">
                            Reminder
                          </h6>
                          <p
                            className=" poppins-regular zw_14 zw_86909D my-2"
                          >
                            Would your mind rating our service? It would be
                            really helpful for us to know how you felt
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </nav>
      <LoginPopup />
      <Signup />
      <AccountSetup_details />
      <AccountSetup_gender />
      <AccountSetup_captcha />

      <OTP />
      <Accountsetup_success />

    </>
  );
}

export default Navbar;