import React, { useState, useEffect, useContext } from "react";
import countryList from "react-select-country-list";
import Navbar from "../../Layout/Navbar";
import Footer from "../../Layout/Footer";
import "../../../Style/Mydocter.css";
import { Link, useNavigate } from "react-router-dom";
import ReactFlagsSelect from "react-flags-select";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Context } from "../../../Context";
import Profilenavbar from "./Profilenavbar";
const defaultImageUrl =
  "https://th.bing.com/th/id/OIP.awAiMS1BCAQ2xS2lcdXGlwAAAA?rs=1&pid=ImgDetMain"; // Replace with your initial image URL
function Mydoctor() {
  const [options, setOptions] = useState([]);
  const [selected, setSelected] = useState("SA");
  useEffect(() => {
    const countries = countryList().getData();
    setOptions(countries);
  }, []);
  const handleInputChange = (event) => {
    const { value } = event.target;

    setPatientName(value);
    setError(value.trim() === "");
  };
  const [patientName, setPatientName] = useState("");
  const [error, setError] = useState(false);
  const { username, setUsername, signupFormData, setIsAuthenticated } =
    useContext(Context);

  const navigate = useNavigate();

  const doctors = [
    {
      doctorName: "Dr. Junaid Hassan",
      dis: "Registarar, Internal Medicine",
      img: "./images/dr1.png",
    },
    {
      doctorName: "Dr. Junaid Hassan",
      dis: "Registarar, Internal Medicine",
      img: "./images/dr2.png",
    },
    {
      doctorName: "Dr. Junaid Hassan",
      dis: "Registarar, Internal Medicine",
      img: "./images/dr1.png",
    },
    {
      doctorName: "Dr. Junaid Hassan",
      dis: "Registarar, Internal Medicine",
      img: "./images/dr2.png",
    },
  ];

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
          <Profilenavbar/>
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
                    <div className="poppins-regular zw_14 zw_000">
                      <div>
                      All our service providers are certified and licensed by the Ministry of Health, ensuring the highest quality and reliable healthcare.
                      </div>
                      <div style={{ marginTop: "5px" }}>No: ***********</div>
                    </div>
                  </div>
                </div>
                <div className="group-1261154919-pBN w-100">
                  <Link to="/patientlist">
                    <div className="auto-group-r48k-MBJ">
                      <img
                        className="group-1261154891-5NC"
                        src="./images/group-1261154891-zd2.png"
                        alt=""
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
                        alt=""
                      />
                      <div className="poppins-regular zw_16 zw_text_color">
                        Address list
                      </div>
                    </div>
                  </Link>
                  <Link to="/wallet">
                    <div className="auto-group-r48k-MBJ">
                      <img
                        className="group-1261154891-5NC text-black-filter"
                        src="/images/group-1261154895.png"
                        alt=""
                      />
                      <div className="poppins-regular zw_16 zw_text_color">
                        Wallet
                      </div>
                    </div>
                  </Link>
                  <Link to="/mydocter">
                    <div className="auto-group-r48k-MBJ">
                      <img
                        className="group-1261154891-5NC text-col-filter"
                        src="./images/group-1261154894.png"
                        alt=""
                      />
                      <div className="poppins-regular zw_16  zw_title_color">
                        My Doctor
                      </div>
                    </div>
                  </Link>
                  {/* <Link to="/savedcards">
                                    <div className="auto-group-r48k-MBJ">
                                        <img
                                            className="group-1261154891-5NC"
                                            src="./images/savecards.png"
                                            alt=""
                                        />
                                        <div className="poppins-regular zw_16 zw_text_color">
                                            Saved Cards
                                        </div>
                                    </div>
                                </Link>
                                <div className="auto-group-r48k-MBJ">
                                    <img
                                        className="group-1261154891-5NC"
                                        src="/images/order-svgrepo-com-1.png"
                                        alt=""
                                    />
                                    <div className="poppins-regular zw_16 zw_text_color">
                                        Docters Orders
                                    </div>
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
                    className="group-1261155539-RZn hover-profile d-flex"
                    data-bs-toggle="modal"
                    data-bs-target="#logoutBackdrop"
                  >
                    <img
                      className="group-1261154891-kc4"
                      src="/images/group-1261154887.png"
                      alt=""
                    />
                    <div className="poppins-regular zw_16 zw_text_color">
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

                        {/* <div className="modal-body" style={{ margin: "30px", color: "#AF2245", fontFamily: "poppins,sans-serif" }}> */}
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
            <div className="col-lg-7 col-md-7">
              <div className="group-1261154869-2s66">
                {/* <Link to="/profile">
                                <div className="group-1261154838-YqS">
                                    <img className="group-1261154072-Sfv" src="./images/group-1261154072-y5v.png" alt='' />
                                    <p className="poppins-medium zw_18 zw_text_color" style={{margin: '0px'}}>Back</p>
                                </div>
                            </Link> */}
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
                      <div class="modal-content" style={{top: '150px'}}>
                        <div>
                          <button
                            type="button"
                            class="btn-close"
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

                <div className="wallet-VPJ poppins-semibold zw_24 zw_text_color">
                  My Doctor
                </div>
                {doctors.map((ditem) => {
                  return (
                    <div className="auto-group-ee92-feU">
                      <div className="group-1261154873-Rfa w-100">
                        <div className="auto-group-i1oz-8Zz">
                          <div className="">
                            <img
                              src={ditem.img}
                              alt="drphoto"
                              style={{
                                width: "90px",
                                height: "90px",
                                borderRadius: "50%",
                                objectFit: "cover",
                              }}
                            />
                          </div>
                          <div className="ms-5">
                            <h3 className="poppins-medium zw_16 zw_000">
                              {ditem.doctorName}
                            </h3>
                            <p
                              className="poppins-regular "
                              style={{ marginTop: "20px" }}
                            >
                              {ditem.dis}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Mydoctor;
