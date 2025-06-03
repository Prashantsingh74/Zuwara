import React, { useContext, useState } from "react";
import Navbar from "../../Layout/Navbar";
import Footer from "../../Layout/Footer";
import "../../../Style/Wallet.css";
import { Link, useNavigate } from "react-router-dom";
import ReactFlagsSelect, { La } from "react-flags-select";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Context } from "../../../Context";
import Profilenavbar from "./Profilenavbar";
const defaultImageUrl =
  "https://th.bing.com/th/id/OIP.awAiMS1BCAQ2xS2lcdXGlwAAAA?rs=1&pid=ImgDetMain"; // Replace with your initial image URL
function Wallet() {
  const handleInputChange = (event) => {
    const { value } = event.target;

    setPatientName(value);
    setError(value.trim() === "");
  };
  const [patientName, setPatientName] = useState("");
  const [error, setError] = useState(false);
  const [selected, setSelected] = useState("SA");
  const { username, setUsername, setIsAuthenticated } = useContext(Context);
  const navigate = useNavigate();

  const onLogOut = () => {
    setIsAuthenticated(false);
    setUsername("");
    sessionStorage.removeItem("isAuthenticated");
    sessionStorage.removeItem("username"); // Correct typo
    navigate("/");
  };

  return (
    <div>
      <Navbar />
      <div className="my-wallet-TQp">
        <div className="auto-group-9asv-tpt" style={{ marginTop: "80px" }}>
          <Profilenavbar />
        </div>

      
        <div className="auto-group-ori4-usi container my-4">
          <div className="row">
          <div className="medical-records-bs2 poppins-semibold zw_16 zw_text_color">
          Medical Records
        </div>
            <div className="col-lg-5 col-md-5 mb-5">
              <div className="auto-group-xyng-pzg m-0">
                <div className="group-1261154812-MUp">
                  <div className="frame-1261154254-Vqv">
                    <div>
                      <img
                        className="image-87-obi"
                        src="/images/image-87.png"
                        alt=""
                      />
                    </div>
                    <div className="poppins-regular zw_16 zw_000">
                      <div>
                        All our service providers are certified and licensed by
                        the Ministry of Health, ensuring the highest quality and
                        reliable healthcare.
                      </div>
                      {/* <div style={{ marginTop: '5px' }}>
                                        No: ***********
                                    </div> */}
                    </div>
                  </div>
                  {/* <div className="frame-1261154254-Vqv">


                                <div className="image-87-obi">
                                </div>

                                
                                <div className="auto-group-pbfa-53S">
                                    <div className="zwaara-is-a-licensed-company-by-the-saudi-ministry-of-health-with-license-dKr">
                                        zwaara is a licensed company by the
                                        <br />
                                        Saudi Ministry of Health with License
                                    </div>
                                    <div className="no--i6Q">No: ***********</div>
                                </div>
                            </div> */}
                  {/* <div className="group-1261154811-o7r">
                                <div className="frame-37119-9xQ">
                                    <img className="group-1261154759-HHv" src="./images/group-1261154759-CN8.png" alt='' />
                                    <div className="blood-donation-DSU">Blood Donation</div>
                                    <div className="update-ie8">Update</div>
                                </div>
                            </div> */}
                  <div className="fram-37119-9xQ">
                    <img
                      className="group-1261154759-HHv"
                      src="/images/group-1261154759-for.png"
                      alt=""
                    />
                    <div className="blood-donation-DSU poppins-medium zw_16 zw_text_color">
                      <div>Blood Donation</div>
                      <div
                        className="zw_title_color cursor-pointer"
                        data-bs-toggle="modal"
                        data-bs-target="#BloodGroupBackdrop"
                      >
                        Update
                      </div>
                    </div>
                    <div
                      class="modal fade"
                      id="BloodGroupBackdrop"
                      data-bs-backdrop="static"
                      data-bs-keyboard="false"
                      tabindex="-1"
                      aria-labelledby="staticBackdropLabel"
                      aria-hidden="true"
                    >
                      <div class="modal-dialog">
                        <div class="modal-content" style={{ top: '150px' }}>
                          <div>
                            <button
                              type="button"
                              class="btn-close"
                              data-bs-dismiss="modal"
                              aria-label="Close"
                            ></button>
                          </div>

                          <div
                            className="modal-body"
                            style={{ margin: "25px" }}
                          >
                            <h3 style={{ marginBottom: "30px" }}>
                              {" "}
                              Select Blood Group
                            </h3>
                            <div>
                              <div className="profile_update">
                                <label className="profile_update_lable">
                                  <input
                                    type="radio"
                                    name="option"
                                    value="option1"
                                    className="profile_update_input"
                                  />
                                  A+
                                </label>
                              </div>

                              <div className="profile_update">
                                <label className="profile_update_lable">
                                  <input
                                    type="radio"
                                    name="option"
                                    value="option2"
                                    className="profile_update_input"
                                  />
                                  A-
                                </label>
                              </div>

                              <div className="profile_update">
                                <label className="profile_update_lable">
                                  <input
                                    type="radio"
                                    name="option"
                                    value="option3"
                                    className="profile_update_input"
                                  />
                                  B+
                                </label>
                              </div>

                              <div className="profile_update">
                                <label className="profile_update_lable">
                                  <input
                                    type="radio"
                                    name="option"
                                    value="option4"
                                    className="profile_update_input"
                                  />
                                  B-
                                </label>
                              </div>

                              <div className="profile_update">
                                <label className="profile_update_lable">
                                  <input
                                    type="radio"
                                    name="option"
                                    value="option5"
                                    className="profile_update_input"
                                  />
                                  AB+
                                </label>
                              </div>

                              <div className="profile_update">
                                <label className="profile_update_lable">
                                  <input
                                    type="radio"
                                    name="option"
                                    value="option6"
                                    className="profile_update_input"
                                  />
                                  AB-
                                </label>
                              </div>

                              <div className="profile_update">
                                <label className="profile_update_lable">
                                  <input
                                    type="radio"
                                    name="option"
                                    value="option7"
                                    className="profile_update_input"
                                  />
                                  O+
                                </label>
                              </div>

                              <div className="profile_update">
                                <label className="profile_update_lable">
                                  <input
                                    type="radio"
                                    name="option"
                                    value="option8"
                                    className="profile_update_input"
                                  />
                                  O-
                                </label>
                              </div>

                              <div className="profile_update">
                                <label className="profile_update_lable">
                                  <input
                                    type="radio"
                                    name="option"
                                    value="option9"
                                    className="profile_update_input"
                                  />
                                  I don't know
                                </label>
                              </div>
                              <div
                                className="d-grid gap-2 col-12 mx-auto mt-3"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                              >
                                <button
                                  type="button"
                                  className="poppins-semibold zw_bg zw_text_fff border-0 rounded zw_16"
                                  style={{ height: "30px", marginTop: "20px" }}
                                >
                                  Save
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="group-1261154919-pBN">
                  <Link to="/patientlist">
                    <div className="auto-group-r48k-MBJ">
                      <img
                        className="group-1261154891-5NC"
                        src="./images/group-1261154891-zd2.png"
                        alt="group-1261154891-zd2"
                      />
                      <div className="poppins-regular zw_16 zw_text_color">
                        Patients list
                      </div>
                    </div>
                  </Link>
                  <Link to="/addresslist">
                    <div className="auto-group-r48k-MBJ">
                      <img
                        className="group-1261154891-5NC"
                        src="/images/Addresslist.png"
                        alt="Addresslist"
                      />
                      <div className="poppins-regular zw_16 zw_text_color">
                        Address list
                      </div>
                    </div>
                  </Link>
                  <Link to="/wallet">
                    <div className="auto-group-r48k-MBJ">
                      <img
                        className="group-1261154891-5NC"
                        src="/images/group-1261154895.png"
                        alt="group-1261154895"
                      />
                      <div className="poppins-regular zw_16 zw_title_color">
                        Wallet
                      </div>
                    </div>
                  </Link>
                  <Link to="/mydocter">
                    <div className="auto-group-r48k-MBJ">
                      <img
                        className="group-1261154891-5NC"
                        src="./images/group-1261154894.png"
                        alt="group-1261154894"
                      />
                      <div className="poppins-regular zw_16 zw_text_color">
                        My Doctor
                      </div>
                    </div>
                  </Link>
                  {/* <Link to="/savedcards">
                                <div className="auto-group-r48k-MBJ">
                                    <img className="group-1261154891-5NC" src="./images/savecards.png" alt='savecards' />
                                    <div className="poppins-regular zw_16 zw_text_color">Saved Cards</div>
                                </div>
                            </Link>
                            <div className="auto-group-r48k-MBJ">
                                <img className="group-1261154891-5NC" src="/images/order-svgrepo-com-1.png" alt='order-svgrepo-com-1' />
                                <div className="poppins-regular zw_16 zw_text_color">Docters Orders</div>
                            </div> */}
                  <div
                    className="auto-group-r48k-MBJ hover-profile"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModalcountry"
                  >
                    <img
                      className="group-1261154891-5NC"
                      src="/images/country.png"
                      alt=""
                    />
                    <div className="poppins-regular zw_16 zw_text_color">
                      Country
                    </div>
                  </div>
                  <div
                    class="modal fade"
                    id="exampleModalcountry"
                    tabindex="-1"
                    aria-labelledby="exampleModalLabel"
                    aria-hidden="true"
                  >
                    <div class="modal-dialog modal-dialog-centered">
                      <div class="modal-content overflow-visible">
                        <div class="modal-header border-0">
                          {/* <h5 class="modal-title" id="exampleModalLabel">Modal title</h5> */}
                          <button
                            class="sps-dialog-close regv2back"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                          >
                            <i class="icon-close"></i>
                          </button>
                        </div>
                        <div class="modal-body border-0 mt-4">
                          <label
                            className="zw_poppins_regular poppins-regular zw_20 zw_text_111535"
                            htmlFor=""
                          >
                            Select Country
                          </label>
                          <div className="custom-flags-select">
                            <ReactFlagsSelect
                              selected={selected}
                              onSelect={(code) => setSelected(code)}
                              placeholder="Select Country"
                              searchable
                              searchPlaceholder="Search countries"
                              className="menu-flags"
                              selectedSize={20}
                              optionsSize={20}
                              selectButtonClassName="menu-flags-button"
                            />
                            {/* Custom arrow icon */}
                            <FontAwesomeIcon
                              icon={faChevronDown}
                              className="custom-arrow-icon"
                            />
                          </div>
                        </div>
                        <div class="modal-footer border-0">
                          <div
                            className="d-grid gap-2 col-12 mx-auto mt-3"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                          >
                            <button
                              className="poppins-regular zw_text_fff zw_bg_gradient border-0 rounded zw_20 py-3 my-2"
                              type="button"
                              style={{ marginTop: "20px" }}
                            >
                              Save
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="auto-group-r48k-MBJ hover-profile"
                    data-bs-toggle="modal"
                    data-bs-target="#logoutBackdrop"
                  >
                    <img
                      className="group-1261154891-5NC"
                      src="./images/group-1261154887.png"
                      alt=""
                    />
                    <div className="poppins-regular zw_16 zw_text_color">
                      Logout
                    </div>
                  </div>
                  <div
                    class="modal fade"
                    id="logoutBackdrop"
                    tabindex="-1"
                    aria-labelledby="exampleModalLabel"
                    aria-hidden="true"
                    style={{ marginTop: "200px" }}
                  >
                    <div class="modal-dialog">
                      <div class="modal-content">
                        <button
                          type="button"
                          class="btn-close"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        ></button>

                        <div
                          class="modal-body"
                          style={{
                            margin: "30px",
                            color: "#AF2245",
                            fontFamily: "poppins,sans-serif",
                          }}
                        >
                          <h2>Are you sure ,you want to logout ?</h2>
                          <div
                            class="d-grid gap-2 d-md-block"
                            style={{ marginTop: "30px", marginRight: "5px" }}
                          >
                            {/* <button class="btn btn" type="button" style={{ width: "200px", borderColor: "#AF2245", marginRight: "10px", height: "40px", borderRadius: "10px", }} onMouseEnter={(e) => e.target.style.backgroundColor = "#AF2245"} onMouseLeave={(e) => e.target.style.backgroundColor = "transparent"} data-bs-dismiss="modal" aria-label="Close">Yes</button> */}
                            <button
                              className="poppins-semibold zw_18 border-0"
                              type="button"
                              style={{
                                width: "200px",
                                borderColor: "#AF2245",
                                height: "40px",
                                borderRadius: "10px",
                                color: "#000000",
                                marginRight: "10px",
                              }}
                              onMouseEnter={(e) =>
                                (e.target.style.backgroundColor = "#AF2245")
                              }
                              onMouseLeave={(e) =>
                                (e.target.style.backgroundColor = "transparent")
                              }
                              data-bs-dismiss="modal"
                              aria-label="Close"
                              onClick={onLogOut}
                            >
                              yes
                            </button>
                            <button
                              className="poppins-semibold zw_18 border-0"
                              type="button"
                              style={{
                                width: "200px",
                                borderColor: "#AF2245",
                                height: "40px",
                                borderRadius: "10px",
                                backgroundColor: "#AF2245",
                                color: "Background",
                              }}
                              data-bs-dismiss="modal"
                              aria-label="Close"
                            >
                              No
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-7 col-md-7">
              <div className="group-1261154869-2s6">
                <Link to="/profile">
                  <div className="group-1261154838-YqS">
                    <img
                      className="group-1261154072-Sfv"
                      src="./images/group-1261154072-y5v.png"
                      alt="group-1261154072-y5v"
                    />
                    <p
                      className="poppins-medium zw_18 zw_text_color"
                      style={{ margin: "0px" }}
                    >
                      Back
                    </p>
                  </div>
                </Link>
                <div className="wallet-VPJ poppins-semibold zw_24 zw_text_color">
                  WALLET
                </div>
                <div className="auto-group-ahn4-1W4">
                <div className="row">
               
                    <div className="col-lg-3 col-md-12">
                      <div className="auto-group-2ams-vsv">
                        <h2
                          data-bs-toggle="modal"
                          data-bs-target="#addvoucherPopup"
                        >
                          Add Voucher
                        </h2>
                        <div
                          class="modal fade"
                          id="addvoucherPopup"
                          data-bs-backdrop="static"
                          data-bs-keyboard="false"
                          tabindex="-1"
                          aria-labelledby="staticBackdropLabel"
                          aria-hidden="true"
                          style={{ marginTop: "150px" }}
                        >
                          <div class="modal-dialog">
                            <div class="modal-content" >
                            <button
                                  type="button"
                                  class="btn-close"
                                  data-bs-dismiss="modal"
                                  aria-label="Close"
                                ></button>
                              <div class="modal-body" style={{ margin: "15px" }}>
                                <h1>Add Voucher</h1>
                                <div class="col-12 ">
                                  <div className="form-group zw_form_group">
                                    <label
                                      class="zw_poppins_regular poppins-regular zw_20 zw_text_111535 my-2"
                                     
                                    >
                                      Voucher Code
                                    </label>
                                    <input
                                      type="text"
                                      value={patientName}
                                      onChange={handleInputChange}
                                      className="form-control zw_form_control zw_secondary poppins-regular zw_16 my-3"
                                      placeholder="Enter Voucher Code"
                                      style={{ width: "100%", fontSize:'16px', }}
                                    ></input>
                                  </div>
                                  {error && (
                                    <p
                                      className="error-message poppins-medium zw_18"
                                      style={{ marginTop: "-20px" }}
                                    >
                                      Please ente Voucher Code
                                    </p>
                                  )}
                                </div>
                                <div class="d-grid gap-2 col-12 mx-auto">
                                  <button
                                   class="poppins-medium zw_18 border-0 rounded py-2"
                                    type="button"
                                    style={{
                                      backgroundColor: "#AF2245",
                                      borderColor: "#AF2245",
                                      color: "#fff",
                                    }}
                                  >
                                    Button
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-9 col-md-12">
                      <div className="auto-group-mhmn-Lwe ">
                        <img
                          className="wallet584026-1-7b2"
                          src="./images/wallet584026-1.png"
                          alt="wallet584026-1"
                        />
                        <div>
                          <div className="poppins-regular zw_16 zw_text_color wball">
                            Wallet Balance
                          </div>
                          <div className="sar-3ja poppins-semibold zw_46 zw_text_color">
                            SAR 10
                          </div>
                        </div>
                      </div>
                    </div>
             
                </div>
                </div>
                <div className="terms-conditions-bSL poppins-medium zw_20 zw_text_color">
                  Terms &amp; Conditions
                </div>
                <div
                  className="group-1261154870-2Lc poppins-regular zw_14 zw_text_color"
                  data-bs-toggle="modal"
                  data-bs-target="#termsPopup"
                >
                  View wallet terms of use
                </div>

                <div
                  class="modal fade"
                  id="termsPopup"
                  data-bs-backdrop="static"
                  data-bs-keyboard="false"
                  tabindex="-1"
                  aria-labelledby="staticBackdropLabel"
                  aria-hidden="true"
                  style={{ marginTop: "150px" }}
                >
                  <div class="modal-dialog">
                    <div class="modal-content">
                      <div class="modal-body" style={{ margin: "30px" }}>
                        <button
                          type="button"
                          class="btn-close"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        ></button>
                        <h2 className="headingpopup">Wallet terms and use </h2>
                        <h3 className="headingsecond">
                          The amount in your zuwara account can be used
                          according to the following conditions:
                        </h3>
                        <ul>
                          <li className="list">
                            <img
                              src="./images/black circle.jpg"
                              alt="black circle"
                              className="wallet-list-img"
                            />
                            The wallet balance that you have got from zuwara is
                            not cashable.
                          </li>
                          <li className="list">
                            <img
                              src="./images/black circle.jpg"
                              alt="black circle"
                              className="wallet-list-img"
                            />
                            The wallet balance can only be used for booking
                            through zuwara platforms only.
                          </li>
                          <li className="list">
                            <img
                              src="./images/black circle.jpg"
                              alt="black circle"
                              className="wallet-list-img"
                            />
                            In case wallet balance expires, it will be
                            automatically withdrawn.
                          </li>
                          <li className="list">
                            <img
                              src="./images/black circle.jpg"
                              alt="black circle"
                              className="wallet-list-img"
                            />
                            In case wallet balance expires, it will be
                            automatically withdrawn.
                          </li>
                          <li className="list">
                            <img
                              src="./images/black circle.jpg"
                              alt="black circle"
                              className="wallet-list-img"
                            />
                            These terms and conditions are subject to change by
                            zuwara without prior notice
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="poppins-medium zw_20 zw_text_color">
                  Wallet Transaction History
                </div>
                <div className="auto-group-ee92-feU">
                  <div className="row">
                    <div className="col-lg-3 col-md-12">
                      <div className="auto-group-dnfe-oEt">
                        <div className="group-1261154871-KU8">
                          <div className="poppins-semibold zw_24 zw_text_fff">
                            21
                          </div>
                          <div className="poppins-semibold zw_20 zw_text_fff">
                            NOV 22
                          </div>
                          <div className="poppins-semibold zw_16 zw_text_fff">
                            12:33 PM
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-9 col-md-12">
                      <div className="group-1261154873-Rfa">
                        <div className="auto-group-i1oz-8Zz">
                          <div className="expired-Utk poppins-medium zw_16">
                            Expired
                          </div>
                          <div className="transaction-id-d-12436383-cEG poppins-regular zw_12">
                            <span>Transaction ID : </span>
                            <span className="poppins-regular zw_12 zw_text_color">
                              D-12436383
                            </span>
                          </div>
                        </div>
                        <div className="item-10000-3Tz poppins-medium zw_24 ">
                          -100.00
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="auto-group-ee92-feU">
                  <div className="row">
                    <div className="col-lg-3 col-md-12">
                      <div className="auto-group-dnfe-oEt ">
                        <div className="group-1261154871-KU8">
                          <div className="poppins-semibold zw_24 zw_text_fff">
                            25
                          </div>
                          <div className="poppins-semibold zw_20 zw_text_fff">
                            NOV 22
                          </div>
                          <div className="poppins-semibold zw_16 zw_text_fff">
                            12:55 PM
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-9 col-md-12">
                      <div className="group-1261154873-Rfa ">
                        <div className="auto-group-i1oz-8Zz">
                          <div className="expired-Utk poppins-medium zw_16">
                            Expired
                          </div>
                          <div className="transaction-id-d-12436383-cEG poppins-regular zw_12">
                            <span>Transaction ID : </span>
                            <span className="poppins-regular zw_12 zw_text_color">
                              D-12436383
                            </span>
                          </div>
                        </div>
                        <div className="auto-group-esdv-SZz">
                          <div className="expiry-date-21-november-2022-aRJ">
                            <div className="wallet-transaction-expired mx-0">
                              <span className="poppins-regular zw_12 zw_text_color">
                                Expiry Date
                              </span>
                              <span className="expiry-date-21-november-2022-aRJ-sub-1">
                                {" "}
                                21 November 2022
                              </span>
                            </div>
                            <div>
                              <div className="item-10000-wv4 poppins-medium zw_24">
                                +100.00
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* <div className="auto-group-dxnl-WMa">
                            <div className="auto-group-sgv2-EYU">
                                <div className="group-1261154872-MNC">
                                    <div className="item-25-VzC">25</div>
                                    <div className="nov-22-DfJ">nov 22</div>
                                    <div className="pm-YxU">12:55 PM</div>
                                </div>
                            </div>
                            <div className="group-1261154874-sE4">
                                <div className="auto-group-5kcq-n68">
                                    <div className="expired-wDv">Expired</div>
                                    <div className="transaction-id-d-12436383-4ZS">
                                        <span className="transaction-id-d-12436383-4ZS-sub-0">Transaction ID : </span>
                                        <span className="transaction-id-d-12436383-4ZS-sub-1">D-12436383</span>
                                    </div>
                                </div>
                                <div className="auto-group-esdv-SZz">
                                    <div className="expiry-date-21-november-2022-aRJ">
                                        <span className="expiry-date-21-november-2022-aRJ-sub-0">Expiry Date</span>
                                        <span className="expiry-date-21-november-2022-aRJ-sub-1"> 21 November 2022</span>
                                    </div>
                                    <div className="item-10000-wv4">+100.00</div>
                                </div>
                            </div>
                        </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Wallet;
