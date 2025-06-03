import React, { useState, useEffect, useContext } from "react";
// import countryList from 'react-select-country-list';
import Navbar from "../../Layout/Navbar";
import Footer from "../../Layout/Footer";
import "../../../Style/Profile.css";
import { Link, useNavigate } from "react-router-dom";
import Addrecord from "./Addrecord";
import ReactFlagsSelect from "react-flags-select";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Context } from "../../../Context";
import Profilenavbar from "./Profilenavbar";
// import Navbar from '../../Layout/Navbar';
// import Footer from '../../Layout/Footer';

function Profile() {
  const { username, signupFormData, setIsAuthenticated, setUsername } =
    useContext(Context);
  // const [uploadedFiles, setUploadedFiles] = useState([]); // New state for uploaded files
  const navigate = useNavigate();
  const [selected, setSelected] = useState("SA");
  // const [options, setOptions] = useState([]);

  // useEffect(() => {
  //     const countries = countryList().getData();
  //     setOptions(countries);
  // }, []);
  useEffect(() => {
    const storedSignupFormData = sessionStorage.getItem("signupFormData");
    if (storedSignupFormData) {
      setIsAuthenticated(true);
    }
  }, []);

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

      <div className="auto-group-9asv-tpt" style={{ marginTop: "80px" }}>
        <Profilenavbar />
      </div>
      <div className="auto-group-znxc-BB2 container">
        <div className="row align-items-center">
          <div className="col-lg-5 col-md-6 mb-6">
            <div className="auto-group-x1vc-RaU">
              <div className="frame-1261154254-xKW">
                <div>
                  <img
                    className="image-87-rvg"
                    src="/images/image-87.png"
                    alt=""
                  />
                </div>
                <div className="poppins-regular zw_16 zw_000">
                  <div>
                    All our service providers are certified and licensed by the Ministry of Health, ensuring the highest quality and reliable healthcare.
                  </div>
                  <div style={{ marginTop: "5px" }}>No: ***********</div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-7 col-md-6">
            <div className=" pro-addrecord">
              <Addrecord />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-5 col-md-6">
            <div className="group-1261154920-Uv8">
              
              <div className="group-1261154811-Mnt">
                <img
                  className="group-e1J"
                  src="/images/group-1261154759-for.png"
                  alt=""
                />
                <div
                  className="blood-donation poppins-medium zw_16 zw_000"
                  data-bs-toggle="modal"
                  data-bs-target="#BloodGroupBackdrop"
                >
                  <div>Blood Donation</div>
                  <div className="zw_title_color cursor-pointer">Update</div>
                </div>
                <div
                  className="modal fade"
                  id="BloodGroupBackdrop"
                  data-bs-backdrop="static"
                  data-bs-keyboard="false"
                  tabindex="-1"
                  aria-labelledby="staticBackdropLabel"
                  aria-hidden="true"
                >
                  <div className="modal-dialog">
                    <div className="modal-content" style={{top: '150px'}}>
                      <div>
                        <button
                          type="button"
                          className="btn-close"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        ></button>
                      </div>

                      <div className="modal-body" style={{ margin: "25px" }}>
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
            <div className="group-1261155016-Atk">
              <div className="frame-1261154262-5Vv">
                {/* <Link to="/records">
                                <div className="group-1261155539-RZn">
                                    <img className="group-1261154891-kc4" src="/images/group-1261154891-zd2.png" alt='' />
                                    <div className="poppins-regular zw_16 zw_text_color">Patients list</div>
                                </div>
                            </Link> */}
                <Link to="/patientlist">
                  <div className="group-1261155539-RZn">
                    <img
                      className="group-1261154891-kc4"
                      src="/images/group-1261154891-zd2.png"
                      alt=""
                    />
                    <div className="poppins-regular zw_16 zw_text_color">
                      Patients list
                    </div>
                  </div>
                </Link>
                <Link to="/addresslist">
                  <div className="group-1261155539-RZn">
                    <img
                      className="group-1261154891-kc4"
                      src="/images/Addresslist.png"
                      alt=""
                    />
                    <div className="poppins-regular zw_16 zw_text_color">
                      Address list
                    </div>
                  </div>
                </Link>
                <Link to="/wallet">
                  <div className="group-1261155539-RZn">
                    <img
                      className="group-1261154891-kc4 text-black-filter"
                      src="/images/group-1261154895.png"
                      alt=""
                    />
                    <div className="poppins-regular zw_16 zw_text_color">
                      Wallet
                    </div>
                  </div>
                </Link>
                <Link to="/mydocter">
                  <div className="group-1261155539-RZn">
                    <img
                      className="group-1261154891-kc4"
                      src="/images/group-1261154894.png"
                      alt=""
                    />
                    <div className="poppins-regular zw_16 zw_text_color">
                      My Doctor
                    </div>
                  </div>
                </Link>
                {/* <Link to="/savedcards">
                                <div className="group-1261155539-RZn">
                                    <img className="group-1261154891-kc4" src="/images/savecards.png" alt='' />
                                    <div className="poppins-regular zw_16 zw_text_color">Saved Cards</div>
                                </div>
                            </Link> */}
                {/* <div className="group-1261155539-RZn">
                <img
                  className="group-1261154891-kc4"
                  src="/images/order-svgrepo-com-1.png"
                  alt=""
                />
                <div className="poppins-regular zw_16 zw_text_color">
                  Doctor Orders
                </div>
              </div> */}
                <div
                  className="group-1261155539-RZn hover-profile"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModalcountry"
                >
                  <img
                    className="group-1261154891-kc4"
                    src="/images/country.png"
                    alt=""
                  />
                  <div className="poppins-regular zw_16 zw_text_color">
                    Country
                  </div>
                </div>

                <div
                  className="modal fade"
                  id="exampleModalcountry"
                  tabindex="-1"
                  aria-labelledby="exampleModalLabel"
                  aria-hidden="true"
                >
                  <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content overflow-visible">
                      <div className="modal-header border-0">
                        {/* <h5 className="modal-title" id="exampleModalLabel">Modal title</h5> */}
                        <button
                          class="sps-dialog-close regv2back"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        >
                          <i class="icon-close"></i>
                        </button>
                      </div>
                      <div className="modal-body border-0 mt-4">
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
                      <div className="modal-footer border-0">
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
                  className="group-1261155539-RZn cursor-pointer"
                  data-bs-toggle="modal"
                  data-bs-target="#logoutBackdrop"
                >
                  <img
                    className="group-1261154891-kc4"
                    src="/images/group-1261154887.png"
                    alt="group-1261154887"
                  />
                  <div className="poppins-regular  zw_16 zw_text_color">
                    Logout
                  </div>
                </div>
                <div
                  className="modal fade"
                  id="logoutBackdrop"
                  tabindex="-1"
                  aria-labelledby="exampleModalLabel"
                  aria-hidden="true"
                  style={{ marginTop: "200px" }}
                >
                  <div className="modal-dialog">
                    <div className="modal-content">
                      <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      ></button>

                      <div
                        className="modal-body"
                        style={{
                          margin: "30px",
                          color: "#AF2245",
                          fontFamily: "poppins,sans-serif",
                        }}
                      >
                        <h2 className="poppins-semibold zw_20 zw_text_color">
                          Are you sure ,you want to logout ?
                        </h2>
                        <div
                          className="d-grid gap-2 d-md-block"
                          style={{ marginTop: "30px", marginRight: "5px" }}
                        >
                          {/* <button className="btn btn" type="button" style={{ width: "200px", borderColor: "#AF2245", marginRight: "10px", height: "40px", borderRadius: "10px", }} onMouseEnter={(e) => e.target.style.backgroundColor = "#AF2245"} onMouseLeave={(e) => e.target.style.backgroundColor = "transparent"} data-bs-dismiss="modal" aria-label="Close">Yes</button> */}
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
                            Yes
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
          <div className="col-lg-7 col-md-6">
            {/* <div className="d-flex justify-content-end">
              <Addrecord />
            </div> */}
            <div className="group-1261154921-tLL">
              <p className="text-right poppins-semibold zw_16 text zw_black mt-5">
                Medical Records
              </p>
              <div className="frame-1261154254-KwS">
                <div className="auto-group-dugu-Dmv">
                  <img
                    className="group-1261154764-wxp"
                    src="./images/group-1261154764-8JQ.png"
                    alt=""
                  />
                  <div className="poppins-medium zw_15 zw_000">
                    0 Appointments
                  </div>
                </div>
                <div className="auto-group-pbgg-bXa">
                  <div className=" poppins-regular zw_13 zw_000">Firends</div>
                  <div className="d-flex">
                    <img
                      className="group-5he"
                      src="/images/group-CbN.png"
                      alt=""
                    />
                    <div className="poppins-regular zw_13 zw_title_color mt-2">
                      0 Files
                    </div>
                  </div>
                </div>
              </div>

              <div className="frame-1261154254-KwS">
                <div className="auto-group-dugu-Dmv">
                  <img
                    className="group-1261154764-wxp"
                    src="./images/group-1261154764-8JQ.png"
                    alt=""
                  />
                  <div className="poppins-medium zw_15 zw_000">
                    0 Appointments
                  </div>
                </div>
                <div className="auto-group-pbgg-bXa">
                  <div className="poppins-regular zw_13 zw_000">My Self</div>
                  <div className="d-flex">
                    <img
                      className="group-5he"
                      src="/images/group-CbN.png"
                      alt=""
                    />
                    <div className="poppins-regular zw_13 zw_title_color mt-2">
                      0 Files
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Profile;
